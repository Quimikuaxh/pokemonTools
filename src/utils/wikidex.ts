import { Scrap, Download } from '@quimikuaxh/webscrap';
import ImageGeneration from '../classes/imageGeneration';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import xpath from 'xpath-html';

class Wikidex {

  private static WIKI_URL = "https://www.wikidex.net/wiki/";
  private static POKEMON_OFFICIAL_URL = "https://www.pokemon.com/es/pokedex/"
  private static htmlList: Map<string, any> = new Map<string, any>();

  static async downloadImage(pokemon: string, imageGeneration: ImageGeneration): Promise<void> {
    const html: string = await this.getHTML(pokemon);
    const selectedXpath = this.getXpath(pokemon, imageGeneration);
    //const url = Scrap.findElementByXpath(html, selectedXpath);
    const url = xpath.fromPageSource(html).findElement(selectedXpath).getAttribute("src");
    const extension = this.getExtension(imageGeneration);
    Download.downloadFile(url, `./images/${imageGeneration}/${pokemon}.${extension}`, () => {});
  }

  static async downloadFullImage(pokemon: string): Promise<void>{
    const html = await Scrap.getHTML(Wikidex.POKEMON_OFFICIAL_URL + pokemon.toLowerCase());
    const selectedXpath = "//img[contains(@src, 'full')]";
    xpath.fromPageSource(html).findElement(selectedXpath).getAttribute("src");
    const url = xpath.fromPageSource(html).findElement(selectedXpath).getAttribute("src");
    Download.downloadFile(url, `./images/fullImage/${pokemon}.png`, () => {});
  }

  private static async getHTML(pokemon: string): Promise<string> {
    if(!this.htmlList.get(pokemon)) {
      const html = await Scrap.getHTML(Wikidex.WIKI_URL + pokemon);
      this.htmlList.set(pokemon, html);
      return html;
    }
    else {
      return this.htmlList.get(pokemon);
    }
  }

  private static getXpath(pokemon: string, imageGeneration: ImageGeneration): string {
    switch (imageGeneration) {
      case ImageGeneration.RED_BLUE: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_RA.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.RED_GREEN: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_V.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.YELLOW: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_A.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.GOLD: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_oro.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.SILVER: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_plata.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.CRYSTAL: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_cristal.gif') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.RUBY_SAPPHIRE: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_RZ.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.EMERALD: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_E.gif') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.FIRE_RED_LEAF_GREEN: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_RFVH.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.DIAMOND_PEARL: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_DP.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.PLATINUM: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_Pt.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.HEARTGOLD_SOULSILVER: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_HGSS.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.BLACK_WHITE: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_NB.gif') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.THREE_D_GIF: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_XY.gif') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.LETS_GO: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_GO.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.SWORD_SHIELD: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_EpEc.gif') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      case ImageGeneration.SCARLET_VIOLET: return "//img[contains(@src, '"+pokemon+"') and contains(@src, '_EscP%C3%BAr.png') and not(contains(@src, 'Mega')) and not(contains(@src, 'Gigamax'))]";
      default: return "ERROR";
    }
  }

  private static getExtension(imageGeneration: ImageGeneration): string {
    const isGif = [ImageGeneration.CRYSTAL, ImageGeneration.EMERALD, ImageGeneration.BLACK_WHITE,
      ImageGeneration.THREE_D_GIF, ImageGeneration.SWORD_SHIELD]
    if (isGif.includes(imageGeneration)) {
      return '.gif';
    }
    else {
      return '.png';
    }
  }
} export default Wikidex;
