import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          // useFindAndModify: false,
          // useCreateIndex: true,
        }
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      include: [AdminModule],
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      sortSchema: true,
      debug: true,
      playground: true,
    }),
    AdminModule,
    DatabaseModule
  ],
})
export class AppModule {}
