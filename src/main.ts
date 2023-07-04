import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const config = new DocumentBuilder()
  .setTitle('Carrinho de compras')
  .setDescription('Carrinho de compras em Nestjs')
  .setVersion('1.0')
  .build();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
