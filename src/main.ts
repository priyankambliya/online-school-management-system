import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { PORT } from './security/config.json';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  await app.listen(PORT, () => {
    console.log(`SERVER LISTNING ON PORT : ${PORT}`);
  });
}
bootstrap();
