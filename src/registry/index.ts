import { MasterRegistry, RegistryComponent, ComponentCategory } from '../types/registry';

// Actions
import { buttonsDefinition } from './definitions/buttons.definition';
import { pushButtonDefinition } from './definitions/pushbutton.definition';

// Forms & Selection
import { inputsDefinition } from './definitions/inputs.definition';
import { switchDefinition } from './definitions/switch.definition';
import { checkboxDefinition } from './definitions/checkbox.definition';
import { radioDefinition } from './definitions/radio.definition';
import { sliderDefinition } from './definitions/slider.definition';
import { pinInputDefinition } from './definitions/pininput.definition';
import { rangeSliderDefinition } from './definitions/rangeslider.definition';
import { kbdDefinition } from './definitions/kbd.definition';

// Navigation
import { tabsDefinition } from './definitions/tabs.definition';
import { accordionDefinition } from './definitions/accordion.definition';
import { dockDefinition } from './definitions/dock.definition';
import { paginationDefinition } from './definitions/pagination.definition';
import { stepperDefinition } from './definitions/stepper.definition';

// Feedback & Progress
import { progressDefinition } from './definitions/progress.definition';
import { dividerDefinition } from './definitions/divider.definition';
import { alertDefinition } from './definitions/alert.definition';
import { badgeDefinition } from './definitions/badge.definition';
import { statCardDefinition } from './definitions/statcard.definition';
import { gaugeDefinition } from './definitions/gauge.definition';
import { skeletonDefinition } from './definitions/skeleton.definition';

// Overlays & Surfaces
import { cardDefinition } from './definitions/card.definition';
import { dialogDefinition } from './definitions/dialog.definition';
import { tooltipDefinition } from './definitions/tooltip.definition';
import { avatarDefinition } from './definitions/avatar.definition';
import { dropdownMenuDefinition } from './definitions/dropdownmenu.definition';
import { toastDefinition } from './definitions/toast.definition';

export const registry: MasterRegistry = {
  // Actions
  buttons: buttonsDefinition,
  'push-button': pushButtonDefinition,

  // Forms & Selection
  inputs: inputsDefinition,
  switch: switchDefinition,
  checkbox: checkboxDefinition,
  radio: radioDefinition,
  slider: sliderDefinition,
  'pin-input': pinInputDefinition,
  'range-slider': rangeSliderDefinition,
  kbd: kbdDefinition,

  // Navigation
  tabs: tabsDefinition,
  accordion: accordionDefinition,
  dock: dockDefinition,
  pagination: paginationDefinition,
  stepper: stepperDefinition,

  // Feedback & Progress
  progress: progressDefinition,
  divider: dividerDefinition,
  alert: alertDefinition,
  badge: badgeDefinition,
  'stat-card': statCardDefinition,
  gauge: gaugeDefinition,
  skeleton: skeletonDefinition,

  // Overlays & Surfaces
  card: cardDefinition,
  dialog: dialogDefinition,
  tooltip: tooltipDefinition,
  avatar: avatarDefinition,
  'dropdown-menu': dropdownMenuDefinition,
  toast: toastDefinition,
};

export const categories: ComponentCategory[] = [
  'Actions',
  'Forms & Selection',
  'Navigation',
  'Feedback & Progress',
  'Overlays & Surfaces',
];

export function getComponentsByCategory(category: ComponentCategory): RegistryComponent[] {
  return Object.values(registry).filter((item) => item.category === category);
}

export function getAllComponents(): RegistryComponent[] {
  return Object.values(registry);
}

export function getComponentById(id: string): RegistryComponent | undefined {
  if (registry[id]) return registry[id];
  return Object.values(registry).find((item) => item.id === id);
}
