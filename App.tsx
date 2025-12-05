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
    try {
      const savedMenu = localStorage.getItem('wangwang_menu');
      if (savedMenu) {
        setMenu(JSON.parse(savedMenu));
      }
    } catch (e) {
      console.error("Failed to load menu", e);
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
      d.id === dish.id ? { ...d, orderCount: (d.orderCount || 0) + 1 } : d
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
            logging: false,
          });
          
          const image = canvas.toDataURL("image/png");
          
          // Create a new window/modal to show the image for easy saving
          // In WeChat, long-press to save is the standard
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(`
              <!DOCTYPE html>
              <html>
                <head>
                  <title>长按保存菜单</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                  <style>
                    body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #333; margin: 0; padding: 20px; box-sizing: border-box; }
                    img { max-width: 100%; height: auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border-radius: 8px; }
                    .tip { margin-top: 20px; font-size: 16px; color: white; font-family: sans-serif; text-align: center; }
                  </style>
                </head>
                <body>
                  <img src="${image}" alt="Menu Receipt" />
                  <div class="tip">长按图片保存，分享给师傅</div>
                </body>
              </html>
            `);
            newWindow.document.close();
          } else {
             // Fallback if popup blocked (unlikely in direct interaction but possible)
             // Just show notification
             alert("请允许弹出窗口以查看菜单图片");
          }

        } catch (error) {
          console.error("Screenshot failed", error);
          alert("生成菜单失败，请重试");
        } finally {
          setIsGenerating(false);
        }
      } else {
        alert("组件未加载完成，请稍后再试");
        setIsGenerating(false);
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
        <div className="p-4 border-b bg-white/95 backdrop-blur sticky top-0 z-10 flex justify-between items-center shadow-sm h-16">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">{activeCategory}</h1>
          <button 
            onClick={handleAddNewDish}
            className="text-sm bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-full flex items-center hover:bg-orange-100 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            <span className="font-bold">加菜</span>
          </button>
        </div>

        {/* Scrollable Dish List */}
        <div className="flex-1 overflow-y-auto p-4 pb-32 no-scrollbar scroll-smooth">
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
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
                <ChefHat size={48} className="mb-4 opacity-20" />
                <p>这个分类还没菜呢</p>
                <button onClick={handleAddNewDish} className="mt-2 text-orange-500 font-medium text-sm">点击添加一个？</button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 pb-8 safe-area-bottom shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] flex justify-between items-center z-20">
          
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3.5 rounded-full shadow-lg active:scale-95 transition-all duration-200"
          >
            <div className="relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse border-2 border-gray-900">
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
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-full shadow-lg transition-all duration-200 active:scale-95 ${
              isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-200'
            }`}
          >
            <span className="font-bold text-lg">{isGenerating ? '生成中...' : '师傅点菜！'}</span>
            <ChefHat size={22} />
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