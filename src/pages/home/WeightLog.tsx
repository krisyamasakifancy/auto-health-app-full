import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Scale, 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  Plus,
  Calendar,
  ChevronRight,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const WeightLog: React.FC = () => {
  const navigate = useNavigate();
  const [currentWeight, setCurrentWeight] = useState(70.5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWeight, setNewWeight] = useState('70.5');

  // 模拟体重历史数据
  const weightHistory = [
    { date: '01/01', weight: 72.5 },
    { date: '01/05', weight: 72.0 },
    { date: '01/10', weight: 71.5 },
    { date: '01/15', weight: 71.2 },
    { date: '01/20', weight: 70.8 },
    { date: '01/25', weight: 70.5 },
  ];

  const stats = {
    startWeight: 75.0,
    targetWeight: 68.0,
    totalLost: 75.0 - currentWeight,
    weeklyChange: -0.3,
    bmi: (currentWeight / (1.75 * 1.75)).toFixed(1),
  };

  const records = [
    { date: '今天', time: '08:00', weight: 70.5, change: -0.3 },
    { date: '昨天', time: '08:15', weight: 70.8, change: -0.2 },
    { date: '01/23', time: '07:45', weight: 71.0, change: -0.5 },
    { date: '01/22', time: '08:00', weight: 71.5, change: -0.3 },
  ];

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (weight > 30 && weight < 300) {
      setCurrentWeight(weight);
      setShowAddModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        title="体重记录" 
        showBack={true}
        rightElement={
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <div className="pt-20 px-6 pb-8">
        {/* 当前体重卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-text-primary rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/70 text-sm mb-1">当前体重</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">{currentWeight}</span>
                <span className="text-white/70">kg</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Scale className="w-8 h-8" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {stats.weeklyChange < 0 ? (
              <>
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
                <span className="text-green-400 font-medium">本周 {stats.weeklyChange}kg</span>
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-red-400 font-medium">本周 +{stats.weeklyChange}kg</span>
              </>
            )}
            <span className="text-white/50 text-sm">BMI {stats.bmi}</span>
          </div>

          {/* 进度条 */}
          <div>
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>起始 {stats.startWeight}kg</span>
              <span>目标 {stats.targetWeight}kg</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${((stats.startWeight - currentWeight) / (stats.startWeight - stats.targetWeight)) * 100}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
              />
            </div>
            <p className="text-center text-sm text-white/70 mt-2">
              已减重 <span className="text-green-400 font-bold">{stats.totalLost.toFixed(1)}kg</span>
            </p>
          </div>
        </motion.div>

        {/* 趋势图表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-card mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">体重趋势</h3>
            <div className="flex items-center gap-1 text-sm text-text-muted">
              <Calendar className="w-4 h-4" />
              <span>近30天</span>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightHistory}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  width={40}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}kg`, '体重']}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <p className="text-text-muted text-sm mb-1">平均体重</p>
            <p className="text-2xl font-bold text-text-primary">71.2</p>
            <p className="text-text-muted text-xs">kg（本月）</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-card">
            <p className="text-text-muted text-sm mb-1">记录天数</p>
            <p className="text-2xl font-bold text-text-primary">24</p>
            <p className="text-text-muted text-xs">天（本月）</p>
          </div>
        </motion.div>

        {/* 历史记录 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-text-primary">历史记录</h3>
            <button className="text-primary text-sm flex items-center gap-1">
              全部 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {records.map((record, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${
                  index !== records.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="font-medium text-text-primary">{record.date}</p>
                    <p className="text-sm text-text-muted">{record.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-text-primary">{record.weight}kg</p>
                  <div className={`flex items-center gap-1 ${record.change <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {record.change <= 0 ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    <span className="text-sm">{Math.abs(record.change)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 添加体重弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 w-full max-w-sm"
          >
            <h3 className="text-xl font-bold text-text-primary mb-6 text-center">记录今日体重</h3>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <button 
                onClick={() => setNewWeight((parseFloat(newWeight) - 0.1).toFixed(1))}
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Minus className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-32 text-4xl font-bold text-center border-b-2 border-primary focus:outline-none"
                />
                <p className="text-text-muted mt-1">kg</p>
              </div>
              
              <button 
                onClick={() => setNewWeight((parseFloat(newWeight) + 0.1).toFixed(1))}
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="full"
                onClick={() => setShowAddModal(false)}
              >
                取消
              </Button>
              <Button
                variant="primary"
                size="full"
                onClick={handleAddWeight}
              >
                保存
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WeightLog;
