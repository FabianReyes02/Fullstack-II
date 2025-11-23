import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Featured from '../moleculas/Featured';
import Benefits from '../moleculas/Benefits';

const heroImage = 'https://cdn.shopify.com/s/files/1/0556/7486/3781/files/coleccion-perfumes-v7.jpg?v=1618010513';

export default function Home() {
  const [backendInfo, setBackendInfo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/mensaje');
        if (!res.ok) return;
        const data = await res.json();
        setBackendInfo(data || null);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  return (
    <div>
      <section className="hero-section" aria-label="Presentación de la tienda">
        <img src={heroImage} alt="Colección de perfumes" className="hero-image" />
        <div className="hero-text" role="region" aria-labelledby="hero-title">
          <h1 id="hero-title">Descubre tu fragancia perfecta</h1>
          <p className="hero-subtitle">Selecciones exclusivas para cada ocasión — aromas que cuentan historias.</p>
          <div className="hero-cta">
            <Link to="/productos" className="btn" aria-label="Ver productos">Ver Productos</Link>
            <a href="#sobre-nosotros" className="btn btn-outline" aria-label="Sobre nosotros">Más sobre nosotros</a>
          </div>
        </div>
      </section>

      <div className="promo-banner">
        <div className="container">Envío gratis en compras sobre $50.000 — Código: ENVIO50</div>
      </div>

      {/* Announcement box: shown if backend returns an active announcement */}
      {backendInfo && backendInfo.announcement && backendInfo.announcement.text && (
        <div className="announcement-box container" role="complementary" aria-live="polite">
          {backendInfo.announcement.text}
        </div>
      )}

      <Featured />

      <Benefits />

      <section id="sobre-nosotros" className="sobre-nosotros container">
        <h2>Sobre Nosotros</h2>
        <p>Somos PerfumeStore, una empresa líder en la venta de perfumes originales y exclusivos a nivel nacional. Nuestra misión es ofrecer las mejores fragancias del mundo, con atención personalizada y envíos rápidos a todo el país. Contamos con una amplia variedad de marcas reconocidas y productos de alta calidad para todos los gustos. ¡Descubre tu aroma ideal con nosotros!</p>
      </section>
    </div>
  );
}
