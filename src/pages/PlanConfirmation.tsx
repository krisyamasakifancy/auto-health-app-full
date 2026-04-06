import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NavBar } from '../components';

// Celebration raccoon mascot SVG
const CelebrationRaccoon: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-48 h-48" fill="none">
    {/* Body */}
    <ellipse cx="100" cy="130" rx="45" ry="40" fill="#C5C5D0" />
    
    {/* Tail */}
    <path 
      d="M145 130 Q160 120 155 100 Q150 80 140 90" 
      stroke="#1A1A1A" 
      strokeWidth="12" 
      fill="none" 
      strokeLinecap="round"
    />
    <path 
      d="M150 125 Q160 115 155 100" 
      stroke="#C5C5D0" 
      strokeWidth="6" 
      fill="none" 
      strokeLinecap="round"
    />
    
    {/* Head */}
    <ellipse cx="100" cy="85" rx="50" ry="42" fill="#C5C5D0" />
    
    {/* Ears */}
    <path d="M55 55 L45 30 L70 45 Z" fill="#1A1A1A" />
    <path d="M145 55 L155 30 L130 45 Z" fill="#1A1A1A" />
    
    {/* Eye mask */}
    <ellipse cx="70" cy="78" rx="18" ry="14" fill="#1A1A1A" />
    <ellipse cx="130" cy="78" rx="18" ry="14" fill="#1A1A1A" />
    
    {/* Eyes - excited sparkle */}
    <circle cx="70" cy="78" r="10" fill="white" />
    <circle cx="70" cy="78" r="5" fill="#1A1A1A" />
    <circle cx="74" cy="74" r="3" fill="white" />
    
    <circle cx="130" cy="78" r="10" fill="white" />
    <circle cx="130" cy="78" r="5" fill="#1A1A1A" />
    <circle cx="134" cy="74" r="3" fill="white" />
    
    {/* Cheeks - blush */}
    <ellipse cx="55" cy="95" rx="8" ry="5" fill="#E8A5B0" opacity="0.6" />
    <ellipse cx="145" cy="95" rx="8" ry="5" fill="#E8A5B0" opacity="0.6" />
    
    {/* Nose */}
    <ellipse cx="100" cy="95" rx="6" ry="4" fill="#1A1A1A" />
    
    {/* Mouth - excited open */}
    <ellipse cx="100" cy="105" rx="8" ry="10" fill="#1A1A1A" />
    <ellipse cx="100" cy="108" rx="4" ry="5" fill="#E8A5B0" />
    
    {/* Hands - raised in celebration */}
    <ellipse cx="60" cy="125" rx="12" ry="15" fill="#C5C5D0" />
    <ellipse cx="140" cy="125" rx="12" ry="15" fill="#C5C5D0" />
    
    {/* Heart on chest */}
    <path 
      d="M100 140 C95 135, 90 135, 90 140 C90 145, 100 155, 100 155 C100 155, 110 145, 110 140 C110 135, 105 135, 100 140" 
      fill="white"
    />
  </svg>
);

export const PlanConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full relative overflow-hidden">
      {/* Background with rays */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-200 via-yellow-100 to-white">
        {/* Decorative rays */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ray1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M50% 0 L30% 100 L40% 100 Z" fill="url(#ray1)" opacity="0.5" />
          <path d="M50% 0 L70% 100 L60% 100 Z" fill="url(#ray1)" opacity="0.5" />
        </svg>
        
        {/* Confetti dots */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-8 w-4 h-4 rounded-full bg-red-400"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-10 w-3 h-3 rounded-full bg-yellow-400"
        />
        <motion.div
          animate={{ 
            y: [-15, 15, -15]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-48 left-16 w-2 h-2 rounded-full bg-blue-400"
        />
      </div>

      <NavBar showBack={true} transparent />

      <div className="relative z-10 min-h-full px-6 pt-24 pb-8 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-h1 font-bold text-text-primary">
            Maintaining <span className="text-primary">106 kg</span><br />
            is a realistic target
          </h1>
          
          <p className="text-body text-text-secondary mt-4">
            You are just one step away from getting your personalized plan
          </p>
        </motion.div>

        {/* Mascot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex-1 flex items-center justify-center py-8"
        >
          <div className="relative">
            <CelebrationRaccoon />
            
            {/* Sparkles around mascot */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -left-8 top-1/2 text-yellow-500 text-2xl"
            >
              {'\u2726'}
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="absolute -right-4 top-1/3 text-yellow-500 text-xl"
            >
              {'\u2726'}
            </motion.div>
          </div>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="primary"
            size="full"
            onClick={() => navigate('/plan-summary')}
          >
            Get my personal plan
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PlanConfirmation;
