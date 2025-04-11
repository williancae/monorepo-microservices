// apps/workers/src/main.ts
import { NestFactory } from '@nestjs/core';

import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
    console.log('\n\n', {
        client: {
            brokers: [process.env.KAFKA_BROKERS ?? 'localhost:9092'],
        },
        consumer: {
            groupId: process.env.KAFKA_GROUP_ID ?? 'workers-group',
        },
    });

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: [process.env.KAFKA_BROKERS ?? 'localhost:9092'],
            },
            consumer: {
                groupId: process.env.KAFKA_GROUP_ID ?? 'workers-group',
            },
        },
    });
    await app.listen();
    Logger.log(`🧰 Workers microservice running as Kafka consumer...`, 'Bootstrap');
}
bootstrap();
