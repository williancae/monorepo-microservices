import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsOptional, IsUrl, Max, Min } from 'class-validator';
import validateConfig from '../utils/validate-config.util';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export type AppConfig = {
    nodeEnv: Environment;
    port: number;
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
    APP_PORT?: number;

    @IsUrl({ require_tld: false })
    @IsOptional()
    FRONTEND_DOMAIN?: string;
}

export default registerAs<AppConfig>('app', () => {
    validateConfig(process.env, AppEnvValidator);

    return {
        nodeEnv: (process.env.NODE_ENV as Environment) || Environment.Development,
        port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
        frontendDomain: process.env.FRONTEND_DOMAIN || 'http://localhost',
    };
});
