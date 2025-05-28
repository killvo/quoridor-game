import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import knex from 'knex';
import { Model } from 'objection';

import { AppModule } from '~modules/app/app.module';
import { EnvironmentVariable } from '~shared/enums/environment-variable.enum';

import knexConfig from '../knexfile';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api', {
    // The root / path is used for app health and excluded from the api prefixing
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const db = knex(knexConfig);
  Model.knex(db);
  const port = configService.get<string>(EnvironmentVariable.PORT) ?? '4000';
  await app.listen(port);
}

bootstrap().catch(err => {
  console.error('Error during application bootstrap:', err);
  process.exit(1);
});
