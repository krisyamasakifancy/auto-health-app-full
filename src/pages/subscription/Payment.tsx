import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  CreditCard, 
  Check,
  Shield,
  Lock,
  ChevronRight,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  last4?: string;
}

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;
  
  const [selectedMethod, setSelectedMethod] = useState('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  const paymentMethods: PaymentMethod[] = [
    { id: 'wechat', name: '微信支付', icon: '💚' },
    { id: 'alipay', name: '支付宝', icon: '💙' },
    { id: 'card', name: '银行卡', icon: '💳', last4: '8888' },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // 模拟支付处理
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 模拟90%成功率
    const isSuccess = Math.random() > 0.1;
    setPaymentStatus(isSuccess ? 'success' : 'failed');
    setIsProcessing(false);

    if (isSuccess) {
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-card text-center max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-text-primary mb-2">支付成功！</h2>
          <p className="text-text-muted mb-6">
            您已成功订阅{plan?.name}，享受健康生活吧！
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-muted">套餐</span>
              <span className="text-text-primary">{plan?.name}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-muted">金额</span>
              <span className="text-text-primary">¥{plan?.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">有效期</span>
              <span className="text-text-primary">{plan?.period}</span>
            </div>
          </div>
          
          <Button
            variant="primary"
            size="full"
            onClick={() => navigate('/profile')}
          >
            开始使用
          </Button>
        </motion.div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-card text-center max-w-sm w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="w-12 h-12 text-red-500" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-text-primary mb-2">支付失败</h2>
          <p className="text-text-muted mb-6">
            抱歉，支付过程中出现问题，请重试或更换支付方式
          </p>
          
          <div className="space-y-3">
            <Button
              variant="primary"
              size="full"
              onClick={() => setPaymentStatus('idle')}
            >
              重新支付
            </Button>
            
            <Button
              variant="secondary"
              size="full"
              onClick={() => navigate(-1)}
            >
              返回
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavBar title="确认支付" showBack={true} />

      <div className="pt-14">
        {/* 订单信息 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-6 py-6 shadow-sm"
        >
          <p className="text-text-muted mb-2">订单信息</p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-text-primary">{plan?.name}</h2>
              <p className="text-text-muted">{plan?.period}订阅</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-text-primary">¥{plan?.price}</p>
            </div>
          </div>
          
          <div className="h-px bg-gray-100 my-4" />
          
          <div className="flex justify-between items-center">
            <span className="text-text-muted">实付金额</span>
            <span className="text-2xl font-bold text-primary">¥{plan?.price}</span>
          </div>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* 支付方式 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-text-primary mb-4">选择支付方式</h3>
            
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`bg-white rounded-2xl p-4 shadow-card flex items-center justify-between cursor-pointer transition-all ${
                    selectedMethod === method.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <p className="font-medium text-text-primary">{method.name}</p>
                      {method.last4 && (
                        <p className="text-sm text-text-muted">尾号{method.last4}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id 
                      ? 'border-primary bg-primary' 
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === method.id && <div className="w-3 h-3 bg-white rounded-full" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 安全提示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-green-50 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-text-primary text-sm">支付安全保护</p>
              <p className="text-xs text-text-muted">采用银行级加密技术，保障您的支付信息安全</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 底部支付按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom">
        <Button
          variant="primary"
          size="full"
          disabled={isProcessing}
          onClick={handlePayment}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              支付处理中...
            </span>
          ) : (
            `确认支付 ¥${plan?.price}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
