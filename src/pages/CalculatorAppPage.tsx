import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppView } from '../hooks/useRegistry';

interface CalculatorAppPageProps {
  onNavigate?: (view: AppView, componentId?: string) => void;
}

export const CalculatorAppPage: React.FC<CalculatorAppPageProps> = ({ onNavigate }) => {
  const [display, setDisplay] = useState<string>('0');
  const [formula, setFormula] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Helper to safely format numbers
  const formatResult = (num: number): string => {
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return 'Infinity';
    const rounded = Math.round(num * 1e10) / 1e10;
    return String(rounded);
  };

  const handleNumber = (val: string) => {
    if (display === '0' || display === 'Error' || display === 'Infinity') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
  };

  const handleBackspace = () => {
    if (display.length > 1 && display !== 'Error' && display !== 'Infinity') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleOperator = (op: string) => {
    const currentVal = display;
    setFormula(`${formula} ${currentVal} ${op}`);
    setDisplay('0');
  };

  const handleEvaluate = () => {
    try {
      const fullExpression = `${formula} ${display}`
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/\^/g, '**');

      // Safe basic evaluation
      // eslint-disable-next-line no-new-func
      const result = Function(`'use strict'; return (${fullExpression})`)();
      const formatted = formatResult(result);
      
      const record = `${fullExpression} = ${formatted}`;
      setHistory((prev) => [record, ...prev.slice(0, 9)]);
      setDisplay(formatted);
      setFormula('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleScientific = (fn: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    const angle = isRad ? val : (val * Math.PI) / 180;

    switch (fn) {
      case 'sin':
        res = Math.sin(angle);
        break;
      case 'cos':
        res = Math.cos(angle);
        break;
      case 'tan':
        res = Math.tan(angle);
        break;
      case 'asin':
        res = isRad ? Math.asin(val) : (Math.asin(val) * 180) / Math.PI;
        break;
      case 'acos':
        res = isRad ? Math.acos(val) : (Math.acos(val) * 180) / Math.PI;
        break;
      case 'atan':
        res = isRad ? Math.atan(val) : (Math.atan(val) * 180) / Math.PI;
        break;
      case 'ln':
        res = Math.log(val);
        break;
      case 'log':
        res = Math.log10(val);
        break;
      case 'sqrt':
        res = Math.sqrt(val);
        break;
      case 'sqr':
        res = Math.pow(val, 2);
        break;
      case 'inv':
        res = 1 / val;
        break;
      case 'abs':
        res = Math.abs(val);
        break;
      case 'exp':
        res = Math.exp(val);
        break;
      case 'fact': {
        let f = 1;
        for (let i = 2; i <= Math.min(val, 170); i++) f *= i;
        res = f;
        break;
      }
      case 'pi':
        setDisplay(String(Math.PI));
        return;
      case 'e':
        setDisplay(String(Math.E));
        return;
      case 'neg':
        res = -val;
        break;
      case 'rand':
        res = Math.random();
        break;
      default:
        return;
    }

    const formatted = formatResult(res);
    setHistory((prev) => [`${fn}(${display}) = ${formatted}`, ...prev.slice(0, 9)]);
    setDisplay(formatted);
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(display);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left pb-28">
      {/* 0. RETURN NAVIGATION BAR */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate ? onNavigate('examples') : undefined}
          className="px-4 py-2 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Return to Examples</span>
        </button>

        <span className="text-xs font-mono font-bold text-neo-secondary uppercase tracking-wider px-3 py-1 rounded-neo-pill shadow-neo-inset-sm bg-neo-well/30 border border-neo-border">
          Live Template • Scientific Calculator
        </span>
      </div>

      {/* 1. CALCULATOR CHASSIS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Hardware Console (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-neo-card-lg bg-neo-surface shadow-neo-raised-lg border border-neo-border space-y-6">
          {/* Hardware Header Bar */}
          <div className="flex items-center justify-between border-b border-neo-border/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-neo-secondary shadow-neo-glow-subtle" />
              <span className="text-xs font-mono font-bold tracking-wider text-neo-primary uppercase">
                Neumorphia Precision FX-990
              </span>
            </div>

            {/* DEG / RAD & MEM Indicators */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRad(!isRad)}
                className="px-2.5 py-1 rounded-neo-control shadow-neo-raised-xs active:shadow-neo-inset-xs bg-neo-surface border border-neo-border text-[11px] font-mono font-bold text-neo-secondary"
              >
                {isRad ? 'RAD' : 'DEG'}
              </button>
              {memory !== 0 && (
                <span className="px-2 py-0.5 rounded-neo-pill shadow-neo-inset-xs bg-neo-well/40 text-[10px] font-mono font-bold text-emerald-500">
                  M
                </span>
              )}
            </div>
          </div>

          {/* Recessed High-Precision LCD Display */}
          <div className="p-5 sm:p-6 rounded-neo-card shadow-neo-inset-lg bg-neo-well/50 border border-neo-border/80 space-y-2 relative overflow-hidden">
            {/* Top Formula Trace */}
            <div className="flex items-center justify-between text-xs font-mono text-neo-primary/60 min-h-[20px] overflow-hidden">
              <span className="truncate pr-2">{formula || 'Ready'}</span>
              <button
                onClick={copyToClipboard}
                className="text-[10px] font-mono text-neo-primary/60 hover:text-neo-secondary transition-colors shrink-0"
              >
                {isCopied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>

            {/* Main Numeric Readout (No Scroll, Adaptive Font Size) */}
            <div
              className={`font-mono font-black text-neo-primary tracking-tight text-right overflow-hidden select-all leading-none py-1 ${
                display.length > 15
                  ? 'text-xl sm:text-2xl'
                  : display.length > 10
                  ? 'text-2xl sm:text-3xl'
                  : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}
            >
              {display}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-5 gap-2.5 sm:gap-3.5 pt-2 select-none">
            {/* Row 1: Scientific Trig & Powers */}
            <button
              onClick={() => handleScientific('sin')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              sin
            </button>
            <button
              onClick={() => handleScientific('cos')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              cos
            </button>
            <button
              onClick={() => handleScientific('tan')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              tan
            </button>
            <button
              onClick={() => handleScientific('ln')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              ln
            </button>
            <button
              onClick={() => handleScientific('log')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              log
            </button>

            {/* Row 2: Powers & Roots */}
            <button
              onClick={() => handleScientific('sqr')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              x²
            </button>
            <button
              onClick={() => handleScientific('sqrt')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              √x
            </button>
            <button
              onClick={() => handleScientific('inv')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              1/x
            </button>
            <button
              onClick={() => handleScientific('pi')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              π
            </button>
            <button
              onClick={() => handleScientific('e')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              e
            </button>

            {/* Row 3: Memory & Clear Controls */}
            <button
              onClick={handleClear}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-rose-500/30 text-xs font-mono font-bold text-rose-500 transition-all"
            >
              AC
            </button>
            <button
              onClick={handleBackspace}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-primary transition-all"
            >
              DEL
            </button>
            <button
              onClick={() => handleScientific('neg')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-primary transition-all"
            >
              ±
            </button>
            <button
              onClick={() => handleOperator('÷')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-sm font-bold text-neo-secondary transition-all"
            >
              ÷
            </button>
            <button
              onClick={() => {
                setMemory((prev) => prev + parseFloat(display || '0'));
              }}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-primary/80 transition-all"
            >
              M+
            </button>

            {/* Row 4: 7, 8, 9, ×, M- */}
            <button
              onClick={() => handleNumber('7')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              7
            </button>
            <button
              onClick={() => handleNumber('8')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              8
            </button>
            <button
              onClick={() => handleNumber('9')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('×')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-sm font-bold text-neo-secondary transition-all"
            >
              ×
            </button>
            <button
              onClick={() => {
                setMemory((prev) => prev - parseFloat(display || '0'));
              }}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-primary/80 transition-all"
            >
              M-
            </button>

            {/* Row 5: 4, 5, 6, −, MR */}
            <button
              onClick={() => handleNumber('4')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              4
            </button>
            <button
              onClick={() => handleNumber('5')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              5
            </button>
            <button
              onClick={() => handleNumber('6')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('−')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-sm font-bold text-neo-secondary transition-all"
            >
              −
            </button>
            <button
              onClick={() => {
                setDisplay(String(memory));
              }}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-primary/80 transition-all"
            >
              MR
            </button>

            {/* Row 6: 1, 2, 3, +, MC */}
            <button
              onClick={() => handleNumber('1')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              1
            </button>
            <button
              onClick={() => handleNumber('2')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              2
            </button>
            <button
              onClick={() => handleNumber('3')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              3
            </button>
            <button
              onClick={() => handleOperator('+')}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-sm font-bold text-neo-secondary transition-all"
            >
              +
            </button>
            <button
              onClick={() => setMemory(0)}
              className="py-3 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-primary/80 transition-all"
            >
              MC
            </button>

            {/* Row 7: 0, ., RAND, =, and EVAL */}
            <button
              onClick={() => handleNumber('0')}
              className="py-3.5 col-span-2 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-base font-bold text-neo-primary transition-all"
            >
              .
            </button>
            <button
              onClick={() => handleScientific('rand')}
              className="py-3.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-mono font-bold text-neo-secondary transition-all"
            >
              RND
            </button>
            <button
              onClick={handleEvaluate}
              className="py-3.5 rounded-neo-control shadow-neo-raised-md active:shadow-neo-inset-md bg-neo-surface border border-neo-secondary text-base font-bold text-neo-secondary transition-all"
            >
              =
            </button>
          </div>
        </div>

        {/* Calculation History & Constants Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* History Tape Card */}
          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-neo-border/50 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neo-primary">
                Calculation Tape
              </span>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="text-[10px] font-mono font-bold text-rose-500 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {history.length === 0 ? (
                <p className="text-xs font-mono text-neo-primary/60 italic py-4 text-center">
                  No previous calculations recorded
                </p>
              ) : (
                history.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-2.5 rounded-neo-control shadow-neo-inset-xs bg-neo-well/30 text-xs font-mono text-neo-primary/80 border border-neo-border/60 break-all"
                  >
                    {item}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Quick Scientific Constants Card */}
          <div className="p-6 rounded-neo-card bg-neo-surface shadow-neo-raised-md border border-neo-border space-y-3 text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neo-primary block border-b border-neo-border/50 pb-2">
              Physical Constants
            </span>
            <div className="space-y-2 text-xs font-mono">
              <div
                onClick={() => setDisplay(String(Math.PI))}
                className="p-2 rounded-neo-control shadow-neo-raised-xs hover:shadow-neo-inset-xs bg-neo-surface border border-neo-border flex items-center justify-between cursor-pointer"
              >
                <span className="text-neo-secondary font-bold">π (Pi)</span>
                <span className="text-neo-primary/70">3.14159265</span>
              </div>
              <div
                onClick={() => setDisplay(String(Math.E))}
                className="p-2 rounded-neo-control shadow-neo-raised-xs hover:shadow-neo-inset-xs bg-neo-surface border border-neo-border flex items-center justify-between cursor-pointer"
              >
                <span className="text-neo-secondary font-bold">e (Euler)</span>
                <span className="text-neo-primary/70">2.71828182</span>
              </div>
              <div
                onClick={() => setDisplay('299792458')}
                className="p-2 rounded-neo-control shadow-neo-raised-xs hover:shadow-neo-inset-xs bg-neo-surface border border-neo-border flex items-center justify-between cursor-pointer"
              >
                <span className="text-neo-secondary font-bold">c (Speed of Light)</span>
                <span className="text-neo-primary/70">2.9979e8 m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
