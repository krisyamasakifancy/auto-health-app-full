import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NavBar, MascotBubble } from '../components';

// kg to lbs conversion
const kgToLbs = (kg: number): number => Math.round(kg * 2.20462);

export const TargetWeight = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(106);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const minWeight = 40;
  const maxWeight = 150;
  const step = 0.5;

  // Handle scroll to change weight
  const handleScroll = () => {
    if (!containerRef.current || isDragging) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const itemHeight = 80; // height of each item
    const centerOffset = 160; // half of container height
    
    const newWeight = minWeight + (scrollTop + centerOffset - itemHeight / 2) / itemHeight * step;
    const clampedWeight = Math.max(minWeight, Math.min(maxWeight, newWeight));
    setWeight(Math.round(clampedWeight * 2) / 2); // Round to nearest 0.5
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isDragging]);

  // Generate weight options
  const weights = [];
  for (let w = minWeight; w <= maxWeight; w += step) {
    weights.push(w);
  }

  const lbs = kgToLbs(weight);

  return (
    <div className="min-h-full bg-background">
      <NavBar showBack={true} />

      <div className="px-6 pt-8 pb-8">
        <MascotBubble message="What's your target weight?" />

        {/* Weight Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 relative h-80"
        >
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-20 bg-gray-100 rounded-2xl -z-10" />
          
          <div className="flex h-full">
            {/* KG Column */}
            <div 
              ref={containerRef}
              className="flex-1 overflow-y-auto no-scrollbar relative"
              style={{ scrollSnapType: 'y mandatory' }}
            >
              <div className="h-32" />
              
              {weights.map((w) => {
                const isSelected = w === weight;
                const distance = Math.abs(w - weight);
                const opacity = Math.max(0.2, 1 - distance * 0.3);
                
                return (
                  <motion.div
                    key={w}
                    style={{ scrollSnapAlign: 'center' }}
                    className={`h-20 flex items-center justify-end pr-8 ${isSelected ? 'font-bold' : ''}`}
                    animate={{ 
                      scale: isSelected ? 1.2 : 1,
                      opacity: opacity
                    }}
                    onClick={() => setWeight(w)}
                  >
                    <span className={`text-4xl ${isSelected ? 'text-text-primary' : 'text-text-muted'}`}>
                      {w.toFixed(w % 1 === 0 ? 0 : 1)}
                    </span>
                  </motion.div>
                );
              })}
              
              <div className="h-32" />
            </div>

            {/* Selected Weight Display */}
            <div className="w-px bg-gray-200 mx-4" />

            {/* Unit and LBS */}
            <div className="flex-1 flex flex-col justify-center">
              <motion.div
                key={weight}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl font-bold text-text-primary"
              >
                {weight.toFixed(weight % 1 === 0 ? 0 : 1)}
              </motion.div>
              <div className="text-h3 text-text-primary mt-1">kg</div>

              <div className="mt-6">
                <motion.div
                  key={lbs}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  className="text-2xl text-text-muted"
                >
                  {lbs}
                </motion.div>
                <div className="text-body-sm text-text-muted">lbs</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-2xl p-5 shadow-card"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-body font-semibold text-text-primary">Maintain weight</span>
            <span className="px-2 py-0.5 bg-primary-100 text-primary text-caption font-medium rounded-full">
              Realistic
            </span>
          </div>
          
          <p className="text-body-sm text-text-secondary">
            Stay consistent and keep making mindful choices to maintain your weight.
          </p>
        </motion.div>

        {/* Source Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full text-center mt-6 text-body-sm text-text-muted underline"
        >
          Source of recommendations
        </motion.button>

        {/* Bottom Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Button
            variant="primary"
            size="full"
            onClick={() => navigate('/plan-confirmation')}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TargetWeight;
