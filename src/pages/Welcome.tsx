import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { Apple, Carrot, Utensils } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Apple className="w-6 h-6 text-white" />,
      title: '智能饮食追踪',
      description: '记录每一餐，精准计算营养摄入',
      color: 'bg-red-500',
    },
    {
      icon: <Carrot className="w-6 h-6 text-white" />,
      title: '个性化计划',
      description: '根据目标定制专属饮食方案',
      color: 'bg-orange-500',
    },
    {
      icon: <Utensils className="w-6 h-6 text-white" />,
      title: 'AI 营养教练',
      description: '24小时在线，解答饮食疑问',
      color: 'bg-primary',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部装饰区域 */}
      <div className="relative h-[45vh] bg-gradient-to-b from-primary-100 to-background overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* 装饰圆圈 */}
          <div className="relative w-64 h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-primary rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 60}deg) translateY(-120px)`,
                  }}
                />
              ))}
            </motion.div>
            
            {/* 中心 Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-float">
                <span className="text-5xl font-bold text-white">N</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-3">
            欢迎来到 NutriLife
          </h1>
          <p className="text-text-secondary text-base">
            您的私人健康饮食助手
          </p>
        </motion.div>

        {/* 功能列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-card"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 按钮区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-auto space-y-3"
        >
          <Button
            variant="primary"
            size="full"
            onClick={() => navigate('/goal-selection')}
          >
            开始使用
          </Button>
          
          <Button
            variant="outline"
            size="full"
            onClick={() => navigate('/login')}
          >
            已有账号？登录
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
