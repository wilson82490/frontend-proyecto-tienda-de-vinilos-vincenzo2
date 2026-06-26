# Frontend Catálogo de vinilos 

Proyecto final del Bootcamp de Neoland Web Development.

## Descripcion

Aplicación web para gestionar un catálogo de vinilos

## Tecnologias

- React
- Vite
- CSS
- JavaScript

## Clonar el repositorio

```shell
git clone https://github.com/wilson82490/frontend-proyecto-tienda-de-vinilos-vincenzo2.git

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
