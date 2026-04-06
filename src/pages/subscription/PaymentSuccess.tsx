import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components';
import { CheckCircle, Crown, Sparkles, Star } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan || { name: '年度会员', price: 198 };

  const benefits = [
    { icon: '✨', text: '解锁所有高级食谱' },
    { icon: '📊', text: '高级数据分析报告' },
    { icon: '🎯', text: '专属AI教练指导' },
    { icon: '🌟', text: '无广告纯净体验' },
    { icon: '💎', text: '会员专属徽章' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex flex-col">
      {/* 成功动画 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="flex-1 flex flex-col items-center justify-center px-6 pt-20"
      >
        {/* 成功图标 */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg"
          >
            ✨
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-1 -left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-sm"
          >
            🎉
          </motion.div>
        </div>

        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-text-primary mb-2 text-center"
        >
          支付成功！
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-secondary text-center mb-6"
        >
          欢迎加入 {plan.name}
        </motion.p>

        {/* 会员卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl p-6 text-white mb-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6" />
              <span className="font-bold text-lg">{plan.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-200 text-yellow-200" />
              <span className="text-sm">VIP</span>
            </div>
          </div>
          <div className="text-white/80 text-sm">
            有效期至：{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN')}
          </div>
        </motion.div>

        {/* 权益列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-white rounded-2xl p-6 shadow-card mb-8"
        >
          <h3 className="font-semibold text-text-primary mb-4">您现在可以享受：</h3>
          <div className="space-y-3">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-xl">{benefit.icon}</span>
                <span className="text-text-secondary">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 底部按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="p-6 bg-white border-t border-gray-200 safe-bottom"
      >
        <Button 
          variant="primary" 
          size="full"
          onClick={() => navigate('/', { replace: true })}
        >
          开始享受会员权益
        </Button>
        <button 
          onClick={() => navigate('/profile/account')}
          className="w-full mt-3 py-3 text-text-secondary hover:text-primary transition-colors"
        >
          查看会员详情
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
