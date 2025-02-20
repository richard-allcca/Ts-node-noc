import { CronService } from "./cron-service";


describe('CronService', () => {

  const mockTick = jest.fn();

  //jest.clearAllMocks


  test('should create a job',(done) => {

    const job = CronService.createJob('* * * * * *', mockTick );

    setTimeout(() => {
      // mockTick debe haber sido llamada 2 veces
      expect( mockTick ).toBeCalledTimes(2);

      // Indicar que se debe detener en trabajo creado
      job.stop();

      done(); // Pide que espere en este test hasta que mande a llamar 'done'
    }, 2000);


  })


})