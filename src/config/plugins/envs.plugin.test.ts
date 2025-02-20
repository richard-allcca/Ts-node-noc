import { envs } from './envs.plugin';



describe('envs.plugin.ts', () => {


  test('should return env options', ()=> {

    // console.log(process.env);

    expect( envs ).toEqual({
      PORT: 3000,
      PROD: true,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'rallcca28@gmail.com',
      MAILER_SECRET_KEY: 'hiyndazdgribufnr',
      MONGO_URL: 'mongodb://richard:123456@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'richard',
      MONGO_PASS: '123456',
    });


  });


  test('should return error if not found env', async() => {

    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugin');
      expect(true).toBe(false);


    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }


  })



})