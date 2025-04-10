import { ConfigEnvModule } from '@application/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [ConfigEnvModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
