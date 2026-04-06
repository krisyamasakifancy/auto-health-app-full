import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, X, MoreHorizontal } from 'lucide-react';

export interface NavBarProps {
  title?: string;
  showBack?: boolean;
  showClose?: boolean;
  showMore?: boolean;
  transparent?: boolean;
  className?: string;
  onBack?: () => void;
  onClose?: () => void;
  onMore?: () => void;
  rightElement?: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  showBack = true,
  showClose = false,
  showMore = false,
  transparent = false,
  className = '',
  onBack,
  onClose,
  onMore,
  rightElement,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        h-14 px-4
        ${transparent ? 'bg-transparent' : 'bg-background/80 backdrop-blur-lg'}
        safe-top
        ${className}
      `}
    >
      {/* 左侧按钮 */}
      <div className="flex items-center w-20">
        {showBack && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-200/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-text-primary" />
          </motion.button>
        )}
      </div>

      {/* 中间标题 */}
      <div className="flex-1 text-center">
        {title && (
          <h1 className="text-lg font-semibold text-text-primary truncate">{title}</h1>
        )}
      </div>

      {/* 右侧按钮 */}
      <div className="flex items-center justify-end w-20 gap-1">
        {rightElement}
        {showMore && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onMore}
            className="p-2 rounded-full hover:bg-gray-200/50 transition-colors"
          >
            <MoreHorizontal className="w-6 h-6 text-text-primary" />
          </motion.button>
        )}
        {showClose && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200/50 transition-colors"
          >
            <X className="w-6 h-6 text-text-primary" />
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
};

export default NavBar;
