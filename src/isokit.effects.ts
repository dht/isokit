import {
  Color3,
  ColorCurves,
  DefaultRenderingPipeline,
  Effect,
  MeshBuilder,
  MotionBlurPostProcess,
  PositionGizmo,
  ShaderMaterial,
  StandardMaterial,
  Texture,
  UtilityLayerRenderer,
  VideoRecorder,
} from '@babylonjs/core';
import { scene } from './isokit.globals';

export const initEffects = () => {
  scene.createDefaultEnvironment({
    createGround: false,
    createSkybox: false,
  });
  // Creating default environment enables tone mapping so disable for demo

  const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
  const advancedFeature = !isAndroid;

  var utilLayer = new UtilityLayerRenderer(scene);

  var gizmo = new PositionGizmo(utilLayer);
  gizmo.updateGizmoRotationToMatchAttachedMesh = false;
  gizmo.updateGizmoPositionToMatchAttachedMesh = true;

  if (isAndroid) {
    return;
  }

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
  defaultPipeline.imageProcessing.toneMappingEnabled = advancedFeature;
  defaultPipeline.samples = 4;
  defaultPipeline.fxaaEnabled = advancedFeature;
  defaultPipeline.imageProcessing.toneMappingEnabled = advancedFeature;
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
  defaultPipeline.grainEnabled = advancedFeature;
  defaultPipeline.grain.intensity = 10;
  defaultPipeline.grain.animated = true;

  // var mb = new MotionBlurPostProcess('mb', scene, 5.0, scene.activeCamera);
};

export const initCenterBall = () => {
  const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 0.3 }, scene);
  sphere.position.y = 0;
  sphere.position.x = 0;
  sphere.position.z = 0;

  const material = new StandardMaterial('sphereMaterial', scene);
  material.diffuseColor = new Color3(0.0, 0.0, 0.0);
  material.specularColor = new Color3(0, 0, 0);
  material.emissiveColor = new Color3(0.246, 0.049, 0.369);

  sphere.material = material;

  sphere.isVisible = false;
};

export const toggleCenterBall = (action: any) => {
  const { payload } = action;
  const { isCenterBallOn } = payload;

  const sphere = scene.getMeshByName('sphere');

  if (!sphere) {
    return;
  }

  sphere.isVisible = isCenterBallOn;
};
