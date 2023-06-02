export const board = (glbPath: string): any => ({
  id: 'w-1',
  identifier: 'product-1',
  name: 'Product',
  backgroundType: 'transparent',
  externals: {
    x1: {
      id: 'x1',
      boardId: 'ville',
      identifier: 'external-1',
      url: glbPath,
    },
  },
  cameras: {
    c1: {
      id: 'c1',
      boardId: 'ville',
      identifier: 'arc-1',
      type: 'arc',
      values: {
        radius: 26,
        alpha: 0,
        beta: 1.8,
        target: {
          x: 0,
          y: 10,
          z: 0,
        },
      },
    },
  },
  lights: {},
  microAnimations: {},
  grounds: {},
  packs: {},
  particles: {},
  sounds: {},
  sprites: {},
  videos: {},
  backgroundValues: {},
});
