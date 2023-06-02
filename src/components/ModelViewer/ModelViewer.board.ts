export const createBaseBoard = (glbPath: string, extra: any = {}): any => ({
  id: 'w-1',
  identifier: 'product-1',
  name: 'Product',
  backgroundType: 'transparent',
  flyIn: {
    radius: 33,
    alpha: 0.5,
    beta: 1,
    target: [0, 0, 0],
  },
  externals: {
    x1: {
      id: 'x1',
      boardId: 'ville',
      identifier: 'external-1',
      url: glbPath,
    },
    ...extra.externals,
  },
  cameras: {
    ...extra.cameras,
  },
  lights: {
    l2: {
      position: {
        x: 0,
        y: 150,
        z: 0,
      },
      id: 'l2',
      intensity: 1,
      identifier: 'sun-1',
      type: 'hemispheric',
      boardId: 'ville',
      specular: [1, 1, 0],
      diffuse: [1, 1, 1],
      index: 0,
    },
    ...extra.lights,
  },
  microAnimations: {
    ...extra.microAnimations,
  },
  grounds: {
    ...extra.grounds,
  },
  packs: {
    ...extra.packs,
  },
  particles: {
    ...extra.particles,
  },
  sounds: {
    ...extra.sounds,
  },
  sprites: {
    ...extra.sprites,
  },
  videos: {
    ...extra.videos,
  },
  backgroundValues: {
    ...extra.backgroundValues,
  },
});
