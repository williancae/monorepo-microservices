// libs/config/src/lib/monorepo-config.module.ts
import { Module } from '@nestjs/common';
import { ConfigEnvService } from './config.service';

@Module({
    imports: [],
    providers: [ConfigEnvService],
    exports: [ConfigEnvService], // Exporta o ConfigModule para ser utilizado em outros módulos
})
export class ConfigEnvModule {}
