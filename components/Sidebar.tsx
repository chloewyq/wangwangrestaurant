import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface SidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-1/4 h-full bg-gray-50 overflow-y-auto border-r border-gray-200 pb-20 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`w-full py-4 px-2 text-sm font-medium text-left transition-colors duration-200 relative
            ${
              activeCategory === cat
                ? 'bg-white text-orange-600 font-bold'
                : 'text-gray-500 hover:bg-gray-100'
            }
          `}
        >
          {activeCategory === cat && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-orange-600 rounded-r-full" />
          )}
          {cat}
        </button>
      ))}
    </div>
  );
};
