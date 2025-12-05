import React, { useRef } from 'react';
import { Dish } from '../types';
import { Plus, Edit2, Image as ImageIcon } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onAdd: (dish: Dish) => void;
  onUpdateDish: (updatedDish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onAdd, onUpdateDish }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateDish({ ...dish, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameEdit = () => {
    const newName = prompt('修改菜名 (Update Name):', dish.name);
    if (newName && newName.trim() !== '') {
      onUpdateDish({ ...dish, name: newName.trim() });
    }
  };

  return (
    <div className="flex bg-white p-3 rounded-lg shadow-sm border border-gray-100 mb-3">
      {/* Image Section */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden group">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-white p-1 rounded-full hover:bg-white/20"
            >
              <ImageIcon size={16} />
             </button>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* Content Section */}
      <div className="ml-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800 text-lg leading-tight">{dish.name}</h3>
            <button 
              onClick={handleNameEdit}
              className="text-gray-300 hover:text-orange-500 p-1"
            >
              <Edit2 size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">已点 {dish.orderCount} 次</p>
        </div>

        <div className="flex justify-end items-center mt-2">
          <button
            onClick={() => onAdd(dish)}
            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
