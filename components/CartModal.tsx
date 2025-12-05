import React from 'react';
import { CartItem } from '../types';
import { X, Trash2 } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (index: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, onRemove }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-4 shadow-xl max-h-[80vh] flex flex-col animate-slide-up">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">我想吃 (Selected)</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>还没有点菜哦 (Cart is empty)</p>
              <p className="text-sm">快去加点好吃的吧！</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={item.imageUrl} className="w-12 h-12 rounded object-cover" alt={item.name} />
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-orange-500 bg-orange-100 px-1 rounded inline-block">
                      {item.addedBy} 想吃
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemove(index)}
                  className="text-red-400 hover:text-red-600 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
