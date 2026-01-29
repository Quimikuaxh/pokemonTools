//import Wikidex from './utils/wikidex';
import PokemonGenerations from './classes/PokemonGenerations';
//import ImageGeneration from './classes/imageGeneration';
import Pokemon from './utils/pokemon';
//import ImageGeneration from './classes/imageGeneration';

//Wikidex.downloadImage('Bulbasaur', ImageGeneration.BLACK_WHITE);
//Wikidex.downloadFullImage('miraidon');
const desiredPokemon = PokemonGenerations.NINTH_GENERATION;
//const desiredSprites = ImageGeneration.BLACK_WHITE;

//Pokemon.downloadSprites(desiredPokemon, desiredSprites);
Pokemon.downloadFullImage(desiredPokemon);
