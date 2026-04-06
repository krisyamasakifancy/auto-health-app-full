import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavBar, ListItem } from '../../components';
import { 
  Globe, 
  Ruler, 
  Moon, 
  Volume2, 
  Trash2,
  ChevronRight
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    language: '简体中文',
    unit: '公制 (kg, cm)',
    darkMode: false,
    sound: true,
  });

  const toggleSwitch = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    action,
    divider = true 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    subtitle?: string;
    action: React.ReactNode;
    divider?: boolean;
  }) => (
    <div className={`py-4 px-4 flex items-center justify-between ${divider ? 'border-b border-gray-100' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <div>
          <p className="text-text-primary font-medium">{title}</p>
          {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  );

  const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-7 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-gray-300'}`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${checked ? 'left-6' : 'left-1'}`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="通用设置" showBack={true} />

      <div className="pt-20 px-6 pb-8">
        {/* 偏好设置 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-2">偏好设置</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <SettingItem
              icon={<Globe className="w-5 h-5" />}
              title="语言"
              subtitle={settings.language}
              action={<div className="flex items-center gap-1 text-text-muted"><span>{settings.language}</span><ChevronRight className="w-5 h-5" /></div>}
            />
            <SettingItem
              icon={<Ruler className="w-5 h-5" />}
              title="计量单位"
              subtitle={settings.unit}
              action={<div className="flex items-center gap-1 text-text-muted"><span>{settings.unit}</span><ChevronRight className="w-5 h-5" /></div>}
            />
          </div>
        </motion.div>

        {/* 外观与声音 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-2">外观与声音</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <SettingItem
              icon={<Moon className="w-5 h-5" />}
              title="深色模式"
              subtitle="跟随系统"
              action={<Switch checked={settings.darkMode} onChange={() => toggleSwitch('darkMode')} />}
            />
            <SettingItem
              icon={<Volume2 className="w-5 h-5" />}
              title="音效"
              subtitle="操作反馈声音"
              action={<Switch checked={settings.sound} onChange={() => toggleSwitch('sound')} />}
              divider={false}
            />
          </div>
        </motion.div>

        {/* 数据管理 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-2">数据管理</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <ListItem
              icon={<div className="text-primary"><Globe className="w-5 h-5" /></div>}
              title="清除缓存"
              subtitle="当前缓存 23.5 MB"
              onClick={() => alert('缓存已清除')}
              divider={true}
            />
            <ListItem
              icon={<div className="text-red-500"><Trash2 className="w-5 h-5" /></div>}
              title="删除所有数据"
              subtitle="此操作不可恢复"
              onClick={() => {
                if (confirm('确定要删除所有数据吗？此操作不可恢复！')) {
                  alert('数据已删除');
                }
              }}
              divider={false}
            />
          </div>
        </motion.div>

        {/* 版本信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-text-muted text-sm">NutriLife v1.0.0 (Build 2024.01.15)</p>
          <p className="text-text-muted text-xs mt-1">© 2024 NutriLife Inc. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
