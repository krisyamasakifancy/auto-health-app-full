import React from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../../components';
import { 
  Leaf, 
  Heart, 
  Github, 
  Twitter, 
  Globe,
  Mail,
  ExternalLink
} from 'lucide-react';

const About: React.FC = () => {
  const appInfo = [
    { label: '版本号', value: 'v1.0.0 (Build 2024.01.15)' },
    { label: '更新时间', value: '2024-01-15' },
    { label: '安装包大小', value: '45.2 MB' },
    { label: '开发者', value: 'NutriLife Team' },
  ];

  const links = [
    { icon: <Globe className="w-5 h-5" />, title: '官方网站', url: 'https://nutrilife.app' },
    { icon: <Twitter className="w-5 h-5" />, title: '关注我们', url: '#' },
    { icon: <Github className="w-5 h-5" />, title: '开源代码', url: '#' },
    { icon: <Mail className="w-5 h-5" />, title: '联系邮箱', url: 'mailto:support@nutrilife.app' },
  ];

  const legalLinks = [
    { title: '用户协议', action: () => alert('用户协议') },
    { title: '隐私政策', action: () => alert('隐私政策') },
    { title: '第三方开源许可', action: () => alert('开源许可') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="关于我们" showBack={true} />

      <div className="pt-20 px-6 pb-8">
        {/* Logo 区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-8"
        >
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-float mb-4">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">NutriLife</h1>
          <p className="text-text-secondary mt-1">让健康饮食更简单</p>
          <div className="flex items-center gap-1 mt-2 text-text-muted text-sm">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>用心打造</span>
          </div>
        </motion.div>

        {/* 应用信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-6"
        >
          {appInfo.map((item, index) => (
            <div 
              key={item.label}
              className={`flex justify-between py-3 px-4 ${index !== appInfo.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-text-secondary">{item.label}</span>
              <span className="text-text-primary font-medium">{item.value}</span>
            </div>
          ))}
        </motion.div>

        {/* 相关链接 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-2">相关链接</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {links.map((link, index) => (
              <a
                key={link.title}
                href={link.url}
                className={`flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors ${
                  index !== links.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary">{link.icon}</div>
                  <span className="text-text-primary">{link.title}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* 法律信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-2">法律信息</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {legalLinks.map((link, index) => (
              <button
                key={link.title}
                onClick={link.action}
                className={`w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors ${
                  index !== legalLinks.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-text-primary">{link.title}</span>
                <ExternalLink className="w-4 h-4 text-text-muted" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* 致谢 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-text-muted text-sm">感谢每一位用户的支持与信任</p>
          <p className="text-text-muted text-xs mt-4">© 2024 NutriLife Inc. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
