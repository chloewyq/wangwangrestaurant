import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { DishCard } from './components/DishCard';
import { CartModal } from './components/CartModal';
import { FloatingNotification } from './components/FloatingNotification';
import { ReceiptGenerator } from './components/ReceiptGenerator';
import { CATEGORIES, INITIAL_MENU } from './constants';
import { Category, Dish, CartItem, Notification, User } from './types';
import { ShoppingBag, ChefHat, Plus } from 'lucide-react';

// Declaration for html2canvas to avoid TS errors
declare global {
  interface Window {
    html2canvas: any;
  }
}

const App: React.FC = () => {
  // --- State ---
  const [user, setUser] = useState<User>({ nickname: '吃货' });
  const [activeCategory, setActiveCategory] = useState<Category>('菜菜');
  const [menu, setMenu] = useState<Dish[]>(INITIAL_MENU);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  // --- Initialization ---
  useEffect(() => {
    // Load menu from local storage if exists
    const savedMenu = localStorage.getItem('wangwang_menu');
    if (savedMenu) {
      setMenu(JSON.parse(savedMenu));
    }

    // Ask for nickname on first load
    const savedName = localStorage.getItem('wangwang_nickname');
    if (savedName) {
      setUser({ nickname: savedName });
    } else {
      // Small delay to ensure UI renders first
      setTimeout(() => {
        const name = prompt('给自己起个昵称吧 (Enter your nickname):', '小馋猫');
        if (name) {
          localStorage.setItem('wangwang_nickname', name);
          setUser({ nickname: name });
        }
      }, 500);
    }
  }, []);

  // Persist menu changes
  useEffect(() => {
    localStorage.setItem('wangwang_menu', JSON.stringify(menu));
  }, [menu]);

  // --- Handlers ---
  
  const showNotification = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message }]);
    // Remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleAddToCart = (dish: Dish) => {
    const newItem: CartItem = { ...dish, quantity: 1, addedBy: user.nickname };
    setCart(prev => [...prev, newItem]);
    
    // Increment local order count for the dish
    const updatedMenu = menu.map(d => 
      d.id === dish.id ? { ...d, orderCount: d.orderCount + 1 } : d
    );
    setMenu(updatedMenu);

    showNotification(`${user.nickname} 想吃 ${dish.name}`);
  };

  const handleUpdateDish = (updatedDish: Dish) => {
    const updatedMenu = menu.map(d => d.id === updatedDish.id ? updatedDish : d);
    setMenu(updatedMenu);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddNewDish = () => {
    const name = prompt('输入新菜名 (New Dish Name):');
    if (!name) return;

    const newDish: Dish = {
      id: Math.random().toString(36).substr(2, 9),
      category: activeCategory,
      name: name,
      imageUrl: `https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`,
      orderCount: 0
    };
    setMenu([...menu, newDish]);
    showNotification(`新菜品 "${name}" 已添加！`);
  };

  const handleGenerateReceipt = async () => {
    if (cart.length === 0) {
      alert('请先点菜再呼叫师傅！(Cart is empty)');
      return;
    }

    setIsGenerating(true);
    // Wait for render
    setTimeout(async () => {
      if (receiptRef.current && window.html2canvas) {
        try {
          const canvas = await window.html2canvas(receiptRef.current, {
            scale: 2, // Retina quality
            backgroundColor: null,
            useCORS: true, // Allow cross-origin images (like picsum)
          });
          
          // Create a link to download or open
          const image = canvas.toDataURL("image/png");
          
          // Create a modal or new window to show the image
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head>
                  <title>今日菜单</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #333; margin: 0; color: white; font-family: sans-serif; }
                    img { max-width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border-radius: 8px; }
                    p { margin-top: 20px; font-size: 1.2rem; }
                  </style>
                </head>
                <body>
                  <img src="${image}" />
                  <p>长按图片保存或分享给师傅</p>
                </body>
              </html>
            `);
          } else {
             // Fallback for mobile if popup blocked, simple download shim
             const link = document.createElement('a');
             link.download = `wangwang-menu-${new Date().toLocaleDateString()}.png`;
             link.href = image;
             link.click();
          }

        } catch (error) {
          console.error("Screenshot failed", error);
          alert("生成菜单失败，请重试");
        } finally {
          setIsGenerating(false);
        }
      }
    }, 100);
  };

  // --- Derived State ---
  const filteredDishes = menu.filter(d => d.category === activeCategory);

  return (
    <div className="flex h-screen w-full overflow-hidden text-gray-800 font-sans">
      
      {/* Floating Notifications */}
      <FloatingNotification notifications={notifications} />

      {/* Left Sidebar */}
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={setActiveCategory} 
      />

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {/* Header (Category Name) */}
        <div className="p-4 border-b bg-white sticky top-0 z-10 flex justify-between items-center shadow-sm h-16">
          <h1 className="text-xl font-bold text-gray-800">{activeCategory}</h1>
          <button 
            onClick={handleAddNewDish}
            className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full flex items-center hover:bg-gray-200 transition-colors"
          >
            <Plus size={14} className="mr-1" />
            加菜
          </button>
        </div>

        {/* Scrollable Dish List */}
        <div className="flex-1 overflow-y-auto p-4 pb-24 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDishes.map(dish => (
              <DishCard 
                key={dish.id} 
                dish={dish} 
                onAdd={handleAddToCart}
                onUpdateDish={handleUpdateDish}
              />
            ))}
            
            {/* Empty State Helper */}
            {filteredDishes.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-400">
                <p>这个分类还没菜呢，加一个吧！</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-6 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-between items-center z-20">
          
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <div className="relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="font-bold">我想吃</span>
          </button>

          {/* Checkout Button */}
          <button 
            onClick={handleGenerateReceipt}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-orange-500 text-white px-5 py-3 rounded-full shadow-lg shadow-orange-200 active:scale-95 transition-transform disabled:opacity-50"
          >
            <span className="font-bold">{isGenerating ? '生成中...' : '师傅点菜！'}</span>
            <ChefHat size={20} />
          </button>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={handleRemoveFromCart}
      />

      {/* Hidden Receipt for Screenshot */}
      <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none overflow-hidden">
        <ReceiptGenerator 
          ref={receiptRef} 
          cart={cart} 
          date={new Date().toLocaleDateString()} 
        />
      </div>

    </div>
  );
};

export default App;