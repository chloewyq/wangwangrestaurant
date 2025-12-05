import React, { useRef, useState } from 'react';
import { Dish } from '../types';
import { Plus, Edit2, Image as ImageIcon } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onAdd: (dish: Dish) => void;
  onUpdateDish: (updatedDish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onAdd, onUpdateDish }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgError, setImgError] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateDish({ ...dish, imageUrl: reader.result as string });
        setImgError(false); // Reset error state on new image
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
    <div className="flex bg-white p-3 rounded-xl shadow-sm border border-gray-100 mb-2 hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden group">
        {!imgError ? (
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
             <span className="text-xs">暂无图片</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-white p-2 rounded-full hover:bg-white/20 backdrop-blur-sm"
              title="更换图片"
            >
              <ImageIcon size={18} />
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
      <div className="ml-3 flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2">{dish.name}</h3>
            <button 
              onClick={handleNameEdit}
              className="text-gray-300 hover:text-orange-500 p-1.5 -mr-1"
            >
              <Edit2 size={14} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1 font-medium">热度 {dish.orderCount} 🔥</p>
        </div>

        <div className="flex justify-end items-center mt-2">
          <button
            onClick={() => onAdd(dish)}
            className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-md shadow-orange-200 active:scale-90 transition-all hover:bg-orange-600"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};