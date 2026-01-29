import axios from 'axios';
import Utils from './utils';
import fs from 'fs';

class PokeAPI {

  private static POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

  static async getPokemonInRange( from: number,to: number): Promise<string[]> {
    const res = [];
    Utils.ensureDirAsync('./files/info');
    for (let i = from; i <= to; i++) {
      const exists = await Utils.fileExists(`./files/info/${i}.json`);
      if (!exists) {
        const data = await this.getPokemon(i);
        Utils.saveJSON(JSON.stringify(data.data), `./files/info/${i}.json`);
        res.push(data.data.name);
        await Utils.sleep(500);
      }
      else {
        const fileData = fs.readFileSync(`./files/info/${i}.json`, {encoding: 'utf-8', flag: 'r'});
        res.push(JSON.parse(fileData).name);
      }
    }
    return res;
  }

  static async getPokemon(pokemon: string | number) {
    return await axios.get(this.POKEAPI_URL + pokemon);
  }
} export default PokeAPI;
