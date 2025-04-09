import { ConfigEnvService } from '@monorepo/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configEnv = app.get(ConfigEnvService);

    const port: number = configEnv.app.api.port || 3000;
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
