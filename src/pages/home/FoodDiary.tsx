import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Plus, 
  Search, 
  Camera, 
  Clock, 
  Flame,
  ChevronRight,
  Utensils
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  portion: string;
  time: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

const FoodDiary: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');

  // 日期选择器数据
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  // 模拟食物记录
  const foodRecords: FoodItem[] = [
    { id: '1', name: '燕麦粥', calories: 150, portion: '1碗', time: '08:00', meal: 'breakfast' },
    { id: '2', name: '水煮蛋', calories: 70, portion: '1个', time: '08:00', meal: 'breakfast' },
    { id: '3', name: '全麦面包', calories: 120, portion: '2片', time: '08:00', meal: 'breakfast' },
    { id: '4', name: '鸡胸肉沙拉', calories: 320, portion: '1份', time: '12:30', meal: 'lunch' },
    { id: '5', name: '糙米饭', calories: 180, portion: '1碗', time: '12:30', meal: 'lunch' },
    { id: '6', name: '苹果', calories: 95, portion: '1个', time: '15:00', meal: 'snack' },
    { id: '7', name: '坚果', calories: 160, portion: '30g', time: '15:00', meal: 'snack' },
  ];

  const mealTypes = [
    { id: 'all', label: '全部', icon: '🍽️' },
    { id: 'breakfast', label: '早餐', icon: '🍳' },
    { id: 'lunch', label: '午餐', icon: '🍱' },
    { id: 'dinner', label: '晚餐', icon: '🥗' },
    { id: 'snack', label: '加餐', icon: '🍎' },
  ] as const;

  const filteredFoods = activeTab === 'all' 
    ? foodRecords 
    : foodRecords.filter(f => f.meal === activeTab);

  const mealCalories = {
    breakfast: foodRecords.filter(f => f.meal === 'breakfast').reduce((sum, f) => sum + f.calories, 0),
    lunch: foodRecords.filter(f => f.meal === 'lunch').reduce((sum, f) => sum + f.calories, 0),
    dinner: 0,
    snack: foodRecords.filter(f => f.meal === 'snack').reduce((sum, f) => sum + f.calories, 0),
  };

  const totalCalories = Object.values(mealCalories).reduce((a, b) => a + b, 0);
  const targetCalories = 2000;

  return (
    <div className="min-h-screen bg-background pb-24">
      <NavBar 
        title="饮食日记" 
        showBack={true}
        rightElement={
          <button className="p-2">
            <Camera className="w-5 h-5 text-text-primary" />
          </button>
        }
      />

      <div className="pt-14">
        {/* 日期选择器 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-4 py-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            {weekDates.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-colors ${
                    isSelected 
                      ? 'bg-primary text-white' 
                      : isToday 
                        ? 'bg-primary-50 text-primary' 
                        : 'text-text-secondary'
                  }`}
                >
                  <span className="text-xs mb-1">{weekDays[date.getDay()]}</span>
                  <span className={`text-lg font-bold ${isSelected ? 'text-white' : ''}`}>
                    {date.getDate()}
                  </span>
                  {isToday && !isSelected && (
                    <div className="w-1 h-1 bg-primary rounded-full mt-1" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* 热量概览 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-text-primary rounded-3xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span>今日摄入</span>
              </div>
              <span className="text-white/70">{Math.round((totalCalories / targetCalories) * 100)}%</span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">{totalCalories}</span>
              <span className="text-white/70">/ {targetCalories} kcal</span>
            </div>

            <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
              />
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: '早餐', value: mealCalories.breakfast, icon: '🍳' },
                { label: '午餐', value: mealCalories.lunch, icon: '🍱' },
                { label: '晚餐', value: mealCalories.dinner, icon: '🥗' },
                { label: '加餐', value: mealCalories.snack, icon: '🍎' },
              ].map((meal) => (
                <div key={meal.label} className="bg-white/10 rounded-xl p-2">
                  <span className="text-lg">{meal.icon}</span>
                  <p className="text-xs text-white/70 mt-1">{meal.label}</p>
                  <p className="font-bold text-sm">{meal.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 分类标签 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6"
          >
            {mealTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeTab === type.id
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-secondary shadow-card'
                }`}
              >
                <span>{type.icon}</span>
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </motion.div>

          {/* 食物列表 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">
                {mealTypes.find(m => m.id === activeTab)?.label}
              </h3>
              <span className="text-text-muted text-sm">
                {filteredFoods.length} 项
              </span>
            </div>

            <div className="space-y-3">
              {filteredFoods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                      {mealTypes.find(m => m.id === food.meal)?.icon}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{food.name}</p>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span>{food.portion}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        <span>{food.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-text-primary">{food.calories} kcal</p>
                  </div>
                </motion.div>
              ))}

              {filteredFoods.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-text-muted">暂无记录</p>
                  <button 
                    onClick={() => navigate('/home/quick-add')}
                    className="mt-4 text-primary font-medium"
                  >
                    添加食物
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 浮动添加按钮 */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/home/quick-add')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-float"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FoodDiary;
