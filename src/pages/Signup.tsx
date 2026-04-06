import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Input, NavBar } from '../components';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少需要3个字符';
    }

    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 8) {
      newErrors.password = '密码至少需要8个字符';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '密码需包含大小写字母和数字';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      alert('请同意用户协议和隐私政策');
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    
    // 模拟注册请求
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    navigate('/goal-selection');
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getPasswordStrength = (password: string): { level: number; text: string } => {
    if (!password) return { level: 0, text: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    const levels = ['', '弱', '一般', '强', '非常强'];
    return { level: score, text: levels[score] };
  };

  const strength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="创建账号" showBack={true} />

      <div className="pt-20 px-6 pb-8">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            注册新账号
          </h1>
          <p className="text-text-secondary">
            填写以下信息开始您的健康之旅
          </p>
        </motion.div>

        {/* 表单区域 */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            label="用户名"
            placeholder="设置用户名"
            value={formData.username}
            onChange={handleChange('username')}
            icon={<User className="w-5 h-5" />}
            error={errors.username}
            clearable
          />

          <Input
            label="邮箱地址"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange('email')}
            icon={<Mail className="w-5 h-5" />}
            error={errors.email}
            clearable
          />

          <div>
            <Input
              label="设置密码"
              type="password"
              placeholder="至少8位，包含大小写字母和数字"
              value={formData.password}
              onChange={handleChange('password')}
              icon={<Lock className="w-5 h-5" />}
              passwordToggle
              error={errors.password}
            />
            
            {/* 密码强度指示器 */}
            {formData.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2"
              >
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 rounded-full transition-colors ${
                        level <= strength.level
                          ? strength.level <= 2
                            ? 'bg-red-400'
                            : strength.level === 3
                            ? 'bg-yellow-400'
                            : 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className={`text-xs mt-1 ${
                  strength.level <= 2 ? 'text-red-500' : 
                  strength.level === 3 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  密码强度: {strength.text}
                </p>
              </motion.div>
            )}
          </div>

          <Input
            label="确认密码"
            type="password"
            placeholder="再次输入密码"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            icon={<CheckCircle className="w-5 h-5" />}
            passwordToggle
            error={errors.confirmPassword}
          />

          {/* 用户协议 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-3 py-2"
          >
            <button
              type="button"
              onClick={() => setAgreeTerms(!agreeTerms)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                agreeTerms
                  ? 'bg-primary border-primary'
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              {agreeTerms && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <p className="text-sm text-text-secondary">
              我已阅读并同意
              <button type="button" className="text-primary underline">用户协议</button>
              和
              <button type="button" className="text-primary underline">隐私政策</button>
            </p>
          </motion.div>

          {/* 注册按钮 */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="full"
              loading={isLoading}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              创建账号
            </Button>
          </div>

          {/* 登录链接 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center pt-4"
          >
            <p className="text-text-secondary">
              已有账号？
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary font-semibold hover:underline"
              >
                立即登录
              </button>
            </p>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
