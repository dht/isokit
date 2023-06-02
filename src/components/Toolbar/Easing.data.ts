export const buttons = [
  {
    id: 'easingNone',
    iconName: 'timer',
    label: 'No animation',
    actionType: 'iso/easing',
    actionParams: {
      value: 'none',
    },
  },
  {
    id: 'easingLinear',
    iconName: 'pen_size_2',
    label: 'Linear easing',
    actionType: 'iso/easing',
    actionParams: {
      value: 'linear',
    },
  },
  {
    id: 'easingInOut',
    iconName: 'line_curve',
    label: 'EaseIn/EaseOut',
    actionType: 'iso/easing',
    actionParams: {
      value: 'easeInOut',
    },
  },
  {
    id: 'isBezierOn',
    iconName: 'stacked_line_chart',
    label: 'Toggle bezier editor',
  },
];
