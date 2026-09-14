// Automatic raw source loader for all Neumorphic Registry Components
const rawSources = import.meta.glob('./components/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface ComponentSourceInfo {
  fileName: string;
  source: string;
  rawUrl: string;
  cliCmd: string;
  curlCmd: string;
}

export const componentFileMap: Record<string, string> = {
  buttons: 'Button.tsx',
  'push-button': 'PushButton.tsx',
  inputs: 'Input.tsx',
  switch: 'Switch.tsx',
  checkbox: 'Checkbox.tsx',
  radio: 'Radio.tsx',
  slider: 'Slider.tsx',
  'pin-input': 'PinInput.tsx',
  'range-slider': 'RangeSlider.tsx',
  kbd: 'Kbd.tsx',
  tabs: 'Tabs.tsx',
  accordion: 'Accordion.tsx',
  dock: 'Dock.tsx',
  pagination: 'Pagination.tsx',
  stepper: 'Stepper.tsx',
  progress: 'Progress.tsx',
  divider: 'Divider.tsx',
  alert: 'Alert.tsx',
  badge: 'Badge.tsx',
  statcard: 'StatCard.tsx',
  gauge: 'Gauge.tsx',
  skeleton: 'Skeleton.tsx',
  card: 'Card.tsx',
  dialog: 'Dialog.tsx',
  tooltip: 'Tooltip.tsx',
  avatar: 'Avatar.tsx',
  'dropdown-menu': 'DropdownMenu.tsx',
  toast: 'Toast.tsx',
};

export function getComponentSource(componentId: string): ComponentSourceInfo {
  const fileName = componentFileMap[componentId] || `${componentId.charAt(0).toUpperCase() + componentId.slice(1)}.tsx`;
  const path = `./components/${fileName}`;
  const source = rawSources[path] || '// Component source loading...';
  const rawUrl = `https://raw.githubusercontent.com/ben4ali/Neumorphia.DevKit/main/src/registry/components/${fileName}`;
  const cliCmd = `npx neumorphia add ${componentId}`;
  const curlCmd = `curl -o src/components/ui/${fileName} ${rawUrl}`;

  return {
    fileName,
    source,
    rawUrl,
    cliCmd,
    curlCmd,
  };
}
