import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, ListItem } from '../../components';
import { 
  Shield, 
  Eye,
  EyeOff,
  Lock,
  FileText,
  ChevronRight,
  UserX,
  AlertTriangle,
  Check
} from 'lucide-react';

const PrivacySettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    profileVisible: true,
    activityVisible: false,
    weightVisible: false,
    allowRecommendations: true,
    shareAnalytics: false,
    locationServices: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <NavBar title="隐私设置" showBack={true} />

      <div className="pt-14">
        {/* 隐私状态卡片 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 mx-6 my-6 rounded-3xl p-6 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">隐私保护已开启</h2>
              <p className="text-white/80 text-sm">您的数据安全受到全面保护</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: '数据加密', value: 'AES-256' },
              { label: '隐私评分', value: '95分' },
              { label: '保护天数', value: '32天' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-white/70 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="px-6 space-y-6">
          {/* 可见性设置 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-text-primary mb-4">可见性设置</h3>
            
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <ListItem
                icon={<Eye className="w-5 h-5 text-blue-500" />}
                title="公开个人资料"
                subtitle="其他用户可以查看您的基本资料"
                onClick={() => toggleSetting('profileVisible')}
                rightElement={
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.profileVisible ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.profileVisible ? 'translate-x-6' : ''
                    }`} />
                  </div>
                }
              />
              
              <ListItem
                icon={<EyeOff className="w-5 h-5 text-purple-500" />}
                title="活动记录可见"
                subtitle="分享您的运动和饮食成就"
                onClick={() => toggleSetting('activityVisible')}
                rightElement={
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.activityVisible ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.activityVisible ? 'translate-x-6' : ''
                    }`} />
                  </div>
                }
              />
              
              <ListItem
                icon={<Lock className="w-5 h-5 text-red-500" />}
                title="体重数据保密"
                subtitle="仅自己可见体重记录"
                onClick={() => toggleSetting('weightVisible')}
                rightElement={
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.weightVisible ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.weightVisible ? 'translate-x-6' : ''
                    }`} />
                  </div>
                }
              />
            </div>
          </motion.div>

          {/* 数据使用设置 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-text-primary mb-4">数据使用</h3>
            
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <ListItem
                icon={<FileText className="w-5 h-5 text-green-500" />}
                title="个性化推荐"
                subtitle="根据您的数据推荐食谱和计划"
                onClick={() => toggleSetting('allowRecommendations')}
                rightElement={
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.allowRecommendations ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.allowRecommendations ? 'translate-x-6' : ''
                    }`} />
                  </div>
                }
              />
              
              <ListItem
                icon={<FileText className="w-5 h-5 text-orange-500" />}
                title="使用数据分析"
                subtitle="帮助改进产品体验"
                onClick={() => toggleSetting('shareAnalytics')}
                rightElement={
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    settings.shareAnalytics ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.shareAnalytics ? 'translate-x-6' : ''
                    }`} />
                  </div>
                }
              />
            </div>
          </motion.div>

          {/* 法律条款 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-text-primary mb-4">法律条款</h3>
            
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <ListItem
                title="隐私政策"
                onClick={() => {}}
                rightElement={<ChevronRight className="w-5 h-5 text-text-muted" />}
              />
              
              <ListItem
                title="服务条款"
                onClick={() => {}}
                rightElement={<ChevronRight className="w-5 h-5 text-text-muted" />}
              />
              
              <ListItem
                title="Cookie 政策"
                onClick={() => {}}
                rightElement={<ChevronRight className="w-5 h-5 text-text-muted" />}
              />
            </div>
          </motion.div>

          {/* 危险操作 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-bold text-text-primary mb-4">危险操作</h3>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full bg-red-50 rounded-2xl p-4 flex items-center gap-4 text-red-500"
            >
              <UserX className="w-6 h-6" />
              <div className="text-left">
                <p className="font-medium">删除账户</p>
                <p className="text-sm opacity-70">此操作不可撤销，所有数据将被删除</p>
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            
            <h3 className="text-xl font-bold text-text-primary text-center mb-2">确认删除账户？</h3>
            <p className="text-text-muted text-center mb-6">
              此操作将永久删除您的所有数据，包括体重记录、饮食日志等，无法恢复。
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full py-3 bg-gray-100 rounded-2xl font-medium text-text-primary"
              >
                取消
              </button>
              
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  alert('账户已删除');
                }}
                className="w-full py-3 bg-red-500 rounded-2xl font-medium text-white"
              >
                确认删除
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;
