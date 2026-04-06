import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface ScrollPickerProps {
  options: (string | number)[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

const ScrollPicker: React.FC<ScrollPickerProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeight = 80;
  const selectedIndex = options.findIndex(opt => opt === value);

  useEffect(() => {
    if (containerRef.current && selectedIndex !== -1) {
      const container = containerRef.current;
      const targetScroll = selectedIndex * itemHeight - container.clientHeight / 2 + itemHeight / 2;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [value, selectedIndex]);

  const handleScroll = () => {
    if (!containerRef.current || isDragging) return;
    
    const container = containerRef.current;
    const scrollPos = container.scrollTop + container.clientHeight / 2;
    const newIndex = Math.round(scrollPos / itemHeight) - 1;
    const clampedIndex = Math.max(0, Math.min(newIndex, options.length - 1));
    
    if (options[clampedIndex] !== value) {
      onChange(options[clampedIndex]);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const deltaY = startY - e.touches[0].clientY;
    containerRef.current.scrollTop = scrollTop + deltaY;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    handleScroll();
  };

  return (
    <div className={`relative h-[300px] overflow-hidden ${className}`}>
      {/* 选中指示器 */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-20 pointer-events-none">
        <div className="h-full border-y-2 border-transparent" />
      </div>

      {/* 滚动容器 */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto no-scrollbar snap-y snap-mandatory"
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {/* 顶部占位 */}
        <div style={{ height: '110px' }} />

        {/* 选项 */}
        {options.map((option, index) => {
          const isSelected = option === value;
          const distance = Math.abs(index - selectedIndex);
          const opacity = Math.max(0.2, 1 - distance * 0.3);
          const scale = isSelected ? 1 : Math.max(0.7, 1 - distance * 0.1);

          return (
            <motion.div
              key={option}
              className={`
                h-20 flex items-center justify-center snap-center cursor-pointer
                transition-all duration-200
              `}
              onClick={() => onChange(option)}
              animate={{ opacity, scale }}
            >
              <span className={`
                text-5xl font-bold transition-colors duration-200
                ${isSelected ? 'text-text-primary' : 'text-gray-300'}
              `}>
                {option}
              </span>
            </motion.div>
          );
        })}

        {/* 底部占位 */}
        <div style={{ height: '110px' }} />
      </div>
    </div>
  );
};

export default ScrollPicker;
