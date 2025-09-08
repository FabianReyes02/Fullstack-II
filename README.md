# Tienda Online PerfumeStore

## Descripción
Este proyecto es una tienda online de perfumes desarrollada para la Evaluación 1 de Fullstack II. Incluye una vista de productos, carrito de compras, registro, login y formulario de contacto, todo con validaciones y diseño responsivo.

## Estructura del Proyecto
- **index.html**: Página principal con información sobre la empresa.
- **productos.html**: Vista de productos, carrito de compras y formulario de contacto.
- **register.html**: Formulario de registro de usuarios con validaciones.
- **login.html**: Formulario de inicio de sesión con validaciones.
- **style.css**: Hoja de estilos personalizada y responsiva.
- **script.js**: Lógica de validación, gestión de productos y carrito de compras.

## Funcionalidades
- **Navegación**: Menú superior en todas las páginas para acceder a Inicio, Productos, Registro y Login.
- **Productos**: Listado dinámico de perfumes con imágenes, descripción y botón para agregar al carrito.
- **Carrito de compras**: Permite agregar, quitar y modificar la cantidad de productos. El carrito se muestra en la esquina superior derecha y se guarda en LocalStorage.
- **Registro de usuarios**: Formulario con validaciones de nombre, correo (solo dominios permitidos) y contraseña.
- **Login**: Formulario con validaciones de correo y contraseña.
- **Contacto**: Formulario para enviar consultas, con validaciones de nombre, correo y comentario.
- **Diseño responsivo**: Adaptado para dispositivos móviles y escritorio.

## Validaciones
- **Correo**: Solo se aceptan correos @duoc.cl, @profesor.duoc.cl y @gmail.com.
- **Contraseña**: Entre 4 y 10 caracteres.
- **Nombre**: Máximo 100 caracteres.
- **Comentario**: Máximo 500 caracteres.

## Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript

## Cómo ejecutar
1. Clona el repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador.
3. Navega entre las páginas usando el menú superior.

## Autor
- Proyecto realizado por estudiantes de la Escuela de Administración y Negocios para la Evaluación 1 de Fullstack II.

## Notas
- El carrito de compras y los productos solo aparecen en la página `productos.html`.
- El diseño y las validaciones cumplen con los requisitos de la evaluación.
