import { generateApi } from 'swagger-typescript-api';
import { API_OUTPUT_PATH, API_TEMPLATES_PATH, SWAGGER_SPEC_PATH } from './config.js';
import { getSwaggerSpec } from './getSwaggerSpecification.js';
import { unlink } from 'fs/promises';
import { resolve } from 'path';

getSwaggerSpec()
  .then(() =>
    generateApi({
      output: API_OUTPUT_PATH,
      input: SWAGGER_SPEC_PATH,
      templates: API_TEMPLATES_PATH,
      generateClient: true,
      generateRouteTypes: false,
      generateResponses: true,
      extractRequestParams: true,
      extractRequestBody: true,
      extractEnums: true,
      defaultResponseType: 'void',
      singleHttpClient: false,
      cleanOutput: true,
      enumNamesAsValues: false,
      moduleNameFirstTag: false,
      generateUnionEnums: false,
      modular: true,
      addReadonly: false,
    }),
  )
  .then(({ files, createFile }) => {
    // удаление встроенного httpClient, т.к. используется свой HttpService для отправки запросов
    unlink(resolve(API_OUTPUT_PATH, 'http-client.ts'));

    // генерация index.ts файла, который реэкспортит все сгенерированные api
    const filesForReExport = files.map(({ fileName }) => (fileName === 'http-client' ? '' : fileName)).filter(Boolean);
    createFile({
      path: API_OUTPUT_PATH,
      fileName: 'index.ts',
      content: filesForReExport.map(fileName => `export * from './${fileName}';\n`).join(''),
    });
  });
