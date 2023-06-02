import { delay } from 'shared-base';
import { initBackground } from './isokit.background';
import { cameraFlyIn, initCameras, snoozeFlyIn, snoozeFlyInCheck } from './isokit.cameras';
import { initEffects } from './isokit.effects';
import { loadExternals } from './isokit.externals';
import { logTime, logTimeEnd, scene } from './isokit.globals';
import { initGlow } from './isokit.glow';
import { initGrounds } from './isokit.grounds';
import { initLights, turnOffLight } from './isokit.lights';
import { initMicroAnimations } from './isokit.microAnimations';
import { initPacks } from './isokit.packs';
import { initParticles } from './isokit.particles';
import { initSounds } from './isokit.sounds';
import { initSprites } from './isokit.sprites';
import { initVideos } from './isokit.videos';
import { initSkyBox } from './isokit.skybox';

export const loadBoard = async (boardConfig: IBoardConfig, onLoadExternals?: Callback) => {
  const {
    identifier,
    useRightHandedSystem,
    flyIn,
    cameras,
    grounds,
    externals,
    lights,
    microAnimations,
    packs,
    particles,
    sounds,
    sprites,
    videos,
  } = boardConfig;

  logTime(`loadScene ${identifier}`, 1);

  initBackground(boardConfig);
  scene.useRightHandedSystem = useRightHandedSystem ?? true;

  initLights(lights);
  initCameras(cameras);
  initGlow();
  initGrounds(grounds);

  await delay(10);

  loadExternals(externals, onLoadExternals);
  initMicroAnimations(microAnimations);
  initPacks(packs);
  initParticles(particles);
  initSprites(sprites);
  initVideos(videos);

  await delay(110);

  turnOffLight('sun-1');

  initSounds(sounds);

  if (flyIn && snoozeFlyInCheck()) {
    cameraFlyIn(flyIn);
    snoozeFlyIn({ minutes: 60 });
  }

  logTimeEnd(`loadScene ${identifier}`, 1);
};
