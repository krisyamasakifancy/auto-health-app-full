import React from 'react';
import { motion, Variants } from 'framer-motion';

// ==================== 页面转场动画变体 ====================

/**
 * 默认转场动画 - 淡入 + 轻微位移动画
 * 适用于：主Tab页面、Onboarding页面
 */
export const pageTransitionVariants: Variants = {
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

/**
 * 右滑进入动画 - iOS风格子页面
 * 适用于：详情页、设置页、表单页
 */
export const slideFromRightVariants: Variants = {
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

/**
 * 底部滑入动画 - 底部表单、弹窗
 * 适用于：ActionSheet、Picker、Modal
 */
export const slideFromBottomVariants: Variants = {
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

/**
 * 淡入淡出动画 - 模态框覆盖层
 * 适用于：弹窗、Toast、遮罩层
 */
export const fadeVariants: Variants = {
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

/**
 * 缩放动画 - 弹窗内容
 * 适用于：Dialog、Alert、Popup
 */
export const scaleVariants: Variants = {
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

/**
 * 列表项依次进入动画
 * 适用于：列表页面、菜单项
 */
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1
    }
  }
};

export const staggerItemVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: {
      duration: 0.2
    }
  }
};

// ==================== AnimatedPage 组件 ====================

export type AnimationVariant = 'default' | 'slideRight' | 'slideBottom' | 'fade' | 'scale' | 'none';

interface AnimatedPageProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
}

const variantMap: Record<AnimationVariant, Variants> = {
  default: pageTransitionVariants,
  slideRight: slideFromRightVariants,
  slideBottom: slideFromBottomVariants,
  fade: fadeVariants,
  scale: scaleVariants,
  none: {
    initial: {},
    animate: {},
    exit: {}
  }
};

/**
 * 动画页面包装器
 * 
 * @example
 * // 默认动画（主页面）
 * <AnimatedPage>
 *   <HomeContent />
 * </AnimatedPage>
 * 
 * // 右滑进入（子页面）
 * <AnimatedPage variant="slideRight">
 *   <DetailPage />
 * </AnimatedPage>
 * 
 * // 底部滑入（弹窗）
 * <AnimatedPage variant="slideBottom">
 *   <BottomSheet />
 * </AnimatedPage>
 */
export const AnimatedPage: React.FC<AnimatedPageProps> = ({ 
  children, 
  variant = 'default',
  className = '',
  delay = 0
}) => {
  const selectedVariant = variantMap[variant];
  
  // 如果有延迟，修改动画配置
  const customVariant: Variants = delay > 0 ? {
    initial: selectedVariant.initial,
    animate: {
      ...selectedVariant.animate,
      transition: {
        ...(selectedVariant.animate as any)?.transition,
        delay
      }
    },
    exit: selectedVariant.exit
  } : selectedVariant;

  return (
    <motion.div
      variants={customVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==================== 便捷动画组件 ====================

/**
 * 列表容器 - 带动画交错效果
 */
export const AnimatedList: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.05 }) => {
  return (
    <motion.div
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 列表项 - 用于 AnimatedList 的子项
 */
export const AnimatedListItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 淡入容器
 */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ children, className = '', delay = 0, duration = 0.3 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 滑入容器
 */
export const SlideIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  distance?: number;
}> = ({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0,
  distance = 20
}) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        delay, 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 缩放容器
 */
export const ScaleIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 按压效果包装器
 */
export const Pressable: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  scale?: number;
}> = ({ children, className = '', onClick, scale = 0.98 }) => {
  return (
    <motion.div
      whileTap={{ scale }}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
