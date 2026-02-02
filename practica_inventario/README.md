# Práctica Examen: Control de Inventario (Tienda)

Este proyecto simula un e-commerce simple.
Enfocado en **gestión de cantidades** y **transacciones concurrentes** (Venta + Stock Update).

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Levanta el servidor:
    ```bash
    npx json-server --watch practica_inventario/db.json
    ```
3.  Abre `practica_inventario/index.html` con Live Server.

## 🔑 Credenciales

*   **Usuario (Cliente)**: `user@test.com` / `123`
*   **Admin (Manager)**: `admin@test.com` / `123`

## 🛠 Funcionalidades Clave

### 1. Cliente
*   **Catálogo**: Ve productos y su stock en tiempo real.
*   **Comprar**: 
    1.  Valida que `input_cantidad <= stock_actual`.
    2.  Registra la venta (`POST /sales`).
    3.  Resta la cantidad al producto (`PATCH /products`).
*   **Bloqueo**: Si `Stock === 0`, el botón se deshabilita y dice "AGOTADO".

### 2. Admin
*   **Inventario**: Tabla que muestra el stock de cada item.
*   **Reabastecer**: Permite sumar stock a un producto existente (simula llegada de mercancía).
*   **Ventas**: Lista histórica de compras realizadas por usuarios.

## 🧠 Conceptos Practicados
*   **Logic flow**: `if (cantidad > stock) return alert('Error')`.
*   **Chaining Requests**: `await createSale(...)` -> `await updateStock(...)`.
*   **UI Updates**: Bloquear botones (`disabled`) basados en datos del servidor.
