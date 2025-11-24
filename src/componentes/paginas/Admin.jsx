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
  const [announcements, setAnnouncements] = useState([]);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [announcementForm, setAnnouncementForm] = useState({ text: '', active: true, starts_at: '', ends_at: '' });
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: 0, category: '', image: '', stock: 0 });
  const [errors, setErrors] = useState({ name: '', price: '', stock: '' }); // State for form errors
  const { currentUser, logout } = useAuth();
  // Determinar usuario activo y si es admin (soporta fallback en localStorage)
  let storedUser = null;
  try { storedUser = JSON.parse(localStorage.getItem('usuarioLogueado') || 'null'); } catch (e) { storedUser = null; }
  const activeUser = currentUser || storedUser || null;
  const isAdmin = !!(activeUser && (activeUser.isAdmin || String(activeUser.email || '').toLowerCase() === 'admin@duoc.cl'));

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const list = await productsAPI.getAllProducts();
        setProductos(list);
      } catch (err) {
        console.error('Failed to load products', err);
        setProductos([]);
      }
    })();
  }, [isAdmin]);

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
    if (isNaN(form.stock) || Number(form.stock) < 0) {
      setErrors(prev => ({ ...prev, stock: 'El stock debe ser un número entero igual o mayor a 0.' }));
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
      stock: Number(form.stock) || 0
    };
    (async () => {
      try {
        await productsAPI.createProduct(payload);
          setForm({ name: '', description: '', price: 0, category: '', image: '', stock: 0 });
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
    setForm({
      name: prod.name || prod.nombre || '',
      description: prod.description || prod.descripcion || '',
      price: prod.price ?? prod.precio ?? 0,
      category: prod.category || prod.categoria || '',
      image: prod.image || prod.image_url || prod.imagen || prod.imageUrl || prod.src || '',
      stock: prod.stock ?? prod.cantidad ?? 0
    });
    setShowForm(true);
    // Clear errors when starting edit
    setErrors({ name: '', price: '', stock: '' });
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
    if (isNaN(form.stock) || Number(form.stock) < 0) {
      setErrors(prev => ({ ...prev, stock: 'El stock debe ser un número entero igual o mayor a 0.' }));
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
          stock: Number(form.stock) || 0,
        });
        setEditing(null);
        setForm({ name: '', description: '', price: 0, category: '', image: '', stock: 0 });
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
    async function loadUsers() {
      // Intenta obtener usuarios del servidor primero (si existe endpoint público o permite lista)
      try {
        try {
          const { apiFetch } = await import('../../utils/api');
          const tryRes = await apiFetch('/api/users');
          if (tryRes.ok) {
            const data = await tryRes.json();
            const list = Array.isArray(data) ? data : data.users || data;
            setUsuarios(list || []);
            return;
          }
        } catch (e) {
          // ignore and fallback
        }
      } catch (e) {
        // ignore and fallback to token-based or localStorage
      }

      // Si hay token, intentar con autorización
      try {
        const token = localStorage.getItem('fs_token');
        if (token) {
          try {
            const { apiFetch } = await import('../../utils/api');
            const res = await apiFetch('/api/users', { headers: { Authorization: `Bearer ${token}` } });
            if (res.ok) {
              const data = await res.json();
              const list = Array.isArray(data) ? data : data.users || data;
              setUsuarios(list || []);
              return;
            }
          } catch (e) {
            // ignore
          }
        }
      } catch (e) {
        // ignore
      }

      // Fallback a localStorage
      try {
        const raw = localStorage.getItem(USERS_KEY) || '[]';
        setUsuarios(JSON.parse(raw));
      } catch (e) { setUsuarios([]); }
    }
    loadUsers();
  }, []);

  function refreshUsers() {
    (async () => {
      try {
        try {
          const { apiFetch } = await import('../../utils/api');
          const res = await apiFetch('/api/users');
          if (res.ok) {
            const data = await res.json();
            const list = Array.isArray(data) ? data : data.users || data;
            setUsuarios(list || []);
            return;
          }
        } catch (e) { /* ignore */ }
      } catch (e) { /* ignore */ }

      try { setUsuarios(JSON.parse(localStorage.getItem(USERS_KEY) || '[]')); } catch (e) { setUsuarios([]); }
    })();
  }

  async function loadAnnouncements() {
    try {
      const token = localStorage.getItem('fs_token');
      try {
        const { apiFetch } = await import('../../utils/api');
        const res = await apiFetch('/api/announcements', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('No autorizado');
        const data = await res.json();
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch (err) {
        throw err;
      }
    } catch (err) {
      console.warn('Failed to load announcements', err);
      setAnnouncements([]);
    }
  }

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function loadOrders() {
    try {
      const token = localStorage.getItem('fs_token');
      try {
        const { apiFetch } = await import('../../utils/api');
        const res = await apiFetch('/api/orders', { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('No autorizado');
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : (data.orders || []));
      } catch (err) {
        throw err;
      }
    } catch (err) {
      console.warn('Failed to load orders', err);
      setOrders([]);
    }
  }

  async function loadOrderDetails(id) {
    try {
      const token = localStorage.getItem('fs_token');
      try {
        const { apiFetch } = await import('../../utils/api');
        const res = await apiFetch(`/api/orders/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (!res.ok) throw new Error('No autorizado');
        const data = await res.json();
        setSelectedOrder(data);
      } catch (err) {
        throw err;
      }
    } catch (err) {
      console.warn('Failed to load order details', err);
      alert('Error cargando el pedido');
    }
  }

  async function saveAnnouncement(e) {
    e.preventDefault();
    const token = localStorage.getItem('fs_token');
    if (!token) return alert('Se requiere token de administrador');
    const payload = { text: announcementForm.text, active: !!announcementForm.active, starts_at: announcementForm.starts_at || null, ends_at: announcementForm.ends_at || null };
    try {
      let res;
      try {
        const { apiFetch } = await import('../../utils/api');
        if (editingAnnouncement) {
          res = await apiFetch(`/api/announcements/${editingAnnouncement}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
        } else {
          res = await apiFetch('/api/announcements', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
        }
      } catch (err) {
        throw err;
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Error saving');
      }
      setAnnouncementForm({ text: '', active: true, starts_at: '', ends_at: '' });
      setEditingAnnouncement(null);
      loadAnnouncements();
    } catch (err) {
      alert('Error guardando anuncio: ' + (err.message || err));
    }
  }

  function startEditAnnouncement(a) {
    setEditingAnnouncement(a.id);
    setAnnouncementForm({ text: a.text || '', active: !!a.active, starts_at: a.starts_at ? a.starts_at.slice(0,16) : '', ends_at: a.ends_at ? a.ends_at.slice(0,16) : '' });
  }

  async function deleteAnnouncement(id) {
    if (!window.confirm('¿Eliminar este anuncio?')) return;
    const token = localStorage.getItem('fs_token');
    if (!token) return alert('Se requiere token de administrador');
    try {
      try {
        const { apiFetch } = await import('../../utils/api');
        const res = await apiFetch(`/api/announcements/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Error deleting');
        }
      } catch (err) {
        throw err;
      }
      loadAnnouncements();
    } catch (err) {
      alert('Error eliminando anuncio: ' + (err.message || err));
    }
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
      // intentar endpoint REST moderno
      try {
        const { apiFetch } = await import('../../utils/api');
        let res = await apiFetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: u.name, email: u.email, password: u.password })
        });
        if (!res.ok) {
          // fallback a ruta legacy
          res = await apiFetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(payload)
          });
        }
        if (!res.ok) throw new Error('Server error');
      } catch (err) {
        throw err;
      }
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

  async function changeUserRole(id, makeAdmin) {
    const token = localStorage.getItem('fs_token');
    if (!token) {
      alert('Se requiere token de administrador para cambiar roles');
      return;
    }
    try {
      try {
        const { apiFetch } = await import('../../utils/api');
        const res = await apiFetch(`/api/users/${id}/role`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ is_admin: !!makeAdmin })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Error updating role');
        }
      } catch (err) {
        throw err;
      }
      refreshUsers();
    } catch (err) {
      alert('Error cambiando rol: ' + (err.message || err));
    }
  }

  if (!isAdmin) {
    return (
      <div className="admin-page container admin-card">
        <main>
          <h1>Acceso denegado</h1>
          <p>No tienes permisos para ver esta sección. Por favor inicia sesión con una cuenta administradora.</p>
          <div className="admin-actions"><button className="admin-btn" onClick={() => navigate('/login')}>Ir a Login</button></div>
        </main>
      </div>
    );
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
              <li><button type="button" className={view === 'pedidos' ? 'active' : ''} onClick={() => { setView('pedidos'); loadOrders(); }}>Pedidos</button></li>
              <li><button type="button" className={view === 'anuncios' ? 'active' : ''} onClick={() => { setView('anuncios'); loadAnnouncements(); }}>Anuncios</button></li>
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
                <label>Stock: <input type="number" min={0} value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></label>
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

        {view === 'anuncios' && (
          <section id="admin-anuncios">
            <h2>Anuncios</h2>
            <div className="admin-actions">
              <button type="button" className="admin-btn" onClick={() => { setEditingAnnouncement(null); setAnnouncementForm({ text: '', active: true, starts_at: '', ends_at: '' }); }}>Nuevo Anuncio</button>
            </div>

            <form className="admin-form mt-1" onSubmit={saveAnnouncement}>
              <label>Texto:
                <textarea value={announcementForm.text} onChange={e => setAnnouncementForm({ ...announcementForm, text: e.target.value })} rows={3} maxLength={500} required />
              </label>
              <label className="label-inline">
                <input type="checkbox" checked={announcementForm.active} onChange={e => setAnnouncementForm({ ...announcementForm, active: e.target.checked })} />
                <span>Activo</span>
              </label>
              <label>Inicio (opcional): <input type="datetime-local" value={announcementForm.starts_at} onChange={e => setAnnouncementForm({ ...announcementForm, starts_at: e.target.value })} /></label>
              <label>Fin (opcional): <input type="datetime-local" value={announcementForm.ends_at} onChange={e => setAnnouncementForm({ ...announcementForm, ends_at: e.target.value })} /></label>
              <div className="mt-8">
                <button type="submit" className="admin-btn">{editingAnnouncement ? 'Guardar' : 'Crear'}</button>
                {editingAnnouncement && <button type="button" className="admin-btn ml-8" onClick={() => { setEditingAnnouncement(null); setAnnouncementForm({ text: '', active: true, starts_at: '', ends_at: '' }); }}>Cancelar</button>}
              </div>
            </form>

            <div id="lista-anuncios" className="admin-list mt-1">
              {announcements.length === 0 && <p>No hay anuncios.</p>}
              {announcements.map(a => (
                <div key={a.id} className="admin-item">
                  <div>
                    <strong>{a.text}</strong>
                    <div className="admin-desc">Activo: {a.active ? 'Sí' : 'No'} — Desde: {a.starts_at || '—'} — Hasta: {a.ends_at || '—'}</div>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="admin-btn" onClick={() => startEditAnnouncement(a)}>Editar</button>
                    <button type="button" className="admin-btn ml-8" onClick={() => deleteAnnouncement(a.id)}>Eliminar</button>
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
                    <div className="admin-desc">{u.email} {u.is_admin || u.isAdmin ? <span style={{color:'var(--accent-color)', fontWeight:700, marginLeft:6}}>Admin</span> : null}</div>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="admin-btn" onClick={() => changeUserRole(u.id, !(u.is_admin || u.isAdmin))}>{(u.is_admin || u.isAdmin) ? 'Revocar admin' : 'Promover'}</button>
                    <button type="button" className="admin-btn" onClick={() => deleteUser(u.id)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {view === 'pedidos' && (
          <section id="admin-pedidos">
            <h2>Pedidos</h2>
            <div className="admin-actions">
              <button type="button" className="admin-btn" onClick={() => loadOrders()}>Actualizar</button>
            </div>

            <div id="lista-pedidos" className="admin-list mt-1">
              {orders.length === 0 && <p>No hay pedidos.</p>}
              {orders.map(o => (
                <div key={o.id} className="admin-item">
                  <div>
                    <strong>Pedido #{o.id}</strong>
                    <div className="admin-desc">Usuario: {o.user_email || o.email || (o.user && o.user.email) || '—'} — Total: ${o.total || o.amount || '—'}</div>
                  </div>
                  <div className="admin-actions">
                    <button type="button" className="admin-btn" onClick={() => loadOrderDetails(o.id)}>Ver</button>
                  </div>
                </div>
              ))}
            </div>

            {selectedOrder && (
              <div className="admin-card card-padded mt-1">
                <h3>Pedido #{selectedOrder.id}</h3>
                <div>Usuario: {selectedOrder.user_email || selectedOrder.email || (selectedOrder.user && selectedOrder.user.email)}</div>
                <div>Estado: {selectedOrder.status || '—'}</div>
                <div>Total: ${selectedOrder.total || selectedOrder.amount || '—'}</div>
                <div className="admin-desc mt-8">
                  {selectedOrder.items && selectedOrder.items.length ? (
                    <ul>
                      {selectedOrder.items.map((it, idx) => (
                        <li key={idx}>{it.name || it.product_name || (it.product && it.product.name)} x {it.quantity || it.qty} — ${it.price || it.unit_price}</li>
                      ))}
                    </ul>
                  ) : <div>No hay ítems listados.</div>}
                </div>
                <div className="admin-actions mt-8">
                  <button type="button" className="admin-btn" onClick={() => setSelectedOrder(null)}>Cerrar</button>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
