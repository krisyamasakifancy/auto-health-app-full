import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { XCircle, RefreshCw, HelpCircle, MessageCircle } from 'lucide-react';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();

  const reasons = [
    '银行卡余额不足或额度超限',
    '网络连接超时，请检查网络',
    '支付密码输入错误',
    '银行系统维护中',
  ];

  const solutions = [
    { icon: '💳', title: '更换支付方式', desc: '尝试使用其他银行卡或支付渠道' },
    { icon: '🔄', title: '重新支付', desc: '检查网络后再次尝试' },
    { icon: '💬', title: '联系客服', desc: '如遇问题可随时联系客服协助' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 失败动画 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="flex-1 flex flex-col items-center justify-center px-6 pt-20"
      >
        {/* 失败图标 */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <XCircle className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* 标题 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-text-primary mb-2 text-center"
        >
          支付失败
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-secondary text-center mb-8"
        >
          订单未支付成功，请重试
        </motion.p>

        {/* 可能原因 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-white rounded-2xl p-6 shadow-card mb-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-text-primary">可能的原因：</h3>
          </div>
          <ul className="space-y-2">
            {reasons.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2 text-text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* 解决方案 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-white rounded-2xl p-6 shadow-card"
        >
          <h3 className="font-semibold text-text-primary mb-4">建议操作：</h3>
          <div className="space-y-4">
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-2xl">{solution.icon}</span>
                <div>
                  <div className="font-medium text-text-primary">{solution.title}</div>
                  <div className="text-sm text-text-muted">{solution.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 底部按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="p-6 bg-white border-t border-gray-200 safe-bottom"
      >
        <Button 
          variant="primary" 
          size="full"
          icon={<RefreshCw className="w-5 h-5" />}
          onClick={() => navigate(-1)}
        >
          重新支付
        </Button>
        <div className="flex gap-3 mt-3">
          <Button 
            variant="outline" 
            size="full"
            onClick={() => navigate('/help')}
          >
            <MessageCircle className="w-5 h-5" />
            联系客服
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
