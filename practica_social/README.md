# Práctica Examen: Social Feed (InstaDev) 💬

Este proyecto simula un Feed de Noticias (estilo Twitter/Instagram).
Enfocado en **Permisos de Usuario** (Borrar solo lo mío) y **Datos Anidados** (Comentarios).

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Levanta el servidor:
    ```bash
    npx json-server --watch practica_social/db.json
    ```
3.  Abre `practica_social/index.html`.

## 🔑 Credenciales

*   **Juan**: `user@test.com` / `123`
*   **Carlos**: `carlos@test.com` / `123`
*   **Ana (Admin)**: `admin@test.com` / `123`

## 🛠 Funcionalidades Clave

### 1. Lista Inteligente
*   **Renderizado Condicional**: El botón `[Eliminar]` solo aparece si `post.userId === session.id`.
*   **Orden Inverso**: `posts.reverse()` para ver lo más nuevo arriba.

### 2. Interacciones
*   **Likes**: Simple contador (`likes + 1`) con persistencia (`PATCH`).
*   **Comentarios**:
    1.  Cada post tiene un botón que hace `toggle` (`classList.toggle('hidden')`) a la sección de comentarios.
    2.  Al comentar, no recargamos toda la página, solo añadimos el comentario a la lista (o recargamos el feed para simplificar).

## 🧠 Conceptos Practicados
*   **Event Delegation**: Un solo `addEventListener` en el contenedor padre (`feed`) maneja clicks de 100 posts.
*   **User Ownership**: Lógica de seguridad basica en Frontend.
*   **Nested Fetching**: Traer Post -> Traer Usuario -> Traer Comentarios.
