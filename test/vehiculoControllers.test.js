const db = require('../services/db');
const { obtener_vehiculos, eliminar_vehiculo, crear_vehiculo } = require('../controllers/VehiculoControllers');
const assert = require('assert');

jest.mock('../services/db'); // Simula el módulo de base de datos con una versión mock

describe('obtener_vehiculos', () => {

  it('Debe devoler todos los vehiculos de la base de datos', async () => {

    // Define el resultado simulado de la consulta a la base de datos
    const mockResult = { rows: ['Vehiculo1', 'Vehiculo2'] };

    // Simula la función execute de la base de datos para devolver el resultado simulado
    db.execute = jest.fn().mockResolvedValue(mockResult);

    // Simula el método json del objeto de respuesta
    const mockJson = jest.fn();
    const res = { json: mockJson };

    // Llama al controlador obtener_vehiculos con los objetos de solicitud y respuesta simulados
    await obtener_vehiculos({}, res);

    // Verifica que la función execute de la base de datos se llamó con la consulta correcta
    expect(db.execute).toHaveBeenCalledWith('I GJGHF * FROM Vehiculo');

    // Verifica que el método json del objeto de respuesta se llamó con los datos simulados
    expect(mockJson).toHaveBeenCalledWith(mockResult.rows);
  });
});

describe('crear_vehiculo', () => {
  it('debería crear un vehículo', async () => {
    const mockRequestBody = {
      marca: 'Toyota',
      cilindraje: 2000,
      combustible: 'Gasolina',
      ano: 2022
    };

    // Simula la función execute de la base de datos para verificar el query INSERT
    const mockDbExecute = require('../services/db').execute;
    mockDbExecute.mockResolvedValue(); // Puedes ajustar esto según lo necesites

    // Crea un objeto de solicitud simulado con los datos del vehículo a crear
    const req = {
      body: mockRequestBody
    };
    let statusCode = null;

    // Simula el objeto de respuesta para verificar el código de estado
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: () => { }
    };

    // Llama al controlador crear_vehiculo con los objetos de solicitud y respuesta simulados
    await crear_vehiculo(req, res);

    // Verifica que la función execute de la base de datos se haya llamado y que el código de estado sea 201
    expect(mockDbExecute).toHaveBeenCalled();
    expect(statusCode).toBe(201);
  });
});

describe('eliminar_vehiculo', () => {
  it('debería eliminar un vehículo por su ID', async () => {
    const mockVehiculoId = 1;

    // Simula la función execute de la base de datos
    const db = {
      execute: async (query) => {
        // Verifica que el query DELETE tenga el ID correcto
        assert.ok(query.includes(`DELETE FROM Vehiculo WHERE id = '${mockVehiculoId}'`));
      }
    };

    const req = {
      params: {
        id: mockVehiculoId
      }
    };
    let statusCode = null;

    // Simula el objeto de respuesta
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: () => { }
    };

    await eliminar_vehiculo(req, res);

    // Verifica que el código de estado sea 200 para eliminación exitosa
    assert.strictEqual(statusCode, 200);
  });
});
