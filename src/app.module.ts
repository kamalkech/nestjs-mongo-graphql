import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ResolversModule } from './resolvers/resolvers.module';

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
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: async () => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql'),
          uploads: false,
          sortSchema: true,
          introspection: true,
          playground: true,
          debug: true,
          cors: {
            credentials: true,
            origin: true,
          },
          installSubscriptionHandlers: true,
          // subscriptions: {
          //   'graphql-ws': true
          // },
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    AdminModule,
    DatabaseModule,
    ResolversModule,
  ],
})
export class AppModule {}
