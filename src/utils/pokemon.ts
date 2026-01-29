import ImageGeneration from '../classes/imageGeneration';
import PokeAPI from './pokeapi';
import Wikidex from './wikidex';
import Utils from './utils';

class Pokemon {
  static async downloadSprites (range: number[], imageGeneration: ImageGeneration) {
    const pokemonNames = await PokeAPI.getPokemonInRange(range[0], range[1]);
    for (const name of pokemonNames) {
      await Wikidex.downloadImage(name, imageGeneration);
      await Utils.sleep(500);
    }
  }

  static async downloadFullImage (range: number[]) {
    const pokemonNames = await PokeAPI.getPokemonInRange(range[0], range[1]);
    for (const name of pokemonNames) {
      await Wikidex.downloadFullImage(name);
      await Utils.sleep(500);
    }
  }
} export default Pokemon;
