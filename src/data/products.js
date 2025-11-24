import { apiFetch } from '../utils/api';

export async function getAllProducts() {
  const res = await apiFetch('/api/products');
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function getProduct(id) {
  const res = await apiFetch(`/api/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function createProduct(data) {
  const token = localStorage.getItem('fs_token');
  const res = await apiFetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function updateProduct(id, changes) {
  const token = localStorage.getItem('fs_token');
  const res = await apiFetch(`/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(changes) });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

export async function deleteProduct(id) {
  const token = localStorage.getItem('fs_token');
  const res = await apiFetch(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}

export default { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
