import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Plus,
  Minus,
  Heart,
  Share2,
  ChevronRight,
  Flame,
  Scale,
  Check
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  unit: string;
  unitWeight: number;
  category: string;
  tags: string[];
  alternatives?: string[];
}

const FoodDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [amount, setAmount] = useState(100);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);

  // 模拟食物数据
  const food: FoodItem = {
    id: id || '1',
    name: '鸡胸肉（去皮）',
    emoji: '🍗',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    unit: '100g',
    unitWeight: 100,
    category: '肉类',
    tags: ['高蛋白', '低脂', '健身必备'],
    alternatives: ['火鸡胸肉', '鱼肉', '豆腐'],
  };

  const calculatedNutrition = {
    calories: Math.round((food.calories * amount) / 100),
    protein: Math.round((food.protein * amount) / 100 * 10) / 10,
    carbs: Math.round((food.carbs * amount) / 100 * 10) / 10,
    fat: Math.round((food.fat * amount) / 100 * 10) / 10,
    fiber: Math.round((food.fiber * amount) / 100 * 10) / 10,
  };

  const handleAddToDiary = () => {
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2000);
  };

  const quickAmounts = [50, 100, 150, 200];

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        title="食物详情" 
        showBack={true}
        rightElement={
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-text-muted'}`} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Share2 className="w-5 h-5 text-text-muted" />
            </button>
          </div>
        }
      />

      <div className="pt-20 px-4 pb-32">
        {/* 头部信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center text-6xl mb-4">
            {food.emoji}
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">{food.name}</h1>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {food.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 数量选择 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-secondary">数量 ({food.unit})</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setAmount(Math.max(10, amount - 10))}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-16 text-center text-xl font-bold">{amount}</span>
              <button 
                onClick={() => setAmount(amount + 10)}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 快捷数量 */}
          <div className="flex gap-2">
            {quickAmounts.map(qty => (
              <button
                key={qty}
                onClick={() => setAmount(qty)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  amount === qty
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {qty}g
              </button>
            ))}
          </div>
        </motion.div>

        {/* 营养成分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 mb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text-primary">营养成分</h3>
            <span className="text-text-muted text-sm">每 {amount}g</span>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary mb-1">{calculatedNutrition.calories}</div>
            <div className="text-text-muted">千卡</div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { label: '蛋白质', value: calculatedNutrition.protein, unit: 'g', color: 'bg-blue-500' },
              { label: '碳水', value: calculatedNutrition.carbs, unit: 'g', color: 'bg-yellow-500' },
              { label: '脂肪', value: calculatedNutrition.fat, unit: 'g', color: 'bg-red-500' },
              { label: '纤维', value: calculatedNutrition.fiber, unit: 'g', color: 'bg-green-500' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${item.color}`} />
                <div className="text-lg font-bold">{item.value}</div>
                <div className="text-xs text-text-muted">{item.unit} {item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 替代选择 */}
        {food.alternatives && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6"
          >
            <h3 className="font-semibold text-text-primary mb-4">相似食物</h3>
            <div className="space-y-3">
              {food.alternatives.map((alt, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100"
                >
                  <span>{alt}</span>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-bottom">
        <Button 
          variant="primary" 
          size="full"
          onClick={handleAddToDiary}
        >
          添加到饮食日记
        </Button>
      </div>

      {/* 添加成功提示 */}
      {showAddedToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-text-primary text-white px-6 py-3 rounded-full shadow-float flex items-center gap-2"
        >
          <Check className="w-5 h-5 text-green-400" />
          已添加到日记
        </motion.div>
      )}
    </div>
  );
};

export default FoodDetail;
