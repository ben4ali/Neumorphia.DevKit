#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
\x1b[36mNeumorphia DevKit CLI\x1b[0m
Tactile Neumorphic (Soft UI) Components for React & Tailwind CSS

\x1b[33mUsage:\x1b[0m
  npx neumorphia-devkit add <component-name>

\x1b[33mExamples:\x1b[0m
  npx neumorphia-devkit add range-slider
  npx neumorphia-devkit add button
  npx neumorphia-devkit add gauge
  npx neumorphia-devkit add tabs

\x1b[33mAvailable Components:\x1b[0m
  ${Object.keys(componentFileMap).filter((k, i, arr) => arr.indexOf(k) === i).join(', ')}
`);
  process.exit(0);
}

const fileName = componentFileMap[target] || `${target.charAt(0).toUpperCase() + target.slice(1)}.tsx`;
const rawUrl = `https://raw.githubusercontent.com/ben4ali/Neumorphia.DevKit/main/src/registry/components/${fileName}`;

console.log(`\x1b[36m> Adding ${fileName} to your project...\x1b[0m`);

// Determine target directory (check if src exists)
const baseDir = fs.existsSync(path.resolve(process.cwd(), 'src'))
  ? path.resolve(process.cwd(), 'src/components/ui')
  : path.resolve(process.cwd(), 'components/ui');

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const destPath = path.join(baseDir, fileName);

// 1. Try local package resolution first (if bundled in npm package)
const localPackagePath = path.resolve(__dirname, '../src/registry/components', fileName);

if (fs.existsSync(localPackagePath)) {
  try {
    const data = fs.readFileSync(localPackagePath, 'utf8');
    fs.writeFileSync(destPath, data, 'utf8');
    console.log(`\x1b[32m✔ Successfully installed ${fileName} to ${path.relative(process.cwd(), destPath)}\x1b[0m`);
    console.log(`\x1b[90m  Usage: import { Neumorphic... } from '@/components/ui/${fileName.replace('.tsx', '')}'\x1b[0m\n`);
    process.exit(0);
  } catch (err) {
    // Fall through to remote fetch
  }
}

// 2. Fetch from GitHub repository
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
    console.log(`\x1b[90m  Usage: import { Neumorphic... } from '@/components/ui/${fileName.replace('.tsx', '')}'\x1b[0m\n`);
  });
}).on('error', (err) => {
  console.error(`\x1b[31mError downloading component: ${err.message}\x1b[0m`);
  process.exit(1);
});
