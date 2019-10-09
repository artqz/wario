import { loadLevel } from './core/loaders';
import { loadMarioSprite, loadBackgroundSprites } from './core/sprites';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 224;

function drawBackground(background, context, sprites) {
  const [x1, x2, y1, y2] = background.ranges;

  for (let x = x1; x < x2; ++x) {
    for (let y = y1; y < y2; ++y) {
      sprites.drawTile(background.tile, context, x, y);
    }
  }
}

class Compositor {
  constructor() {
    this.layers = [];
  }

  draw(context) {
    this.layers.forEach(layer => {
      layer(context);
    });
  }
}

function createBackgroundLayer(background, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 400;
  buffer.height = 224;
  const bufferContext = buffer.getContext('2d');

  background.forEach(background => {
    drawBackground(background, bufferContext, sprites);
  });

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1')
]).then(([marioSprite, sprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64
  };
  function update() {
    comp.draw(context);
    marioSprite.draw('idle', context, pos.x, pos.y);
    pos.x += 2;
    pos.y += 3;
    requestAnimationFrame(update);
  }
  update();
});
