export type ISheetCell = {
  id: string;
  value: string;
  cellType: 'value';

  // transient
  x?: number;
  y?: number;
  isLoading?: boolean;
};

export type ISheetCells = Record<string, ISheetCell>;

export type ICoord = {
  x: number;
  y: number;
  isEditing?: boolean;
};
