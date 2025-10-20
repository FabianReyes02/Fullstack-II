import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './componentes/plantillas/Layout';
import Home from './componentes/paginas/Home';
import Productos from './componentes/paginas/Productos';
import Login from './componentes/paginas/Login';
import Register from './componentes/paginas/Register';
import Contacto from './componentes/paginas/Contacto';
import Admin from './componentes/paginas/Admin';
import ProductoDetail from './componentes/paginas/ProductoDetail';
import './style.css';

function App() {
  React.useEffect(() => {
    try {
      const key = 'fs_users_v1';
      const raw = localStorage.getItem(key) || '[]';
      const all = JSON.parse(raw);
      const exists = all.some(u => String(u.email).toLowerCase() === 'admin@duoc.cl');
      if (!exists) {
        all.push({ id: Math.max(0, ...all.map(x => x.id || 0)) + 1, name: 'admin', email: 'admin@duoc.cl', password: 'admin123', isAdmin: true });
        localStorage.setItem(key, JSON.stringify(all));
      }
    } catch (e) {
      // ignore
    }
  }, []);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contactanos" element={<Contacto />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
