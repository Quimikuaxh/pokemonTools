import { mkdir } from 'fs/promises';
import { resolve } from 'path';
import fs from 'fs';

class Utils {
  static async ensureDirAsync(dirPath: string): Promise<string> {
    const fullPath = resolve(dirPath);
    await mkdir(fullPath, { recursive: true });
    return fullPath;
  }

  static async fileExists(path: string) {
    try {
      await fs.promises.access(path); // F_OK por defecto: comprueba si es accesible
      return true;
    } catch {
      return false;
    }
  }

  static capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
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

