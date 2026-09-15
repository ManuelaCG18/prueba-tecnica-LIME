import { Router } from 'express';
import Location from '../models/Location';

const router = Router();

// lista el catalogo para el selector del formulario
router.get('/', async (req, res) => {
  try {
    const ubicaciones = await Location.find().sort({ name: 1, floor: 1 });
    res.json(ubicaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ubicaciones' });
  }
});

export default router;