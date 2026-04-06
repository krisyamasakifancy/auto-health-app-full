import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, NavBar, Card } from '../components';
import { Apple, Heart, Zap, Smile, Trophy, Flame, BookOpen, ChevronRight } from 'lucide-react';

const goals = [
  { id: 1, icon: <Apple className="w-6 h-6" />, label: 'Build healthy relationship with food', color: 'text-green-500' },
  { id: 2, icon: <Heart className="w-6 h-6" />, label: 'Improve overall wellbeing', color: 'text-red-500' },
  { id: 3, icon: <Zap className="w-6 h-6" />, label: 'Boost daily energy', color: 'text-yellow-500' },
  { id: 4, icon: <Smile className="w-6 h-6" />, label: 'Improve gut health', color: 'text-orange-500' },
  { id: 5, icon: <Trophy className="w-6 h-6" />, label: 'Feel better about myself', color: 'text-pink-500' },
  { id: 6, icon: <Flame className="w-6 h-6" />, label: 'Improve sport performance', color: 'text-blue-500' },
  { id: 7, icon: <BookOpen className="w-6 h-6" />, label: 'Reduce stress', color: 'text-purple-500' },
  { id: 8, icon: <Apple className="w-6 h-6" />, label: 'Learn more about nutrition', color: 'text-green-600' },
];

export const GoalSelection = () => {
  const [selectedGoals, setSelectedGoals] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

  const toggleGoal = (id: number) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-full bg-background">
      <NavBar showBack={true} />
      
      <div className="page-container pt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h2 text-text-primary mb-6"
        >
          Any additional goals?
        </motion.h1>

        <div className="flex-1 space-y-3">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                selectable
                selected={selectedGoals.includes(goal.id)}
                onClick={() => toggleGoal(goal.id)}
                icon={<div className={goal.color}>{goal.icon}</div>
                }
                title={goal.label}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Button 
            variant="primary" 
            size="full" 
            icon={<ChevronRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Next
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GoalSelection;
