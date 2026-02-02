# Práctica Examen: To-Do List

Este es un proyecto simple de gestión de tareas para practicar conceptos de Frontend + API Simulada (CRUD).

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Ejecuta el servidor apuntando a la base de datos de esta práctica:
    ```bash
    npx json-server --watch practica_examen/db.json
    ```
3.  Abre `practica_examen/index.html` con Live Server.

## 🔑 Credenciales

*   **Usuario**: `user@test.com` / `123`
*   **Admin**: `admin@test.com` / `123`

## 🛠 Estructura

*   `db.json`: Base de datos (Users, Tasks).
*   `js/api.js`: Centraliza `fetch` (GET, POST, PATCH, DELETE).
*   `js/guard.js`: Protege las rutas y verifica roles.
*   `html/user/`: Dashboard del usuario (Ver sus tareas, Crear, Completar).
*   `html/admin/`: Dashboard del admin (Ver todas, Borrar).
