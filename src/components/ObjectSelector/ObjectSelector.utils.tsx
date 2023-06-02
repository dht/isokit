import { transparentize } from 'polished';
import { css } from 'styled-components';

const color = (baseColor: string) => ({
  bkColor: transparentize(0.95, baseColor),
  bkColorHover: transparentize(0.85, baseColor),
  bkColorSelected: transparentize(0.75, baseColor),
  borderColor: transparentize(0.7, baseColor),
  borderColorHover: transparentize(0.6, baseColor),
  borderColorSelected: transparentize(0.5, baseColor),
  color: transparentize(0.6, baseColor),
  colorHover: transparentize(0.5, baseColor),
  colorSelected: transparentize(0.4, baseColor),
});

export const colorVars = (baseColor: string) => `
--bk-color: ${color(baseColor).bkColor};
--bk-color-hover: ${color(baseColor).bkColorHover};
--bk-color-selected: ${color(baseColor).bkColorSelected};
--border-color: ${color(baseColor).borderColor};
--border-color-hover: ${color(baseColor).borderColorHover};
--border-color-selected: ${color(baseColor).borderColorSelected};
--color: ${color(baseColor).color};
--color-hover: ${color(baseColor).colorHover};
--color-selected: ${color(baseColor).colorSelected};
`;

export const menu = (id: string, baseColor: string) => css`
  &.${id} {
    --bk-color: ${color(baseColor).bkColor};
    --bk-color-hover: ${color(baseColor).bkColorHover};
    --bk-color-selected: ${color(baseColor).bkColorSelected};
    --border-color: ${color(baseColor).borderColor};
    --border-color-hover: ${color(baseColor).borderColorHover};
    --border-color-selected: ${color(baseColor).borderColorSelected};
    --color: ${color(baseColor).color};
    --color-hover: ${color(baseColor).colorHover};
    --color-selected: ${color(baseColor).colorSelected};
  }

  color: var(--color);
  background-color: var(--bk-color);
  border: 1px solid var(--border-color);

  &:hover {
    background-color: var(--bk-color-hover);
    border: 1px solid var(--border-color-hover);
    color: var(--color-hover);
  }

  &.selected {
    background-color: var(--bk-color-selected);
    border: 1px solid var(--border-color-selected);
    color: var(--color-selected);
  }
`;
