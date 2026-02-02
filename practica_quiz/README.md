# Práctica Examen: Quiz Master 🎓

Este proyecto simula un examen online.
Enfocado en **navegación secuencial** y **lógica de juegos** (Puntaje).

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Levanta el servidor con la base de datos de preguntas:
    ```bash
    npx json-server --watch practica_quiz/db.json
    ```
3.  Abre `practica_quiz/index.html` con Live Server.

## 🔑 Credenciales

*   **Usuario (Estudiante)**: `user@test.com` / `123`
*   **Admin (Profesor)**: `admin@test.com` / `123`

## 🛠 Funcionalidades Clave

### 1. Estudiante
*   **Wizard Flow**: No ve todas las preguntas. Ve una, responde, y pasa a la siguiente (`index++`).
*   **Score**: Se acumula en memoria. Solo se muestra al final (Pantalla de Resultados).
*   **Guardado**: Al terminar, envía un POST a `/results`.

### 2. Admin
*   **Crear Pregunta**: Formulario con array de opciones.
*   **Leaderboard**: Tabla ordenada por puntaje más alto.

## 🧠 Conceptos Practicados
*   **Array Navigation**: `questions[currentIdx]`.
*   **DOM State**: Ocultar/Mostrar divs (`classList.toggle('hidden')`) para simular pantallas (Inicio -> Juego -> Fin).
*   **Sorting Logic**: `results.sort((a,b) => b.score - a.score)`.
