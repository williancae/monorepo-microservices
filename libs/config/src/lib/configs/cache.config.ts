// libs/config/src/lib/configs/cache.config.ts
import { IsInt, IsOptional, IsString } from 'class-validator';
import validateConfig from '../utils/validate-config.util';

class CacheEnvValidator {
    @IsString()
    @IsOptional()
    CACHE_HOST?: string;

    @IsInt()
    @IsOptional()
    CACHE_PORT?: number;

    @IsString()
    @IsOptional()
    CACHE_PASSWORD?: string;
}

export type CacheConfigType = {
    host: string;
    port: number;
    password: string;
};

export function cacheConfig(): CacheConfigType {
    validateConfig(process.env, CacheEnvValidator);

    return {
        host: process.env.CACHE_HOST || 'localhost',
        port: process.env.CACHE_PORT ? parseInt(process.env.CACHE_PORT, 10) : 6379,
        password: process.env.CACHE_PASSWORD || '',
    };
}
