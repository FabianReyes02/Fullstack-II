# Tienda Online PerfumeStore
![b5e5daf193cfa6bb18087ea578f14520](https://github.com/user-attachments/assets/cd6cf96c-c5ae-48d2-9c0f-1dd4a0d29f9d)


## Descripción
Este proyecto es una tienda online de perfumes desarrollada para la Evaluación 1 de Fullstack II. Incluye vista de productos, carrito de compras, registro, login, administración de usuarios y productos, y un apartado de contacto, todo con validaciones y diseño responsivo.

## Estructura del Proyecto
- **index.html**: Página principal con información sobre la empresa.
- **productos.html**: Vista de productos y carrito de compras.
- **register.html**: Formulario de registro de usuarios con validaciones.
- **login.html**: Formulario de inicio de sesión con validaciones.
- **admin.html**: Panel administrativo para gestionar productos y usuarios.
- **contactanos.html**: Apartado exclusivo para enviar comentarios y ver los recibidos.
- **style.css**: Hoja de estilos personalizada y responsiva.
- **registerstyle.css**: Estilos para el registro de usuarios.
- **script.js**: Lógica de validación, gestión de productos y carrito de compras.
- **admin.js**: Lógica de administración de productos, usuarios y comentarios.

## Funcionalidades
- **Navegación**: Menú superior en todas las páginas para acceder a Inicio, Productos, Registro, Login, Admin y Contáctanos.
- **Productos**: Listado dinámico de perfumes con imágenes, descripción y botón para agregar al carrito.
- **Carrito de compras**: Permite agregar, quitar y modificar la cantidad de productos. El carrito se muestra en la esquina superior derecha y se guarda en LocalStorage.
- **Registro de usuarios**: Formulario con validaciones de nombre, correo (solo dominios permitidos) y contraseña.
- **Login**: Formulario con validaciones de correo y contraseña.
- **Administración**: Panel para agregar, editar y eliminar productos y usuarios, con validaciones avanzadas (RUN, correo, dirección, región, comuna, etc.).
- **Contacto**: Apartado exclusivo para enviar consultas/comentarios, que se guardan y muestran debajo del formulario.
- **Diseño responsivo**: Adaptado para dispositivos móviles y escritorio.

## Validaciones
- **RUN**: Requerido, formato sin puntos ni guion, entre 7 y 9 caracteres.
- **Correo**: Solo se aceptan correos @duoc.cl, @profesor.duoc.cl y @gmail.com.
- **Contraseña**: Entre 4 y 10 caracteres.
- **Nombre**: Máximo 50 caracteres (registro: 100).
- **Apellidos**: Máximo 100 caracteres.
- **Dirección**: Máximo 300 caracteres.
- **Comentario**: Máximo 500 caracteres.
- **Región y Comuna**: Selección dinámica según datos en JS.

## Tecnologías Utilizadas
- HTML5
  <img width="200" height="200" alt="HTML5_logo_and_wordmark svg" src="https://github.com/user-attachments/assets/742b3e03-a1ab-47e4-a071-4f5a8d7a2121" />
- CSS3
  <img width="200" height="200" alt="images" src="https://github.com/user-attachments/assets/52ea21ba-874d-4514-9b26-c37249919d2d" />
- JavaScript
  <img width="200" height="200" alt="Unofficial_JavaScript_logo_2 svg" src="https://github.com/user-attachments/assets/ca99480c-6314-4c88-afb2-13997b74ef7b" />
 
## Cómo ejecutar
1. Clona el repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador.
3. Navega entre las páginas usando el menú superior.

## Autor
- Proyecto realizado por estudiantes de Ingeniería Informática para la Evaluación 1 de Fullstack II.

## Notas
- El carrito de compras y los productos solo aparecen en la página `productos.html`.
- El panel de administración permite gestionar productos y usuarios.
- El apartado "Contáctanos" tiene su propia pestaña y guarda los comentarios enviados.
- El diseño y las validaciones cumplen con los requisitos de la evaluación.
