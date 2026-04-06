import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Target,
  TrendingDown,
  TrendingUp,
  Scale,
  Calendar,
  Edit3,
  ChevronRight,
  Award,
  AlertCircle
} from 'lucide-react';

interface Goal {
  id: string;
  type: 'weight' | 'exercise' | 'diet' | 'water';
  title: string;
  target: string;
  current: string;
  deadline: string;
  progress: number;
  icon: string;
  status: 'active' | 'completed' | 'paused';
}

const GoalManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const goals: Goal[] = [
    {
      id: '1',
      type: 'weight',
      title: '减重目标',
      target: '65.0 kg',
      current: '70.5 kg',
      deadline: '2026-06-30',
      progress: 45,
      icon: '⚖️',
      status: 'active',
    },
    {
      id: '2',
      type: 'exercise',
      title: '每周运动',
      target: '5 天/周',
      current: '3 天',
      deadline: '每周',
      progress: 60,
      icon: '🏃',
      status: 'active',
    },
    {
      id: '3',
      type: 'water',
      title: '每日饮水',
      target: '2500 ml',
      current: '1800 ml',
      deadline: '每日',
      progress: 72,
      icon: '💧',
      status: 'active',
    },
    {
      id: '4',
      type: 'diet',
      title: '热量控制',
      target: '1800 kcal/天',
      current: '1650 kcal',
      deadline: '每日',
      progress: 92,
      icon: '🥗',
      status: 'active',
    },
    {
      id: '5',
      type: 'weight',
      title: '减重10斤',
      target: '75.0 kg → 70.0 kg',
      current: '已完成',
      deadline: '2026-03-01',
      progress: 100,
      icon: '🎯',
      status: 'completed',
    },
  ];

  const filteredGoals = goals.filter(g => g.status === activeTab);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-primary';
    if (progress >= 30) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        title="目标管理" 
        showBack={true}
        rightElement={
          <button 
            onClick={() => navigate('/goal-selection')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Edit3 className="w-5 h-5 text-text-primary" />
          </button>
        }
      />

      <div className="pt-20 px-4 pb-8">
        {/* 当前目标概览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary-600 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm mb-1">当前主要目标</p>
              <h2 className="text-2xl font-bold">减重 5.5kg</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              ⚖️
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/70">截止日期: 2026-06-30</span>
            <span className="px-2 py-1 bg-white/20 rounded-full">还剩 85 天</span>
          </div>
        </motion.div>

        {/* Tab 切换 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex bg-white rounded-2xl p-1 mb-6"
        >
          {[
            { id: 'active', label: '进行中', count: goals.filter(g => g.status === 'active').length },
            { id: 'completed', label: '已完成', count: goals.filter(g => g.status === 'completed').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-sm font-medium rounded-xl transition-colors ${
                activeTab === tab.id
                  ? 'bg-text-primary text-white'
                  : 'text-text-secondary hover:bg-gray-100'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </motion.div>

        {/* 目标列表 */}
        <div className="space-y-4">
          {filteredGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-2xl">
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{goal.title}</h3>
                    <p className="text-sm text-text-muted">{goal.deadline}</p>
                  </div>
                </div>
                {goal.status === 'completed' && (
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                    已完成
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-text-muted">当前 / 目标</div>
                  <div className="text-lg font-bold">{goal.current} / {goal.target}</div>
                </div>
                <div className={`text-2xl font-bold ${
                  goal.progress >= 100 ? 'text-green-500' : 'text-primary'
                }`}>
                  {goal.progress}%
                </div>
              </div>

              {/* 进度条 */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(goal.progress, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  className={`h-full rounded-full ${getProgressColor(goal.progress)}`}
                />
              </div>

              {goal.status === 'active' && (
                <button className="w-full mt-4 py-2 text-primary text-sm font-medium border border-primary rounded-xl hover:bg-primary-50 transition-colors"
                >
                  更新进度
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* 添加新目标 */}
        {activeTab === 'active' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Button 
              variant="outline" 
              size="full"
              onClick={() => navigate('/goal-selection')}
            >
              + 添加新目标
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GoalManagement;
