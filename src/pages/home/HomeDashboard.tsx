import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../components';
import { 
  Droplets, 
  Scale, 
  Utensils, 
  Footprints, 
  Flame,
  ChevronRight,
  Plus,
  Trophy,
  TrendingUp
} from 'lucide-react';

const HomeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 今日数据（模拟）
  const todayStats = {
    calories: { current: 1450, target: 2000 },
    water: { current: 1200, target: 2500 },
    steps: { current: 6540, target: 10000 },
    weight: { current: 70.5, change: -0.3 },
  };

  const meals = [
    { name: '早餐', calories: 450, time: '08:00', icon: '🍳', logged: true },
    { name: '午餐', calories: 650, time: '12:30', icon: '🍱', logged: true },
    { name: '晚餐', calories: 0, time: '18:00', icon: '🥗', logged: false },
    { name: '加餐', calories: 150, time: '15:00', icon: '🍎', logged: true },
  ];

  const activities = [
    { icon: <Droplets className="w-5 h-5" />, label: '饮水', value: `${todayStats.water.current}ml`, progress: (todayStats.water.current / todayStats.water.target) * 100, color: 'bg-blue-500', path: '/home/water-tracker' },
    { icon: <Scale className="w-5 h-5" />, label: '体重', value: `${todayStats.weight.current}kg`, change: `${todayStats.weight.change}kg`, color: 'bg-purple-500', path: '/home/weight-log' },
    { icon: <Footprints className="w-5 h-5" />, label: '步数', value: `${todayStats.steps.current}`, progress: (todayStats.steps.current / todayStats.steps.target) * 100, color: 'bg-orange-500', path: '/home/exercise-log' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* 顶部问候语 */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 pt-16 pb-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-sm">{currentDate.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <h1 className="text-2xl font-bold text-text-primary mt-1">早上好，健康达人 👋</h1>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            用
          </div>
        </div>
      </motion.div>

      <div className="px-6 space-y-6">
        {/* 今日热量卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-text-primary rounded-3xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="font-medium">今日热量</span>
            </div>
            <span className="text-white/70 text-sm">{Math.round((todayStats.calories.current / todayStats.calories.target) * 100)}%</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold">{todayStats.calories.current}</span>
            <span className="text-white/70">/ {todayStats.calories.target} kcal</span>
          </div>

          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(todayStats.calories.current / todayStats.calories.target) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            />
          </div>

          <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold">85g</p>
              <p className="text-white/60 text-xs">蛋白质</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">120g</p>
              <p className="text-white/60 text-xs">碳水</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">45g</p>
              <p className="text-white/60 text-xs">脂肪</p>
            </div>
          </div>
        </motion.div>

        {/* 快捷活动追踪 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-3"
        >
          {activities.map((activity, index) => (
            <motion.button
              key={activity.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => navigate(activity.path)}
              className="bg-white rounded-2xl p-4 shadow-card text-left active:scale-95 transition-transform"
            >
              <div className={`w-10 h-10 ${activity.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                {activity.icon}
              </div>
              <p className="text-text-muted text-xs">{activity.label}</p>
              <p className="font-bold text-text-primary">{activity.value}</p>
              {activity.progress && (
                <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${activity.color} rounded-full`}
                    style={{ width: `${Math.min(activity.progress, 100)}%` }}
                  />
                </div>
              )}
              {activity.change && (
                <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {activity.change}
                </p>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* 今日餐食记录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">今日餐食</h2>
            <button 
              onClick={() => navigate('/home/food-diary')}
              className="text-primary text-sm flex items-center gap-1"
            >
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {meals.map((meal, index) => (
              <motion.div
                key={meal.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => !meal.logged && navigate('/home/quick-add')}
                className={`bg-white rounded-2xl p-4 shadow-card flex items-center justify-between ${!meal.logged ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meal.icon}</span>
                  <div>
                    <p className="font-medium text-text-primary">{meal.name}</p>
                    <p className="text-sm text-text-muted">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {meal.logged ? (
                    <span className="font-bold text-text-primary">{meal.calories} kcal</span>
                  ) : (
                    <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 成就提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-white">
            <p className="font-bold">连续打卡 7 天！</p>
            <p className="text-sm text-white/80">继续保持，您正在养成健康的习惯 🎉</p>
          </div>
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.div>
      </div>
    </div>
  );
};

export default HomeDashboard;
