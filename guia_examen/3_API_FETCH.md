# 📡 Guía de Fetch API (Comunicación)

Así es como tu JS habla con el JSON Server.
Copia y pega estas funciones en tu `api.js` y adáptalas.

## La Base (async/await)
Siempre usa `async/await`. Es más fácil de leer que `.then()`.

```javascript
const URL = "http://localhost:3000";
```

---

## 1. GET (Leer Datos)
Para traer listas o elementos.

```javascript
export async function getItems() {
    try {
        const response = await fetch(`${URL}/products`); // 1. Pide
        const data = await response.json();              // 2. Convierte
        return data;                                     // 3. Entrega
    } catch (error) {
        console.error("Error cargando productos:", error);
        return []; // Devuelve array vacío para que no rompa el .forEach
    }
}
```

---

## 2. POST (Crear Nuevo)
Para Login (a veces), Registro, Compras, Reservas.
**Obligatorio:** `method: 'POST'`, `headers`, y `body` (convertido a string).

```javascript
export async function createItem(nuevoObjeto) {
    const response = await fetch(`${URL}/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // ¡CRUCIAL!
        },
        body: JSON.stringify(nuevoObjeto)
    });
    return response.json();
}
```

---

## 3. PATCH (Editar Parcialmente)
Usa este para **editar stock**, cambiar status, cambiar nombre.
Solo envía lo que cambió.

```javascript
export async function updateStock(id, nuevoStock) {
    await fetch(`${URL}/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: nuevoStock }) // Solo mando stock
    });
}
```

> **Diferencia PUT vs PATCH**: PUT reemplaza TODO el objeto. PATCH solo cambia lo que envías. Usa PATCH, es más seguro en examen.

---

## 4. DELETE (Borrar)
Solo necesita la URL con el ID.

```javascript
export async function deleteItem(id) {
    await fetch(`${URL}/products/${id}`, {
        method: "DELETE"
    });
}
```

---

## Resumen de Headers
¡Tatúate esto! Siempre que mandes datos (`POST`, `PATCH`, `PUT`), necesitas:

```javascript
headers: {
    "Content-Type": "application/json"
}
```
Si olvidas esto, el servidor recibirá un objeto vacío `{}`.
