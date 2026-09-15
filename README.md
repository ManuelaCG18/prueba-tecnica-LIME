# Sistema de Gestión de Inventario Medico

Prueba técnica desarrollada para la gestión de equipos médicos.

Desarrollado por Manuela Castaño García

# Tecnologías Utilizadas

### Backend
* **Node.js (v24) & Express:** Creación de API RESTful.
* **TypeScript & TSX:** Tipado estricto y ejecución moderna.
* **MongoDB Atlas & Mongoose:** Base de datos NoSQL en la nube con modelado de esquemas.

### Frontend
* **Angular (v17+):** Uso de Standalone Components y nueva sintaxis de control de flujo.
* **Bootstrap 5:** Diseño responsivo y componentes de interfaz (Modales, Tablas).
* **RxJS & HttpClient:** Consumo asíncrono de la API REST.

---

## Decisiones Técnicas Destacadas

1. **Estructura Monorepo:** Se separó lógicamente el proyecto en `backend` y `frontend` dentro del mismo repositorio para facilitar la revisión y mantener las dependencias aisladas.
2. **Búsqueda Avanzada ($regex):** En lugar de hacer múltiples peticiones, se implementó un endpoint robusto que utiliza `$or` y expresiones regulares en MongoDB y permitiendo búsquedas de texto libre.
3. **Manejo de Relaciones:** Se implementó una relación mediante `ObjectId` entre las colecciones `locations` y `equipment`, utilizando `.populate()` en las consultas para evitar redundancia de datos.
4. **Standalone Components:** Se adoptó la arquitectura más moderna de Angular, omitiendo el tradicional `AppModule` para tener un código más limpio, directo y fácil de mantener.

---

## Instrucciones de Instalación y Ejecución

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/ManuelaCG18/prueba-tecnica-LIME.git
cd prueba-tecnica-LIME
\`\`\`

### 2. Configurar y levantar el Backend
\`\`\`bash
cd backend
npm install
# Asegurarse de tener el archivo .env configurado con MONGO_URI y PORT
npx tsx src/scripts/seed.ts  # (Opcional) Para poblar la base de datos
npx tsx watch src/server.ts  # Levantar el servidor en http://localhost:3000
\`\`\`

### 3. Configurar y levantar el Frontend (En otra terminal)
\`\`\`bash
cd frontend
npm install --legacy-peer-deps
npm start  # Levanta la aplicación en http://localhost:4200
\`\`\`
