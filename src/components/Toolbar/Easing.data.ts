export const buttons = [
  {
    id: 'easingNone',
    iconName: 'timer',
    label: 'No animation',
    shortcut: 'F6',
    actionType: 'iso/easing',
    actionParams: {
      value: 'none',
    },
  },
  {
    id: 'easingLinear',
    iconName: 'pen_size_2',
    label: 'Linear easing',
    shortcut: 'F7',
    actionType: 'iso/easing',
    actionParams: {
      value: 'linear',
    },
  },
  {
    id: 'easingInOut',
    iconName: 'line_curve',
    label: 'EaseIn/EaseOut',
    shortcut: 'F8',
    actionType: 'iso/easing',
    actionParams: {
      value: 'easeInOut',
    },
  },
  {
    id: 'isBezierOn',
    iconName: 'stacked_line_chart',
    label: 'Toggle bezier editor',
    shortcut: 'F9',
  },
];
