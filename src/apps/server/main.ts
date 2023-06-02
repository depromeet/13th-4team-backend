import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EnvEnum } from '📚libs/modules/env/env.enum';
import { EnvService } from '📚libs/modules/env/env.service';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //환경변수 가져오기
  const envService = app.get(EnvService);
  const PORT = +envService.get(EnvEnum.PORT) || 3000;

  const config = new DocumentBuilder()
    .setTitle('13기 4팀 서버')
    .setDescription('자기소개서 관리 시스템 🚨🚨🚨🚨 모든 성공 response 값은 메세지 또는 data 프로퍼티 안에 있습니다.🚨🚨🚨')
    .addServer(`${envService.get(EnvEnum.DEV_SERVER)}`, '개발서버')
    .addServer(`http://localhost:${envService.get(EnvEnum.PORT)}`, '로컬서버')

    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Access-Control-Allow-Origin', 'X-Request-With', 'Content-Type', 'Accept'],
    credentials: true,
  });
  //서버 시작
  await app.listen(PORT);
}
bootstrap();
