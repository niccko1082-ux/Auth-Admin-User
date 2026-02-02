# Sistema de Gestión de Pedidos - Restaurante

Este proyecto es una simulación de un sistema de pedidos para un restaurante, desarrollado con HTML, CSS (Tailwind), JavaScript Vanilla y JSON Server.

## 🚀 Instalación y Ejecución

1.  **Requisitos**: Necesitas tener instalado [Node.js](https://nodejs.org/) para ejecutar el servidor simulado.

2.  **Iniciar el Servidor (API Falsa)**:
    Abre una terminal en la carpeta raíz del proyecto y ejecuta:
    ```bash
    npx json-server --watch db.json
    ```
    Esto levantará la API en `http://localhost:3000`.

3.  **Ver la Aplicación**:
    Utiliza una extensión como **Live Server** en VS Code para abrir `index.html`.

## 📂 Estructura del Proyecto

-   `index.html`: Página de inicio de sesión (Login).
-   `register.html`: Registro de nuevos usuarios.
-   `html/`: Vistas de la aplicación.
    -   `user/dashboard.html`: Menú y carrito para clientes.
    -   `admin/dashboard.html`: Panel de control para administradores.
-   `js/`: Lógica de la aplicación.
    -   `services/api.js`: Funciones para comunicarse con `db.json`.
    -   `guards/`: Protección de rutas (`authGuard.js`).
    -   `user/`: Lógica específica del cliente.
    -   `admin/`: Lógica específica del administrador.

## 🛠 Funcionalidades

### Roles
-   **User**: Puede ver productos, agregar al carrito y crear pedidos.
-   **Admin**: Puede ver métricas, ver todos los pedidos y cambiar su estado.

### Base de Datos (`db.json`)
El archivo `db.json` actúa como base de datos.
-   `users`: Almacena la información de registro.
-   `products`: Lista de productos del menú.
-   `orders`: Historial de pedidos realizados.

---

## 📝 ¿Cómo hacer un README.md? (Guía Paso a Paso)

Un `README.md` es la carta de presentación de tu proyecto. Aquí te explico cómo crear uno efectivo:

### Paso 1: Título y Descripción
Empieza con un `# Título` claro y un párrafo breve que explique **qué hace** tu proyecto.
*Ejemplo: Sistema de gestión de pedidos para digitalizar el flujo de ventas.*

### Paso 2: Instrucciones de Instalación
Explica cómo alguien más puede hacer funcionar tu código. Usa bloques de código ` ```bash ` para los comandos.
*Ejemplo: "Ejecuta npm install..."*

### Paso 3: Características
Lista las funcionalidades principales usando viñetas `- `.
*Ejemplo: - Autenticación de usuarios - Panel de administración en tiempo real.*

### Paso 4: Tecnologías Usadas
Menciona las herramientas clave.
*Ejemplo: JavaScript, Tailwind CSS, JSON Server.*

### Paso 5: Estructura (Opcional)
Si el proyecto es complejo, un árbol de archivos ayuda a entender dónde está cada cosa.

### Consejos de Formato Markdown
-   `#` para Títulos principales.
-   `##` para Subtítulos.
-   `**Texto en negrita**` para resaltar.
-   `[Texto del enlace](URL)` para enlaces.
-   ` ``` ` para bloques de código.

¡Sigue esta estructura y tendrás documentación profesional para cualquier proyecto!
