import React from 'react';

// Placeholder for an image URL. You can replace this with a real URL.
// Example: const imageUrl = 'https://via.placeholder.com/800x400.png?text=Perfume+Store+Hero';
const imageUrl = 'https://via.placeholder.com/800x400.png?text=Perfume+Store+Hero'; // Placeholder image

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <img src="https://cdn.shopify.com/s/files/1/0556/7486/3781/files/coleccion-perfumes-v7.jpg?v=1618010513" alt="Perfume man la cabra" className="hero-image" />
        <div className="hero-text">
          <h1>Descubre tu fragancia perfecta</h1>
          <p>Explora nuestra exclusiva colección de perfumes para hombres y mujeres.</p>
          <a href="/productos" className="btn">Ver Productos</a>
        </div>
      </section>

      <section className="sobre-nosotros container">
        <h2>Sobre Nosotros</h2>
        <p>Somos PerfumeStore, una empresa líder en la venta de perfumes originales y exclusivos a nivel nacional. Nuestra misión es ofrecer las mejores fragancias del mundo, con atención personalizada y envíos rápidos a todo el país. Contamos con una amplia variedad de marcas reconocidas y productos de alta calidad para todos los gustos. ¡Descubre tu aroma ideal con nosotros!</p>
      </section>
    </div>
  );
}
