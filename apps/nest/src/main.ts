import { AppModule } from '@modules/app';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const logger = new Logger('bootstrap');

  // DTO validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Helmet TODO
  app.use(helmet());

  // Swagger
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('twitterClone')
      .setDescription('twitter API description')
      .setVersion('1.0')
      .build(),
  );

  SwaggerModule.setup('api', app, document);

  // Misc
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: ['http://localhost:3000', 'https://tw1ttr.netlify.app'],
    credentials: true,
  });
  app.setGlobalPrefix('/v1');

  await app.listen(config.get('port'));
  logger.log(`Application listening on port ${config.get('port')}`);
}
bootstrap();
