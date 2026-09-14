#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';

const componentFileMap = {
  button: 'Button.tsx',
  buttons: 'Button.tsx',
  'push-button': 'PushButton.tsx',
  input: 'Input.tsx',
  inputs: 'Input.tsx',
  textarea: 'Textarea.tsx',
  select: 'Select.tsx',
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

const args = process.argv.slice(2);
const command = args[0];
const target = args[1]?.toLowerCase();

if (!command || command !== 'add' || !target) {
  console.log(`
Neumorphia DevKit CLI
Usage:
  npx neumorphia-devkit add <component-name>

Examples:
  npx neumorphia-devkit add range-slider
  npx neumorphia-devkit add button
  npx neumorphia-devkit add gauge
`);
  process.exit(0);
}

const fileName = componentFileMap[target] || `${target.charAt(0).toUpperCase() + target.slice(1)}.tsx`;
const rawUrl = `https://raw.githubusercontent.com/ben4ali/Neumorphia.DevKit/main/src/registry/components/${fileName}`;

console.log(`\x1b[36m> Fetching ${fileName} from Neumorphia DevKit registry...\x1b[0m`);

// Determine target directory (check if src exists)
const baseDir = fs.existsSync(path.resolve(process.cwd(), 'src'))
  ? path.resolve(process.cwd(), 'src/components/ui')
  : path.resolve(process.cwd(), 'components/ui');

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const destPath = path.join(baseDir, fileName);

https.get(rawUrl, (res) => {
  if (res.statusCode !== 200) {
    console.error(`\x1b[31mError: Component "${target}" (${fileName}) not found in registry (HTTP ${res.statusCode}).\x1b[0m`);
    process.exit(1);
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    fs.writeFileSync(destPath, data, 'utf8');
    console.log(`\x1b[32m✔ Successfully installed ${fileName} to ${path.relative(process.cwd(), destPath)}\x1b[0m`);
  });
}).on('error', (err) => {
  console.error(`\x1b[31mError downloading component: ${err.message}\x1b[0m`);
  process.exit(1);
});
