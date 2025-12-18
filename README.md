# Next.js Todo App with Clerk Authentication

Una aplicación de gestión de tareas moderna construida con **Next.js 16**, **TypeScript**, **Prisma** y **Clerk** para autenticación segura.

## 🎯 Descripción del Proyecto

Esta es una aplicación full-stack que permite a los usuarios autenticados crear, visualizar y eliminar tareas (todos). Cada usuario tiene acceso solo a sus propias tareas, garantizando privacidad y seguridad mediante autenticación con Clerk.

**Features principales:**

- ✅ Autenticación segura con Clerk
- ✅ CRUD de tareas (Crear, Leer, Eliminar)
- ✅ Validación con Zod
- ✅ Base de datos MongoDB con Prisma
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Notificaciones con React Hot Toast
- ✅ Server Actions para operaciones del backend

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Next.js 16** - Framework React con App Router
- **React 19.2** - Librería UI
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilos y diseño responsive
- **React Hot Toast** - Notificaciones
- **React Icons** - Iconografía

### Backend & Autenticación

- **Clerk** - Autenticación y gestión de usuarios
- **Prisma 6.19** - ORM para base de datos
- **MongoDB** - Base de datos NoSQL
- **Zod** - Validación de esquemas

### Desarrollo

- **TypeScript 5** - Tipado estático
- **pnpm** - Gestor de paquetes

## 📦 Instalación

### Requisitos previos

- Node.js 18+
- pnpm instalado
- Cuenta de MongoDB Atlas
- Cuenta de Clerk

### Pasos de instalación

1. **Clonar el repositorio:**

```bash
git clone <repository-url>
cd 05_next_actions_twich
```

2. **Instalar dependencias:**

```bash
pnpm install
```

3. **Configurar variables de entorno:**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/dbname"
```

4. **Configurar la base de datos:**

```bash
pnpm prisma db push
```

5. **Ejecutar en desarrollo:**

```bash
pnpm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (auth)/           # Route group para rutas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── todo/             # Funcionalidad de tareas
│   │   ├── actions/      # Server Actions (todo.actions.ts)
│   │   ├── components/   # Componentes (FormTodo, ListTodo, etc.)
│   │   ├── schema/       # Esquemas Zod
│   │   └── page.tsx
│   ├── globals.css       # Estilos globales
│   └── layout.tsx        # Layout raíz con ClerkProvider
├── lib/
│   └── prisma.ts         # Cliente Prisma
└── middleware.ts         # Middleware de Clerk
prisma/
├── schema.prisma         # Esquema de base de datos
pnpm-workspace.yaml
package.json
tsconfig.json
```

## 🚀 Características Principales

### Autenticación

- Login y registro con Clerk
- Protección de rutas
- Middleware de autenticación
- UserButton en el layout

### Gestión de Tareas

- Crear nuevas tareas
- Listar tareas del usuario
- Eliminar tareas
- Validación de entrada con Zod

### Server Actions

Las operaciones se realizan mediante Server Actions (`todo.actions.ts`):

- `createTodo()` - Crear tarea
- `deleteTodo()` - Eliminar tarea

### Seguridad

- Validación backend con Zod
- Verificación de autenticación en Server Actions
- Validación de ownership (cada usuario solo ve/elimina sus tareas)
- TypeScript para type safety

## 🔧 Comandos Disponibles

```bash
# Desarrollo
pnpm run dev

# Build para producción
pnpm run build

# Iniciar servidor de producción
pnpm start

# Gestionar base de datos
pnpm prisma db push      # Sincronizar schema
pnpm prisma studio      # Visualizar datos
pnpm prisma generate    # Regenerar Prisma Client
```

## 📋 Schema de Base de Datos

```prisma
model Todo {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  title String
  userId String
}
```

- **id**: Identificador único de la tarea
- **title**: Descripción de la tarea (máx 100 caracteres)
- **userId**: ID del usuario propietario (de Clerk)

## 🔐 Seguridad y Validación

### Validación con Zod

```typescript
TodoZodSchema = z.object({
  title: z.string().trim().min(1).max(100),
});
```

### Server Actions Protegidas

- Verifican autenticación con `auth()`
- Validan `userId` del usuario actual
- Validan ownership antes de modificar datos
- Logging de errores para debugging

## 🎨 Componentes Principales

### FormTodo

- Formulario para crear nuevas tareas
- Validación cliente y servidor
- Notificaciones de éxito/error

### ListTodo

- Listado de tareas del usuario
- Botón para eliminar tareas
- Loading states

### UserButton (Clerk)

- Menú de usuario en el header
- Botón de logout

## 📚 Recursos y Documentación

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Clerk Documentation](https://clerk.com/docs)
- [Zod Documentation](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre un issue primero para discutir los cambios propuestos.

## 📄 Licencia

Este proyecto es parte de un curso educativo y está disponible bajo licencia MIT.

---

## 👨‍💻 Autor

Proyecto desarrollado como parte del curso Udemy de Next.js:
[React JS con TypeScript y Next.js Curso Desarrollo FullStack](https://www.udemy.com/course/curso-react-js/)
