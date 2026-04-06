import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export interface ListItemProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  icon,
  title,
  subtitle,
  trailing,
  onClick,
  divider = true,
  className = '',
}) => {
  return (
    <>
      <motion.div
        onClick={onClick}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        className={`
          flex items-center gap-4 py-4 px-4
          ${onClick ? 'cursor-pointer active:scale-98' : ''}
          ${className}
        `}
      >
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-text-primary">
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-text-primary text-base truncate">{title}</h4>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-0.5 truncate">{subtitle}</p>
          )}
        </div>
        
        <div className="flex-shrink-0 flex items-center">
          {trailing || (onClick && <ChevronRight className="w-5 h-5 text-text-muted" />)}
        </div>
      </motion.div>
      
      {divider && (
        <div className="h-px bg-gray-200 mx-4" />
      )}
    </>
  );
};

export default ListItem;
