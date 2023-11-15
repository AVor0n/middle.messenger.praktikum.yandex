import { writeFile, access } from 'fs/promises';
import { get } from 'https';
import { SWAGGER_SPEC_PATH, SWAGGER_URL } from './config.js';

/**
 * Парсер, необходим т.к. спецификация не вынесена в отдельный json и приходится извлекать её из swagger-ui-init.js
 * @param {string} input
 * @returns {object}
 */
const extractSwaggerJsonFromString = input => {
  const fieldNameIndex = input.indexOf('"swaggerDoc":');
  let startIndex = 0;
  let endIndex = 0;
  let depthCounter = 0;
  for (let i = fieldNameIndex; i < input.length; i++) {
    if (input[i] === '{') {
      if (depthCounter === 0) {
        startIndex = i;
      }
      depthCounter++;
    } else if (input[i] === '}') {
      depthCounter--;
      if (depthCounter === 0) {
        endIndex = i;
        break;
      }
    }
  }

  const data = input.slice(startIndex, endIndex + 1);
  try {
    return JSON.parse(data);
  } catch {
    throw new Error('Не удалось распарсить данные спецификации');
  }
};

/**
 * Получает и парсит файл по URL
 * @param {string} url
 * @returns {object}
 */
const getSwaggerSpecFromUrl = url => {
  return new Promise((resolve, reject) => {
    get(url, response => {
      let data = '';

      response.on('data', chunk => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          resolve(extractSwaggerJsonFromString(data));
        } catch (error) {
          console.error(error);
        }
      });
    }).on('error', () => console.error(`Ошибка при получении файла. Проверить доступность url: ${SWAGGER_URL}`));
  });
};

const isFileExist = async path => {
  return access(path)
    .then(() => true)
    .catch(() => false);
};

export const getSwaggerSpec = async () => {
  const swaggerSpecExist = await isFileExist(SWAGGER_SPEC_PATH);
  if (swaggerSpecExist) {
    console.log(`Файл swagger уже существует ${SWAGGER_SPEC_PATH}`);
  } else {
    console.log(`Создается новый swagger.json с '${SWAGGER_URL}'`);

    return getSwaggerSpecFromUrl(SWAGGER_URL)
      .then(async swaggerJSON => {
        await writeFile(SWAGGER_SPEC_PATH, JSON.stringify(swaggerJSON, null, 2))
          .then(() => console.log(`Файл создан: ${SWAGGER_SPEC_PATH}`))
          .catch(err => {
            throw new Error(`Ошибка при создании файла: ${err}`);
          });

        return swaggerJSON;
      })
      .catch(err => {
        throw new Error(`Ошибка при получении файла: ${err}`);
      });
  }
};
