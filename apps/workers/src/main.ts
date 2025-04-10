import { ConfigEnvService } from '@application/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configEnv = app.get(ConfigEnvService);
    const globalPrefix = 'workers';
    app.setGlobalPrefix(globalPrefix);

    const port = configEnv.app.worker.port || 3001;
    await app.listen(port);
    Logger.log(`🧰 Workers is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
