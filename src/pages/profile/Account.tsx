import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button, Input } from '../../components';
import { Camera, ChevronRight, Mail, Phone, Calendar } from 'lucide-react';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '健康达人',
    email: 'user@example.com',
    phone: '138****8888',
    birthDate: '1995-06-15',
    gender: 'male',
    height: '175',
    weight: '70',
  });

  const handleSave = async () => {
    setIsLoading(true);
    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsEditing(false);
  };

  const infoItems = [
    { icon: <Mail className="w-5 h-5" />, label: '邮箱', value: formData.email },
    { icon: <Phone className="w-5 h-5" />, label: '手机号', value: formData.phone },
    { icon: <Calendar className="w-5 h-5" />, label: '出生日期', value: formData.birthDate },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        title="个人信息" 
        showBack={true}
        rightElement={
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="text-primary font-medium text-sm"
          >
            {isEditing ? '保存' : '编辑'}
          </button>
        }
      />

      <div className="pt-20 px-6 pb-8">
        {/* 头像区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {formData.nickname[0]}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-text-primary rounded-full flex items-center justify-center shadow-button">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <p className="mt-4 text-text-muted text-sm">点击更换头像</p>
        </motion.div>

        {/* 基本信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden mb-6"
        >
          <div className="p-4 border-b border-gray-100">
            <label className="text-sm text-text-muted mb-2 block">昵称</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full text-lg font-semibold text-text-primary border-b-2 border-primary focus:outline-none pb-1"
              />
            ) : (
              <p className="text-lg font-semibold text-text-primary">{formData.nickname}</p>
            )}
          </div>

          {infoItems.map((item, index) => (
            <div key={item.label} className="p-4 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="text-text-muted">{item.icon}</div>
                <div className="flex-1">
                  <p className="text-sm text-text-muted">{item.label}</p>
                  <p className="text-text-primary">{item.value}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* 身体数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-medium text-text-muted mb-3 px-2">身体数据</h3>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-100">
              <div className="p-4">
                <p className="text-sm text-text-muted mb-2">身高</p>
                {isEditing ? (
                  <div className="flex items-baseline gap-1">
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-20 text-2xl font-bold text-text-primary border-b-2 border-primary focus:outline-none"
                    />
                    <span className="text-text-muted">cm</span>
                  </div>
                ) : (
                  <p><span className="text-2xl font-bold text-text-primary">{formData.height}</span> <span className="text-text-muted">cm</span></p>
                )}
              </div>
              
              <div className="p-4">
                <p className="text-sm text-text-muted mb-2">体重</p>
                {isEditing ? (
                  <div className="flex items-baseline gap-1">
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-20 text-2xl font-bold text-text-primary border-b-2 border-primary focus:outline-none"
                    />
                    <span className="text-text-muted">kg</span>
                  </div>
                ) : (
                  <p><span className="text-2xl font-bold text-text-primary">{formData.weight}</span> <span className="text-text-muted">kg</span></p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 保存按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            variant="primary"
            size="full"
            loading={isLoading}
            onClick={handleSave}
          >
            保存修改
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;
