import { loadImage } from './loaders';
import SpriteSheet from './SpriteSheet';

export function loadMarioSprite() {
  return loadImage('/dist/assets/characters.gif').then(image => {
    const sprites = new SpriteSheet(image);
    sprites.define('idle', 276, 44, 16, 16);
    return sprites;
  });
}

export function loadBackgroundSprites() {
  return loadImage('/dist/assets/tiles.png').then(image => {
    const sprites = new SpriteSheet(image);
    sprites.defineTile('ground', 0, 0);
    sprites.defineTile('sky', 3, 23);
    return sprites;
  });
}
