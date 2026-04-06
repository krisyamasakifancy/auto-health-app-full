import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { 
  Search, 
  ChevronRight,
  MessageCircle,
  FileText,
  Video,
  Phone,
  Mail,
  HelpCircle,
  Book,
  Shield,
  CreditCard,
  User,
  ChevronDown
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpCenter: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: '如何修改每日热量目标？',
      answer: '进入"个人中心" -> "设置" -> "目标管理"，点击"每日热量目标"即可修改。系统会根据您的体重、身高、活动水平自动计算推荐值，您也可以手动调整。',
      category: '账户设置',
    },
    {
      id: '2',
      question: '如何取消自动续费？',
      answer: '进入"个人中心" -> "订阅管理" -> "管理订阅"，点击"取消自动续费"即可。当前订阅期结束前您仍可享用会员权益。',
      category: '订阅',
    },
    {
      id: '3',
      question: '食物热量数据准确吗？',
      answer: '我们的食物数据库包含超过100,000种食物的营养数据，来源于权威营养数据库。对于自制食物，建议使用AI食物识别功能或手动输入食材分量获得更准确的计算。',
      category: '数据',
    },
    {
      id: '4',
      question: '如何导出我的数据？',
      answer: '进入"设置" -> "数据导出"，选择导出格式（CSV/JSON/PDF）和时间范围，数据将发送至您的注册邮箱。',
      category: '数据',
    },
    {
      id: '5',
      question: 'AI 营养教练如何使用？',
      answer: '点击底部导航栏的"消息"进入AI聊天界面，可以直接提问或选择快捷功能。AI会根据您的饮食记录和目标给出个性化建议。',
      category: '功能',
    },
    {
      id: '6',
      question: '忘记密码怎么办？',
      answer: '在登录页面点击"忘记密码"，输入注册邮箱，我们会发送密码重置链接。如未收到邮件，请检查垃圾邮件箱。',
      category: '账户设置',
    },
  ];

  const quickLinks = [
    { icon: <Book className="w-5 h-5" />, title: '使用指南', color: 'bg-blue-100 text-blue-600' },
    { icon: <Video className="w-5 h-5" />, title: '视频教程', color: 'bg-purple-100 text-purple-600' },
    { icon: <Shield className="w-5 h-5" />, title: '隐私安全', color: 'bg-green-100 text-green-600' },
    { icon: <CreditCard className="w-5 h-5" />, title: '订阅相关', color: 'bg-orange-100 text-orange-600' },
  ];

  const contactMethods = [
    { icon: <MessageCircle className="w-5 h-5" />, title: '在线客服', subtitle: '平均响应 2分钟', action: () => {} },
    { icon: <Phone className="w-5 h-5" />, title: '电话客服', subtitle: '400-123-4567', action: () => {} },
    { icon: <Mail className="w-5 h-5" />, title: '邮件支持', subtitle: 'support@nutrilife.com', action: () => {} },
  ];

  const filteredFAQs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <NavBar title="帮助中心" showBack={true} />

      <div className="pt-14">
        {/* 搜索栏 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary-dark px-6 py-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索问题或关键词..."
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl outline-none text-text-primary shadow-lg"
            />
          </div>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* 快捷入口 */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-4 gap-3">
                {quickLinks.map((link, index) => (
                  <motion.button
                    key={link.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${link.color}`}>
                      {link.icon}
                    </div>
                    <span className="text-xs text-text-secondary">{link.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* 常见问题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">{searchQuery ? '搜索结果' : '常见问题'}</h3>
              {!searchQuery && <button className="text-primary text-sm">查看全部</button>}
            </div>

            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <HelpCircle className="w-4 h-4 text-text-muted" />
                      </div>
                      <span className="font-medium text-text-primary">{faq.question}</span>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-text-muted transition-transform ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pl-15">
                          <p className="text-text-secondary text-sm leading-relaxed pl-11">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8 text-text-muted">
                  <p>未找到相关问题</p>
                  <p className="text-sm mt-1">请尝试其他关键词或联系客服</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* 联系客服 */}
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-bold text-text-primary mb-4">联系客服</h3>
              
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                {contactMethods.map((method, index) => (
                  <button
                    key={method.title}
                    onClick={method.action}
                    className={`w-full p-4 flex items-center justify-between ${
                      index !== contactMethods.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary">
                        {method.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-text-primary">{method.title}</p>
                        <p className="text-sm text-text-muted">{method.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-muted" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
