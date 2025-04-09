// libs/config/src/lib/configs/app.config.ts
import { IsEnum, IsInt, IsOptional, IsUrl, Max, Min } from 'class-validator';
import validateConfig from '../utils/validate-config.util';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export type AppConfigType = {
    nodeEnv: Environment | string;
    api: {
        port: number;
    };
    worker: {
        port: number;
    };
    gateway: {
        port: number;
    };
    frontendDomain: string;
};

class AppEnvValidator {
    @IsEnum(Environment)
    @IsOptional()
    NODE_ENV?: Environment;

    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    API_PORT?: number;

    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    WORKER_PORT?: number;

    @IsInt()
    @Min(0)
    @Max(65535)
    @IsOptional()
    GATEWAY_PORT?: number;

    @IsUrl({ require_tld: false })
    @IsOptional()
    FRONTEND_DOMAIN?: string;
}

export function appConfig(): AppConfigType {
    validateConfig(process.env, AppEnvValidator);

    return {
        nodeEnv: process.env.NODE_ENV || Environment.Development,
        api: {
            port: process.env.API_PORT ? Number(process.env.API_PORT) : 3000,
        },
        worker: {
            port: process.env.WORKER_PORT ? Number(process.env.WORKER_PORT) : 3001,
        },
        gateway: {
            port: process.env.GATEWAY_PORT ? Number(process.env.GATEWAY_PORT) : 3002,
        },
        frontendDomain: process.env.FRONTEND_DOMAIN || 'http://localhost:3000',
    };
}
