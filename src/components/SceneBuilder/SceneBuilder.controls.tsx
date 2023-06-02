import ControlsHudContainer from '../Controls/ControlsHud.container';
import ControlsPosContainer from '../Controls/ControlsPos.container';
import ControlsSfxContainer from '../Controls/ControlsSfx.container';
import ControlsSkyContainer from '../Controls/ControlsSky.container';
import ControlsVfxContainer from '../Controls/ControlsVfx.container';
import ControlsVizContainer from '../Controls/ControlsViz.container';

export const controls: Record<string, any> = {
  dots: ControlsPosContainer,
  viz: ControlsVizContainer,
  sky: ControlsSkyContainer,
  hud: ControlsHudContainer,
  sfx: ControlsSfxContainer,
  vfx: ControlsVfxContainer,
};
