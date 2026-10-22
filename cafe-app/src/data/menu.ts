export type Size = 'S' | 'M' | 'L';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  emoji: string;
  bg: string;
  description: string;
  hasSizes: boolean;
};

export type CartItem = {
  key: string; // id + size
  product: Product;
  size: Size;
  qty: number;
};

export const SIZE_EXTRA: Record<Size, number> = { S: 0, M: 200, L: 400 };

export const unitPrice = (product: Product, size: Size) =>
  product.price + (product.hasSizes ? SIZE_EXTRA[size] : 0);

export const CATEGORIES = ['Барлығы', 'Кофе', 'Шай', 'Десерт', 'Тағам'];

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Капучино', category: 'Кофе', price: 1200, emoji: '☕', bg: '#F5E9DD', hasSizes: true,
    description: 'Эспрессо мен жұмсақ сүт көбігі. Классикалық және тығыз дәмді.' },
  { id: '2', name: 'Латте', category: 'Кофе', price: 1300, emoji: '🥛', bg: '#F3EEE6', hasSizes: true,
    description: 'Көп сүтті, жұмсақ кофе. Таңертең ішуге өте қолайлы.' },
  { id: '3', name: 'Американо', category: 'Кофе', price: 900, emoji: '🫖', bg: '#E8E1DA', hasSizes: true,
    description: 'Таза эспрессо мен ыстық су. Қатты әрі жеңіл.' },
  { id: '4', name: 'Қара шай', category: 'Шай', price: 700, emoji: '🍵', bg: '#EAF1E4', hasSizes: true,
    description: 'Жапырақты қара шай, лимонмен немесе сүтпен.' },
  { id: '5', name: 'Көк шай', category: 'Шай', price: 800, emoji: '🌿', bg: '#E3F1EA', hasSizes: true,
    description: 'Жасыл шай, жеңіл әрі тазартатын дәм.' },
  { id: '6', name: 'Круассан', category: 'Десерт', price: 900, emoji: '🥐', bg: '#FBEFD9', hasSizes: false,
    description: 'Жаңа піскен, қытырлақ сары майлы круассан.' },
  { id: '7', name: 'Чизкейк', category: 'Десерт', price: 1700, emoji: '🍰', bg: '#FBE4EC', hasSizes: false,
    description: 'Нәзік сүзбе кремі мен жидек тұздығы.' },
  { id: '8', name: 'Донат', category: 'Десерт', price: 800, emoji: '🍩', bg: '#F3E4FA', hasSizes: false,
    description: 'Глазурьмен жабылған жұмсақ донат.' },
  { id: '9', name: 'Клаб сэндвич', category: 'Тағам', price: 2300, emoji: '🥪', bg: '#FDF0DC', hasSizes: false,
    description: 'Тауық еті, көкөніс және сүзбе тұздығы.' },
  { id: '10', name: 'Цезарь салаты', category: 'Тағам', price: 2600, emoji: '🥗', bg: '#E6F3E0', hasSizes: false,
    description: 'Тауық еті, қытырлақ крутондар және пармезан.' },
];
