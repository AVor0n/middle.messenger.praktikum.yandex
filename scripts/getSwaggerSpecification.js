import { writeFile } from 'fs';
import { get } from 'https';

const URL = 'https://ya-praktikum.tech/api/v2/swagger/swagger-ui-init.js';
const outputFile = './swagger.json';

const extractSwaggerDoc = input => {
  const fieldNameIndex = input.indexOf('"swaggerDoc":');
  let startIndex, endIndex;
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
    console.error('Не удалось распарсить входные данные');
  }
};

get(URL, response => {
  let data = '';

  response.on('data', chunk => {
    data += chunk;
  });

  response.on('end', () => {
    const swaggerJSON = extractSwaggerDoc(data);

    if (swaggerJSON) {
      writeFile(outputFile, JSON.stringify(swaggerJSON, null, 2), err => {
        if (err) {
          console.error('Ошибка при создании файла:', err);
        }
      });
    } else {
      console.error('Не удалось найти спецификацию в указанном файле');
    }
  });
}).on('error', err => {
  console.error('Ошибка при получении файла:', err);
});
