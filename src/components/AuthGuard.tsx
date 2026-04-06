import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/GlobalContext';

// ==================== 路由守卫配置 ====================

// 公开路由（无需登录）
export const PUBLIC_ROUTES = [
  '/splash',
  '/welcome',
  '/login',
  '/signup',
  '/plan-confirmation',
];

// Onboarding 路由
export const ONBOARDING_ROUTES = [
  '/goal-selection',
  '/food-restrictions',
  '/activity-level',
  '/meals-per-day',
  '/target-weight',
  '/water-onboarding',
  '/plan-summary',
];

// 需要登录的路由（核心业务页）
export const PROTECTED_ROUTES = [
  '/',
  '/home',
  '/calendar',
  '/messages',
  '/profile',
  '/plan',
  '/data-export',
  '/subscription',
  '/payment',
  '/privacy-settings',
];

// 检查路径是否需要登录
export const isProtectedRoute = (pathname: string): boolean => {
  // 精确匹配
  if (PROTECTED_ROUTES.some(route => pathname === route)) return true;
  // 前缀匹配
  if (PROTECTED_ROUTES.some(route => 
    route !== '/' && pathname.startsWith(route)
  )) return true;
  return false;
};

// 检查路径是否为公开路由
export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => pathname === route);
};

// ==================== 路由守卫组件 ====================

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // 如果不需要认证，直接渲染
  if (!requireAuth) {
    return <>{children}</>;
  }

  // 检查当前路径是否需要登录
  const needsAuth = isProtectedRoute(location.pathname);

  // 需要登录但未登录，重定向到登录页
  if (needsAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 已登录但访问登录页，重定向到首页
  if (isAuthenticated && isPublicRoute(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// ==================== 页面加载守卫 ====================

interface PageLoaderProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ 
  children, 
  isLoading = false 
}) => {
  return (
    <>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center"
            >
              {/* Logo 动画 */}
              <div className="relative w-20 h-20 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                >
                  N
                </motion.div>
                <motion.div
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-primary/30 rounded-3xl"
                />
              </div>
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-text-muted"
              >
                加载中...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ==================== 过渡守卫 ====================

// 页面进入/退出动画变体
export const pageTransitionVariants = {
  initial: { 
    opacity: 0, 
    x: 20,
    scale: 0.98
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    scale: 0.98,
    transition: {
      duration: 0.25,
      ease: [0.55, 0.085, 0.68, 0.53] // easeInQuad
    }
  }
};

// 从右滑入（子页面）
export const slideFromRightVariants = {
  initial: { 
    opacity: 0, 
    x: '100%',
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    x: '100%',
    transition: {
      duration: 0.3,
      ease: [0.55, 0.085, 0.68, 0.53]
    }
  }
};

// 从下滑入（弹窗/底部）
export const slideFromBottomVariants = {
  initial: { 
    opacity: 0, 
    y: '100%',
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    y: '100%',
    transition: {
      duration: 0.25,
      ease: [0.55, 0.085, 0.68, 0.53]
    }
  }
};

// 淡入淡出
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// 缩放动画（模态框）
export const scaleVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

// ==================== 动画页面包装器 ====================

interface AnimatedPageProps {
  children: React.ReactNode;
  variant?: 'default' | 'slideRight' | 'slideBottom' | 'fade' | 'scale';
  className?: string;
}

export const AnimatedPage: React.FC<AnimatedPageProps> = ({ 
  children, 
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: pageTransitionVariants,
    slideRight: slideFromRightVariants,
    slideBottom: slideFromBottomVariants,
    fade: fadeVariants,
    scale: scaleVariants,
  };

  return (
    <motion.div
      variants={variants[variant]}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==================== 导航守卫 Hook ====================

export const useNavigationGuard = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const canNavigate = (to: string): boolean => {
    // 如果已登录，可以访问任何页面
    if (isAuthenticated) return true;
    // 如果未登录，只能访问公开路由
    return isPublicRoute(to) || ONBOARDING_ROUTES.some(r => to === r);
  };

  const getRedirectPath = (): string => {
    if (isAuthenticated) return '/';
    return '/login';
  };

  return {
    canNavigate,
    getRedirectPath,
    isPublicRoute: isPublicRoute(location.pathname),
    isProtectedRoute: isProtectedRoute(location.pathname),
  };
};

export default AuthGuard;
