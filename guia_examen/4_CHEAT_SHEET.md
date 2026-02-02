# ⚡ Cheat Sheet (Lo Esencial)

Ten esto abierto en una pestaña. Son las cosas que siempre se olvidan.

## 🎨 Tailwind CSS (CDN)
Pégalo en el `<head>` de tu HTML para tener estilos al instante.
```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

## 🔐 Guard (Protección de Rutas)
Pégalo al inicio del `<head>` de tus HTMLs privados (admin/dashboard).
```html
<script type="module">
    const user = localStorage.getItem("session");
    if (!user) window.location.href = "index.html";
</script>
```

## 📅 Obtener Fecha de Hoy (ISO Simple)
Para guardar fecha de registro o compra.
```javascript
const hoy = new Date().toISOString().split('T')[0]; // "2024-02-02"
```

## 🔢 Convertir Inputs (¡Cuidado!)
Los inputs HTML SIEMPRE devuelven texto ("5").
*   Para sumas/restas: `parseInt(input.value)` o `parseFloat(input.value)`.
*   Para dinero: `Number(input.value).toFixed(2)` (devuelve string "10.00").

## 🔄 Redirigir con JS
```javascript
window.location.href = "./dashboard.html";
```

## 💾 LocalStorage (Sesión)
*   **Guardar**: `localStorage.setItem("user", JSON.stringify(objetoUser));`
*   **Leer**: `const user = JSON.parse(localStorage.getItem("user"));`
*   **Borrar (Logout)**: `localStorage.removeItem("user");`

## 🧠 Lógica de Filtros (Arrays)
```javascript
// Filtrar (Solo los activos)
const activos = lista.filter(item => item.active === true);

// Encontrar (El primero que coincida)
const usuario = lista.find(u => u.id === "1");

// Mapear (Transformar lista, ej: solo nombres)
const nombres = lista.map(u => u.name);

// Algún (¿Existe duplicado?)
const existe = lista.some(u => u.email === "test@test.com");
```
