import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as productsAPI from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import { encryptPassword } from '../../utils/crypto';

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
      <label>Nombre: <input value={u.name} onChange={e => setU({ ...u, name: e.target.value })} /></label>
      <label>Email: <input value={u.email} onChange={e => setU({ ...u, email: e.target.value })} required /></label>
      <label>Contraseña: <input type="password" value={u.password || ''} onChange={e => setU({ ...u, password: e.target.value })} required /></label>
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
  const [errors, setErrors] = useState({ name: '', price: '' }); // State for form errors
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      navigate('/');
    } else {
      (async () => {
        try {
          const list = await productsAPI.getAllProducts();
          setProductos(list);
        } catch (err) {
          console.error('Failed to load products', err);
          setProductos([]);
        }
      })();
    }
  }, [currentUser, navigate]);

  function refresh() {
    (async () => {
      try {
        const list = await productsAPI.getAllProducts();
        setProductos(list);
      } catch (err) {
        console.error('Failed to refresh products', err);
        setProductos([]);
      }
    })();
  }

  function onCreate(e) {
    e.preventDefault();
    // Reset errors
    setErrors({ name: '', price: '' });

    // Basic validation
    if (!form.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'El nombre del producto es requerido.' }));
      return;
    }
    if (isNaN(form.price) || form.price <= 0) {
      setErrors(prev => ({ ...prev, price: 'El precio debe ser un número positivo.' }));
      return;
    }
    if (!form.category) {
      // This case should ideally be handled by the select's 'required' attribute,
      // but adding a fallback error message is good practice.
      setErrors(prev => ({ ...prev, category: 'La categoría es requerida.' }));
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description || '',
      price: Number(form.price),
      category: form.category,
      image_url: form.image || '',
      stock: 0
    };
    (async () => {
      try {
        await productsAPI.createProduct(payload);
        setForm({ name: '', description: '', price: 0, category: '', image: '' });
        setShowForm(false);
        refresh();
      } catch (err) {
        alert('Error creando producto');
        console.error(err);
      }
    })();
  }

  function onDelete(id) {
    if (!window.confirm('Eliminar producto?')) return;
    (async () => {
      try {
        await productsAPI.deleteProduct(id);
        refresh();
      } catch (err) {
        alert('Error eliminando producto');
      }
    })();
  }

  const [editing, setEditing] = useState(null);
  function onStartEdit(prod) {
    setEditing(prod.id);
    setForm({ name: prod.name, description: prod.description, price: prod.price, category: prod.category, image: prod.image });
    setShowForm(true);
    // Clear errors when starting edit
    setErrors({ name: '', price: '' });
  }

  function onSaveEdit(e) {
    e.preventDefault();
    if (!editing) return;

    // Basic validation for edits
    if (!form.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'El nombre del producto es requerido.' }));
      return;
    }
    if (isNaN(form.price) || form.price <= 0) {
      setErrors(prev => ({ ...prev, price: 'El precio debe ser un número positivo.' }));
      return;
    }
    if (!form.category) {
      setErrors(prev => ({ ...prev, category: 'La categoría es requerida.' }));
      return;
    }

    (async () => {
      try {
        await productsAPI.updateProduct(editing, {
          name: form.name.trim(),
          description: form.description,
          price: Number(form.price),
          category: form.category,
          image_url: form.image,
        });
        setEditing(null);
        setForm({ name: '', description: '', price: 0, category: '', image: '' });
        setShowForm(false);
        refresh();
      } catch (err) {
        alert('Error guardando cambios');
      }
    })();
  }

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

  async function createUser(u) {
    // try server-side creation via /register (requires admin token and encrypted password)
    const token = localStorage.getItem('fs_token');
    const payload = {
      username: u.name || '',
      email: u.email,
      password: encryptPassword(u.password || '')
    };
    try {
      if (!token) throw new Error('No token');
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Server error');
      // refresh users list from server
      refreshUsers();
      return;
    } catch (err) {
      console.warn('Server createUser failed, falling back to localStorage', err);
      const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const id = Math.max(0, ...all.map(x => x.id || 0)) + 1;
      const nu = { id, name: u.name || '', email: u.email, password: u.password || '', isAdmin: u.isAdmin || false };
      all.push(nu);
      localStorage.setItem(USERS_KEY, JSON.stringify(all));
      refreshUsers();
    }
  }

  function deleteUser(id) {
    const all = JSON.parse(localStorage.getItem(USERS_KEY) || '[]').filter(x => x.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(all));
    refreshUsers();
  }

  if (!currentUser || !currentUser.isAdmin) {
    return null;
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
              <li><button className="admin-logout" type="button" onClick={logout}>Cerrar sesión</button></li>
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
                <label>Nombre: <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
                <label>Descripción: <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label>
                <label>Precio: <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></label>
                <label>Categoría:
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required>
                    <option value="">Selecciona una categoría</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </label>
                <label>Imagen (URL): <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} /></label>
                <div style={{ marginTop: 8 }}>
                  <button type="submit" className="admin-btn">{editing ? 'Guardar' : 'Crear'}</button>
                </div>
              </form>
            )}

            <div id="lista-productos" className="admin-list">
              {productos.length === 0 && <p>No hay productos guardados.</p>}
              {productos.map(p => (
                <div key={p.id} className="admin-item">
                  <div>
                    <strong>{p.name}</strong> <span style={{ color: 'gray' }}>({p.category})</span>
                    <div className="admin-desc">{p.description}</div>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="admin-btn" onClick={() => onStartEdit(p)}>Editar</button>
                    <button type="button" className="admin-btn" onClick={() => onDelete(p.id)}>Eliminar</button>
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
                    <button type="button" className="admin-btn" onClick={() => deleteUser(u.id)}>Eliminar</button>
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
