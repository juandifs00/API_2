const db = require('../services/db');
const { obtener_vehiculos, eliminar_vehiculo } = require('../controllers/VehiculoControllers');
const assert = require('assert');

jest.mock('../services/db');

describe('obtener_vehiculos', () => {

  it('Debe devoler todos los vehiculos de la base de datos', async () => {
    const mockResult = { rows: ['Vehiculo1', 'Vehiculo2'] };
    db.execute = jest.fn().mockResolvedValue(mockResult);
    const mockJson = jest.fn();
    const res = { json: mockJson };

    await obtener_vehiculos({}, res);

    expect(db.execute).toHaveBeenCalledWith('SELECT * FROM Vehiculo');
    expect(mockJson).toHaveBeenCalledWith(mockResult.rows);
  });
});


describe('eliminar_vehiculo', () => {
  it('debería eliminar un vehículo por su ID', async () => {
    const mockVehiculoId = 1;

    // Simula la función execute de la base de datos
    const db = {
      execute: async (query) => {
        assert.ok(query.includes(`DELETE FROM Vehiculo WHERE id = '${mockVehiculoId}'`));
      }
    };

    const req = {
      params: {
        id: mockVehiculoId
      }
    };
    let statusCode = null;

    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: () => { }
    };

    await eliminar_vehiculo(req, res);
    assert.strictEqual(statusCode, 200);
  });
});
