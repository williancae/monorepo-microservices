import { Injectable } from '@nestjs/common';
import { appConfig, AppConfigType } from './configs/app.config';
import { cacheConfig, CacheConfigType } from './configs/cache.config';

@Injectable()
export class ConfigEnvService {
    get cache(): CacheConfigType {
        return cacheConfig();
    }

    get app(): AppConfigType {
        return appConfig();
    }
}
