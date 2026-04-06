import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Clock, 
  Flame, 
  Heart,
  Trophy,
  Target,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  emoji: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports';
  calories: number;
  duration: number;
  intensity: 'low' | 'medium' | 'high';
  description: string;
  steps: string[];
  tips: string[];
  muscles: string[];
  equipment: string[];
}

const ExerciseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // 模拟运动数据
  const exercise: Exercise = {
    id: id || '1',
    name: '慢跑',
    emoji: '🏃',
    type: 'cardio',
    calories: 300,
    duration: 30,
    intensity: 'medium',
    description: '慢跑是一种中等强度的有氧运动，能有效燃烧脂肪、增强心肺功能。',
    steps: [
      '开始前做5分钟热身，活动关节',
      '保持舒适配速，能说话但稍喘',
      '保持核心收紧，目视前方',
      '着地时前脚掌先着地，减轻冲击',
      '结束后做5分钟拉伸放松',
    ],
    tips: [
      '选择舒适的运动鞋',
      '保持规律呼吸，不要憋气',
      '初学者可以采用跑走结合',
      '注意补水，每15分钟喝一小口',
    ],
    muscles: ['腿部肌群', '核心肌群', '心肺功能'],
    equipment: ['运动鞋', '运动服'],
  };

  const intensityLabel = {
    low: { text: '低强度', color: 'bg-green-100 text-green-600' },
    medium: { text: '中等强度', color: 'bg-yellow-100 text-yellow-600' },
    high: { text: '高强度', color: 'bg-red-100 text-red-600' },
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        title="运动详情" 
        showBack={true}
        rightElement={
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-text-muted'}`} />
          </button>
        }
      />

      <div className="pt-20 px-4 pb-32">
        {/* 头部信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="w-28 h-28 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center text-6xl mb-4">
            {exercise.emoji}
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">{exercise.name}</h1>
          <p className="text-text-secondary">{exercise.description}</p>
        </motion.div>

        {/* 统计卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <div className="bg-white rounded-2xl p-4 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-xl font-bold">{exercise.calories}</div>
            <div className="text-xs text-text-muted">千卡/小时</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center">
            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-xl font-bold">{exercise.duration}</div>
            <div className="text-xs text-text-muted">推荐时长</div>
          </div>
          <div className={`rounded-2xl p-4 text-center ${intensityLabel[exercise.intensity].color.split(' ')[0]}`}>
            <Target className={`w-6 h-6 mx-auto mb-2 ${intensityLabel[exercise.intensity].color.split(' ')[1].replace('text-', 'text-')}`} />
            <div className="text-xl font-bold">{intensityLabel[exercise.intensity].text}</div>
            <div className="text-xs opacity-70">强度等级</div>
          </div>
        </motion.div>

        {/* 计时器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-text-primary rounded-2xl p-6 mb-4 text-white"
        >
          <div className="text-center mb-4">
            <div className="text-5xl font-mono font-bold mb-2">{formatTime(elapsedTime)}</div>
            <div className="text-white/60">{isTimerRunning ? '运动中...' : '准备开始'}</div>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isTimerRunning 
                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : 'bg-primary hover:bg-primary-600'
              }`}
            >
              {isTimerRunning ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setElapsedTime(0);
              }}
              className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* 锻炼步骤 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 mb-4"
        >
          <h3 className="font-semibold text-text-primary mb-4">锻炼步骤</h3>
          <div className="space-y-3">
            {exercise.steps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 锻炼提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-orange-50 rounded-2xl p-6 mb-4"
        >
          <h3 className="font-semibold text-orange-700 mb-4">💡 锻炼提示</h3>
          <ul className="space-y-2">
            {exercise.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-orange-600">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 目标肌群 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6"
        >
          <h3 className="font-semibold text-text-primary mb-4">目标肌群与设备</h3>
          <div className="mb-4">
            <div className="text-sm text-text-muted mb-2">主要肌群</div>
            <div className="flex flex-wrap gap-2">
              {exercise.muscles.map(muscle => (
                <span key={muscle} className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-text-muted mb-2">所需设备</div>
            <div className="flex flex-wrap gap-2">
              {exercise.equipment.map(item => (
                <span key={item} className="px-3 py-1 bg-gray-100 text-text-secondary text-sm rounded-full">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-bottom">
        <Button 
          variant="primary" 
          size="full"
          onClick={() => navigate('/home/exercise-log')}
        >
          记录本次运动
        </Button>
      </div>
    </div>
  );
};

export default ExerciseDetail;
