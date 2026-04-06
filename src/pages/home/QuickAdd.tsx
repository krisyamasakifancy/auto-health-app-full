import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button, Input } from '../../components';
import { 
  Search, 
  Camera, 
  Plus,
  Minus,
  X,
  History,
  Star,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  unit: string;
  category: string;
  isFavorite?: boolean;
}

const QuickAdd: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [selectedFoods, setSelectedFoods] = useState<{ food: FoodItem; amount: number }[]>([]);

  const mealTypes = [
    { id: 'breakfast', label: '早餐', icon: '🍳' },
    { id: 'lunch', label: '午餐', icon: '🍱' },
    { id: 'dinner', label: '晚餐', icon: '🥗' },
    { id: 'snack', label: '加餐', icon: '🍎' },
  ] as const;

  // 模拟食物数据库
  const foodDatabase: FoodItem[] = [
    { id: '1', name: '燕麦粥', calories: 150, unit: '碗', category: '主食' },
    { id: '2', name: '水煮蛋', calories: 70, unit: '个', category: '蛋白质' },
    { id: '3', name: '全麦面包', calories: 120, unit: '片', category: '主食' },
    { id: '4', name: '牛奶', calories: 130, unit: '杯', category: '饮品' },
    { id: '5', name: '鸡胸肉', calories: 165, unit: '100g', category: '蛋白质', isFavorite: true },
    { id: '6', name: '西兰花', calories: 35, unit: '100g', category: '蔬菜' },
    { id: '7', name: '糙米饭', calories: 180, unit: '碗', category: '主食' },
    { id: '8', name: '苹果', calories: 95, unit: '个', category: '水果' },
    { id: '9', name: '香蕉', calories: 105, unit: '根', category: '水果', isFavorite: true },
    { id: '10', name: '酸奶', calories: 120, unit: '杯', category: '饮品' },
  ];

  const recentFoods = foodDatabase.slice(0, 4);
  const favoriteFoods = foodDatabase.filter(f => f.isFavorite);

  const filteredFoods = searchQuery
    ? foodDatabase.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.category.includes(searchQuery)
      )
    : [];

  const addFood = (food: FoodItem) => {
    const existing = selectedFoods.find(s => s.food.id === food.id);
    if (existing) {
      setSelectedFoods(selectedFoods.map(s => 
        s.food.id === food.id 
          ? { ...s, amount: s.amount + 1 }
          : s
      ));
    } else {
      setSelectedFoods([...selectedFoods, { food, amount: 1 }]);
    }
  };

  const removeFood = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(s => s.food.id !== foodId));
  };

  const updateAmount = (foodId: string, delta: number) => {
    setSelectedFoods(selectedFoods.map(s => {
      if (s.food.id === foodId) {
        const newAmount = Math.max(0.5, s.amount + delta);
        return { ...s, amount: newAmount };
      }
      return s;
    }));
  };

  const totalCalories = selectedFoods.reduce((sum, s) => 
    sum + s.food.calories * s.amount, 0
  );

  const handleSave = () => {
    if (selectedFoods.length === 0) {
      alert('请至少选择一种食物');
      return;
    }
    alert(`已添加 ${selectedFoods.length} 种食物，共 ${Math.round(totalCalories)} kcal`);
    navigate('/home/food-diary');
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavBar 
        title="快速添加" 
        showBack={true}
        rightElement={
          <button className="p-2">
            <Camera className="w-5 h-5 text-text-primary" />
          </button>
        }
      />

      <div className="pt-14">
        {/* 餐次选择 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-4 py-4 shadow-sm"
        >
          <div className="flex justify-between">
            {mealTypes.map((meal) => (
              <button
                key={meal.id}
                onClick={() => setSelectedMeal(meal.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-colors ${
                  selectedMeal === meal.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary'
                }`}
              >
                <span className="text-2xl">{meal.icon}</span>
                <span className="text-sm font-medium">{meal.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* 搜索框 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索食物..."
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:border-primary text-text-primary"
              />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {searchQuery ? (
              /* 搜索结果 */
              <motion.div
                key="search-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <h3 className="font-medium text-text-primary">搜索结果</h3>
                {filteredFoods.length > 0 ? (
                  filteredFoods.map((food) => (
                    <FoodItemCard 
                      key={food.id} 
                      food={food} 
                      selected={selectedFoods.find(s => s.food.id === food.id)}
                      onAdd={() => addFood(food)}
                    />
                  ))
                ) : (
                  <p className="text-text-muted text-center py-8">未找到相关食物</p>
                )}
              </motion.div>
            ) : (
              /* 默认展示 */
              <motion.div
                key="default-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* 最近添加 */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <History className="w-5 h-5 text-text-muted" />
                    <h3 className="font-medium text-text-primary">最近添加</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {recentFoods.map((food) => (
                      <FoodItemCard 
                        key={food.id} 
                        food={food}
                        selected={selectedFoods.find(s => s.food.id === food.id)}
                        onAdd={() => addFood(food)}
                      />
                    ))}
                  </div>
                </div>

                {/* 我的收藏 */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-text-muted" />
                    <h3 className="font-medium text-text-primary">我的收藏</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {favoriteFoods.map((food) => (
                      <FoodItemCard 
                        key={food.id} 
                        food={food}
                        selected={selectedFoods.find(s => s.food.id === food.id)}
                        onAdd={() => addFood(food)}
                      />
                    ))}
                  </div>
                </div>

                {/* 分类浏览 */}
                <div>
                  <h3 className="font-medium text-text-primary mb-4">分类浏览</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['主食', '蛋白质', '蔬菜', '水果', '饮品', '零食'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSearchQuery(category)}
                        className="p-4 bg-white rounded-2xl shadow-card text-left active:scale-95 transition-transform"
                      >
                        <p className="font-medium text-text-primary">{category}</p>
                        <p className="text-sm text-text-muted">点击查看</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 底部已选食物栏 */}
      <AnimatePresence>
        {selectedFoods.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-float"
          >
            <div className="p-4 safe-bottom">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-text-primary">
                  已选 {selectedFoods.length} 种食物
                </span>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-bold text-text-primary">
                    {Math.round(totalCalories)} kcal
                  </span>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-4">
                {selectedFoods.map(({ food, amount }) => (
                  <div 
                    key={food.id}
                    className="flex-shrink-0 bg-gray-100 rounded-xl p-3 flex items-center gap-3"
                  >
                    <div>
                      <p className="font-medium text-text-primary text-sm">{food.name}</p>
                      <p className="text-xs text-text-muted">{Math.round(food.calories * amount)} kcal</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateAmount(food.id, -0.5)}
                        className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      
                      <span className="text-sm font-medium w-8 text-center">{amount}</span>
                      
                      <button 
                        onClick={() => updateAmount(food.id, 0.5)}
                        className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFood(food.id)}
                      className="ml-2 text-text-muted"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                size="full"
                onClick={handleSave}
              >
                确认添加
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 食物项卡片组件
const FoodItemCard = ({ 
  food, 
  selected,
  onAdd 
}: { 
  food: FoodItem; 
  selected?: { food: FoodItem; amount: number };
  onAdd: () => void;
}) => (
  <div className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between">
    <div>
      <p className="font-medium text-text-primary">{food.name}</p>
      <div className="flex items-center gap-2 text-sm text-text-muted">
        <span>{food.category}</span>
        <span>·</span>
        <span>{food.calories} kcal/{food.unit}</span>
      </div>
    </div>
    
    <button
      onClick={onAdd}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
        selected 
          ? 'bg-green-500 text-white' 
          : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
      }`}
    >
      {selected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
    </button>
  </div>
);

// 缺少的导入
import { Minus, X } from 'lucide-react';

export default QuickAdd;
