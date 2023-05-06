import {
    Color3,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Vector3,
} from '@babylonjs/core';
import { vector3, vectorRadians } from './isokit.helpers';

export const moveMesh = (
    scene: Scene,
    meshId: string,
    position: Json,
    rotation?: Json,
    scaling?: Json
) => {
    const mesh = scene.getMeshById(meshId);

    if (mesh) {
        mesh.position = vector3(position);

        if (rotation) {
            mesh.rotation = vectorRadians(rotation);
        }

        if (scaling) {
            mesh.scaling = vector3(scaling);
        }
    }
};

export const createTorus = (scene: Scene) => {
    const torus = MeshBuilder.CreateTorus(
        'torus',
        {
            diameter: 0.7,
            thickness: 0.2,
        },
        scene
    );

    torus.position = new Vector3(0, -10, 0);
    torus.rotation = new Vector3(-0.2, 0, 0);
    torus.scaling = new Vector3(1, 1, 1);

    const material = new StandardMaterial('torusMaterial', scene);
    material.diffuseColor = new Color3(0.0, 0.0, 0.0);
    material.specularColor = new Color3(0, 0, 0);
    material.emissiveColor = new Color3(0, 0.5, 0.5);
    material.alpha = 0.2;
    torus.material = material;

    return torus;
};

export const moveTorus = (scene: Scene, vector: Json) => {
    const torus = scene.getMeshByName('torus');

    if (!torus) {
        return;
    }
    torus.position = new Vector3(vector.x + 0.2, 0.1, vector.z + 0.4);
};
