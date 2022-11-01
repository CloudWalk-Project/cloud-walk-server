import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('IArte')
    .setDescription('E-commerce backoffice software')
    .setVersion('1.0.0')
    .addTag('Status')
    .addTag('Auth')
    .addTag('User')
    .addTag('Category')
    .addTag('Voucher')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
