import express from 'express';
import cors from 'cors';
import ubicacionesRoutes from './routes/ubicaciones';
import equiposRoutes from './routes/equipos';


const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.use('/ubicaciones', ubicacionesRoutes);
app.use('/equipos', equiposRoutes);

export default app;