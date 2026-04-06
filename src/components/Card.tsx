import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  selectable?: boolean;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  selected = false,
  selectable = false,
  icon,
  title,
  description,
  onClick,
  disabled = false,
}) => {
  const baseStyles = `
    relative overflow-hidden
    bg-white rounded-2xl p-4
    transition-all duration-200
  `;

  const stateStyles = selected
    ? 'border-2 border-primary bg-primary-50'
    : 'border-2 border-transparent shadow-card hover:shadow-card-hover';

  const interactiveStyles = (onClick || selectable)
    ? 'cursor-pointer active:scale-98'
    : '';

  const disabledStyles = disabled ? 'opacity-50 pointer-events-none' : '';

  const combinedClassName = `${baseStyles} ${stateStyles} ${interactiveStyles} ${disabledStyles} ${className}`;

  return (
    <motion.div
      className={combinedClassName}
      onClick={onClick}
      whileTap={onClick || selectable ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.1 }}
    >
      {/* 选中标记 */}
      {selectable && selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* 内容布局 */}
      {(icon || title || description) ? (
        <div className="flex items-center gap-4">
          {icon && (
            <div className={`
              flex-shrink-0 w-12 h-12 rounded-xl
              flex items-center justify-center
              ${selected ? 'bg-primary text-white' : 'bg-gray-100 text-text-primary'}
            `}>
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="font-semibold text-text-primary text-base">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-text-secondary mt-1">{description}</p>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
};

export default Card;
