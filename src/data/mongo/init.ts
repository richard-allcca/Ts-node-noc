import mongoose from "mongoose";

interface IConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {

  static async connect(options: IConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {

      await mongoose.connect(mongoUrl, {
        dbName
      });

      console.log('Connected to MongoDB');

    } catch (error) {
      console.log(error);
      throw new Error('Error connecting to MongoDB');
    }
  }
}