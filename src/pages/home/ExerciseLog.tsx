import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Plus, 
  Flame, 
  Clock, 
  TrendingUp,
  Dumbbell,
  Bike,
  Waves,
  Footprints,
  MoreHorizontal,
  Calendar,
  Trophy
} from 'lucide-react';

interface ExerciseRecord {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports';
  duration: number;
  calories: number;
  intensity: 'low' | 'medium' | 'high';
  date: string;
  icon: string;
}

const ExerciseLog: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const getWeekDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  // 模拟运动记录
  const exerciseRecords: ExerciseRecord[] = [
    { id: '1', name: '晨跑', type: 'cardio', duration: 30, calories: 280, intensity: 'medium', date: '今天', icon: '🏃' },
    { id: '2', name: '瑜伽', type: 'flexibility', duration: 45, calories: 150, intensity: 'low', date: '今天', icon: '🧘' },
    { id: '3', name: '力量训练', type: 'strength', duration: 60, calories: 350, intensity: 'high', date: '昨天', icon: '💪' },
    { id: '4', name: '游泳', type: 'sports', duration: 40, calories: 400, intensity: 'high', date: '昨天', icon: '🏊' },
  ];

  const todayRecords = exerciseRecords.filter(r => r.date === '今天');
  const todayCalories = todayRecords.reduce((sum, r) => sum + r.calories, 0);
  const todayDuration = todayRecords.reduce((sum, r) => sum + r.duration, 0);

  const weeklyGoal = { calories: 2000, duration: 300 };
  const weeklyProgress = { calories: 1580, duration: 245 };

  const exerciseTypes = [
    { id: 'cardio', name: '有氧运动', icon: <Footprints className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' },
    { id: 'strength', name: '力量训练', icon: <Dumbbell className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
    { id: 'sports', name: '球类运动', icon: <Trophy className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
    { id: 'flexibility', name: '柔韧性', icon: <Waves className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
  ];

  const quickAddExercises = [
    { name: '跑步', calories: 300, icon: '🏃', duration: 30 },
    { name: '骑行', calories: 250, icon: '🚴', duration: 30 },
    { name: '游泳', calories: 400, icon: '🏊', duration: 30 },
    { name: '瑜伽', calories: 120, icon: '🧘', duration: 30 },
    { name: '力量', calories: 200, icon: '💪', duration: 30 },
    { name: '更多', calories: 0, icon: '➕', duration: 0 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <NavBar 
        title="运动记录" 
        showBack={true}
        rightElement={
          <button className="p-2">
            <Calendar className="w-5 h-5 text-text-primary" />
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
          {/* 今日统计 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-text-primary rounded-3xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/70 mb-1">今日消耗</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{todayCalories}</span>
                  <span className="text-white/70">kcal</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Flame className="w-8 h-8 text-orange-400" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-3">
                <Clock className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                <p className="text-xl font-bold">{todayDuration}</p>
                <p className="text-xs text-white/70">分钟</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <Dumbbell className="w-5 h-5 mx-auto mb-1 text-green-400" />
                <p className="text-xl font-bold">{todayRecords.length}</p>
                <p className="text-xs text-white/70">项运动</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                <p className="text-xl font-bold">85%</p>
                <p className="text-xs text-white/70">完成度</p>
              </div>
            </div>
          </motion.div>

          {/* 本周目标进度 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">本周目标</h3>
              <span className="text-sm text-text-muted">
                {Math.round((weeklyProgress.calories / weeklyGoal.calories) * 100)}%
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">热量消耗</span>
                  <span className="text-text-primary">
                    {weeklyProgress.calories} / {weeklyGoal.calories} kcal
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((weeklyProgress.calories / weeklyGoal.calories) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-secondary">运动时长</span>
                  <span className="text-text-primary">
                    {weeklyProgress.duration} / {weeklyGoal.duration} 分钟
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((weeklyProgress.duration / weeklyGoal.duration) * 100, 100)}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 运动类型 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-text-primary mb-4">运动类型</h3>
            <div className="grid grid-cols-4 gap-3">
              {exerciseTypes.map((type) => (
                <button
                  key={type.id}
                  className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl shadow-card active:scale-95 transition-transform"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.color}`}>
                    {type.icon}
                  </div>
                  <span className="text-xs text-text-secondary">{type.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 今日记录 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">今日记录</h3>
              <button className="text-primary text-sm">查看全部</button>
            </div>

            <div className="space-y-3">
              {todayRecords.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                      {record.icon}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{record.name}</p>
                      <div className="flex items-center gap-3 text-sm text-text-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {record.duration}分钟
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          record.intensity === 'high' ? 'bg-red-100 text-red-600' :
                          record.intensity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {record.intensity === 'high' ? '高强度' : 
                           record.intensity === 'medium' ? '中等强度' : '低强度'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-primary">{record.calories}</p>
                    <p className="text-xs text-text-muted">kcal</p>
                  </div>
                </motion.div>
              ))}

              {todayRecords.length === 0 && (
                <div className="text-center py-8 text-text-muted">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="w-8 h-8 text-gray-400" />
                  </div>
                  <p>今天还没有运动记录</p>
                  <p className="text-sm mt-1">开始你的第一次运动吧！</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 快捷添加按钮 */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-float"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* 添加运动弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="w-full bg-white rounded-t-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-primary">添加运动</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {quickAddExercises.map((exercise) => (
                <button
                  key={exercise.name}
                  onClick={() => {
                    setShowAddModal(false);
                    // 添加运动逻辑
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl active:scale-95 transition-transform"
                >
                  <span className="text-3xl">{exercise.icon}</span>
                  <span className="font-medium text-text-primary">{exercise.name}</span>
                  {exercise.calories > 0 && (
                    <span className="text-xs text-text-muted">{exercise.calories} kcal</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExerciseLog;
