import React, { useRef, useState, useEffect } from 'react';

export interface NeumorphicPinInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  mask?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
}

export const NeumorphicPinInput: React.FC<NeumorphicPinInputProps> = ({
  length = 4,
  value = '',
  onChange,
  onComplete,
  mask = false,
  disabled = false,
  label,
  error,
}) => {
  const [pin, setPin] = useState<string[]>(() => {
    const arr = Array(length).fill('');
    for (let i = 0; i < Math.min(value.length, length); i++) {
      arr[i] = value[i];
    }
    return arr;
  });

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value !== undefined) {
      const arr = Array(length).fill('');
      for (let i = 0; i < Math.min(value.length, length); i++) {
        arr[i] = value[i];
      }
      setPin(arr);
    }
  }, [value, length]);

  const handleChange = (val: string, index: number) => {
    if (disabled) return;
    const char = val.slice(-1);
    const newPin = [...pin];
    newPin[index] = char;
    setPin(newPin);

    const fullVal = newPin.join('');
    onChange?.(fullVal);

    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (fullVal.length === length && !fullVal.includes('')) {
      onComplete?.(fullVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (disabled) return;
    if (e.key === 'Backspace') {
      if (!pin[index] && index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = '';
        setPin(newPin);
        onChange?.(newPin.join(''));
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    const pasted = e.clipboardData.getData('text').slice(0, length);
    const newPin = [...pin];
    for (let i = 0; i < pasted.length; i++) {
      newPin[i] = pasted[i];
    }
    setPin(newPin);
    const fullVal = newPin.join('');
    onChange?.(fullVal);
    if (fullVal.length === length && !fullVal.includes('')) {
      onComplete?.(fullVal);
    }
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div className="space-y-2 text-left">
      {label && <label className="block text-xs font-semibold text-neo-primary/80 px-1">{label}</label>}
      <div className="flex items-center gap-3">
        {Array.from({ length }).map((_, idx) => (
          <input
            key={idx}
            ref={(el) => (inputsRef.current[idx] = el)}
            type={mask ? 'password' : 'text'}
            inputMode="numeric"
            maxLength={1}
            value={pin[idx] || ''}
            disabled={disabled}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            aria-label={`Digit ${idx + 1} of ${length}`}
            className={`w-12 h-12 text-center text-lg font-bold font-mono bg-neo-surface text-neo-primary shadow-neo-inset-sm rounded-neo-control border transition-all duration-200 outline-none select-none ${
              error
                ? 'border-neo-danger shadow-neo-delete-inset text-neo-danger'
                : 'border-neo-border focus:border-neo-focus focus:ring-1 focus:ring-neo-focus'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        ))}
      </div>
      {error && <p className="text-xs text-neo-danger font-medium px-1">{error}</p>}
    </div>
  );
};
