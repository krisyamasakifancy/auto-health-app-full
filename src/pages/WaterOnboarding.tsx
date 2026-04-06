import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NavBar } from '../components';

// Water glasses animation component
const WaterGlasses: React.FC = () => {
  return (
    <div className="flex items-end justify-center gap-2 mb-8">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          {/* Glass background */}
          <div className={`
            w-16 h-24 rounded-b-2xl border-4 
            ${index <= 2 ? 'border-blue-400 bg-blue-100' : 'border-blue-200 bg-blue-50'}
            overflow-hidden relative
          `}>
            {/* Water level */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: index <= 2 ? '70%' : '0%' }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 bg-blue-400 rounded-b-xl"
            />
            
            {/* Highlight */}
            <div className="absolute top-2 left-2 w-2 h-12 bg-white/30 rounded-full" />
          </div>
          
          {/* Water drop animation (middle glass) */}
          {index === 2 && (
            <>
              <motion.div
                animate={{ y: [0, 40, 80], opacity: [1, 0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-4 bg-blue-400 rounded-full"
              />
              <motion.div
                animate={{ y: [0, 30, 60], opacity: [1, 0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeIn", delay: 0.3 }}
                className="absolute -top-6 left-1/3 w-2 h-3 bg-blue-300 rounded-full"
              />
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export const WaterOnboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gradient-to-b from-blue-200 to-blue-50">
      <NavBar showBack={true} transparent />

      <div className="min-h-full px-6 pt-24 pb-24 flex flex-col">
        {/* Water glasses */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <WaterGlasses />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-text-primary text-center leading-tight mb-4"
          >
            Water boosts fat burn,<br />energy, and focus
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-body text-text-secondary text-center max-w-xs"
          >
            Water helps your body function at its best — it supports digestion, boosts energy, and keeps your mind clear.
          </motion.p>
        </motion.div>

        {/* Bottom button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Button 
            variant="primary" 
            size="full"
            onClick={() => navigate('/')}
          >
            Let's go
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default WaterOnboarding;
