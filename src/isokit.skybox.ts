import {
  Color3,
  CubeTexture,
  MeshBuilder,
  StandardMaterial,
  Texture,
  Vector3,
} from '@babylonjs/core';
import { scene } from './isokit.globals';

export const initSkyBox = (url: string) => {
  return;
  var cubeTexture = new CubeTexture(url, scene);

  var skybox = MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);
  var skyboxMaterial = new StandardMaterial('skyboxMaterial', scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = cubeTexture;
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
};

export const changeSkyBox = (url: string) => {
  const skyboxMaterial = scene.getMaterialByName('skyboxMaterial') as StandardMaterial;
  skyboxMaterial.diffuseTexture = new Texture(url, scene);
};

export const hideSkyBox = () => {
  const skyBox = scene.getMeshByName('skyPlane');

  if (!skyBox) {
    return;
  }

  skyBox.isVisible = false;
};

export const addSkyPlane = (url: string) => {
  const skybox = MeshBuilder.CreatePlane('skyPlane', { width: 160, height: 90 }, scene);
  const skyboxMaterial = new StandardMaterial('skyboxMaterial', scene);

  skyboxMaterial.diffuseColor = new Color3(0, 0, 255);
  skyboxMaterial.specularColor = new Color3(0, 255, 0);
  skyboxMaterial.emissiveColor = new Color3(255, 255, 255);
  skyboxMaterial.backFaceCulling = false;

  skybox.rotation = new Vector3(0, 0, 0);
  skybox.position = new Vector3(105, 0, 0);

  // add image texture
  skyboxMaterial.diffuseTexture = new Texture(url, scene);
  skyboxMaterial.diffuseTexture.hasAlpha = true;

  skybox.rotation.y = Math.PI / 2;
  skybox.material = skyboxMaterial;
  skybox.isVisible = false;
};
