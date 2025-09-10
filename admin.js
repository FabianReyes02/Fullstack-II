// --- Datos de regiones y comunas ---
const regiones = [
    { nombre: "Región Metropolitana", comunas: ["Santiago", "Puente Alto", "Maipú"] },
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué"] }
];

// --- Productos ---
let productos = JSON.parse(localStorage.getItem('productos')) || [
    {
        codigo: "P001",
        nombre: "Perfume Femenino 1",
        descripcion: "Fragancia floral y elegante para mujer.",
        precio: 19990,
        stock: 10,
        stockCritico: 2,
        categoria: "Femenino",
        imagen: "https://http2.mlstatic.com/D_NQ_NP_936463-MLC42018693002_052020-O.webp"
    }
];

// --- Usuarios ---
let usuarios = [];
const admin = JSON.parse(localStorage.getItem('admin'));
if (admin) usuarios.push(admin);
const usuarioNormal = JSON.parse(localStorage.getItem('usuario'));
if (usuarioNormal) usuarios.push(usuarioNormal);

// --- Renderizar productos Admin ---
function renderProductosAdmin() {
    const cont = document.getElementById('lista-productos');
    cont.innerHTML = productos.map((p, i) => `
        <div class="producto admin-prod">
            <strong>${p.codigo}</strong> - ${p.nombre} ($${p.precio}) [${p.categoria}]
            <br>Stock: ${p.stock} ${p.stockCritico && p.stock <= p.stockCritico ? '<span class="stock-alert">¡Stock crítico!</span>' : ''}
            <br><button class="admin-btn" onclick="editarProducto(${i})">Editar</button>
        </div>
    `).join('');
}

// --- Formulario producto ---
function mostrarFormularioProducto(indice = null) {
    const prod = indice !== null ? productos[indice] : {};
    let opcionesCat = ["Femenino","Masculino","Unisex","Infantil"].map(cat =>
        `<option value="${cat}" ${prod.categoria===cat?"selected":""}>${cat}</option>`
    ).join('');
    const form = `
        <form id="form-prod" class="form-section">
            <label>Código producto: <input name="codigo" required minlength="3" value="${prod.codigo||''}"></label>
            <label>Nombre: <input name="nombre" required maxlength="100" value="${prod.nombre||''}"></label>
            <label>Descripción: <textarea name="descripcion" maxlength="500">${prod.descripcion||''}</textarea></label>
            <label>Precio: <input name="precio" type="number" min="0" step="0.01" required value="${prod.precio||''}"></label>
            <label>Stock: <input name="stock" type="number" min="0" required value="${prod.stock||''}"></label>
            <label>Stock Crítico: <input name="stockCritico" type="number" min="0" value="${prod.stockCritico||''}"></label>
            <label>Categoría:
                <select name="categoria" required>
                    <option value="">Seleccione</option>
                    ${opcionesCat}
                </select>
            </label>
            <label>Imagen: <input name="imagen" value="${prod.imagen||''}"></label>
            <button type="submit" class="admin-btn">${indice!==null?"Actualizar":"Crear"}</button>
        </form>
    `;
    document.getElementById('form-producto').innerHTML = form;
    document.getElementById('form-producto').style.display = "block";
    document.getElementById('form-prod').onsubmit = function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        // Validaciones extra
        if (data.codigo.length < 3) return alert("Código mínimo 3 caracteres.");
        if (!data.nombre || data.nombre.length > 100) return alert("Nombre requerido, máx 100.");
        if (data.descripcion && data.descripcion.length > 500) return alert("Descripción máx 500.");
        if (isNaN(data.precio) || data.precio < 0) return alert("Precio mínimo 0.");
        if (isNaN(data.stock) || data.stock < 0 || !Number.isInteger(Number(data.stock))) return alert("Stock entero y mínimo 0.");
        if (data.stockCritico && (isNaN(data.stockCritico) || data.stockCritico < 0 || !Number.isInteger(Number(data.stockCritico)))) return alert("Stock crítico entero y mínimo 0.");
        if (!data.categoria) return alert("Seleccione categoría.");

        data.precio = parseFloat(data.precio);
        data.stock = parseInt(data.stock);
        data.stockCritico = data.stockCritico ? parseInt(data.stockCritico) : null;
        if (!data.id) {
            data.id = Date.now(); // id único basado en timestamp
        }
        if (indice !== null) productos[indice] = data;
        else productos.push(data);
        localStorage.setItem('productos', JSON.stringify(productos));
        document.getElementById('form-producto').style.display = "none";
        renderProductosAdmin();
    };
}
function editarProducto(indice) {
    mostrarFormularioProducto(indice);
}

// --- Renderizar usuarios ---
function renderUsuarios() {
    const cont = document.getElementById('lista-usuarios');
    cont.innerHTML = usuarios.map(u => `
        <div class="admin-user">
            <strong>RUN:</strong> ${u.run||'-'}<br>
            <strong>Nombre:</strong> ${u.nombre} ${u.apellidos||''}<br>
            <strong>Correo:</strong> ${u.email}<br>
            <strong>Tipo:</strong> ${u.tipo||'Cliente'}<br>
            <strong>Dirección:</strong> ${u.direccion||'-'}<br>
            <strong>Región:</strong> ${u.region||'-'}<br>
            <strong>Comuna:</strong> ${u.comuna||'-'}<br>
            <strong>Fecha Nacimiento:</strong> ${u.nacimiento||'-'}
        </div>
    `).join('');
}

// --- Navegación y carga inicial ---
document.addEventListener('DOMContentLoaded', () => {
    // Listeners para menú
    document.getElementById('nav-productos').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('admin-productos').style.display = "block";
        document.getElementById('admin-usuarios').style.display = "none";
    });
    document.getElementById('nav-usuarios').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('admin-productos').style.display = "none";
        document.getElementById('admin-usuarios').style.display = "block";
        renderUsuarios();
    });

    // Mostrar productos por defecto
    renderProductosAdmin();
    document.getElementById('admin-productos').style.display = "block";
    document.getElementById('admin-usuarios').style.display = "none";
});

// Expón funciones globalmente para los botones inline
window.mostrarFormularioProducto = mostrarFormularioProducto;
window.editarProducto = editarProducto;