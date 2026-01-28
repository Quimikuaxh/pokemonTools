import axios from 'axios';
import Utils from './utils';

class PokeAPI {

  private static POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';

  static async getPokemonInRange(from: number, to: number) {
    Utils.ensureDirAsync('./files/info');
    for (let i = from; i <= to; i++) {
      const data = await this.getPokemon(i);
      Utils.saveJSON(JSON.stringify(data.data), `./files/info/${i}.json`);
      await Utils.sleep(500);
    }
  }

  static async getPokemon(pokemon: string | number) {
    return await axios.get(this.POKEAPI_URL + pokemon);
  }
} export default PokeAPI;
