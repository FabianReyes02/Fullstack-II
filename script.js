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
