import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

// Descripción del conjunto de pruebas para LogDatasource
describe('log.datasource.ts LogDatasource', ()=> {

  // Creación de una nueva instancia de LogEntity para pruebas
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: LogSeverityLevel.LOW
  })

  // Clase mock que implementa LogDatasource para pruebas
  class MockLogDatasource implements LogDatasource {

    // Método simulado para guardar un log
    async saveLog( log: LogEntity ): Promise<void> {
      return;
    }
    // Método simulado para obtener logs por nivel de severidad
    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
      return [newLog]
    }

  }

  // Prueba para verificar la clase abstracta
  test('should test the abstract class', async() => {

    const mockLogDatasource = new MockLogDatasource();

    // Verificar que la instancia es de MockLogDatasource
    expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
    // Verificar que saveLog es una función
    expect( typeof mockLogDatasource.saveLog ).toBe( 'function' );
    // Verificar que getLogs es una función
    expect( typeof mockLogDatasource.getLogs ).toBe( 'function' );

    // Llamar al método saveLog con newLog
    await mockLogDatasource.saveLog( newLog );
    // Obtener logs con nivel de severidad HIGH
    const logs = await mockLogDatasource.getLogs( LogSeverityLevel.HIGH );

    // Verificar que la longitud de logs es 1
    expect( logs ).toHaveLength(1)
    // Verificar que el primer log es una instancia de LogEntity
    expect( logs[0]).toBeInstanceOf( LogEntity );

  })

})