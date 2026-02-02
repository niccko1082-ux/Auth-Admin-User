# Práctica Examen: Control de Gastos

Este proyecto simula una billetera personal o control de presupuesto.
Enfocado en **lógica matemática** (cálculos) y **categorización**.

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Levanta el servidor con la base de datos de presupuesto:
    ```bash
    npx json-server --watch practica_presupuesto/db.json
    ```
3.  Abre `practica_presupuesto/index.html` con Live Server.

## 🔑 Credenciales

*   **Usuario (Empleado)**: `user@test.com` / `123`
*   **Admin (Manager)**: `admin@test.com` / `123`

## 🛠 Funcionalidades Clave

### 1. Usuario
*   **Balance en Vivo**: Calcula `Total Ingresos - Total Gastos` usando `reduce()` en el frontend.
*   **Registrar Movimiento**: Permite elegir si es "Ingreso" o "Gasto".
*   **Filtrado**: Dropdown dinámico para filtrar historial por categorías (ej: Comida, Salario).

### 2. Admin
*   **Auditoría**: Ve una tabla con **todos** los movimientos de **todos** los usuarios.
*   **Eliminar**: Puede borrar registros erróneos.

## 🧠 Conceptos Practicados
*   **Math Logic**: Sumas y restas de valores monetarios.
*   **Array Methods**: `reduce()` para totales, `filter()` para categorías, `map()` para extraer categorías únicas.
*   **Type Handling**: Convertir inputs a `parseFloat()` (¡Error muy común en exámenes!).
