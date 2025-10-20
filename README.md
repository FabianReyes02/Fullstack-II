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
4. Usuario ADMIN = user:admin@duoc.cl password:admin123
## Autor

#Default de React
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
