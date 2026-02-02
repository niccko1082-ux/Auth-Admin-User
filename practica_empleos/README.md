# Práctica Examen: Portal de Empleos 💼

Este proyecto simula una bolsa de trabajo.
Enfocado en **Relaciones Muchos a Muchos** (`Users` <-> `Jobs`) y **Validación de Duplicados**.

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Levanta el servidor:
    ```bash
    npx json-server --watch practica_empleos/db.json
    ```
3.  Abre `practica_empleos/index.html`.

## 🔑 Credenciales

*   **Candidato**: `user@test.com` / `123`
*   **Reclutador**: `admin@test.com` / `123`

## 🛠 Funcionalidades Clave

### 1. Candidato
*   **Postularse**: 
    1.  Verifica si ya existe una aplicación para ese `jobId` y `userId`.
    2.  Si no existe, crea el registro en `applications`.
    3.  Si existe, deshabilita el botón ("Ya postulado").
*   **Mis Postulaciones**: Filtra la tabla `applications` por mi ID.

### 2. Admin (Reclutador)
*   **Publicar**: CRUD simple de empleos.
*   **Ver Postulantes**: 
    1.  Obtiene las `applications` de un empleo específico.
    2.  Por cada aplicación, hace un `fetch` extra para obtener el nombre del usuario (`users/{id}`).

## 🧠 Conceptos Practicados
*   **Join Logic**: Unir tablas manualmente en JS (Id de usuario -> Nombre de usuario).
*   **Prevent Duplicates**: Validar antes de enviar (`GET` antes de `POST`).
*   **Data Consistency**: Mantener integridad lógica (un usuario no se aplica dos veces).
