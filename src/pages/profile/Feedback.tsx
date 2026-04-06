import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Bug, 
  Lightbulb, 
  HeartHandshake, 
  ChevronRight,
  CheckCircle,
  Image as ImageIcon
} from 'lucide-react';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState<'bug' | 'feature' | 'other'>('bug');
  const [content, setContent] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const feedbackTypes = [
    { 
      id: 'bug' as const, 
      icon: <Bug className="w-5 h-5" />, 
      title: '问题反馈', 
      desc: '功能异常、闪退等问题' 
    },
    { 
      id: 'feature' as const, 
      icon: <Lightbulb className="w-5 h-5" />, 
      title: '功能建议', 
      desc: '新功能需求、改进建议' 
    },
    { 
      id: 'other' as const, 
      icon: <HeartHandshake className="w-5 h-5" />, 
      title: '其他反馈', 
      desc: '商务合作、其他问题' 
    },
  ];

  const quickTopics = [
    '界面显示异常',
    '数据同步问题',
    '提醒通知不准',
    '食物库缺失',
    '性能卡顿',
    '其他问题',
  ];

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('请填写反馈内容');
      return;
    }

    setIsSubmitting(true);
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">感谢您的反馈！</h2>
          <p className="text-text-secondary mb-8">
            我们已收到您的反馈，团队会尽快处理并回复。<br />
            您的建议是我们改进的动力 💪
          </p>
          
          <Button
            variant="primary"
            size="full"
            onClick={() => navigate('/profile')}
          >
            返回个人中心
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="意见反馈" showBack={true} />

      <div className="pt-20 px-6 pb-8">
        {/* 反馈类型选择 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">反馈类型</h3>
          <div className="grid grid-cols-3 gap-3">
            {feedbackTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFeedbackType(type.id)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  feedbackType === type.id
                    ? 'border-primary bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`mx-auto mb-2 ${feedbackType === type.id ? 'text-primary' : 'text-text-muted'}`}>
                  {type.icon}
                </div>
                <p className={`text-sm font-medium ${feedbackType === type.id ? 'text-primary' : 'text-text-primary'}`}>
                  {type.title}
                </p>
                <p className="text-xs text-text-muted mt-1">{type.desc}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 快速选择标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">常见问题</h3>
          <div className="flex flex-wrap gap-2">
            {quickTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setContent(topic + '：')}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 反馈内容 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">详细描述</h3>
          <div className="bg-white rounded-2xl shadow-card p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请详细描述您遇到的问题或建议，我们会认真阅读每一条反馈..."
              className="w-full h-32 resize-none outline-none text-text-primary placeholder:text-text-muted"
            />
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm">添加截图</span>
              </button>
              <span className="text-xs text-text-muted">{content.length}/500</span>
            </div>
          </div>
        </motion.div>

        {/* 联系方式 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3">联系方式（选填）</h3>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="邮箱或手机号，方便我们回复您"
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-primary text-text-primary placeholder:text-text-muted"
          />
        </motion.div>

        {/* 提交按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="primary"
            size="full"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            提交反馈
          </Button>
          
          <p className="text-center text-text-muted text-sm mt-4">
            也可以直接发送邮件至 <a href="mailto:support@nutrilife.app" className="text-primary">support@nutrilife.app</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
