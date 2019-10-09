export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}
export function loadLevel(name) {
  return fetch(`/dist/levels/${name}.json`).then(r => {
    return r.json();
  });
}
