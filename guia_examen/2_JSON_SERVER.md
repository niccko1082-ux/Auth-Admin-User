# 🗄️ Guía de JSON Server

JSON Server es tu "Base de Datos" de mentira. Es un archivo de texto (`db.json`) que funciona como una API real.

## 1. Comandos Mágicos

### Instalar (Si no te funciona npx)
```bash
npm install -g json-server
```

### **LEVANTAR EL SERVIDOR (El 99% de las veces usarás este)**
Asegúrate de estar en la carpeta donde está `db.json` o indica la ruta correcta.
```bash
npx json-server --watch db.json --port 3000
```
*   `--watch`: Reinicia si cambias el archivo manualmente.
*   `--port`: Por defecto es 3000. Si está ocupado, usa 3001.

---

## 2. Estructura de `db.json` (Tu "Schema")

Siempre empieza con un Objeto `{}` que contiene Arrays `[]`. Cada Array es una "Tabla".

**Ejemplo Perfecto:**
```json
{
  "users": [ 
    { "id": "1", "email": "a@a.com", "role": "admin" } 
  ],
  "products": [
    { "id": "1", "name": "Coca Cola", "price": 2 }
  ],
  "orders": []
}
```

> ⚠️ **IMPORTANTE:**
> 1.  Los `id` los genera JSON Server automáticamente como strings ("1", "xyz").
> 2.  Nunca dejes comas `,` al final del último elemento de una lista (JSON inválido).

---

## 3. Filtrado "Gratis" (Trucos de URL)

JSON Server hace magia si le pasas parámetros en la URL. No necesitas filtrar con `filter()` en JS si usas esto:

| Acción | URL (Ejemplo) | JS Fetch |
| :--- | :--- | :--- |
| **Buscar por Email** (Login) | `/users?email=juan@test.com` | `fetch(url + '/users?email=' + email)` |
| **Buscar por ID** | `/users/1` | `fetch(url + '/users/1')` |
| **Filtrar por Categoría** | `/products?category=food` | `fetch(url + '/products?category=food')` |
| **Paginar** (Opcional) | `/posts?_page=1&_limit=10` | (Raro que lo pidan en examen) |
| **Ordenar** | `/posts?_sort=price&_order=asc` | (Útil para precios) |

---

## 4. Errores Comunes

*   **"Connection Refused"**: No has levantado el servidor. Abre la terminal y ejecuta el comando.
*   **"404 Not Found"**: Escribiste mal la ruta (ej: `/user` en vez de `/users` plural). Revisa tu `db.json`.
*   **No guarda datos**: Revisa permisos de archivo o reinicia la terminal.
