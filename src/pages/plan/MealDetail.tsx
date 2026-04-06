import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Clock, 
  Flame, 
  Users, 
  ChefHat,
  Check,
  Plus,
  Minus,
  Heart,
  Share2
} from 'lucide-react';

const MealDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [servings, setServings] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // 模拟餐食数据
  const meal = {
    id: '1',
    name: '鸡胸肉藜麦沙拉',
    description: '高蛋白低脂的健康沙拉，搭配新鲜蔬菜和藜麦，营养均衡又美味。',
    image: '🥗',
    calories: 420,
    protein: 35,
    carbs: 45,
    fat: 12,
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: '简单',
    tags: ['高蛋白', '低脂', '健身餐'],
    ingredients: [
      { name: '鸡胸肉', amount: 200, unit: 'g' },
      { name: '藜麦', amount: 80, unit: 'g' },
      { name: '生菜', amount: 100, unit: 'g' },
      { name: '小番茄', amount: 8, unit: '个' },
      { name: '黄瓜', amount: 1, unit: '根' },
      { name: '橄榄油', amount: 1, unit: '汤匙' },
      { name: '柠檬汁', amount: 1, unit: '汤匙' },
      { name: '黑胡椒', amount: 0.5, unit: '茶匙' },
    ],
    steps: [
      '藜麦洗净，加水煮15分钟至熟透，沥干备用。',
      '鸡胸肉洗净，用厨房纸吸干水分，撒盐和黑胡椒腌制10分钟。',
      '平底锅烧热，加少许橄榄油，放入鸡胸肉煎至两面金黄，熟透后切块。',
      '生菜洗净撕小块，小番茄对半切开，黄瓜切片。',
      '将藜麦、蔬菜、鸡胸肉放入大碗中。',
      '淋上橄榄油和柠檬汁，撒上黑胡椒，拌匀即可享用。',
    ],
  };

  const toggleStepComplete = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const adjustedCalories = Math.round(meal.calories * servings);
  const adjustedIngredients = meal.ingredients.map(ing => ({
    ...ing,
    amount: Math.round(ing.amount * servings * 10) / 10,
  }));

  return (
    <div className="min-h-screen bg-background pb-24">
      <NavBar 
        title="餐食详情" 
        showBack={true}
        rightElement={
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${isLiked ? 'text-red-500' : 'text-text-muted'}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
            </button>
            <button className="p-2 text-text-muted">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        }
      />

      <div className="pt-14">
        {/* 顶部图片区 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
        >
          <span className="text-8xl">{meal.image}</span>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* 基本信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-text-primary mb-2">{meal.name}</h1>
            <p className="text-text-secondary">{meal.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {meal.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 营养信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-text-primary rounded-2xl p-5 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span>{adjustedCalories} kcal</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {meal.prepTime + meal.cookTime}分钟
                </span>
                <span className="flex items-center gap-1">
                  <ChefHat className="w-4 h-4" /> {meal.difficulty}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-2xl font-bold">{Math.round(meal.protein * servings)}g</p>
                <p className="text-white/70 text-sm">蛋白质</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-2xl font-bold">{Math.round(meal.carbs * servings)}g</p>
                <p className="text-white/70 text-sm">碳水</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-2xl font-bold">{Math.round(meal.fat * servings)}g</p>
                <p className="text-white/70 text-sm">脂肪</p>
              </div>
            </div>
          </motion.div>

          {/* 份量调整 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-text-muted" />
                <span className="font-medium text-text-primary">份量</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <span className="text-xl font-bold text-text-primary w-16 text-center">
                  {servings} 份
                </span>
                
                <button 
                  onClick={() => setServings(servings + 0.5)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* 食材清单 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-text-primary mb-4">食材清单</h3>
            
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              {adjustedIngredients.map((ingredient, index) => (
                <div
                  key={ingredient.name}
                  className={`flex items-center justify-between p-4 ${
                    index !== adjustedIngredients.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <span className="text-text-primary">{ingredient.name}</span>
                  <span className="text-text-secondary">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 制作步骤 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-text-primary mb-4">制作步骤</h3>
            
            <div className="space-y-3">
              {meal.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => toggleStepComplete(index)}
                  className={`bg-white rounded-2xl p-4 shadow-card flex gap-4 cursor-pointer transition-colors ${
                    completedSteps.includes(index) ? 'bg-green-50' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    completedSteps.includes(index) 
                      ? 'bg-green-500 text-white' 
                      : 'bg-primary-100 text-primary'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  
                  <p className={`flex-1 ${completedSteps.includes(index) ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom">
        <Button
          variant="primary"
          size="full"
          onClick={() => {
            alert('已添加到今日记录');
            navigate('/home/food-diary');
          }}
        >
          添加到今日记录
        </Button>
      </div>
    </div>
  );
};

export default MealDetail;
