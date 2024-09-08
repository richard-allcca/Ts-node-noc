import mongoose from "mongoose";

interface IConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  private static isConnected: boolean = false;

  static async connect(options: IConnectionOptions) {
    const { mongoUrl, dbName } = options;

    if (this.isConnected) {
      console.log('Already connected to MongoDB');
      return true; // Ya está conectado
    }

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });

      this.isConnected = true; // Marca como conectado
      console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      console.log(error);
      throw new Error('Error connecting to MongoDB');
    }
  }

  static async disconnect() {
    if (this.isConnected) {
      await mongoose.connection.close();
      this.isConnected = false; // Marca como desconectado
      console.log('Disconnected from MongoDB');
    }
  }
}
