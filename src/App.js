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
