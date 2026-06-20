# Glow Beauty — Full Stack

## Requisitos
- Node.js 18+
- MySQL 8+ corriendo localmente
- Base de datos `glow_beauty` creada (`CREATE DATABASE glow_beauty;`)

## Backend

```bash
cd backend
cp .env.example .env   # editar DB_PASSWORD si hace falta
npm install
npm run seed           # crea admin + 14 productos + 12 accesorios
npm run dev            # levanta en http://localhost:3001
```

## Frontend

```bash
cd frontend
npm install
npm run dev            # levanta en http://localhost:5173
```

## Credenciales
- **Admin:** usuario `Admin` / contraseña `Admin123`
- **Usuario:** registrarse desde `/register`
