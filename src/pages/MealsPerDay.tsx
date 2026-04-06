import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NavBar, ScrollPicker, ProgressBar, MascotBubble } from '../components';
import { ChevronRight } from 'lucide-react';

const mealOptions = [1, 2, 3, 4, 5];

export const MealsPerDay = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState(2);

  return (
    <div className="min-h-full bg-background">
      <NavBar showBack={true} />

      <div className="page-container pt-20">
        {/* Progress Bar */}
        <ProgressBar progress={85} className="mb-6" />

        {/* Mascot Bubble */}
        <MascotBubble 
          message="How many meals per day do you usually have?" 
          className="mb-12"
        />

        {/* Scroll Picker */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex items-center justify-center"
        >
          <ScrollPicker
            options={mealOptions}
            value={meals}
            onChange={setMeals}
            className="w-full"
          />
        </motion.div>

        {/* Bottom Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button 
            variant="primary" 
            size="full"
            icon={<ChevronRight className="w-5 h-5" />}
            iconPosition="right"
            onClick={() => navigate('/target-weight')}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MealsPerDay;
