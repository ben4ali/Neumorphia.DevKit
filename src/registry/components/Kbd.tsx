import React, { useState, useEffect } from 'react';

export interface NeumorphicKbdProps {
  children: React.ReactNode;
  keyTrigger?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
}

export const NeumorphicKbd: React.FC<NeumorphicKbdProps> = ({
  children,
  keyTrigger,
  size = 'md',
  className = '',
  interactive = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Derive trigger key from children if keyTrigger not explicitly provided
  const triggerKey =
    keyTrigger ||
    (typeof children === 'string'
      ? children.toLowerCase() === '⌘' || children.toLowerCase() === 'cmd'
        ? 'meta'
        : children.toLowerCase() === 'ctrl'
        ? 'control'
        : children.toLowerCase()
      : undefined);

  useEffect(() => {
    if (!interactive || !triggerKey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();
      if (
        pressedKey === triggerKey ||
        (triggerKey === 'meta' && (e.key === 'Meta' || e.metaKey)) ||
        (triggerKey === 'control' && (e.key === 'Control' || e.ctrlKey)) ||
        (triggerKey === 'shift' && (e.key === 'Shift' || e.shiftKey)) ||
        (triggerKey === 'alt' && (e.key === 'Alt' || e.altKey))
      ) {
        setIsPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const releasedKey = e.key.toLowerCase();
      if (
        releasedKey === triggerKey ||
        (triggerKey === 'meta' && !e.metaKey) ||
        (triggerKey === 'control' && !e.ctrlKey) ||
        (triggerKey === 'shift' && !e.shiftKey) ||
        (triggerKey === 'alt' && !e.altKey)
      ) {
        setIsPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [interactive, triggerKey]);

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px] min-w-[20px] h-5',
    md: 'px-2.5 py-1 text-xs min-w-[28px] h-7',
    lg: 'px-3 py-1.5 text-sm min-w-[36px] h-9',
  }[size];

  return (
    <kbd
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className={`inline-flex items-center justify-center font-mono font-bold rounded-neo-badge border select-none transition-all duration-100 cursor-pointer ${
        isPressed
          ? 'shadow-neo-inset-sm translate-y-[2px] bg-neo-well/50 text-neo-secondary border-neo-border'
          : 'shadow-neo-raised-sm hover:shadow-neo-raised-md bg-neo-surface text-neo-primary border-neo-border'
      } ${sizeClasses} ${className}`}
      title={triggerKey ? `Press '${triggerKey}' on keyboard` : undefined}
    >
      {children}
    </kbd>
  );
};
