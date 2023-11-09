import path from "path"
import * as fS from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default defineEventHandler(async (event) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const body = await readBody(event)
  const filePath = path.join(__dirname, '~/static/scorecards.json'); // Adjust the path as needed

  fS.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      throw createError({
                          statusCode: 500,
                          statusMessage: 'An error occurred',
                        })
    }

    let existingData = JSON.parse(data);
    let updatedData = [body, ...existingData]; // Prepend new data

    fS.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        throw createError({
                            statusCode: 500,
                            statusMessage: 'An error occurred',
                          })
      }

      return { body: 'File updated successfully' }

    });
  });
  return { body }

})
