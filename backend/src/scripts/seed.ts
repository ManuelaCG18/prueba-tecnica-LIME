import mongoose from 'mongoose';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import connectDB from '../config/db';
import Location from '../models/Location';
import Equipment from '../models/Equipment';

const loadData = async () => {
  await connectDB();

  console.log('Limpiando base de datos (evitando duplicados)...');
  await Location.deleteMany({});
  await Equipment.deleteMany({});

  const results: any[] = [];
  const csvFilePath = path.join(__dirname, '../../medical_equipment.csv');

  console.log('Leyendo archivo CSV...');

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data: any) => results.push(data))
    .on('end', async () => {
      try {
        console.log(`CSV leído con éxito. Se encontraron ${results.length} registros.`);
        
        // 1. Extraer y guardar las ubicaciones únicas
        const locationsMap = new Map();
        
        for (const row of results) {
          const locKey = `${row.location}-${row.floor}`;
          if (!locationsMap.has(locKey)) {
            // Guardar en la BD
            const newLocation = await Location.create({
              name: row.location,
              floor: row.floor
            });
            locationsMap.set(locKey, newLocation._id);
          }
        }
        console.log(`${locationsMap.size} ubicaciones únicas guardadas.`);

        // 2. Guardar los equipos relacionándolos con el ObjectId de su ubicación
        const equipmentPromises = results.map(row => {
          const locKey = `${row.location}-${row.floor}`;
          return Equipment.create({
            name: row.name,
            equipment_type: row.equipment_type,
            brand: row.brand,
            model: row.model,
            serial_number: row.serial_number,
            inventory_code: row.inventory_code,
            entry_date: new Date(row.entry_date),
            location: locationsMap.get(locKey) // Relación mediante llave foránea
          });
        });

        await Promise.all(equipmentPromises);
        console.log('Todos los equipos fueron guardados exitosamente.');

        process.exit();
      } catch (error) {
        console.error('Error importando los datos:', error);
        process.exit(1);
      }
    });
};

loadData();