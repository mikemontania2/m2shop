# M2shop-api

Backend en Node 18 + Express + Sequelize + Postgres.

## Variables de entorno (.env)

- PORT=3000
- DB_CNN=postgres://user:password@host:5432/m2shop
- DB_INIT=false  # true para recrear tablas y seed inicial

## Scripts

- npm run dev
- npm start

## Endpoints

- GET /health
- GET /api/categories
- GET /api/products?category_slug=&is_featured=&is_new=&search=
- GET /api/products/slug/:slug
- POST /api/orders  { customer_name, customer_email, customer_phone, shipping_address, items:[{product_id, quantity}] }

