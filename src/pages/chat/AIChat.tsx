import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button, Input } from '../../components';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Utensils,
  Lightbulb,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIChat: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '你好！我是你的 AI 营养教练。我可以帮你：\n\n🍎 分析饮食营养\n📊 制定健康计划\n💡 提供饮食建议\n❓ 解答健康问题\n\n今天有什么可以帮助你的吗？',
      timestamp: new Date(),
      suggestions: ['帮我制定减肥计划', '分析今天的饮食', '推荐健康食谱'],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟 AI 回复
    setTimeout(() => {
      const aiResponses: Record<string, Message> = {
        '帮我制定减肥计划': {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: '根据您的资料，我为您制定了以下减肥计划：\n\n📅 **每日目标**\n• 热量摄入：1500 kcal\n• 蛋白质：90g\n• 运动：30分钟有氧\n\n🥗 **推荐饮食**\n• 早餐：燕麦+鸡蛋+牛奶\n• 午餐：鸡胸肉沙拉+糙米\n• 晚餐：清蒸鱼+蔬菜\n\n需要我详细解释某个部分吗？',
          timestamp: new Date(),
          suggestions: ['查看更多食谱', '调整计划', '设置提醒'],
        },
        '分析今天的饮食': {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: '今日饮食分析完成！\n\n📊 **营养摄入**\n• 热量：1450/2000 kcal ✓\n• 蛋白质：85/90g ⚠️\n• 碳水：180/250g ✓\n• 脂肪：45/65g ✓\n\n💡 **建议**\n晚餐可以增加一些瘦肉或豆类来补充蛋白质。',
          timestamp: new Date(),
          suggestions: ['推荐高蛋白食物', '查看详细报告', '调整目标'],
        },
        '推荐健康食谱': {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: '为您推荐以下健康食谱：\n\n🥗 **低卡鸡胸肉沙拉** (350 kcal)\n• 鸡胸肉 150g\n• 生菜、番茄、黄瓜\n• 橄榄油醋汁\n\n🍲 **番茄鸡蛋汤** (120 kcal)\n• 鸡蛋 2个\n• 番茄 2个\n• 少油少盐\n\n点击查看详细做法 👇',
          timestamp: new Date(),
          suggestions: ['查看做法', '更多食谱', '加入计划'],
        },
      };

      const aiMessage = aiResponses[inputValue] || {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `收到您的问题："${inputValue}"\n\n作为您的营养教练，我建议您：\n\n1. 保持规律的饮食习惯\n2. 多喝水，每天至少 2000ml\n3. 均衡摄入各类营养素\n\n如需更详细的建议，请告诉我您的具体需求。`,
        timestamp: new Date(),
        suggestions: ['制定计划', '分析饮食', '健康建议'],
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar 
        title="AI 营养教练" 
        showBack={true}
        rightElement={
          <button className="p-2">
            <Sparkles className="w-5 h-5 text-primary" />
          </button>
        }
      />

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto pt-16 pb-4 px-4 space-y-4"
      >
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index === messages.length - 1 ? 0 : 0 }}
            className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* 头像 */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'ai' ? 'bg-primary' : 'bg-gray-200'
            }`}>
              {message.type === 'ai' ? (
                <Bot className="w-6 h-6 text-white" />
              ) : (
                <User className="w-6 h-6 text-gray-600" />
              )}
            </div>

            {/* 消息内容 */}
            <div className={`max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'ai' 
                  ? 'bg-white shadow-card text-text-primary' 
                  : 'bg-primary text-white'
              }`}>
                <div className="whitespace-pre-line">{message.content}</div>
              </div>

              {/* 建议按钮 */}
              {message.suggestions && message.type === 'ai' && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-xs text-text-muted mt-1 block">
                {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}

        {/* 打字指示器 */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white shadow-card rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* 快捷功能栏 */}
      <div className="px-4 py-2 bg-white border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { icon: <Utensils className="w-4 h-4" />, label: '分析饮食' },
            { icon: <Lightbulb className="w-4 h-4" />, label: '健康建议' },
            { icon: <ImageIcon className="w-4 h-4" />, label: '识别食物' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleSuggestionClick(item.label)}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-text-secondary whitespace-nowrap hover:bg-gray-200 transition-colors"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 输入框 */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button className="p-2 text-text-muted hover:text-primary transition-colors">
            <ImageIcon className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入您的问题..."
              className="w-full px-4 py-3 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-primary/20 text-text-primary"
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`p-3 rounded-full transition-colors ${
              inputValue.trim() && !isTyping
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
