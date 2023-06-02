export const buttons = [
  {
    id: 'isVolumeOn',
    iconName: 'volume_up',
    label: 'Volume',
  },
  {
    id: 'isGizmoOn',
    iconName: 'open_with',
    label: 'Move',
  },
  {
    id: 'isCenterBallOn',
    iconName: 'center_focus_strong',
    label: 'Toggle center ball',
  },
  {
    id: 'restart',
    iconName: 'skip_previous',
    label: 'Restart',
    actionType: 'iso/restart',
  },
];

export const params = [
  {
    id: 'dot',
    iconName: 'album',
    label: 'Dot pos, rot & scale',
    actionType: 'iso/params',
    actionParams: {
      flavour: 'dot',
    },
  },
  {
    id: 'mesh',
    iconName: 'deployed_code',
    label: 'Mesh pos, rot & scale',
    actionType: 'iso/params',
    actionParams: {
      flavour: 'mesh',
    },
  },
  {
    id: 'camera',
    iconName: 'camera',
    label: 'Camera pos, rot & scale',
    actionType: 'iso/params',
    actionParams: {
      flavour: 'camera',
    },
  },
  {
    id: 'setPiece',
    iconName: 'text_select_jump_to_beginning',
    label: 'Toggle set piece mode',
    actionType: 'iso/params',
    actionParams: {
      flavour: 'setPiece',
    },
  },
];
