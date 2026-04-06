import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, MessageCircle, User } from 'lucide-react';

export interface TabItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
}

export interface TabBarProps {
  activeKey: string;
  onChange: (key: string) => void;
  items?: TabItem[];
  className?: string;
}

const defaultItems: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <Home className="w-6 h-6" />,
  },
  {
    key: 'calendar',
    label: 'Plan',
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    key: 'messages',
    label: 'Chat',
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    key: 'profile',
    label: 'Me',
    icon: <User className="w-6 h-6" />,
  },
];

const TabBar: React.FC<TabBarProps> = ({
  activeKey,
  onChange,
  items = defaultItems,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-white/90 backdrop-blur-lg
        border-t border-gray-200
        safe-bottom
        ${className}
      `}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <motion.button
              key={item.key}
              onClick={() => onChange(item.key)}
              whileTap={{ scale: 0.9 }}
              className={`
                flex flex-col items-center justify-center
                flex-1 h-full py-1
                transition-colors duration-200
                ${isActive ? 'text-primary' : 'text-text-muted'}
              `}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
              </motion.div>
              <span className={`
                text-xs mt-1 font-medium
                ${isActive ? 'text-primary' : 'text-text-muted'}
              `}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TabBar;
