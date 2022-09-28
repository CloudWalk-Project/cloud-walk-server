import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/swagger/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  app.enableCors();

  await app.listen(process.env.PORT || 3001);

  console.log(`

              It's Alive!!!!

  Swagger: http://localhost:3001/api
  `);
}
bootstrap();
