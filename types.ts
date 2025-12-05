export type Category = 
  | '菜菜' 
  | '肉肉' 
  | '主食' 
  | '汤羹' 
  | '小甜品' 
  | '垃圾食品' 
  | '小饮料' 
  | '爽歪歪' 
  | '甘肃特色' 
  | '山西特色';

export interface Dish {
  id: string;
  name: string;
  category: Category;
  imageUrl: string;
  orderCount: number; // Global count of how many times this dish has been ordered historically
  price?: number; // Optional, but good for realistic menus
}

export interface CartItem extends Dish {
  quantity: number;
  addedBy: string; // Nickname of who added it
}

export interface Notification {
  id: string;
  message: string;
}

export interface User {
  nickname: string;
}
