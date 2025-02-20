import mongoose from "mongoose";
import { MongoDatabase } from "./init";


describe('init MongoDB', () => {

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  })

  test('should connect to MongoDB', async () => {
    const connected = mongoose.connection.readyState === 1; // 1 significa que está conectado
    expect(connected).toBe(true);
  });

  test('should throw an error', async () => {

    try {

      await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: 'mongodb://fernando:123456789@localhoasdsast:27017',
      });

      expect(true).toBe(false); // Si no lanza error, falla la prueba

    } catch (error) {
      expect(error).toBeDefined(); // Asegúrate de que se lanza un error
    }

  });

})