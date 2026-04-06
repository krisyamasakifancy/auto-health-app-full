import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NavBar } from '../components';
import { Check, Flame } from 'lucide-react';

// Nutrition bar component
const NutritionBar: React.FC<{
  label: string;
  value: string;
  color: string;
  percentage: number;
}> = ({ label, value, color, percentage }) => (
  <div className="flex flex-col">
    <div className="flex items-center gap-2 mb-1">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-body-sm text-text-secondary">{label}</span>
    </div>
    <span className="text-h4 font-bold text-text-primary">{value}</span>
    <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export const PlanSummary = () => {
  const navigate = useNavigate();

  const benefits = [
    "You'll maintain your weight effortlessly",
    "Results are focused only for the long-term",
    "Habits will help you sustain your success"
  ];

  return (
    <div className="min-h-full bg-background-mint">
      <NavBar showBack={true} transparent />

      <div className="px-6 pt-20 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="text-body-sm text-text-secondary flex items-center justify-center gap-1">
            <span className="text-primary">+</span>
            Your personal plan is ready
          </span>
          <h1 className="text-h1 font-bold text-text-primary mt-2">
            Maintain <span className="text-primary">106 kg</span><br />
            sustainably
          </h1>
        </motion.div>

        {/* Projected Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-5 mb-4 shadow-card"
        >
          <h3 className="text-h4 font-bold text-text-primary mb-4">Projected progress</h3>
          
          <div className="bg-primary-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-text-primary shadow-sm">
                106 kg
              </span>
            </div>
            
            <div className="h-1 bg-primary-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
            </div>
            
            <p className="text-center text-sm text-primary mt-3 font-medium">Maintain goal</p>
          </div>

          <p className="text-body-sm text-text-secondary mb-3">Today</p>

          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-body text-text-primary">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nutrition Recommendations Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-5 shadow-card"
        >
          <h3 className="text-h4 font-bold text-text-primary mb-4">Nutrition recommendations</h3>
          
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-accent-orange" />
            <span className="text-display text-text-primary">2,805</span>
            <span className="text-body text-text-muted">kcal</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <NutritionBar label="Carbs" value="379g" color="bg-accent-orange" percentage={55} />
            <NutritionBar label="Fats" value="84g" color="bg-accent-blue" percentage={25} />
            <NutritionBar label="Proteins" value="137g" color="bg-primary" percentage={20} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-background-mint safe-bottom"
      >
        <Button
          variant="primary"
          size="full"
          onClick={() => navigate('/plan-confirmation')}
        >
          Commit to my goal
        </Button>
      </motion.div>
    </div>
  );
};

export default PlanSummary;
