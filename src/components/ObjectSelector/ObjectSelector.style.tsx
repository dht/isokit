import styled from 'styled-components';
import { lighten, desaturate, transparentize } from 'polished';
import { menu } from './ObjectSelector.utils';

export const base = {
  mesh: 'rgb(121, 198, 91)',
  layer: 'rgb(121, 198, 91)',
  camera: 'rgb(121, 198, 91)',
};

export const Wrapper = styled.div`
  flex: 0.5;
  background-color: rgba(205, 255, 255, 0.05);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  user-select: none;
  padding: 5rem 0;
`;

export const Item = styled.div`
  font-size: 17rem;
  display: inline-block;
  width: 55rem;
  margin: 3rem;
  padding: 5rem;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  border-radius: 5rem;
  cursor: pointer;
  ${menu('mesh', base.mesh)}
  ${menu('camera', base.camera)}
  ${menu('layer', base.layer)}
`;

export const Cameras = styled.div`
  width: 65rem;
`;

export const Layers = styled.div`
  width: 66rem;
  overflow-y: auto;
`;

export const Meshes = styled.div``;

export const LayersAndMeshes = styled.div`
  flex: 1;
`;
