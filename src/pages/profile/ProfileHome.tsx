import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, ListItem } from '../../components';
import { useAuth } from '../../context/GlobalContext';
import { 
  User, 
  Bell, 
  Shield, 
  Target, 
  Settings2, 
  Crown,
  HelpCircle, 
  Info, 
  MessageSquare, 
  ChevronRight,
  LogOut
} from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuGroups = [
    {
      title: '账户管理',
      items: [
        { icon: <User className="w-5 h-5" />, title: '个人信息', subtitle: '管理您的基本资料', path: '/profile/account' },
        { icon: <Target className="w-5 h-5" />, title: '健康目标', subtitle: '查看和调整目标', path: '/goal-selection' },
        { icon: <Crown className="w-5 h-5" />, title: '订阅管理', subtitle: 'Pro 会员', path: '/subscription' },
      ],
    },
    {
      title: '应用设置',
      items: [
        { icon: <Settings2 className="w-5 h-5" />, title: '通用设置', subtitle: '语言、单位等', path: '/profile/settings' },
        { icon: <Bell className="w-5 h-5" />, title: '通知设置', subtitle: '管理推送通知', path: '/profile/notifications' },
        { icon: <Shield className="w-5 h-5" />, title: '隐私设置', subtitle: '数据权限管理', path: '/privacy-settings' },
      ],
    },
    {
      title: '帮助与支持',
      items: [
        { icon: <HelpCircle className="w-5 h-5" />, title: '帮助中心', subtitle: '常见问题解答', path: '/help' },
        { icon: <MessageSquare className="w-5 h-5" />, title: '意见反馈', subtitle: '告诉我们您的想法', path: '/profile/feedback' },
        { icon: <Info className="w-5 h-5" />, title: '关于我们', subtitle: '版本 1.0.0', path: '/profile/about' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <NavBar title="我的" showBack={false} />

      <div className="pt-14">
        {/* 用户信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-6 bg-text-primary rounded-3xl text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || '用'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{user?.name || '健康达人'}</h2>
              <p className="text-white/70 text-sm">{user?.email || 'user@example.com'}</p>
            </div>
            <button 
              onClick={() => navigate('/profile/account')}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 统计信息 */}
          <div className="flex justify-around mt-6 pt-6 border-t border-white/10">
            {[
              { value: '28', label: '连续打卡' },
              { value: '156', label: '记录天数' },
              { value: '12', label: '达成目标' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-white/60 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 菜单列表 */}
        <div className="mt-6 px-4 space-y-6">
          {menuGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * groupIndex }}
            >
              <h3 className="text-sm font-medium text-text-muted mb-3 px-2">
                {group.title}
              </h3>
              <div className="bg-white rounded-2xl overflow-hidden shadow-card">
                {group.items.map((item, itemIndex) => (
                  <ListItem
                    key={item.title}
                    icon={<div className="text-primary">{item.icon}</div>}
                    title={item.title}
                    subtitle={item.subtitle}
                    onClick={() => navigate(item.path)}
                    divider={itemIndex !== group.items.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 退出登录 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 px-4"
        >
          <button
            onClick={() => {
              if (confirm('确定要退出登录吗？')) {
                handleLogout();
              }
            }}
            className="w-full flex items-center justify-center gap-2 p-4 bg-white rounded-2xl text-red-500 font-medium shadow-card hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            退出登录
          </button>
        </motion.div>

        {/* 版本信息 */}
        <p className="text-center text-text-muted text-xs mt-6">
          NutriLife v1.0.0
        </p>
      </div>
    </div>
  );
};

export default Profile;
