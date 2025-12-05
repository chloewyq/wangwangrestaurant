import { Category, Dish } from './types';

export const CATEGORIES: Category[] = [
  '菜菜',
  '肉肉',
  '主食',
  '汤羹',
  '小甜品',
  '垃圾食品',
  '小饮料',
  '爽歪歪',
  '甘肃特色',
  '山西特色'
];

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Placeholder images
const PLACEHOLDER_IMG = (id: number) => `https://picsum.photos/200/200?random=${id}`;

export const INITIAL_MENU: Dish[] = [
  // 菜菜
  { id: generateId(), category: '菜菜', name: '土豆丝', imageUrl: PLACEHOLDER_IMG(1), orderCount: 12 },
  { id: generateId(), category: '菜菜', name: '西红柿炒鸡蛋', imageUrl: PLACEHOLDER_IMG(2), orderCount: 8 },
  { id: generateId(), category: '菜菜', name: '白菜粉条', imageUrl: PLACEHOLDER_IMG(3), orderCount: 5 },
  { id: generateId(), category: '菜菜', name: '肉末茄子', imageUrl: PLACEHOLDER_IMG(4), orderCount: 15 },
  { id: generateId(), category: '菜菜', name: '炒蔬菜', imageUrl: PLACEHOLDER_IMG(5), orderCount: 3 },
  
  // 肉肉
  { id: generateId(), category: '肉肉', name: '红烧肉', imageUrl: PLACEHOLDER_IMG(6), orderCount: 20 },
  { id: generateId(), category: '肉肉', name: '洋葱牛肉', imageUrl: PLACEHOLDER_IMG(7), orderCount: 18 },

  // 主食
  { id: generateId(), category: '主食', name: '金银米饭', imageUrl: PLACEHOLDER_IMG(8), orderCount: 10 },
  { id: generateId(), category: '主食', name: '面片', imageUrl: PLACEHOLDER_IMG(9), orderCount: 6 },
  { id: generateId(), category: '主食', name: '面条', imageUrl: PLACEHOLDER_IMG(10), orderCount: 11 },
  { id: generateId(), category: '主食', name: '粥', imageUrl: PLACEHOLDER_IMG(11), orderCount: 4 },
  { id: generateId(), category: '主食', name: '馒头', imageUrl: PLACEHOLDER_IMG(12), orderCount: 2 },
  { id: generateId(), category: '主食', name: '花卷', imageUrl: PLACEHOLDER_IMG(13), orderCount: 3 },
  { id: generateId(), category: '主食', name: '油饼', imageUrl: PLACEHOLDER_IMG(14), orderCount: 7 },
  { id: generateId(), category: '主食', name: '饺子', imageUrl: PLACEHOLDER_IMG(15), orderCount: 22 },
  { id: generateId(), category: '主食', name: '包子', imageUrl: PLACEHOLDER_IMG(16), orderCount: 9 },

  // 汤羹
  { id: generateId(), category: '汤羹', name: '西红柿蛋花汤', imageUrl: PLACEHOLDER_IMG(17), orderCount: 8 },
  { id: generateId(), category: '汤羹', name: '海鲜蘑菇汤', imageUrl: PLACEHOLDER_IMG(18), orderCount: 5 },

  // 小甜品
  { id: generateId(), category: '小甜品', name: '巧克力蛋糕', imageUrl: PLACEHOLDER_IMG(19), orderCount: 14 },
  { id: generateId(), category: '小甜品', name: '草莓蛋糕', imageUrl: PLACEHOLDER_IMG(20), orderCount: 12 },
  { id: generateId(), category: '小甜品', name: '芝士巴斯克', imageUrl: PLACEHOLDER_IMG(21), orderCount: 19 },
  { id: generateId(), category: '小甜品', name: 'kumokumo', imageUrl: PLACEHOLDER_IMG(22), orderCount: 30 },
  { id: generateId(), category: '小甜品', name: '吐司面包', imageUrl: PLACEHOLDER_IMG(23), orderCount: 6 },

  // 垃圾食品
  { id: generateId(), category: '垃圾食品', name: '炸鸡', imageUrl: PLACEHOLDER_IMG(24), orderCount: 45 },
  { id: generateId(), category: '垃圾食品', name: '薯条', imageUrl: PLACEHOLDER_IMG(25), orderCount: 33 },
  { id: generateId(), category: '垃圾食品', name: '炸串', imageUrl: PLACEHOLDER_IMG(26), orderCount: 28 },
  { id: generateId(), category: '垃圾食品', name: '麻辣烫', imageUrl: PLACEHOLDER_IMG(27), orderCount: 40 },

  // 小饮料
  { id: generateId(), category: '小饮料', name: '芒果冰冰', imageUrl: PLACEHOLDER_IMG(28), orderCount: 12 },
  { id: generateId(), category: '小饮料', name: '气泡酒', imageUrl: PLACEHOLDER_IMG(29), orderCount: 8 },
  { id: generateId(), category: '小饮料', name: '圣诞热红酒', imageUrl: PLACEHOLDER_IMG(30), orderCount: 5 },
  { id: generateId(), category: '小饮料', name: '桑葚果茶', imageUrl: PLACEHOLDER_IMG(31), orderCount: 7 },
  { id: generateId(), category: '小饮料', name: '柠檬茶', imageUrl: PLACEHOLDER_IMG(32), orderCount: 11 },

  // 爽歪歪
  { id: generateId(), category: '爽歪歪', name: '火锅', imageUrl: PLACEHOLDER_IMG(33), orderCount: 50 },
  { id: generateId(), category: '爽歪歪', name: '云南菜', imageUrl: PLACEHOLDER_IMG(34), orderCount: 12 },
  { id: generateId(), category: '爽歪歪', name: '贵州菜', imageUrl: PLACEHOLDER_IMG(35), orderCount: 9 },
  { id: generateId(), category: '爽歪歪', name: '泰国菜', imageUrl: PLACEHOLDER_IMG(36), orderCount: 14 },

  // 甘肃特色
  { id: generateId(), category: '甘肃特色', name: '玉米面稠饭', imageUrl: PLACEHOLDER_IMG(37), orderCount: 4 },
  { id: generateId(), category: '甘肃特色', name: '面茶油饼', imageUrl: PLACEHOLDER_IMG(38), orderCount: 6 },
  { id: generateId(), category: '甘肃特色', name: '牛肉面', imageUrl: PLACEHOLDER_IMG(39), orderCount: 99 },
  { id: generateId(), category: '甘肃特色', name: '炒煎饼', imageUrl: PLACEHOLDER_IMG(40), orderCount: 8 },
  { id: generateId(), category: '甘肃特色', name: '菜卷饼', imageUrl: PLACEHOLDER_IMG(41), orderCount: 7 },
  { id: generateId(), category: '甘肃特色', name: '手抓羊肉', imageUrl: PLACEHOLDER_IMG(42), orderCount: 25 },

  // 山西特色
  { id: generateId(), category: '山西特色', name: '刀削面', imageUrl: PLACEHOLDER_IMG(43), orderCount: 30 },
  { id: generateId(), category: '山西特色', name: '莜面鱼鱼', imageUrl: PLACEHOLDER_IMG(44), orderCount: 15 },
  { id: generateId(), category: '山西特色', name: '莜面栲栳栳', imageUrl: PLACEHOLDER_IMG(45), orderCount: 12 },
  { id: generateId(), category: '山西特色', name: '炒不烂', imageUrl: PLACEHOLDER_IMG(46), orderCount: 10 },
];
