import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { 
  ChevronLeft, 
  ChevronRight, 
  Utensils,
  Clock,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface MealPlan {
  id: string;
  name: string;
  time: string;
  calories: number;
  completed: boolean;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  image?: string;
}

interface DayPlan {
  date: Date;
  totalCalories: number;
  consumedCalories: number;
  meals: MealPlan[];
}

const PlanCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 生成日历数据
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // 上月日期
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // 当月日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // 下月日期
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  const calendarDays = getDaysInMonth(currentDate);
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const monthNames = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  // 模拟每日计划
  const getDayPlan = (date: Date): DayPlan => {
    const isToday = date.toDateString() === new Date().toDateString();
    return {
      date,
      totalCalories: 2000,
      consumedCalories: isToday ? 1450 : 0,
      meals: [
        { id: '1', name: '燕麦粥配水果', time: '08:00', calories: 350, completed: isToday, type: 'breakfast' },
        { id: '2', name: '鸡胸肉沙拉', time: '12:30', calories: 450, completed: isToday, type: 'lunch' },
        { id: '3', name: '清蒸鱼配蔬菜', time: '18:30', calories: 400, completed: false, type: 'dinner' },
        { id: '4', name: '希腊酸奶', time: '15:00', calories: 150, completed: isToday, type: 'snack' },
      ],
    };
  };

  const selectedDayPlan = getDayPlan(selectedDate);

  const mealTypeIcons = {
    breakfast: '🍳',
    lunch: '🍱',
    dinner: '🥗',
    snack: '🍎',
  };

  const toggleMealComplete = (mealId: string) => {
    // 模拟标记完成
    console.log('Toggle meal:', mealId);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <NavBar title="计划日历" showBack={true} />

      <div className="pt-14">
        {/* 月份导航 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-6 py-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            
            <h2 className="text-xl font-bold text-text-primary">
              {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
            </h2>
            
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </motion.div>

        {/* 日历网格 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white px-6 pb-4"
        >
          {/* 星期标题 */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm text-text-muted py-2">
                {day}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(({ date, isCurrentMonth }, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const progress = isToday ? 75 : isCurrentMonth ? Math.random() * 100 : 0;

              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isCurrentMonth && setSelectedDate(date)}
                  className={`aspect-square rounded-2xl p-1 flex flex-col items-center justify-center relative ${
                    isSelected 
                      ? 'bg-primary text-white' 
                      : isToday 
                        ? 'bg-primary-50 text-primary'
                        : isCurrentMonth 
                          ? 'text-text-primary hover:bg-gray-50'
                          : 'text-gray-300'
                  }`}
                >
                  <span className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}>
                    {date.getDate()}
                  </span>
                  
                  {isCurrentMonth && (
                    <div className="w-full px-1 mt-1">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isSelected ? 'bg-white/50' : 'bg-primary'}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* 选中日期详情 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDate.toDateString()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 py-6"
          >
            {/* 日期标题 */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-text-muted text-sm">
                  {selectedDate.toLocaleDateString('zh-CN', { weekday: 'long' })}
                </p>
                <h3 className="text-xl font-bold text-text-primary">
                  {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
                </h3>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-text-primary">
                  {selectedDayPlan.consumedCalories}
                </p>
                <p className="text-text-muted text-sm">/ {selectedDayPlan.totalCalories} kcal</p>
              </div>
            </div>

            {/* 进度条 */}
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min((selectedDayPlan.consumedCalories / selectedDayPlan.totalCalories) * 100, 100)}%` }}
              />
            </div>

            {/* 餐食列表 */}
            <div className="space-y-3">
              {selectedDayPlan.meals.map((meal, index) => (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/plan/meal-detail/${meal.id}`)}
                  className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMealComplete(meal.id);
                    }}
                    className="flex-shrink-0"
                  >
                    {meal.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                  </button>

                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {mealTypeIcons[meal.type]}
                  </div>

                  <div className="flex-1">
                    <p className={`font-medium ${meal.completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                      {meal.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <Clock className="w-3 h-3" />
                      <span>{meal.time}</span>
                      <span>·</span>
                      <span>{meal.calories} kcal</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlanCalendar;
