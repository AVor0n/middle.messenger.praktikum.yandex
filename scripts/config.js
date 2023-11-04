import { resolve } from 'path';

export const SWAGGER_URL = 'https://ya-praktikum.tech/api/v2/swagger/swagger-ui-init.js';

export const SWAGGER_SPEC_PATH = resolve(process.cwd(), './swagger.json');

export const API_TEMPLATES_PATH = resolve(process.cwd(), './src/shared/api/templates');

export const API_OUTPUT_PATH = resolve(process.cwd(), './src/shared/api/__generated__');
