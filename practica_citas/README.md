# Práctica Examen: Sistema de Citas Médicas

Este proyecto simula una agenda médica.
Enfocado en **filtrado de datos** y **relaciones de estado** (Slot Disponible -> Ocupado).

## 🚀 Ejecución

1.  Abre una terminal en `Desktop/restaurante`.
2.  Levanta el servidor con la base de datos de citas:
    ```bash
    npx json-server --watch practica_citas/db.json
    ```
3.  Abre `practica_citas/index.html` con Live Server.

## 🔑 Credenciales

*   **Usuario (Paciente)**: `user@test.com` / `123`
*   **Admin (Personal)**: `admin@test.com` / `123`

## 🛠 Funcionalidades Clave

### 1. Paciente (User)
*   **Turnos Disponibles**: Filtra y muestra solo slots donde `status === 'available'`.
*   **Reservar**: Asigna el turno al usuario (`patientId`) y cambia `status` a `booked`.
*   **Mis Citas**: Filtra los slots donde `patientId === mi_id`.

### 2. Admin (Staff)
*   **Agenda**: Ve todos los turnos, ordenados por fecha/hora.
*   **Crear Turno**: Agrega nuevos slots disponibles a la base de datos.
*   **Liberar/Cancelar**: Devuelve un turno ocupado al estado `available` y borra el `patientId`.

## 🧠 Conceptos Practicados
*   **Filtering**: `slots.filter(s => s.status === 'available')`.
*   **Sorting**: `slots.sort(...)` por fecha.
*   **Data Modeling**: Relación Slot <-> Paciente.
