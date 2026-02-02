# Práctica Examen: Sistema de Biblioteca

Este proyecto simula un sistema de reservas de libros.
Enfocado en el manejo de **estados** (`available` <-> `reserved`) y relaciones (`reservedBy`).

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Levanta el servidor (fijate que ahora usamos la carpeta biblioteca):
    ```bash
    npx json-server --watch practica_biblioteca/db.json
    ```
3.  Abre `practica_biblioteca/index.html` con Live Server.

## 🔑 Credenciales

*   **Usuario**: `user@test.com` / `123`
*   **Admin**: `admin@test.com` / `123`

## 🛠 Funcionalidades Clave

### 1. Usuario (Lector)
*   **Catálogo**: Ve la lista de libros.
    *   Si está `available`, muestra botón "Reservar".
    *   Si está `reserved`, muestra "No Disponible".
*   **Reservar**: Al hacer click, el libro cambia de estado y se asigna al usuario.
*   **Mis Reservas**: Filtra los libros donde `reservedBy === mi_id`.

### 2. Admin (Bibliotecario)
*   **Inventario**: Ve tabla con todos los libros y quién lo tiene.
*   **Devolución**: Botón "Devolver" que resetea el libro a `available` y libera al usuario.
*   **Agregar**: Formulario para nuevos libros.

## 🧠 Conceptos Practicados
*   **State Management**: Cambio de propiedades en `db.json` vía PATCH.
*   **Conditional Rendering**: Mostrar botones distintos según el estado del libro.
*   **Filtering**: Mostrar solo "Mis Reservas".
