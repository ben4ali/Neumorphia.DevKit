import React from 'react';

export interface NeumorphicAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export const NeumorphicAvatar: React.FC<NeumorphicAvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback = 'U',
  size = 'md',
  status,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  }[size];

  const statusColors = {
    online: 'bg-neo-success',
    offline: 'bg-neo-primary/40',
    busy: 'bg-neo-danger',
    away: 'bg-neo-warning',
  };

  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      {/* Recessed Bevel Frame */}
      <div
        className={`${sizeClasses} rounded-full p-1 shadow-neo-inset-sm bg-neo-surface border border-neo-border flex items-center justify-center overflow-hidden`}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
        ) : (
          <div className="w-full h-full rounded-full bg-neo-well/50 shadow-neo-raised-sm flex items-center justify-center text-neo-secondary font-bold select-none">
            {fallback}
          </div>
        )}
      </div>

      {/* Status Dot */}
      {status && (
        <span
          className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full ${statusColors[status]} border-2 border-neo-surface shadow-neo-raised-sm`}
        />
      )}
    </div>
  );
};

export interface NeumorphicAvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}

export const NeumorphicAvatarGroup: React.FC<NeumorphicAvatarGroupProps> = ({
  children,
  max,
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingCount = max ? Math.max(childrenArray.length - max, 0) : 0;

  return (
    <div className={`flex items-center -space-x-3 ${className}`}>
      {visibleChildren.map((child, idx) => (
        <div key={idx} className="relative transition-transform hover:z-10 hover:scale-105">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="relative w-12 h-12 rounded-full p-1 shadow-neo-inset-sm bg-neo-surface border border-neo-border flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-neo-well/60 shadow-neo-raised-sm flex items-center justify-center text-xs font-bold text-neo-primary">
            +{remainingCount}
          </div>
        </div>
      )}
    </div>
  );
};
