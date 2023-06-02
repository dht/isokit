import { engine, scene } from './isokit.globals';

export const startRender = () => {
  engine.runRenderLoop(() => {
    scene.render();

    let div;

    div = document.getElementById('fps');
    if (div) {
      div.innerHTML = engine.getFps().toFixed() + ' fps';
    }
  });
};
