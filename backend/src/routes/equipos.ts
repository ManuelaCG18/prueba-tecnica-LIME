import { Router } from 'express';
import Equipment from '../models/Equipment';

const router = Router();

// GET /equipos - Lista los equipos con filtros combinables
router.get('/', async (req, res) => {
  try {
    const { tipo_equipo, query } = req.query;
    
    // Objeto donde iremos agregando los filtros dinámicamente
    const filtro: any = {};

    // 1. Filtro exacto por tipo de equipo
    if (tipo_equipo) {
      filtro.equipment_type = tipo_equipo;
    }

    // 2. Búsqueda de texto libre (parcial e ignorando mayúsculas/minúsculas)
    if (query) {
      const regex = new RegExp(query as string, 'i');
      filtro.$or = [
        { name: regex },
        { brand: regex },
        { model: regex },
        { serial_number: regex },
        { inventory_code: regex }
      ];
    }

    // Usamos .populate('location') para traer los datos de la ubicación gracias a la llave foránea
    const equipos = await Equipment.find(filtro).populate('location').sort({ createdAt: -1 });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos' });
  }
});

// GET /equipos/:id - Consulta un equipo por su ID
router.get('/:id', async (req, res) => {
  try {
    const equipo = await Equipment.findById(req.params.id).populate('location');
    if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el equipo' });
  }
});

// PUT /equipos/:id - Modifica un equipo existente
router.put('/:id', async (req, res) => {
  try {
    const equipoActualizado = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('location');
    
    if (!equipoActualizado) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json(equipoActualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el equipo' });
  }
});

// DELETE /equipos/:id - Elimina un equipo existente
router.delete('/:id', async (req, res) => {
  try {
    const equipoEliminado = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipoEliminado) return res.status(404).json({ error: 'Equipo no encontrado' });
    res.json({ message: 'Equipo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el equipo' });
  }
});

export default router;