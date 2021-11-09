import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable upload files.
  app.use(graphqlUploadExpress());

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
