// --- Productos ---
// Lee los productos desde localStorage, si no hay, usa los de ejemplo
const productos = JSON.parse(localStorage.getItem('productos')) || [
    {
        id: 1,
        codigo: "P001",
        nombre: "Perfume Femenino 1",
        descripcion: "Fragancia floral y elegante para mujer.",
        precio: 19990,
        imagen: "https://http2.mlstatic.com/D_NQ_NP_936463-MLC42018693002_052020-O.webp",
        categoria: "Femenino",
        stock: 10,
        stockCritico: 2
    }
    // ...otros productos de ejemplo si quieres...
];

// --- Carrito de compras ---
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

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
    renderCarrito();
    actualizarCarritoCantidad();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    renderCarrito();
    actualizarCarritoCantidad();
}

function cambiarCantidad(id, cantidad) {
    const item = carrito.find(p => p.id === id);
    cantidad = parseInt(cantidad);
    if (item && cantidad > 0 && cantidad <= 99) {
        item.cantidad = cantidad;
        guardarCarrito();
        renderCarrito();
        actualizarCarritoCantidad();
    }
}

function renderCarrito() {
    const lista = document.getElementById('carrito-list');
    const total = document.getElementById('carrito-total');
    if (!lista || !total) return;
    lista.innerHTML = '';
    let suma = 0;
    if (carrito.length === 0) {
        lista.innerHTML = '<li>El carrito está vacío.</li>';
    } else {
        carrito.forEach(item => {
            suma += item.precio * item.cantidad;
            lista.innerHTML += `
                <li>
                    <img src="${item.imagen}" alt="${item.nombre}" width="50" height="35" style="vertical-align:middle; border-radius:4px;">
                    <strong>${item.nombre}</strong> x
                    <input type="number" min="1" max="99" value="${item.cantidad}" style="width:40px;" onchange="cambiarCantidad(${item.id}, this.value)">
                    - $${item.precio * item.cantidad}
                    <button onclick="quitarDelCarrito(${item.id})" style="background:#e74c3c;color:#fff;border:none;border-radius:4px;padding:2px 8px;margin-left:8px;cursor:pointer;">Quitar</button>
                </li>
            `;
        });
    }
    total.textContent = `Total: $${suma}`;
}

function actualizarCarritoCantidad() {
    const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const span = document.getElementById('carrito-cantidad');
    if (span) span.textContent = cantidad;
}

function toggleCarrito() {
    const carritoHeader = document.getElementById('carrito-header');
    if (carritoHeader) {
        carritoHeader.style.display = carritoHeader.style.display === 'none' ? 'block' : 'none';
    }
}

// --- Renderizado de productos ---
function renderProductos(categoria = 'Todos') {
    const contenedor = document.getElementById('productos-list');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    const filtrados = categoria === 'Todos' ? productos : productos.filter(p => p.categoria === categoria);
    filtrados.forEach(producto => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>$${producto.precio}</strong></p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        `;
    });
}

function filtrarCategoria(categoria) {
    renderProductos(categoria);
}

// --- Validaciones de formularios ---
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

// --- Validación de registro y contacto ---
window.addEventListener('DOMContentLoaded', function() {
    // Registro
    const registerForm = document.querySelector('form');
    if (registerForm && window.location.pathname.includes('register.html')) {
        registerForm.addEventListener('input', e => validarCampo(e.target));
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let valido = true;
            const nombre = registerForm.nombre.value.trim();
            const email = registerForm.email.value.trim();
            const password = registerForm.password.value.trim();
            if (nombre.length < 3 || nombre.length > 100) {
                valido = false;
                mostrarError(registerForm.nombre, 'El nombre debe tener entre 3 y 100 caracteres.');
            }
            if (!/^([\w.-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email) || email.length > 100) {
                valido = false;
                mostrarError(registerForm.email, 'Correo válido requerido (@duoc.cl, @profesor.duoc.cl, @gmail.com, máx 100 caracteres).');
            }
            if (password.length < 4 || password.length > 10) {
                valido = false;
                mostrarError(registerForm.password, 'Contraseña entre 4 y 10 caracteres.');
            }
            if (!valido) return;
            // Guardar usuario en localStorage
            const usuario = { nombre, email, password, imagen: 'default-user.png' };
            localStorage.setItem('usuario', JSON.stringify(usuario));
            mostrarMensajeExito('¡Registro exitoso! Ahora puedes iniciar sesión.');
            registerForm.reset();
        });
    }

    // Contacto
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

    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const admin = JSON.parse(localStorage.getItem('admin'));
            let logueado = null;

            // Validación básica
            if (!/^([\w.-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email) || email.length > 100) {
                mostrarError(loginForm.email, 'Correo válido requerido (@duoc.cl, @profesor.duoc.cl, @gmail.com, máx 100 caracteres).');
                return;
            }
            if (password.length < 4 || password.length > 10) {
                mostrarError(loginForm.password, 'Contraseña entre 4 y 10 caracteres.');
                return;
            }

            // Verifica admin
            if (admin && admin.email === email && admin.password === password) {
                logueado = admin;
                localStorage.setItem('usuarioLogueado', JSON.stringify(logueado));
                window.location.href = "admin.html";
                return;
            }
            // Verifica usuario normal
            if (usuario && usuario.email === email && usuario.password === password) {
                logueado = usuario;
                localStorage.setItem('usuarioLogueado', JSON.stringify(logueado));
                window.location.href = "index.html";
                return;
            }
            mostrarError(loginForm.password, 'Usuario o contraseña incorrectos.');
        });
    }

    // Inicializar productos y carrito si corresponde
    if (document.getElementById('productos-list')) {
        renderProductos();
        renderCarrito();
        actualizarCarritoCantidad();
    }

    // Mostrar usuario logueado en el header
    mostrarUsuario();
});

// --- Mensaje de éxito ---
function mostrarMensajeExito(mensaje) {
    let msg = document.getElementById('registro-exito');
    const registerForm = document.querySelector('form');
    if (!msg && registerForm) {
        msg = document.createElement('div');
        msg.id = 'registro-exito';
        msg.className = 'exito';
        registerForm.parentNode.insertBefore(msg, registerForm);
    }
    if (msg) {
        msg.textContent = mensaje;
        msg.style.color = 'green';
        setTimeout(() => { msg.textContent = ''; }, 4000);
    }
}

// --- Mostrar usuario logueado ---
function mostrarUsuario() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const header = document.querySelector('header');
    if (usuario && header) {
        let userDiv = document.getElementById('usuario-header');
        if (!userDiv) {
            userDiv = document.createElement('div');
            userDiv.id = 'usuario-header';
            userDiv.className = 'usuario-header';
            header.appendChild(userDiv);
        }
        userDiv.innerHTML = `<img src="https://marketplace.canva.com/A5alg/MAESXCA5alg/1/tl/canva-user-icon-MAESXCA5alg.png" alt="Usuario" class="usuario-img"> <span>${usuario.nombre}</span>`;
    }
}

// --- Usuario administrador por defecto ---
const adminDefault = {
    run: "12345678K",
    nombre: "Admin",
    apellidos: "Principal",
    email: "admin@duoc.cl",
    password: "admin123",
    tipo: "Administrador",
    direccion: "Duoc UC",
    region: "Región Metropolitana",
    comuna: "Santiago",
    nacimiento: "1980-01-01"
};
if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(adminDefault));
}

// --- Login ---
window.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const admin = JSON.parse(localStorage.getItem('admin'));
            let logueado = null;

            // Validación básica
            if (!/^([\w.-]+)@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(email) || email.length > 100) {
                mostrarError(loginForm.email, 'Correo válido requerido (@duoc.cl, @profesor.duoc.cl, @gmail.com, máx 100 caracteres).');
                return;
            }
            if (password.length < 4 || password.length > 10) {
                mostrarError(loginForm.password, 'Contraseña entre 4 y 10 caracteres.');
                return;
            }

            // Verifica admin
            if (admin && admin.email === email && admin.password === password) {
                logueado = admin;
                localStorage.setItem('usuarioLogueado', JSON.stringify(logueado));
                window.location.href = "admin.html";
                return;
            }
            // Verifica usuario normal
            if (usuario && usuario.email === email && usuario.password === password) {
                logueado = usuario;
                localStorage.setItem('usuarioLogueado', JSON.stringify(logueado));
                window.location.href = "index.html";
                return;
            }
            mostrarError(loginForm.password, 'Usuario o contraseña incorrectos.');
        });
    }
    // ...el resto de tu código de tienda y validaciones de usuario...
});
