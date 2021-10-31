import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = async () =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongod = await MongoMemoryServer.create();
      const mongoUri = await mongod.getUri();
      return {
        uri: mongoUri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: true,
        // useCreateIndex: true,
      };
    },
  });

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
