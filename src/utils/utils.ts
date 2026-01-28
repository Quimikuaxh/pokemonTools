import { mkdir } from 'fs/promises';
import { resolve } from 'path';
import fs from 'fs';

class Utils {
  static async ensureDirAsync(dirPath: string): Promise<string> {
    const fullPath = resolve(dirPath);
    await mkdir(fullPath, { recursive: true });
    return fullPath;
  }

  static saveJSON(json: any, path: string): void {
    fs.writeFile(path, json, 'utf8', function (err) {
      if (err) {
        // eslint-disable-next-line no-console
        return console.log(err);
      }
    });
  }

  static sleep(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
} export default Utils;

