import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NavBar, RadioCard, ProgressBar, MascotBubble } from '../components';
import { ChevronRight } from 'lucide-react';

// Activity level icon component
const ActivityIcon: React.FC<{ level: number; active?: boolean }> = ({ level, active = false }) => {
  const bars = [1, 2, 3, 4];
  const colors = active 
    ? ['#10B981', '#10B981', '#10B981', '#10B981']
    : level === 0 
      ? ['#FCA5A5', '#E5E7EB', '#E5E7EB', '#E5E7EB']
      : level === 1
        ? ['#FCD34D', '#FCD34D', '#E5E7EB', '#E5E7EB']
        : level === 2
          ? ['#10B981', '#10B981', '#10B981', '#E5E7EB']
          : ['#10B981', '#10B981', '#10B981', '#10B981'];

  return (
    <div className="flex items-end gap-0.5 h-8">
      {bars.map((bar, idx) => (
        <div
          key={bar}
          className="w-1.5 rounded-sm transition-all duration-300"
          style={{
            height: `${(idx + 1) * 6 + 6}px`,
            backgroundColor: idx < level + 1 ? colors[idx] : '#E5E7EB',
            opacity: idx < level + 1 ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
};

const activityLevels = [
  {
    id: 'not-active',
    title: 'Not active',
    description: 'I quickly lose my breath climbing stairs',
    level: 0,
  },
  {
    id: 'lightly-active',
    title: 'Lightly active',
    description: 'Sometimes I do short workouts to keep myself moving',
    level: 1,
  },
  {
    id: 'moderately-active',
    title: 'Moderately active',
    description: 'I maintain a regular exercise routine of 1-2 times per week',
    level: 2,
  },
  {
    id: 'highly-active',
    title: 'Highly active',
    description: 'Fitness is a core part of my lifestyle',
    level: 3,
  },
];

export const ActivityLevel = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('lightly-active');

  return (
    <div className="min-h-full bg-background">
      <NavBar showBack={true} />

      <div className="page-container pt-20">
        {/* Progress Bar */}
        <ProgressBar progress={75} className="mb-6" />

        {/* Mascot Bubble */}
        <MascotBubble 
          message="What's your activity level?" 
          className="mb-8"
        />

        {/* Options */}
        <div className="flex-1 space-y-3">
          {activityLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RadioCard
                title={level.title}
                description={level.description}
                selected={selectedLevel === level.id}
                onClick={() => setSelectedLevel(level.id)}
                icon={<ActivityIcon level={level.level} active={selectedLevel === level.id} />
                }
              />
            </motion.div>
          ))}
        </div>

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
            onClick={() => navigate('/meals-per-day')}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityLevel;
