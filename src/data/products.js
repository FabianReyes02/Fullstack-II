const STORAGE_KEY = 'fs_products_v1';

const initial = [
  { id: 1, name: 'Perfume A', description: 'Fragancia floral', price: 19990, category: 'Femenino', image: '' },
  { id: 2, name: 'Perfume B', description: 'Aroma amaderado', price: 24990, category: 'Masculino', image: '' },
];

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial.slice();
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial.slice();
  }
}

function save(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getAllProducts() {
  return load();
}

export function getProduct(id) {
  return load().find(p => p.id === id) || null;
}

export function createProduct(data) {
  const items = load();
  const id = Math.max(0, ...items.map(i => i.id)) + 1;
  const prod = { id, ...data };
  items.push(prod);
  save(items);
  return prod;
}

export function updateProduct(id, changes) {
  const items = load();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...changes };
  save(items);
  return items[idx];
}

export function deleteProduct(id) {
  const items = load();
  const filtered = items.filter(i => i.id !== id);
  save(filtered);
  return filtered;
}

export default { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
