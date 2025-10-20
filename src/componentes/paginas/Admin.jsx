import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as productsAPI from '../../data/products';

function UserForm({ onCreate }) {
  const [u, setU] = React.useState({ name: '', email: '' });
  function submit(e) {
    e.preventDefault();
    if (!u.email) return alert('Email requerido');
    onCreate(u);
    setU({ name: '', email: '' });
  }
  return (
    <form onSubmit={submit} className="admin-form">
      <label>Nombre: <input value={u.name} onChange={e => setU({...u, name: e.target.value})} /></label>
      <label>Email: <input value={u.email} onChange={e => setU({...u, email: e.target.value})} required /></label>
      <label>Contraseña: <input type="password" value={u.password || ''} onChange={e => setU({...u, password: e.target.value})} required /></label>
      <div className="admin-compact-actions"><button type="submit">Crear Usuario</button></div>
    </form>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const [view, setView] = useState('productos');
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: 0, category: '', image: '' });

  useEffect(() => {
    setProductos(productsAPI.getAllProducts());
  }, []);

  // protección simple: solo admin puede entrar
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('fs_user') || 'null');
      if (!u || !u.isAdmin) {
        // redirigir al home si no es admin
        navigate('/');
      }
    } catch (e) { navigate('/'); }
  }, [navigate]);

  function refresh() {
    setProductos(productsAPI.getAllProducts());
  }

  function onCreate(e) {
    e.preventDefault();
    const payload = {
      name: form.name || 'Sin nombre',
      description: form.description || '',
      price: Number(form.price) || 0,
      category: form.category || 'Otros',
      image: form.image || '',
    };
    productsAPI.createProduct(payload);
    setForm({ name: '', description: '', price: 0, category: '', image: '' });
    setShowForm(false);
    refresh();
  }

  function onDelete(id) {
    if (!window.confirm('Eliminar producto?')) return;
    productsAPI.deleteProduct(id);
    refresh();
  }

  // editar producto
  const [editing, setEditing] = useState(null);
  function onStartEdit(prod) {
    setEditing(prod.id);
    setForm({ name: prod.name, description: prod.description, price: prod.price, category: prod.category, image: prod.image });
    setShowForm(true);
  }

  function onSaveEdit(e) {
    e.preventDefault();
    if (!editing) return;
    productsAPI.updateProduct(editing, {
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0,
      category: form.category,
      image: form.image,
    });
    setEditing(null);
    setForm({ name: '', description: '', price: 0, category: '', image: '' });
    setShowForm(false);
    refresh();
  }

  // Usuarios simples en localStorage
  const USERS_KEY = 'fs_users_v1';
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY) || '[]';
      setUsuarios(JSON.parse(raw));
    } catch (e) { setUsuarios([]); }
  }, []);

  function refreshUsers() {
    try { setUsuarios(JSON.parse(localStorage.getItem(USERS_KEY) || '[]')); } catch (e) { setUsuarios([]); }
  }

  function createUser(u) {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const id = Math.max(0, ...all.map(x => x.id || 0)) + 1;
    const nu = { id, name: u.name || '', email: u.email, password: u.password || '', isAdmin: u.isAdmin || false };
    all.push(nu);
    localStorage.setItem(USERS_KEY, JSON.stringify(all));
    refreshUsers();
  }

  function deleteUser(id) {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]').filter(x => x.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(all));
    refreshUsers();
  }

  return (
    <div className="admin-page container admin-card" >
      <main>
        <div className="admin-toolbar">
          <div>
            <h1>Panel de Administración</h1>
            <div className="admin-subtitle">Gestiona productos y usuarios</div>
          </div>
          <nav>
            <ul className="admin-nav admin-nav-list">
              <li><button type="button" className={view === 'productos' ? 'active' : ''} onClick={() => setView('productos')}>Productos</button></li>
              <li><button type="button" className={view === 'usuarios' ? 'active' : ''} onClick={() => setView('usuarios')}>Usuarios</button></li>
              <li><button className="admin-logout" type="button" onClick={() => { localStorage.removeItem('fs_user'); window.dispatchEvent(new Event('auth-change')); window.location.href = '/'; }}>Cerrar sesión</button></li>
            </ul>
          </nav>
        </div>

        {view === 'productos' && (
          <section id="admin-productos">
            <h2>Gestión de Productos</h2>
            <div className="admin-actions">
              <button type="button" className="admin-btn" onClick={() => setShowForm(s => !s)}>{showForm ? 'Cancelar' : 'Nuevo Producto'}</button>
            </div>

            {showForm && (
              <form className="admin-form" onSubmit={editing ? onSaveEdit : onCreate}>
                <label>Nombre: <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></label>
                <label>Descripción: <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></label>
                <label>Precio: <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></label>
                <label>Categoría: <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></label>
                <label>Imagen (URL): <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} /></label>
                <div style={{marginTop:8}}>
                  <button type="submit">{editing ? 'Guardar' : 'Crear'}</button>
                </div>
              </form>
            )}

            <div id="lista-productos" className="admin-list">
              {productos.length === 0 && <p>No hay productos guardados.</p>}
              {productos.map(p => (
                <div key={p.id} className="admin-item">
                  <div>
                    <strong>{p.name}</strong> <span style={{color:'gray'}}>({p.category})</span>
                    <div className="admin-desc">{p.description}</div>
                  </div>
                  <div className="admin-actions">
                    <button type="button" onClick={() => onStartEdit(p)}>Editar</button>
                    <button type="button" onClick={() => onDelete(p.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {view === 'usuarios' && (
          <section id="admin-usuarios">
            <h2>Gestión de Usuarios</h2>
            <div className="admin-user-actions">
              <UserForm onCreate={createUser} />
            </div>
            <div className="admin-users-list">
              {usuarios.length === 0 && <p>No hay usuarios.</p>}
              {usuarios.map(u => (
                <div key={u.id} className="admin-item">
                  <div>
                    <strong>{u.name || u.email}</strong>
                    <div className="admin-desc">{u.email}</div>
                  </div>
                  <div className="admin-actions">
                    <button type="button" onClick={() => deleteUser(u.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
