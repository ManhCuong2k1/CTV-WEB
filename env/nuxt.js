import {
    cleanEnv, str, url, host, port,
} from 'envalid';

import { readEnv } from './utils';

const env = readEnv('.env');

const validEnv = cleanEnv(env, {
    APP_NAME: str({
        default: 'Website',
        desc: 'Application name',
    }),
    APP_DESCRIPTION: str({
        default: 'Website',
        desc: 'Application description',
    }),
    APP_ENV: str({
        default: 'production',
        devDefault: 'local',
        desc: 'Application env',
    }),

    APP_URL: url({
        default: 'localhost',
        desc: 'App url',
    }),

    HOST: host({
        default: '0.0.0.0',
        desc: 'Application host',
    }),

    PORT: port({
        default: 3000,
        desc: 'Application port',
    }),

    API_HOST: str({
        default: '0.0.0.0',
        desc: 'API rewrite entrypoint',
    }),

    API_PATH: str({
        default: '/api',
        desc: 'API rewrite entrypoint',
    }),

    IMAGE_BASE_URL: url({
        desc: 'Base url for images',
    }),

    GOOGLE_ANALYTICS_ID: str({
        desc: 'Google tracking ID for Analytics',
        devDefault: 'UA-00000000-0',
    }),
}, {
    strict: true,
});

export const {
    APP_NAME,
    APP_DESCRIPTION,
    APP_ENV,
    APP_URL,
    HOST,
    PORT,
    API_HOST,
    API_PATH,
    IMAGE_BASE_URL,
    GOOGLE_ANALYTICS_ID,
    isDev,
    isProduction,
} = validEnv;
