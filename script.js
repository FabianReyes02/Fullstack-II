// Arreglo de productos
const productos = [
    {
        id: 1,
        nombre: "Perfume 1",
        descripcion: "Fragancia fresca y elegante para cualquier ocasión.",
        precio: 19990,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_936463-MLC42018693002_052020-O.webp"
    },
    {
        id: 2,
        nombre: "Perfume 2",
        descripcion: "Perfume intenso y sofisticado, ideal para la noche.",
        precio: 24990,
        imagen: "https://www.zonaperfumes.cl/wp-content/uploads/Perfume-Uniquee-Luxury-Mangonifiscent-Extrait-de-Parfum-Unisex.jpg"
    }
];

// Carrito de compras mejorado
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    mostrarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

function cambiarCantidad(id, cantidad) {
    const item = carrito.find(p => p.id === id);
    if (item && cantidad > 0 && cantidad <= 99) {
        item.cantidad = cantidad;
        guardarCarrito();
        mostrarCarrito();
    }
}

function mostrarCarrito() {
    const lista = document.getElementById('carrito-list');
    const total = document.getElementById('carrito-total');
    lista.innerHTML = '';
    let suma = 0;
    if (carrito.length === 0) {
        lista.innerHTML = '<li>El carrito está vacío.</li>';
    } else {
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}" width="50" height="35" style="vertical-align:middle; border-radius:4px;"> 
                <strong>${item.nombre}</strong> x
                <input type="number" min="1" max="99" value="${item.cantidad}" style="width:40px;" onchange="cambiarCantidad(${item.id}, this.value)"> - $${item.precio * item.cantidad}
                <button onclick="quitarDelCarrito(${item.id})" style="background:#e74c3c;color:#fff;border:none;border-radius:4px;padding:2px 8px;margin-left:8px;cursor:pointer;">Quitar</button>
            `;
            lista.appendChild(li);
            suma += item.precio * item.cantidad;
        });
    }
    total.textContent = `Total: $${suma}`;
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Validación de formulario de registro
window.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('input', function(e) {
        validarCampo(e.target);
    });

    form.addEventListener('submit', function(e) {
        let valido = true;
        Array.from(form.elements).forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (!validarCampo(el)) {
                    valido = false;
                }
            }
        });
        if (!valido) {
            e.preventDefault();
        }
    });
});

function validarCampo(campo) {
    let error = '';
    if (campo.name === 'nombre' && campo.value.trim().length < 3) {
        error = 'El nombre debe tener al menos 3 caracteres.';
    }
    if (campo.name === 'email' && !/^\S+@\S+\.\S+$/.test(campo.value)) {
        error = 'Ingrese un correo electrónico válido.';
    }
    if (campo.name === 'password' && campo.value.length < 6) {
        error = 'La contraseña debe tener al menos 6 caracteres.';
    }
    mostrarError(campo, error);
    return error === '';
}

function mostrarError(campo, mensaje) {
    let errorDiv = campo.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        campo.parentNode.insertBefore(errorDiv, campo.nextSibling);
    }
    errorDiv.textContent = mensaje;
    errorDiv.style.color = mensaje ? 'red' : 'green';
}

// Validación de contacto
const contactoForm = document.getElementById('contacto-form');
if (contactoForm) {
    contactoForm.addEventListener('submit', function(e) {
        let valido = true;
        const nombre = contactoForm.nombre.value.trim();
        const correo = contactoForm.correo.value.trim();
        const comentario = contactoForm.comentario.value.trim();
        if (nombre.length === 0 || nombre.length > 100) {
            valido = false;
            mostrarError(contactoForm.nombre, 'El nombre es requerido y máximo 100 caracteres.');
        }
        if (!/^([\w.-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo) || correo.length > 100) {
            valido = false;
            mostrarError(contactoForm.correo, 'Correo válido requerido (@duoc.cl, @profesor.duoc.cl, @gmail.com, máx 100 caracteres).');
        }
        if (comentario.length === 0 || comentario.length > 500) {
            valido = false;
            mostrarError(contactoForm.comentario, 'Comentario requerido y máximo 500 caracteres.');
        }
        if (!valido) e.preventDefault();
    });
}

// Validación de login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        let valido = true;
        const email = loginForm.email.value.trim();
        const password = loginForm.password.value.trim();
        if (!/^([\w.-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email) || email.length > 100) {
            valido = false;
            mostrarError(loginForm.email, 'Correo válido requerido (@duoc.cl, @profesor.duoc.cl, @gmail.com, máx 100 caracteres).');
        }
        if (password.length < 4 || password.length > 10) {
            valido = false;
            mostrarError(loginForm.password, 'Contraseña entre 4 y 10 caracteres.');
        }
        if (!valido) e.preventDefault();
    });
}

// Mostrar productos
function mostrarProductos() {
    const contenedor = document.getElementById('productos-list');
    contenedor.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p><strong>$${producto.precio}</strong></p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

// Inicializar
if (document.getElementById('productos-list')) {
    mostrarProductos();
    mostrarCarrito();
}
