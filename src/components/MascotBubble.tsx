import React from 'react';
import { motion } from 'framer-motion';

export interface MascotBubbleProps {
  message: string;
  className?: string;
}

// Raccoon mascot SVG
const RaccoonMascot: React.FC = () => (
  <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none">
    {/* Blue background circle */}
    <circle cx="30" cy="30" r="28" fill="#60A5FA" />
    
    {/* Raccoon face */}
    <ellipse cx="30" cy="34" rx="16" ry="14" fill="#E5E7EB" />
    
    {/* Eye mask */}
    <ellipse cx="22" cy="32" rx="6" ry="5" fill="#1A1A1A" />
    <ellipse cx="38" cy="32" rx="6" ry="5" fill="#1A1A1A" />
    
    {/* Eyes */}
    <circle cx="22" cy="32" r="2.5" fill="white" />
    <circle cx="38" cy="32" r="2.5" fill="white" />
    
    {/* Nose */}
    <ellipse cx="30" cy="38" rx="3" ry="2" fill="#1A1A1A" />
    
    {/* Mouth */}
    <path d="M27 42 Q30 45 33 42" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    
    {/* Ears */}
    <path d="M14 26 L18 18 L22 26 Z" fill="#1A1A1A" />
    <path d="M38 26 L42 18 L46 26 Z" fill="#1A1A1A" />
  </svg>
);

const MascotBubble: React.FC<MascotBubbleProps> = ({
  message,
  className = '',
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${className}`}
    >
      <div className="flex-shrink-0">
        <RaccoonMascot />
      </div>
      <div className="flex-1 bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm">
        <p className="text-text-primary font-semibold text-lg leading-snug">{message}</p>
      </div>
    </motion.div>
  );
};

export default MascotBubble;
