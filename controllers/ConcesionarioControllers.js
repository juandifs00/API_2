const db = require('../services/db');

const obtener_concesionarios = async (req, res) => {
  try {
    const query = 'SELECT * FROM Concesionario';
    const result = await db.execute(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const obtener_concesionario_id = async (req, res) => {
  const concesionarioId = req.params.id;
  try {
    const query = `SELECT * FROM Concesionario WHERE concesionario_id = '${concesionarioId}'`;
    const result = await db.execute(query);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Concesionarios no encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const crear_concesionario = async (req, res) => {
  const { concesionario_id, idVehiculo, tipo_vehiculo, tipo_combustible, estado_vehiculo } = req.body;
  try {
    const query = `INSERT INTO Concesionario (concesionario_id, idVehiculo, tipo_vehiculo, tipo_combustible, estado_vehiculo) VALUES(default, '${idVehiculo}', '${tipo_vehiculo}', '${tipo_combustible}', '${estado_vehiculo}')`;
    await db.execute(query);
    res.status(201).json({ message: 'Concesionario creado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

const actualizar_concesionario = async (req, res) => {
  const concesionarioId = req.params.id;
  const { concesionario_id, idVehiculo, tipo_vehiculo, tipo_combustible, estado_vehiculo } = req.body;
  try {
    const query = `UPDATE Concesionario SET concesionario_id = '${concesionario_id}', idVehiculo = '${idVehiculo}', tipo_vehiculo = '${tipo_vehiculo}' , tipo_combustible = '${tipo_combustible}', estado_vehiculo = ${estado_vehiculo} WHERE concesionario_id = '${concesionarioId}'`;
    await db.execute(query);
    res.status(201).json({ message: 'Concesionario actualizado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

const eliminar_concesionario = async (req, res) => {
  const concesionarioId = req.params.id;
  try {
    const query = `DELETE FROM Concesionario WHERE concesionario_id = '${concesionarioId}';`;
    await db.execute(query);
    res.status(200).json({ message: 'Concesionario eliminado exitosamente' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  obtener_concesionarios,
  obtener_concesionario_id,
  crear_concesionario,
  actualizar_concesionario,
  eliminar_concesionario
}
