import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components';
import { useAuth, useLoading } from '../context/GlobalContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setGlobalLoading } = useLoading();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // 简单验证
    if (!email || !password) {
      setError('请输入邮箱和密码');
      return;
    }
    if (password.length < 6) {
      setError('密码至少6位');
      return;
    }

    setError('');
    setGlobalLoading(true);

    // 模拟登录 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 模拟登录成功
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      name: email.split('@')[0],
      avatar: undefined,
      height: 170,
      weight: 65,
      age: 28,
      gender: 'male' as const,
      goal: 'lose' as const,
      targetWeight: 60,
      dailyCalorieGoal: 1800,
    };

    const mockToken = 'token_' + Date.now();
    
    login(mockUser, mockToken);
    setGlobalLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-full bg-background flex flex-col justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm mx-auto space-y-8"
      >
        {/* Logo */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-text-primary rounded-3xl flex items-center justify-center mb-6">
            <svg viewBox="0 0 100 100" className="w-12 h-12" fill="white">
              <path d="M50 20 C30 20 20 40 20 50 C20 70 35 85 50 85 C65 85 80 70 80 50 C80 40 70 20 50 20 Z" />
            </svg>
          </div>
          <h1 className="text-h2 text-text-primary">欢迎回来</h1>
          <p className="text-body text-text-secondary mt-2">登录以继续</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm"
            >
              {error}
            </motion.div>
          )}

          <Input
            label="邮箱"
            type="email"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5" />}
            clearable
          />
          
          <Input
            label="密码"
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5" />}
            passwordToggle
          />

          <div className="flex justify-end">
            <button className="text-sm text-primary font-medium hover:underline">
              忘记密码？
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Button 
            variant="primary" 
            size="full" 
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            onClick={handleLogin}
          >
            登录
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-muted">或使用以下方式</span>
            </div>
          </div>

          <Button variant="outline" size="full">
            <span className="mr-2">🍎</span> 使用 Apple 登录
          </Button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-body-sm text-text-secondary">
          还没有账号？{' '}
          <button 
            className="text-primary font-semibold hover:underline"
            onClick={() => navigate('/signup')}
          >
            立即注册
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
