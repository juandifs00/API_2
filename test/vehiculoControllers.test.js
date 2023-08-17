const db = require('../services/db');
const {obtener_vehiculos,  obtener_vehiculos_id, crear_vehiculo, actualizar_vehiculo, eliminar_vehiculo} = require('../controllers/VehiculoControllers');

describe('obtener_vehiculos', () => {

    // Tests that the function returns all artists from the database
    it('Debe devoler todos los vehiculos de la base de datos', async () => {
      const mockResult = { rows: ['Vehiculo1', 'Vehiculo2'] };
      db.execute = jest.fn().mockResolvedValue(mockResult);
      const mockJson = jest.fn();
      const res = { json: mockJson };

      await obtener_vehiculos({}, res);

      expect(db.execute).toHaveBeenCalledWith('SELECT * FROM Vehiculo');
      expect(mockJson).toHaveBeenCalledWith(mockResult.rows);
    });

})