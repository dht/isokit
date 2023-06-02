import {
  ColorCurves,
  DefaultRenderingPipeline,
  Effect,
  MeshBuilder,
  MotionBlurPostProcess,
  ShaderMaterial,
  Texture,
} from '@babylonjs/core';
import { scene } from './isokit.globals';

export const initEffects = () => {
  scene.createDefaultEnvironment({
    createGround: false,
    createSkybox: false,
  });
  // Creating default environment enables tone mapping so disable for demo

  var defaultPipeline = new DefaultRenderingPipeline('default', true, scene, scene.cameras);
  var curve = new ColorCurves();
  curve.globalHue = 200;
  curve.globalDensity = 80;
  curve.globalSaturation = 80;
  curve.highlightsHue = 20;
  curve.highlightsDensity = 80;
  curve.highlightsSaturation = -80;
  curve.shadowsHue = 2;
  curve.shadowsDensity = 80;
  curve.shadowsSaturation = 40;
  defaultPipeline.imageProcessing.colorCurves = curve;
  defaultPipeline.depthOfField.focalLength = 150;
  defaultPipeline.imageProcessing.toneMappingEnabled = true;
  defaultPipeline.samples = 4;
  defaultPipeline.fxaaEnabled = true;
  defaultPipeline.imageProcessing.toneMappingEnabled = true;
  defaultPipeline.imageProcessing.contrast = 1;
  defaultPipeline.imageProcessing.exposure = 1;
  // defaultPipeline.imageProcessing.colorCurvesEnabled = true;
  defaultPipeline.bloomEnabled = true;
  defaultPipeline.bloomWeight = 1;
  defaultPipeline.bloomKernel = 64;
  defaultPipeline.bloomThreshold = 0.999;
  defaultPipeline.bloomScale = 0.5;
  defaultPipeline.depthOfField.focusDistance = 1;
  defaultPipeline.depthOfField.fStop = 1;
  defaultPipeline.depthOfField.focalLength = 1;
  defaultPipeline.chromaticAberrationEnabled = false;
  defaultPipeline.chromaticAberration.aberrationAmount = 10;
  defaultPipeline.chromaticAberration.radialIntensity = 0.6;
  defaultPipeline.chromaticAberration.direction.x = 20;
  defaultPipeline.grainEnabled = true;
  defaultPipeline.grain.intensity = 10;
  defaultPipeline.grain.animated = true;

  // var mb = new MotionBlurPostProcess('mb', scene, 5.0, scene.activeCamera);
};
