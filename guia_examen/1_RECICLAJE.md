# ♻️ Guía de Reciclaje de Código

Usa esta tabla para saber **de dónde copiar** según lo que te pidan en el examen.
No inventes la rueda, ¡copia y pega de tus prácticas!

## 1. Según la Lógica que te pidan

| Si el examen te pide... | PROYECTO A COPIAR | ARCHIVO CLAVE |
| :--- | :--- | :--- |
| **"Crear, Leer, Editar, Borrar"** (CRUD Básico) | `practica_examen` (To-Do) | `js/api.js` (Funciones CRUD estándar) |
| **"Reservar"** / **"Cambiar Estado"** (Disponible -> Ocupado) | `practica_biblioteca` | `js/user/dashboard.js` (Lógica de toggle botón) |
| **"Agendar con Fecha/Hora"** / **"Citas"** | `practica_citas` | `db.json` (Estructura de Slots) |
| **"Calcular Totales"** / **"Sumar Precios"** | `practica_presupuesto` | `js/user/dashboard.js` (Uso de `reduce`) |
| **"Restar Stock"** / **"Validar Cantidad"** | `practica_inventario` | `js/user/shop.js` (Validación `if quantity > stock`) |
| **"Paso a Paso"** (Wizards, Encuestas) | `practica_quiz` | `js/user/quiz.js` (Variables `currentIndex`) |
| **"Postularse"** / **"Inscribirse"** (Evitar duplicados) | `practica_empleos` | `js/user/board.js` (Validación `some()`) |
| **"Comentarios"** / **"Foro"** / **"Likes"** | `practica_social` | `js/feed.js` (Mostrar comentarios anidados) |

---

## 2. Snippets Rápidos (Copia esto directo)

### Login y Registro
*   **Fuente:** `js/auth.js` (Cualquier proyecto).
*   **Sirve para:** El 99% de los exámenes empiezan con login. Copia el de `practica_examen` que es el más limpio.

### Guard (Proteger Rutas)
*   **Fuente:** `js/guard.js` (Cualquier proyecto).
*   **Sirve para:** Si te piden "Que el usuario no entre al admin". Copia y pega tal cual.

### Setup de API
*   **Fuente:** `js/api.js` (Cualquier proyecto).
*   **Sirve para:** La base `const API_URL = ...` y los `fetch` básicos. Solo cambia el nombre del "recurso" (ej: de `/users` a `/tasks`).

---

## 3. ¿Qué hacer si me bloqueo?

1.  **Respira.**
2.  **Identifica la entidad:** ¿Son "libros", "coches", "tareas"?
3.  **Identifica la acción:** ¿Se "compran" (Inventario), se "reservan" (Biblioteca) o se "completan" (To-Do)?
4.  **Abre la carpeta correspondiente** de esta lista y mira cómo lo hicimos.
