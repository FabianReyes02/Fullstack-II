🪶 README Mejorado
🛍️ Tienda Online – PerfumeStore

📖 Descripción

PerfumeStore es una tienda online de perfumes desarrollada como parte de la Evaluación 1 del módulo Fullstack II.
El proyecto permite navegar por los productos, añadirlos al carrito, registrarse, iniciar sesión, administrar usuarios y productos, y enviar comentarios a través del apartado de contacto.
Todo el sitio cuenta con validaciones de formularios y diseño responsivo adaptable a distintos dispositivos.

🧩 Estructura del Proyecto

index.html → Página principal con información general de la empresa.

productos.html → Vista de productos y gestión del carrito de compras.

register.html → Formulario de registro con validaciones personalizadas.

login.html → Formulario de inicio de sesión con validaciones.

admin.html → Panel de administración para gestionar usuarios y productos.

contactanos.html → Sección para enviar comentarios, los cuales se muestran debajo del formulario.

style.css → Estilos generales con diseño responsivo.

registerstyle.css → Estilos específicos para el registro.

script.js → Lógica del carrito, validaciones y gestión de productos.

admin.js → Lógica del panel administrativo y manejo de datos de usuarios/comentarios.

⚙️ Funcionalidades Principales

Menú de navegación visible en todas las páginas.

Productos dinámicos con imagen, descripción y botón para agregar al carrito.

Carrito de compras persistente (usa LocalStorage), con opciones para agregar, eliminar o modificar productos.

Registro y login de usuarios con validaciones de datos (correo, contraseña, nombre, etc.).

Panel administrativo con CRUD completo (crear, leer, actualizar, eliminar) de productos y usuarios.

Formulario de contacto con almacenamiento y visualización de comentarios enviados.

Diseño adaptable para escritorio, tablets y móviles.

✅ Validaciones Implementadas

RUN: sin puntos ni guion, entre 7 y 9 caracteres.

Correo: acepta solo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com.

Contraseña: entre 4 y 10 caracteres.

Nombre: hasta 50 caracteres (100 en registro).

Apellidos: máximo 100 caracteres.

Dirección: máximo 300 caracteres.

Comentario: máximo 500 caracteres.

Región y Comuna: se cargan de forma dinámica según datos del archivo JS.

🧠 Tecnologías Utilizadas
Tecnología	Descripción	Logo
HTML5	Estructura del contenido web	<img width="100" alt="HTML5" src="https://github.com/user-attachments/assets/742b3e03-a1ab-47e4-a071-4f5a8d7a2121" />
CSS3	Diseño, estilos y adaptabilidad responsive	<img width="100" alt="CSS3" src="https://github.com/user-attachments/assets/52ea21ba-874d-4514-9b26-c37249919d2d" />
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

Proyecto desarrollado por [Tu Nombre] para la asignatura Fullstack II.

🧰 Información Técnica (por defecto de React)

Este proyecto fue inicializado con Create React App.
Para más detalles sobre scripts y configuración, consulta la documentación oficial
.

📄 Resumen de Cambios (para informe)

En la versión actual del README se realizaron las siguientes mejoras:

Reestructuración completa del formato: Se organizó el contenido en secciones más claras y jerarquizadas (Descripción, Estructura, Funcionalidades, Validaciones, Tecnologías, Ejecución, Autor).

Mejor redacción y estilo: Se optimizó la redacción para mayor formalidad y claridad, eliminando repeticiones y lenguaje técnico innecesario.

Se agregaron emojis y tablas: Para hacer el documento más visual y atractivo en GitHub.

Corrección de detalles técnicos: Se homogenizaron los nombres de archivos y se aclararon funciones específicas de cada uno.

Guía de ejecución actualizada: Se agregaron pasos numerados y formato de código.

Unificación con entorno React: Se integró de forma ordenada la sección del “Default de React”, manteniéndola como información adicional y no mezclada con el contenido principal.
