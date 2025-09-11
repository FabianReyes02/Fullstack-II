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
            <br>
            <button class="admin-btn" onclick="editarProducto(${i})">Editar</button>
            <button class="admin-btn" onclick="eliminarProducto(${i})" style="background:#e74c3c;">Eliminar</button>
        </div>
    `).join('');
}

// --- Eliminar producto ---
function eliminarProducto(indice) {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
        productos.splice(indice, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        renderProductosAdmin();
    }
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

// --- Formulario usuario ---
function mostrarFormularioUsuario(indice = null) {
    const u = indice !== null ? usuarios[indice] : {};
    let opcionesReg = regiones.map(r => `<option value="${r.nombre}" ${u.region===r.nombre?"selected":""}>${r.nombre}</option>`).join('');
    let opcionesCom = u.region ? regiones.find(r => r.nombre === u.region)?.comunas.map(c => `<option value="${c}" ${u.comuna===c?"selected":""}>${c}</option>`).join('') : '';
    let opcionesTipo = ["Administrador","Cliente","Vendedor"].map(tipo => `<option value="${tipo}" ${u.tipo===tipo?"selected":""}>${tipo}</option>`).join('');
    const form = `
        <form id="form-usuario" class="form-section">
            <label>RUN: <input name="run" required minlength="7" maxlength="9" pattern="[0-9]{7,8}[kK0-9]" value="${u.run||''}"></label>
            <label>Nombre: <input name="nombre" required maxlength="50" value="${u.nombre||''}"></label>
            <label>Apellidos: <input name="apellidos" required maxlength="100" value="${u.apellidos||''}"></label>
            <label>Correo: <input name="email" required maxlength="100" value="${u.email||''}"></label>
            <label>Fecha Nacimiento: <input name="nacimiento" type="date" value="${u.nacimiento||''}"></label>
            <label>Tipo de Usuario:
                <select name="tipo" required>
                    <option value="">Seleccione</option>
                    ${opcionesTipo}
                </select>
            </label>
            <label>Región:
                <select name="region" required id="select-region">
                    <option value="">Seleccione</option>
                    ${opcionesReg}
                </select>
            </label>
            <label>Comuna:
                <select name="comuna" required id="select-comuna">
                    <option value="">Seleccione</option>
                    ${opcionesCom}
                </select>
            </label>
            <label>Dirección: <input name="direccion" required maxlength="300" value="${u.direccion||''}"></label>
            <button type="submit" class="admin-btn">${indice!==null?"Actualizar":"Crear"}</button>
        </form>
    `;
    document.getElementById('form-usuario').innerHTML = form;
    document.getElementById('form-usuario').style.display = "block";
    document.getElementById('form-usuario').onsubmit = function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        // Validaciones
        if (!/^\d{7,8}[kK0-9]$/.test(data.run)) return alert("RUN inválido. Ej: 19011022K, sin puntos ni guion.");
        if (!data.nombre || data.nombre.length > 50) return alert("Nombre requerido, máx 50.");
        if (!data.apellidos || data.apellidos.length > 100) return alert("Apellidos requeridos, máx 100.");
        if (!data.email || data.email.length > 100 || !/^.+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(data.email)) return alert("Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com");
        if (!data.region) return alert("Seleccione región.");
        if (!data.comuna) return alert("Seleccione comuna.");
        if (!data.direccion || data.direccion.length > 300) return alert("Dirección requerida, máx 300.");
        if (!data.tipo) return alert("Seleccione tipo de usuario.");
        if (indice !== null) usuarios[indice] = data;
        else usuarios.push(data);
        localStorage.setItem('usuario', JSON.stringify(data));
        document.getElementById('form-usuario').style.display = "none";
        renderUsuarios();
    };
    document.getElementById('select-region').onchange = function() {
        const region = this.value;
        const comunas = regiones.find(r => r.nombre === region)?.comunas || [];
        document.getElementById('select-comuna').innerHTML = `<option value="">Seleccione</option>` + comunas.map(c => `<option value="${c}">${c}</option>`).join('');
    };
}
function editarUsuario(indice) {
    mostrarFormularioUsuario(indice);
}
function eliminarUsuario(indice) {
    if (confirm("¿Seguro que quieres eliminar este usuario?")) {
        usuarios.splice(indice, 1);
        localStorage.setItem('usuario', JSON.stringify(usuarios[0]||null));
        renderUsuarios();
    }
}

// --- Renderizar usuarios (con botones) ---
function renderUsuarios() {
    const cont = document.getElementById('lista-usuarios');
    cont.innerHTML = usuarios.map((u, i) => `
        <div class="admin-user">
            <strong>RUN:</strong> ${u.run||'-'}<br>
            <strong>Nombre:</strong> ${u.nombre} ${u.apellidos||''}<br>
            <strong>Correo:</strong> ${u.email}<br>
            <strong>Tipo:</strong> ${u.tipo||'Cliente'}<br>
            <strong>Dirección:</strong> ${u.direccion||'-'}<br>
            <strong>Región:</strong> ${u.region||'-'}<br>
            <strong>Comuna:</strong> ${u.comuna||'-'}<br>
            <strong>Fecha Nacimiento:</strong> ${u.nacimiento||'-'}<br>
            <button class="admin-btn" onclick="editarUsuario(${i})">Editar</button>
            <button class="admin-btn" onclick="eliminarUsuario(${i})" style="background:#e74c3c;">Eliminar</button>
        </div>
    `).join('');
    document.getElementById('form-usuario').style.display = "none";
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
window.eliminarProducto = eliminarProducto;
window.mostrarFormularioUsuario = mostrarFormularioUsuario;
window.editarUsuario = editarUsuario;
window.eliminarUsuario = eliminarUsuario;