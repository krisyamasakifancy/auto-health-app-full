import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, NavBar, TagGroup, ProgressBar, MascotBubble } from '../components';
import { Plus, Check } from 'lucide-react';

const foodRestrictions = [
  'All meat',
  'Animal products',
  'Citrus fruits',
  'Dairy',
  'Eggs',
  'Fish',
  'Gluten',
  'Nuts',
  'Red meat',
  'Seafood',
  'Seeds',
  'Shellfish',
  'Soy',
];

export const FoodRestrictions = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [eatEverything, setEatEverything] = useState(false);

  const handleEatEverything = () => {
    setEatEverything(!eatEverything);
    if (!eatEverything) {
      setSelectedTags([]);
    }
  };

  return (
    <div className="min-h-full bg-background">
      <NavBar showBack={true} />

      <div className="page-container pt-20">
        {/* 进度条 */}
        <ProgressBar progress={65} className="mb-6" />

        {/* 吉祥物气泡 */}
        <MascotBubble 
          message="Do you have any food restrictions or allergies?" 
          className="mb-8"
        />

        {/* Tag选择区 */}
        <div className="flex-1">
          <TagGroup
            tags={foodRestrictions}
            selectedTags={eatEverything ? [] : selectedTags}
            onChange={(tags) => {
              setSelectedTags(tags);
              if (tags.length > 0) setEatEverything(false);
            }}
            className="mb-4"
          />

          {/* 添加自定义标签按钮 */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {}}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-text-primary"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        {/* 底部按钮 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 space-y-4"
        >
          <Button 
            variant={eatEverything ? "primary" : "outline"} 
            size="full"
            icon={eatEverything ? <Check className="w-5 h-5" /> : null}
            onClick={handleEatEverything}
          >
            I eat everything
          </Button>

          <Button 
            variant="primary" 
            size="full"
            onClick={() => navigate('/activity-level')}
            disabled={!eatEverything && selectedTags.length === 0}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodRestrictions;
