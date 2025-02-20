import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multipe";


describe('CheckService UseCase multiple', () => {
  const mockRepository = {
    saveLog: jest.fn().mockReturnValue(true),
    getLogs: jest.fn().mockReturnValue([]),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockRepository],
    successCallback,
    errorCallback,
  );

  beforeEach(() => {
    // Reiniciar los mocks de las funciones de callback antes de cada prueba
    successCallback.mockClear();
    errorCallback.mockClear();
  });

  test('should call successCallback when fetch returns true', async () => {
    // Simular fetch para que devuelva una respuesta exitosa
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true, // Simula una respuesta exitosa
      })
    ) as jest.Mock;

    const wasOk = await checkService.execute('https://google.com');

    expect(wasOk).toBe(true);
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
  });

  test('should call errorCallback when fetch returns false', async () => {
    // Simular fetch para que devuelva una respuesta no válida
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false, // Simula una respuesta no exitosa
      })
    ) as jest.Mock;

    const wasOk = await checkService.execute('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

    expect(wasOk).toBe(false);
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepository.saveLog).toBeCalledWith(expect.any(LogEntity));
  });
});
