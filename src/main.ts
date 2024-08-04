import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const mikroOrm = app.get(MikroORM);
  await mikroOrm.getMigrator().up();

  await app.listen(3000);
}
bootstrap();
