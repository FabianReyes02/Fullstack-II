🛍️ Tienda Online – PerfumeStore

📖 Descripción

PerfumeStore es una tienda online de perfumes desarrollada como parte de la Evaluación 1 del módulo Fullstack II.
El proyecto permite explorar productos, añadirlos al carrito, registrarse, iniciar sesión, administrar usuarios y productos, y enviar comentarios a través del formulario de contacto.
Todo el sitio incluye validaciones de formularios, almacenamiento local y diseño responsivo adaptable a distintos dispositivos.

🧩 Estructura del Proyecto

index.html → Página principal con información general de la tienda.

productos.html → Vista de productos y gestión del carrito de compras.

register.html → Formulario de registro con validaciones personalizadas.

login.html → Formulario de inicio de sesión con validaciones.

admin.html → Panel de administración para gestionar usuarios y productos.

contactanos.html → Sección para enviar comentarios, los cuales se muestran debajo del formulario.

style.css → Estilos generales y diseño adaptable.

registerstyle.css → Estilos específicos para el formulario de registro.

script.js → Lógica del carrito, validaciones y gestión de productos.

admin.js → Lógica del panel administrativo y manejo de datos de usuarios/comentarios.

⚙️ Funcionalidades Principales

Navegación dinámica: Menú superior presente en todas las páginas.

Productos dinámicos: Listado con imagen, descripción y opción para agregar al carrito.

Carrito de compras persistente: Permite agregar, quitar y modificar productos. La información se almacena en LocalStorage.

Registro y login de usuarios: Validaciones de correo, contraseña, nombre y RUN.

Panel administrativo: CRUD completo (crear, leer, actualizar y eliminar) de usuarios y productos.

Formulario de contacto: Permite enviar consultas o comentarios y visualizarlos debajo del formulario.

Diseño responsivo: Adaptado a escritorio, tablet y dispositivos móviles.

✅ Validaciones Implementadas

RUN: Sin puntos ni guion, entre 7 y 9 caracteres.

Correo: Solo se aceptan dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.

Contraseña: Entre 4 y 10 caracteres.

Nombre: Máximo 50 caracteres (100 en registro).

Apellidos: Máximo 100 caracteres.

Dirección: Máximo 300 caracteres.

Comentario: Máximo 500 caracteres.

Región y Comuna: Selección dinámica cargada desde el archivo JavaScript.

🧠 Tecnologías Utilizadas
Tecnología	Descripción	Logo
HTML5	Estructura del contenido web	<img width="100" alt="HTML5" src="https://github.com/user-attachments/assets/742b3e03-a1ab-47e4-a071-4f5a8d7a2121" />
CSS3	Diseño, estilos y adaptabilidad responsiva	<img width="100" alt="CSS3" src="https://github.com/user-attachments/assets/52ea21ba-874d-4514-9b26-c37249919d2d" />
JavaScript	Lógica, validaciones y gestión dinámica de datos	<img width="100" alt="JavaScript" src="https://github.com/user-attachments/assets/ca99480c-6314-4c88-afb2-13997b74ef7b" />
🚀 Cómo Ejecutar el Proyecto

Clona el repositorio:

git clone [URL_DEL_REPOSITORIO]


Abre el archivo index.html en tu navegador.

Usa el menú superior para navegar entre las secciones.

Usuario administrador:

Correo: admin@duoc.cl

Contraseña: admin123

👩‍💻 Autor

Proyecto desarrollado por estudiantes de Duoc UC para la asignatura Fullstack II.

🧰 Información Técnica (por defecto de React)

Este proyecto fue inicializado con Create React App.
Para más información sobre scripts, compilación y configuración, consulta la documentación oficial
.

📄 Resumen de Cambios (para informe)

Se realizaron mejoras en el documento README con el objetivo de optimizar su estructura, claridad y presentación.
Los principales cambios fueron los siguientes:

Reestructuración completa del formato, organizando el contenido en secciones claras y ordenadas.

Redacción más formal y fluida, eliminando repeticiones y mejorando la coherencia del texto.

Incorporación de emojis, tablas y formato visual para hacerlo más atractivo en GitHub.

Corrección de nombres de archivos y descripciones para mayor precisión técnica.

Actualización de la guía de ejecución, agregando pasos numerados y formato de código.

Integración ordenada del apartado técnico de React, separándolo del contenido principal para mantener la legibilidad.

En conjunto, estas modificaciones mejoran la presentación general del proyecto, facilitando su lectura y comprensión tanto para evaluadores como para futuros colaboradores.
