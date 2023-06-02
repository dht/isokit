import styled from 'styled-components';
import { lighten, desaturate, transparentize } from 'polished';
import { menu } from './ObjectSelector.utils';

const base = {
  mesh: 'rgb(121, 198, 91)',
  layer: 'rgb(121, 198, 91)',
  camera: 'rgb(121, 198, 91)',
};

export const Wrapper = styled.div`
  flex: 0.63;
  background-color: rgba(205, 255, 255, 0.05);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  user-select: none;
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

export const Cameras = styled.div``;

export const Layers = styled.div``;

export const Meshes = styled.div``;

export const Section = styled.div`
  margin: 5rem;
  border-radius: 5rem;

  &:first-child {
    width: 60rem;
  }

  &:nth-child(2) {
    width: 123rem;
  }

  &:last-child {
    flex: 1;
  }
`;

export const SectionIcon = styled.div``;

export const SectionContent = styled.div``;
