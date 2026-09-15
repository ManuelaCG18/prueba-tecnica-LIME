import express from 'express';
import cors from 'cors';
import ubicacionesRoutes from './routes/ubicaciones';
// Pronto agregaremos la de equipos aquí

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.use('/ubicaciones', ubicacionesRoutes);

export default app;