import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavBar } from '../../components';
import { 
  Bell, 
  MessageCircle, 
  Target, 
  Calendar,
  Award
} from 'lucide-react';

const Notifications: React.FC = () => {
  const [settings, setSettings] = useState({
    // 推送通知总开关
    pushEnabled: true,
    
    // 各类型通知
    dailyReminder: true,      // 每日记录提醒
    mealReminder: true,       // 用餐提醒
    waterReminder: true,      // 饮水提醒
    goalAchieved: true,       // 目标达成
    weeklyReport: true,       // 周报
    promotions: false,        // 优惠活动
    tips: true,               // 健康小贴士
    updates: true,            // 应用更新
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

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

  const notificationGroups = [
    {
      title: '健康提醒',
      items: [
        { key: 'dailyReminder', icon: <Bell className="w-5 h-5" />, title: '每日记录提醒', desc: '提醒记录当天的饮食和运动' },
        { key: 'mealReminder', icon: <Calendar className="w-5 h-5" />, title: '用餐提醒', desc: '根据您的用餐计划发送提醒' },
        { key: 'waterReminder', icon: <Bell className="w-5 h-5" />, title: '饮水提醒', desc: '定时提醒您补充水分' },
      ],
    },
    {
      title: '目标与成就',
      items: [
        { key: 'goalAchieved', icon: <Target className="w-5 h-5" />, title: '目标达成', desc: '当达成每日/每周目标时通知' },
        { key: 'weeklyReport', icon: <Award className="w-5 h-5" />, title: '周报推送', desc: '每周一发送上周健康报告' },
      ],
    },
    {
      title: '其他通知',
      items: [
        { key: 'tips', icon: <MessageCircle className="w-5 h-5" />, title: '健康小贴士', desc: '每日健康知识分享' },
        { key: 'updates', icon: <Bell className="w-5 h-5" />, title: '应用更新', desc: '新功能和改进通知' },
        { key: 'promotions', icon: <Bell className="w-5 h-5" />, title: '优惠活动', desc: '会员优惠和促销活动' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="通知设置" showBack={true} />

      <div className="pt-20 px-6 pb-8">
        {/* 总开关 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary rounded-2xl p-5 text-white mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">推送通知</p>
                <p className="text-white/70 text-sm">{settings.pushEnabled ? '已开启' : '已关闭'}</p>
              </div>
            </div>
            <Switch checked={settings.pushEnabled} onChange={() => toggleSetting('pushEnabled')} />
          </div>
        </motion.div>

        {/* 各类通知设置 */}
        <div className={`space-y-6 ${!settings.pushEnabled ? 'opacity-50 pointer-events-none' : ''}`}>
          {notificationGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * groupIndex }}
            >
              <h3 className="text-sm font-medium text-text-muted mb-3 px-2">{group.title}</h3>
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={item.key}
                    className={`py-4 px-4 flex items-center justify-between ${
                      itemIndex !== group.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{item.icon}</div>
                      <div>
                        <p className="text-text-primary font-medium">{item.title}</p>
                        <p className="text-sm text-text-muted">{item.desc}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={settings[item.key as keyof typeof settings] as boolean} 
                      onChange={() => toggleSetting(item.key as keyof typeof settings)} 
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 提示信息 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-primary-50 rounded-xl"
        >
          <p className="text-sm text-primary-700">
            💡 提示：您可以在系统设置中管理 NutriLife 的通知权限
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;
