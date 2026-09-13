import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  showBackground?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 32,
  className = '',
  showBackground = false,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`transition-colors duration-200 ${className}`}
      {...props}
    >
      {showBackground && (
        <rect width="512" height="512" className="fill-neo-base" rx="96" />
      )}

      {/* 
        Concept : "L'Empreinte Molle & la Touche Tactile"
        - 100% centered at (256, 256)
        - Seamless rounded ends and curves
        - Central squircle button
        - Top-left 135° highlight arc & bottom-right shadow arc
      */}
      <g className="fill-current text-neo-primary transition-colors duration-200">
        {/* 1. Bouton tactile central (centré à 256, 256, rayon très doux) */}
        <rect x="184" y="184" width="144" height="144" rx="52" />

        {/* 2. Arche supérieure gauche (Highlight) */}
        <path
          d="M 124 256
             A 132 132 0 0 1 256 124
             C 269.25 124, 280 113.25, 280 100
             C 280 86.75, 269.25 76, 256 76
             A 180 180 0 0 0 76 256
             C 76 269.25, 86.75 280, 100 280
             C 113.25 280, 124 269.25, 124 256 Z"
        />

        {/* 3. Arche inférieure droite (Dark Shadow) */}
        <path
          d="M 388 256
             A 132 132 0 0 1 256 388
             C 242.75 388, 232 398.75, 232 412
             C 232 425.25, 242.75 436, 256 436
             A 180 180 0 0 0 436 256
             C 436 242.75, 425.25 232, 412 232
             C 398.75 232, 388 242.75, 388 256 Z"
        />
      </g>
    </svg>
  );
};

export default Logo;
