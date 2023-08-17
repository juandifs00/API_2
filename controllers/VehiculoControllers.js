const db = require('../services/db');

const obtener_vehiculos = async (req, res) => {
    try {
      const query = 'SELECT * FROM Vehiculo';
      const result = await db.execute(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const obtener_vehiculos_id = async (req, res) => {
    const vehiculoId = req.params.id;
    try {
      const query = `SELECT * FROM Vehiculo WHERE id = '${vehiculoId}'`;
      const result = await db.execute(query);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: 'Vehiculo no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const crear_vehiculo = async (req, res) => {
    const { id, marca, cilindraje, combustible, ano } = req.body;
    try {
      const query = `INSERT INTO Vehiculo (id, marca, cilindraje, combustible, ano) VALUES(default, '${marca}', '${cilindraje}', '${combustible}', '${ano}')`;
      await db.execute(query);
      res.status(201).json({ message: 'Vehiculo creado exitosamente' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const actualizar_vehiculo = async (req, res) => {
    const vehiculoId = req.params.id;
    const { id, marca, cilindraje, combustible, ano } = req.body;
    try {
      const query = `UPDATE Vehiculo SET id = '${id}', marca = '${marca}', cilindraje = '${cilindraje}' , combustible = '${combustible}', ano = ${ano} WHERE id = '${vehiculoId}'`;
      await db.execute(query);
      res.status(201).json({ message: 'vehiculo actualizado exitosamente' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const eliminar_vehiculo = async (req, res) => {
    const vehiculoId = req.params.id;
    try {
      const query = `DELETE FROM Vehiculo WHERE id = '${vehiculoId}';`;
      await db.execute(query);
      res.status(200).json({ message: 'Vehiculo eliminado exitosamente' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  };



module.exports = {obtener_vehiculos, obtener_vehiculos_id, crear_vehiculo, eliminar_vehiculo, actualizar_vehiculo}
  