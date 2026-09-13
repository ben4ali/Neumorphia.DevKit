import React from 'react';
import { AppView } from '../../hooks/useRegistry';
import { Logo } from '../common/Logo';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-neo-border bg-neo-base mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Author */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-neo-control shadow-neo-raised-sm bg-neo-surface border border-neo-border flex items-center justify-center p-1.5 select-none">
              <Logo size={20} className="text-neo-primary" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold tracking-tight text-neo-primary block">
                Neumorphia<span className="text-neo-secondary font-black">.DevKit</span>
              </span>
              <p className="text-[12px] text-neo-primary/70 font-medium">
                Created by{' '}
                <a
                  href="https://github.com/ben4ali"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-neo-primary hover:text-neo-secondary transition-colors underline decoration-neo-secondary/40 underline-offset-2"
                >
                  Ali Benkarrouch
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-neo-primary/70">
            <button
              onClick={() => onNavigate('home')}
              className="px-2.5 py-1 rounded-neo-control hover:text-neo-primary hover:bg-neo-well/30 transition-colors"
            >
              Guide & Overview
            </button>
            <button
              onClick={() => onNavigate('components')}
              className="px-2.5 py-1 rounded-neo-control hover:text-neo-primary hover:bg-neo-well/30 transition-colors"
            >
              Components
            </button>
            <button
              onClick={() => onNavigate('docs')}
              className="px-2.5 py-1 rounded-neo-control hover:text-neo-primary hover:bg-neo-well/30 transition-colors"
            >
              Installation
            </button>
            <button
              onClick={() => onNavigate('playground')}
              className="px-2.5 py-1 rounded-neo-control hover:text-neo-primary hover:bg-neo-well/30 transition-colors"
            >
              Sandbox
            </button>
          </div>

          {/* Actions: GitHub & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ben4ali/Neumorphia.DevKit"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-bold text-neo-primary transition-all flex items-center gap-1.5"
            >
              <span>GitHub / Neumorphia.DevKit</span>
            </a>

            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-neo-control shadow-neo-raised-sm hover:shadow-neo-inset-sm active:shadow-neo-inset-sm bg-neo-surface border border-neo-border text-xs font-semibold text-neo-primary transition-all"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-8 pt-6 border-t border-neo-border/40 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neo-primary/60 gap-2">
          <p>© {new Date().getFullYear()} Neumorphia DevKit. Developed by Ali Benkarrouch.</p>
          <a
            href="https://github.com/ben4ali"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neo-secondary transition-colors"
          >
            github.com/ben4ali
          </a>
        </div>
      </div>
    </footer>
  );
};
