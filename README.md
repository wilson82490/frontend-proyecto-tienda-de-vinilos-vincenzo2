# Vinilos Frontend

Aplicación web desarrollada con React para consultar, buscar y administrar vinilos consumiendo una API REST.

## Características

- Listado de vinilos
- Búsqueda en tiempo real
- Filtros y ordenamiento
- Vista de detalle
- Panel de administración
- Crear vinilos
- Editar vinilos
- Eliminar vinilos
- Registro de usuarios
- Inicio de sesión con JWT
- Rutas protegidas mediante autenticación y rol de administrador
- Testing básico con Vitest

---

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Context API
- Tailwind CSS
- Fetch API
- Vitest
- Testing Library

---

## Instalación

Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

Ingresar al proyecto:

```bash
cd frontend-proyecto-tienda-de-vinilos-vincenzo2
```

Cambiar a la rama `dev`:

```bash
git switch dev
```

Instalar dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto a partir de `.env-example`:

```bash
cp .env-example .env
```

### .env-example

```env
VITE_API_URL=http://localhost:3000
```

### Ejemplo local

```env
VITE_API_URL=http://localhost:3000
```

También puedes usar la URL con el prefijo `/api`:

```env
VITE_API_URL=http://localhost:3000/api
```

### Ejemplo producción

```env
VITE_API_URL=https://mi-api.onrender.com/api
```

---

## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:5173
```

En desarrollo, Vite también puede redirigir las peticiones a `/api` hacia `http://localhost:3000` mediante proxy.

---

## Ejecutar tests

```bash
npm test
```

---

## Generar build de producción

```bash
npm run build
```

Los archivos generados se encontrarán en:

```txt
dist/
```

Para previsualizar el build localmente:

```bash
npm run preview
```

---

## Backend

Este proyecto consume una API REST desarrollada con:

- Node.js
- Express
- MongoDB Atlas
- JWT

La URL del backend se configura mediante:

```env
VITE_API_URL
```

Repositorio del backend:

```txt
https://github.com/wilson82490/backend-proyecto-tienda-de-vinilos-vincenzo2
```

---

## Estructura del proyecto

```txt
src/
│
├── components/
├── context/
├── data/
├── hooks/
├── layouts/
├── loaders/
├── pages/
│   └── admin/
├── routes/
├── services/
├── test/
│
├── App.jsx
├── main.jsx
└── setupTest.js
```

---

## Autenticación

La aplicación utiliza JWT.

Al iniciar sesión se almacenan:

```txt
token
user
```

en el Local Storage del navegador.

Las rutas bajo `/admin` requieren un usuario autenticado con rol de administrador.

---

## Deploy

Frontend desplegado en:

```txt
https://tu-proyecto.netlify.app
```

Backend desplegado en:

```txt
https://tu-api.onrender.com
```

---

## Autor

Proyecto desarrollado como práctica del curso Full Stack de Neoland.

Autor: Vincenzo Acconcia
