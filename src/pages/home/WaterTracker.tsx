import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { Droplets, Plus, Minus, Trophy, History, ChevronRight } from 'lucide-react';

const WaterTracker: React.FC = () => {
  const navigate = useNavigate();
  const [waterIntake, setWaterIntake] = useState(1200);
  const [target, setTarget] = useState(2500);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const cupSize = 250; // 每杯250ml
  const progress = Math.min((waterIntake / target) * 100, 100);
  const cupsConsumed = Math.floor(waterIntake / cupSize);
  const cupsTarget = Math.ceil(target / cupSize);

  const addWater = (amount: number) => {
    const newAmount = Math.min(waterIntake + amount, target * 1.5);
    setWaterIntake(newAmount);
    
    if (newAmount >= target && waterIntake < target) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const removeWater = (amount: number) => {
    setWaterIntake(Math.max(waterIntake - amount, 0));
  };

  const presets = [
    { amount: 150, label: '小口', icon: '☕' },
    { amount: 250, label: '一杯', icon: '🥛' },
    { amount: 500, label: '一瓶', icon: '🥤' },
  ];

  // 今日记录（模拟）
  const todayRecords = [
    { time: '08:00', amount: 250 },
    { time: '10:30', amount: 500 },
    { time: '14:00', amount: 250 },
    { time: '16:30', amount: 200 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="饮水追踪" showBack={true} />

      <div className="pt-20 px-6 pb-8">
        {/* 庆祝动画 */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-text-primary text-white px-6 py-4 rounded-2xl shadow-float">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="font-bold text-lg">目标达成！🎉</p>
                    <p className="text-white/70">今日饮水目标已完成</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 水波纹动画区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-64 h-64 mx-auto mb-8"
        >
          {/* 外圈 */}
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          
          {/* 水波纹效果 */}
          <div className="absolute inset-2 rounded-full overflow-hidden bg-blue-50">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-500 to-blue-400"
              style={{ height: `${progress}%` }}
            >
              {/* 波浪顶部 */}
              <svg 
                className="absolute -top-4 left-0 w-full"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
              >
                <path 
                  fill="#60A5FA"
                  d="M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z"
                >
                  <animate 
                    attributeName="d" 
                    dur="3s" 
                    repeatCount="indefinite"
                    values="
                      M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z;
                      M0,64 C480,-20 960,150 1440,64 L1440,120 L0,120 Z;
                      M0,64 C480,150 960,-20 1440,64 L1440,120 L0,120 Z
                    "
                  />
                </path>
              </svg>
            </motion.div>
          </div>

          {/* 中心数据 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={waterIntake}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-text-primary"
            >
              {waterIntake}
            </motion.div>
            <p className="text-text-muted">/ {target} ml</p>
            <div className="mt-2 px-3 py-1 bg-blue-100 rounded-full">
              <p className="text-sm text-blue-600 font-medium">{Math.round(progress)}%</p>
            </div>
          </div>
        </motion.div>

        {/* 杯数统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-2 mb-8"
        >
          {[...Array(cupsTarget)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`w-8 h-10 rounded-lg flex items-center justify-center text-lg ${
                i < cupsConsumed 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-100 text-blue-300'
              }`}
            >
              💧
            </motion.div>
          ))}
        </motion.div>

        {/* 快捷添加按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {presets.map((preset, index) => (
            <motion.button
              key={preset.amount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addWater(preset.amount)}
              className="bg-white rounded-2xl p-4 shadow-card text-center active:scale-95 transition-transform"
            >
              <span className="text-2xl mb-2 block">{preset.icon}</span>
              <p className="font-bold text-text-primary">+{preset.amount}ml</p>
              <p className="text-xs text-text-muted">{preset.label}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* 自定义输入 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 shadow-card mb-6"
        >
          <div className="flex items-center justify-between">
            <button 
              onClick={() => removeWater(50)}
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-text-primary active:scale-95 transition-transform"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <p className="text-sm text-text-muted">自定义</p>
              <p className="text-2xl font-bold text-text-primary">50ml</p>
            </div>
            
            <button 
              onClick={() => addWater(50)}
              className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 今日记录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-text-muted" />
              <h3 className="font-medium text-text-primary">今日记录</h3>
            </div>
            <button className="text-primary text-sm flex items-center gap-1">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {todayRecords.map((record, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${
                  index !== todayRecords.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-text-primary">{record.time}</span>
                </div>
                <span className="font-medium text-text-primary">+{record.amount}ml</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WaterTracker;
