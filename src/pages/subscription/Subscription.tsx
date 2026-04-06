import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Crown, 
  Check,
  Sparkles,
  Zap,
  Star,
  Shield,
  ChevronRight,
  X
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans: Plan[] = [
    {
      id: 'free',
      name: '免费版',
      price: 0,
      period: '永久',
      features: [
        '基础饮食记录',
        '体重追踪',
        '基础食谱推荐',
        '广告支持',
      ],
    },
    {
      id: 'monthly',
      name: '月度会员',
      price: 28,
      period: '月',
      features: [
        '所有免费功能',
        'AI 营养教练',
        '高级食谱库',
        '无广告体验',
        '详细数据分析',
        '无限食物识别',
      ],
    },
    {
      id: 'yearly',
      name: '年度会员',
      price: 198,
      period: '年',
      features: [
        '所有月度功能',
        '个性化计划定制',
        '专属营养师咨询',
        '家庭成员共享(3人)',
        '优先客服支持',
        '新功能抢先体验',
      ],
      isPopular: true,
      badge: '省 40%',
    },
  ];

  const handleSubscribe = () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan && plan.price > 0) {
      navigate('/payment', { state: { plan } });
    }
  };

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        title="订阅管理" 
        showBack={true}
        rightElement={
          <button onClick={() => navigate('/profile')} className="p-2">
            <X className="w-5 h-5 text-text-primary" />
          </button>
        }
      />

      <div className="pt-14">
        {/* 顶部横幅 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 px-6 py-10 text-white text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Crown className="w-10 h-10" />
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-2">升级会员</h1>
          <p className="text-white/80">解锁全部高级功能，开启健康生活</p>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* 计费周期切换 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-1 shadow-card"
          >
            <div className="flex">
              {(['monthly', 'yearly'] as const).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`flex-1 py-3 rounded-xl text-center font-medium transition-colors ${
                    billingCycle === cycle
                      ? 'bg-primary text-white'
                      : 'text-text-secondary'
                  }`}
                >
                  {cycle === 'monthly' ? '月度付费' : '年度付费'}
                  {cycle === 'yearly' && (
                    <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">省40%</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 套餐卡片 */}
          <div className="space-y-4">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white rounded-2xl p-5 shadow-card cursor-pointer transition-all ${
                  selectedPlan === plan.id 
                    ? 'ring-2 ring-primary' 
                    : 'hover:shadow-lg'
                } ${plan.isPopular ? 'transform scale-[1.02]' : ''}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      最受欢迎
                    </span>
                  </div>
                )}

                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.id === 'free' ? 'bg-gray-100 text-gray-600' : 'bg-primary-100 text-primary'
                    }`}>
                      {plan.id === 'free' ? (
                        <Star className="w-5 h-5" />
                      ) : (
                        <Crown className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary">{plan.name}</h3>
                      <p className="text-sm text-text-muted">{plan.period}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      {plan.price > 0 && <span className="text-lg">¥</span>}
                      <span className="text-3xl font-bold text-text-primary">
                        {plan.price === 0 ? '免费' : plan.price}
                      </span>
                    </div>
                    {plan.price > 0 && (
                      <p className="text-xs text-text-muted">
                        约 ¥{Math.round(plan.price / (plan.period === '年' ? 12 : 1))}/月
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.id === 'free' ? 'bg-gray-100' : 'bg-green-100'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.id === 'free' ? 'text-gray-400' : 'text-green-500'}`} />
                      </div>
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id 
                    ? 'border-primary bg-primary' 
                    : 'border-gray-300'
                }`}>
                  {selectedPlan === plan.id && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 权益说明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary mb-1">订阅保障</h4>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• 随时取消，无违约金</li>
                  <li>• 7天无理由退款</li>
                  <li>• 数据安全加密存储</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 底部购买栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom">
        <Button
          variant="primary"
          size="full"
          onClick={handleSubscribe}
        >
          {currentPlan?.price === 0 ? '当前套餐' : `立即订阅 ¥${currentPlan?.price}`}
        </Button>
        <p className="text-center text-xs text-text-muted mt-3">
          订阅即表示同意<button className="text-primary">《服务条款》</button>
          和<button className="text-primary">《隐私政策》</button>
        </p>
      </div>
    </div>
  );
};

export default Subscription;
