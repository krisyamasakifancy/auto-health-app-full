import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface RadioCardProps {
  title: string;
  description: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const RadioCard: React.FC<RadioCardProps> = ({
  title,
  description,
  selected = false,
  onClick,
  icon,
  className = '',
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`
        relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer
        transition-all duration-200
        ${selected 
          ? 'bg-green-50 border-2 border-primary' 
          : 'bg-white border-2 border-transparent shadow-card hover:shadow-card-hover'}
        ${className}
      `}
    >
      {/* 图标区域 */}
      {icon && (
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
      )}

      {/* 文字内容 */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-text-primary text-base">{title}</h3>
        <p className="text-sm text-text-secondary mt-0.5 leading-relaxed">{description}</p>
      </div>

      {/* 选中标记 */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          <Check className="w-4 h-4 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default RadioCard;
