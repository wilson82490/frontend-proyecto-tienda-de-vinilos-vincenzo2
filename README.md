# Vinilos Frontend

Aplicación web de tienda de vinilos desarrollada con React. Consume la API REST del backend para mostrar el catálogo, gestionar el carrito de compras en el cliente y ofrecer un panel de administración para usuarios con rol admin.

---

## Características

- **Catálogo de vinilos** con paginación, búsqueda, ordenamiento y filtro por género
- **Vinilos destacados** en la página de inicio
- **Detalle de vinilo** con precio formateado
- **Carrito de compras** persistente en `localStorage` (Context API)
- Botón **Agregar al carrito** (`AddToCartButton`) e icono con contador en la barra de navegación
- Página de carrito en `/carrito` con gestión de cantidades y total
- **Registro e inicio de sesión** con JWT (Context API de autenticación)
- **Panel de administración** con CRUD de vinilos (solo usuarios admin)
- Rutas protegidas mediante loader y verificación de rol
- Tests con **Vitest** y **Testing Library**

---

## Stack tecnológico

| Tecnología | Versión / Uso |
|---|---|
| React | 19 |
| Vite | 8 — bundler y dev server |
| React Router | 7 — enrutamiento |
| Context API | AuthContext + CartContext |
| Tailwind CSS | 4 — estilos |
| Vitest + Testing Library | Tests unitarios |
| Fetch API | Comunicación con el backend |

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [npm](https://www.npmjs.com/)
- Backend de vinilos en ejecución (local o desplegado)
- Repositorio clonado en tu máquina

---

## Instalación y configuración

### 1. Clonar e instalar

```bash
git clone <url-del-repositorio>
cd frontend-proyecto-tienda-de-vinilos-vincenzo2
git switch dev
npm install
```

### 2. Variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env-example .env
```

Contenido de `.env-example`:

```env
VITE_API_URL=http://localhost:3000/api
```

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API. Puede incluir o no el sufijo `/api`; el servicio normaliza la ruta automáticamente |

**Ejemplos válidos:**

```env
# Recomendado (con /api)
VITE_API_URL=http://localhost:3000/api

# También válido (sin /api)
VITE_API_URL=http://localhost:3000
```

**Producción:**

```env
VITE_API_URL=https://mi-api.onrender.com/api
```

> En desarrollo, Vite también puede redirigir peticiones a `/api` hacia `http://localhost:3000` mediante proxy (ver `vite.config.js`).

---

## Ejecución

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en:

```txt
http://localhost:5173
```

Asegúrate de tener el backend corriendo en el puerto configurado (por defecto `3000`).

### Build de producción

```bash
npm run build
```

Los archivos generados se encuentran en `dist/`.

### Previsualizar build

```bash
npm run preview
```

### Tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

---

## Rutas de la aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Vinilos destacados y acceso al catálogo |
| `/vinilos` | VinilosPage | Catálogo con paginación, búsqueda, orden y filtro por género |
| `/vinilos/:id` | ViniloDetailPage | Detalle del vinilo con precio y botón de carrito |
| `/carrito` | CartPage | Carrito de compras con cantidades y total |
| `/auth/register` | RegisterPage | Registro de usuario |
| `/auth/login` | LoginPage | Inicio de sesión |
| `/admin` | DashboardPage | Panel admin (requiere rol admin) |
| `/admin/vinilos` | AdminVinilosPage | CRUD de vinilos (requiere rol admin) |

---

## Funcionalidades principales

### Catálogo

- Consume `GET /api/vinilos` con query params: `page`, `limit`, `search`, `genre`, `sortBy`, `order`
- Obtiene géneros disponibles desde `GET /api/vinilos/genres`
- Muestra precio formateado con `formatPrice`

### Página de inicio

- Muestra vinilos destacados desde `GET /api/vinilos/featured`

### Carrito de compras

- Estado gestionado con **CartContext** (`src/context/CartContext.jsx`)
- Persistencia en **localStorage** bajo la clave `cart`
- Hook `useCart` para acceder al contexto
- Componentes: `AddToCartButton`, `CartIcon`, `CartPage`
- Operaciones: agregar, incrementar/decrementar cantidad, eliminar ítem, vaciar carrito, calcular total

### Autenticación

- Estado gestionado con **AuthContext** (`src/context/AuthContext.jsx`)
- Al iniciar sesión se guardan `token` y `user` en `localStorage`
- Las rutas bajo `/admin` usan `adminLoader` para verificar token y rol de administrador

### Panel de administración

- Crear, editar y eliminar vinilos (incluye campo **price**)
- Requiere credenciales de admin (ver backend: `admin@vinilos.com` / `admin123` tras ejecutar `npm run seed:users`)

---

## Backend asociado

Este frontend consume la API REST del proyecto backend:

- Node.js + Express + MongoDB + JWT

Repositorio del backend:

```txt
https://github.com/wilson82490/backend-proyecto-tienda-de-vinilos-vincenzo2
```

---

## Estructura del proyecto

```txt
frontend-proyecto-tienda-de-vinilos-vincenzo2/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddToCartButton.jsx
│   │   ├── CartIcon.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── SearchBox.jsx
│   │   ├── ViniloCard.jsx
│   │   ├── ViniloCarousel.jsx
│   │   ├── ViniloFilters.jsx
│   │   ├── ViniloForm.jsx
│   │   └── ViniloList.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── data/
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useFilteredSortedVinilos.jsx
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── MainLayout.jsx
│   ├── loaders/
│   │   └── adminLoader.js
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminVinilosPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ViniloDetailPage.jsx
│   │   └── VinilosPage.jsx
│   ├── routes/
│   │   └── router.jsx
│   ├── services/
│   │   ├── authService.js
│   │   └── viniloService.js
│   ├── test/
│   │   ├── Navbar.test.jsx
│   │   ├── ViniloCard.test.jsx
│   │   └── ViniloForm.test.jsx
│   ├── utils/
│   │   └── formatPrice.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── setupTest.js
├── vite.config.js
├── .env-example
└── package.json
```

---

## Deploy

Frontend desplegado en Netlify:

```txt
https://tu-proyecto.netlify.app
```

Backend desplegado en Render:

```txt
https://tu-api.onrender.com
```

---

## Autor

Proyecto desarrollado como práctica del curso Full Stack de Neoland.

**Autor:** Vincenzo Acconcia
