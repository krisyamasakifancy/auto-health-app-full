import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, ProgressBar } from '../../components';
import { 
  Trophy, 
  Star,
  Zap,
  Target,
  Calendar,
  Award,
  Flame,
  Droplets,
  Footprints,
  Lock,
  CheckCircle2
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const Achievements: React.FC = () => {
  const navigate = useNavigate();

  const achievements: Achievement[] = [
    {
      id: '1',
      title: '初出茅庐',
      description: '连续记录饮食3天',
      icon: <Calendar className="w-6 h-6" />,
      progress: 3,
      maxProgress: 3,
      isUnlocked: true,
      unlockedAt: '2026-04-01',
      category: '记录',
      rarity: 'common',
    },
    {
      id: '2',
      title: '水牛养成',
      description: '连续7天达成饮水目标',
      icon: <Droplets className="w-6 h-6" />,
      progress: 7,
      maxProgress: 7,
      isUnlocked: true,
      unlockedAt: '2026-04-05',
      category: '健康',
      rarity: 'rare',
    },
    {
      id: '3',
      title: '卡路里杀手',
      description: '单日消耗500卡路里',
      icon: <Flame className="w-6 h-6" />,
      progress: 500,
      maxProgress: 500,
      isUnlocked: true,
      unlockedAt: '2026-04-04',
      category: '运动',
      rarity: 'rare',
    },
    {
      id: '4',
      title: '目标达成者',
      description: '完成第一个减重目标',
      icon: <Target className="w-6 h-6" />,
      progress: 2,
      maxProgress: 5,
      isUnlocked: false,
      category: '目标',
      rarity: 'epic',
    },
    {
      id: '5',
      title: '马拉松选手',
      description: '累计跑步100公里',
      icon: <Footprints className="w-6 h-6" />,
      progress: 45,
      maxProgress: 100,
      isUnlocked: false,
      category: '运动',
      rarity: 'epic',
    },
    {
      id: '6',
      title: '营养大师',
      description: '连续30天保持营养均衡',
      icon: <Zap className="w-6 h-6" />,
      progress: 12,
      maxProgress: 30,
      isUnlocked: false,
      category: '健康',
      rarity: 'legendary',
    },
    {
      id: '7',
      title: '社交达人',
      description: '邀请3位好友加入',
      icon: <Star className="w-6 h-6" />,
      progress: 1,
      maxProgress: 3,
      isUnlocked: false,
      category: '社交',
      rarity: 'common',
    },
    {
      id: '8',
      title: '完美一周',
      description: '连续7天完成所有目标',
      icon: <Award className="w-6 h-6" />,
      progress: 0,
      maxProgress: 7,
      isUnlocked: false,
      category: '记录',
      rarity: 'epic',
    },
  ];

  const rarityColors = {
    common: 'bg-gray-100 text-gray-600 border-gray-200',
    rare: 'bg-blue-100 text-blue-600 border-blue-200',
    epic: 'bg-purple-100 text-purple-600 border-purple-200',
    legendary: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  };

  const rarityNames = {
    common: '普通',
    rare: '稀有',
    epic: '史诗',
    legendary: '传说',
  };

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  // 按分类分组
  const categories = Array.from(new Set(achievements.map(a => a.category)));

  return (
    <div className="min-h-screen bg-background pb-6">
      <NavBar title="成就系统" showBack={true} />

      <div className="pt-14">
        {/* 总进度概览 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 px-6 py-8 text-white"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trophy className="w-12 h-12" />
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-2">{unlockedCount}/{totalCount}</h2>
            <p className="text-white/80 mb-4">已解锁成就</p>
            
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <p className="text-white/70 text-sm mt-2">完成度 {Math.round(progressPercent)}%</p>
          </div>
        </motion.div>

        <div className="px-6 py-6 space-y-8">
          {/* 统计卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: '连续打卡', value: '7天', icon: <Calendar className="w-5 h-5" />, color: 'text-blue-500' },
              { label: '总消耗', value: '12.5k', icon: <Flame className="w-5 h-5" />, color: 'text-orange-500' },
              { label: '本周目标', value: '85%', icon: <Target className="w-5 h-5" />, color: 'text-green-500' },
            ].map((stat, index) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-card text-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${stat.color} bg-gray-50`}>
                  {stat.icon}
                </div>
                <p className="text-xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* 分类成就列表 */}
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            >
              <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                {category}
                <span className="text-sm text-text-muted font-normal">
                  ({achievements.filter(a => a.category === category && a.isUnlocked).length}/
                  {achievements.filter(a => a.category === category).length})
                </span>
              </h3>

              <div className="space-y-3">
                {achievements
                  .filter(a => a.category === category)
                  .map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + categoryIndex * 0.1 + index * 0.05 }}
                      className={`bg-white rounded-2xl p-4 shadow-card ${
                        achievement.isUnlocked ? '' : 'opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          achievement.isUnlocked 
                            ? rarityColors[achievement.rarity]
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {achievement.isUnlocked ? (
                            achievement.icon
                          ) : (
                            <Lock className="w-6 h-6" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-bold ${
                              achievement.isUnlocked ? 'text-text-primary' : 'text-text-muted'
                            }`}>
                              {achievement.title}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              achievement.isUnlocked 
                                ? rarityColors[achievement.rarity].split(' ')[0] + ' ' + rarityColors[achievement.rarity].split(' ')[1]
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {rarityNames[achievement.rarity]}
                            </span>
                          </div>

                          <p className="text-sm text-text-muted mb-2">{achievement.description}</p>

                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all ${
                                    achievement.isUnlocked 
                                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                                      : 'bg-gray-300'
                                  }`}
                                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                                />
                              </div>
                            </div>
                            <span className={`text-xs font-medium ${
                              achievement.isUnlocked ? 'text-green-500' : 'text-text-muted'
                            }`}>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>

                          {achievement.isUnlocked && achievement.unlockedAt && (
                            <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              解锁于 {achievement.unlockedAt}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
