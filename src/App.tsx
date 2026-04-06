import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GlobalProvider, useAuth } from './context/GlobalContext';
import { TabBar } from './components';
import { AuthGuard, AnimatedPage, isProtectedRoute } from './components/AuthGuard';
import { 
  // 主Tab页面
  HomeDashboard, 
  PlanCalendar, 
  AIChat, 
  ProfileHome,
  
  // Onboarding Flow
  Splash,
  Welcome,
  Login,
  Signup,
  GoalSelection,
  FoodRestrictions,
  ActivityLevel,
  MealsPerDay,
  WaterOnboarding,
  TargetWeight,
  PlanSummary,
  PlanConfirmation,
  
  // Profile Sub-pages
  Account,
  Settings,
  Notifications,
  About,
  Feedback,
  
  // Home Sub-pages
  WaterTracker,
  WeightLog,
  FoodDiary,
  QuickAdd,
  ExerciseLog,
  ShoppingList,
  Favorites,
  Achievements,
  
  // Plan Sub-pages
  MealDetail,
  
  // 第二批新增
  SearchResults,
  RecipeList,
  FoodDetail,
  ExerciseDetail,
  GoalManagement,
  
  // 第三批
  Subscription,
  Payment,
  PaymentSuccess,
  PaymentFailed,
  DataExport,
  PrivacySettings,
  HelpCenter,
  
  // 法律页面
  TermsOfService,
  PrivacyPolicy,
} from './pages';

// ==================== 路由配置 ====================

// 需要显示 TabBar 的路由
const TABBAR_ROUTES = ['/', '/calendar', '/messages', '/profile'];

// 页面动画配置映射
const pageAnimationConfig: Record<string, 'default' | 'slideRight'> = {
  // 默认动画
  '/': 'default',
  '/calendar': 'default',
  '/messages': 'default',
  '/profile': 'default',
  
  // Onboarding - 默认
  '/splash': 'default',
  '/welcome': 'default',
  '/login': 'default',
  '/signup': 'default',
  '/goal-selection': 'default',
  '/food-restrictions': 'default',
  '/activity-level': 'default',
  '/meals-per-day': 'default',
  '/target-weight': 'default',
  '/water-onboarding': 'default',
  '/plan-summary': 'default',
  '/plan-confirmation': 'default',
  
  // 子页面 - 右滑进入
  '/home/water-tracker': 'slideRight',
  '/home/weight-log': 'slideRight',
  '/home/food-diary': 'slideRight',
  '/home/quick-add': 'slideRight',
  '/home/exercise-log': 'slideRight',
  '/home/shopping-list': 'slideRight',
  '/home/favorites': 'slideRight',
  '/home/achievements': 'slideRight',
  '/plan/meal-detail': 'slideRight',
  '/plan/recipes': 'slideRight',
  '/search': 'slideRight',
  '/food-detail': 'slideRight',
  '/exercise-detail': 'slideRight',
  '/goal-management': 'slideRight',
  '/profile/account': 'slideRight',
  '/profile/settings': 'slideRight',
  '/profile/notifications': 'slideRight',
  '/profile/about': 'slideRight',
  '/profile/feedback': 'slideRight',
  '/subscription': 'slideRight',
  '/payment': 'slideRight',
  '/data-export': 'slideRight',
  '/privacy-settings': 'slideRight',
  '/help': 'slideRight',
  '/payment/success': 'slideRight',
  '/payment/failed': 'slideRight',
  '/terms': 'slideRight',
  '/privacy': 'slideRight',
};

// 获取页面动画类型
const getPageAnimation = (pathname: string): 'default' | 'slideRight' => {
  // 精确匹配
  if (pageAnimationConfig[pathname]) {
    return pageAnimationConfig[pathname];
  }
  // 前缀匹配（用于动态路由）
  for (const [route, animation] of Object.entries(pageAnimationConfig)) {
    if (pathname.startsWith(route) && route !== '/') {
      return animation;
    }
  }
  return 'default';
};

// ==================== 页面包装组件 ====================

interface RouteWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ children, requireAuth = false }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const needsAuth = isProtectedRoute(location.pathname);
  const animation = getPageAnimation(location.pathname);

  // 路由守卫检查
  if (needsAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 已登录用户访问登录页，重定向到首页
  if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/" replace />;
  }

  return (
    <AnimatedPage variant={animation}>
      {children}
    </AnimatedPage>
  );
};

// ==================== 主应用组件 ====================

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const location = useLocation();
  
  const showTabBar = TABBAR_ROUTES.includes(location.pathname);

  return (
    <div className="h-full bg-background">
      {/* 状态栏占位 */}
      <div className="h-12 safe-top bg-background fixed top-0 left-0 right-0 z-40" />

      {/* 主内容区 */}
      <div className={`${showTabBar ? 'pb-24' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ===== 公开路由 ===== */}
            
            <Route path="/splash" element={
              <RouteWrapper><Splash /></RouteWrapper>
            } />
            
            <Route path="/welcome" element={
              <RouteWrapper><Welcome /></RouteWrapper>
            } />
            
            <Route path="/login" element={
              <RouteWrapper><Login /></RouteWrapper>
            } />
            
            <Route path="/signup" element={
              <RouteWrapper><Signup /></RouteWrapper>
            } />
            
            {/* ===== Onboarding 流程 ===== */}
            
            <Route path="/goal-selection" element={
              <RouteWrapper><GoalSelection /></RouteWrapper>
            } />
            
            <Route path="/food-restrictions" element={
              <RouteWrapper><FoodRestrictions /></RouteWrapper>
            } />
            
            <Route path="/activity-level" element={
              <RouteWrapper><ActivityLevel /></RouteWrapper>
            } />
            
            <Route path="/meals-per-day" element={
              <RouteWrapper><MealsPerDay /></RouteWrapper>
            } />
            
            <Route path="/target-weight" element={
              <RouteWrapper><TargetWeight /></RouteWrapper>
            } />
            
            <Route path="/water-onboarding" element={
              <RouteWrapper><WaterOnboarding /></RouteWrapper>
            } />
            
            <Route path="/plan-summary" element={
              <RouteWrapper><PlanSummary /></RouteWrapper>
            } />
            
            <Route path="/plan-confirmation" element={
              <RouteWrapper><PlanConfirmation /></RouteWrapper>
            } />
            
            {/* ===== 主Tab页面（需要登录） ===== */}
            
            <Route path="/" element={
              <RouteWrapper requireAuth><HomeDashboard /></RouteWrapper>
            } />
            
            <Route path="/calendar" element={
              <RouteWrapper requireAuth><PlanCalendar /></RouteWrapper>
            } />
            
            <Route path="/messages" element={
              <RouteWrapper requireAuth><AIChat /></RouteWrapper>
            } />
            
            <Route path="/profile" element={
              <RouteWrapper requireAuth><ProfileHome /></RouteWrapper>
            } />
            
            {/* ===== Home 子页面 ===== */}
            
            <Route path="/home/water-tracker" element={
              <RouteWrapper requireAuth><WaterTracker /></RouteWrapper>
            } />
            
            <Route path="/home/weight-log" element={
              <RouteWrapper requireAuth><WeightLog /></RouteWrapper>
            } />
            
            <Route path="/home/food-diary" element={
              <RouteWrapper requireAuth><FoodDiary /></RouteWrapper>
            } />
            
            <Route path="/home/quick-add" element={
              <RouteWrapper requireAuth><QuickAdd /></RouteWrapper>
            } />
            
            <Route path="/home/exercise-log" element={
              <RouteWrapper requireAuth><ExerciseLog /></RouteWrapper>
            } />
            
            <Route path="/home/shopping-list" element={
              <RouteWrapper requireAuth><ShoppingList /></RouteWrapper>
            } />
            
            <Route path="/home/favorites" element={
              <RouteWrapper requireAuth><Favorites /></RouteWrapper>
            } />
            
            <Route path="/home/achievements" element={
              <RouteWrapper requireAuth><Achievements /></RouteWrapper>
            } />
            
            {/* ===== Plan 子页面 ===== */}
            
            <Route path="/plan/meal-detail/:id" element={
              <RouteWrapper requireAuth><MealDetail /></RouteWrapper>
            } />

            <Route path="/plan/recipes" element={
              <RouteWrapper requireAuth><RecipeList /></RouteWrapper>
            } />
            
            {/* ===== 第二批新增：搜索、详情页 ===== */}
            
            <Route path="/search" element={
              <RouteWrapper requireAuth><SearchResults /></RouteWrapper>
            } />
            
            <Route path="/food-detail/:id" element={
              <RouteWrapper requireAuth><FoodDetail /></RouteWrapper>
            } />
            
            <Route path="/exercise-detail/:id" element={
              <RouteWrapper requireAuth><ExerciseDetail /></RouteWrapper>
            } />
            
            <Route path="/goal-management" element={
              <RouteWrapper requireAuth><GoalManagement /></RouteWrapper>
            } />
            
            <Route path="/profile/account" element={
              <RouteWrapper requireAuth><Account /></RouteWrapper>
            } />
            
            <Route path="/profile/settings" element={
              <RouteWrapper requireAuth><Settings /></RouteWrapper>
            } />
            
            <Route path="/profile/notifications" element={
              <RouteWrapper requireAuth><Notifications /></RouteWrapper>
            } />
            
            <Route path="/profile/about" element={
              <RouteWrapper requireAuth><About /></RouteWrapper>
            } />
            
            <Route path="/profile/feedback" element={
              <RouteWrapper requireAuth><Feedback /></RouteWrapper>
            } />
            
            {/* ===== 第三批：订阅与设置 ===== */}
            
            <Route path="/subscription" element={
              <RouteWrapper requireAuth><Subscription /></RouteWrapper>
            } />
            
            <Route path="/payment" element={
              <RouteWrapper requireAuth><Payment /></RouteWrapper>
            } />
            
            <Route path="/payment/success" element={
              <RouteWrapper requireAuth><PaymentSuccess /></RouteWrapper>
            } />
            
            <Route path="/payment/failed" element={
              <RouteWrapper requireAuth><PaymentFailed /></RouteWrapper>
            } />
            
            <Route path="/data-export" element={
              <RouteWrapper requireAuth><DataExport /></RouteWrapper>
            } />
            
            <Route path="/privacy-settings" element={
              <RouteWrapper requireAuth><PrivacySettings /></RouteWrapper>
            } />
            
            <Route path="/help" element={
              <RouteWrapper><HelpCenter /></RouteWrapper>
            } />
            
            {/* ===== 法律页面 ===== */}
            
            <Route path="/terms" element={
              <RouteWrapper><TermsOfService /></RouteWrapper>
            } />
            
            <Route path="/privacy" element={
              <RouteWrapper><PrivacyPolicy /></RouteWrapper>
            } />
            
            {/* 404 重定向 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>

      {/* TabBar - 仅在主页面显示 */}
      {showTabBar && (
        <TabBar 
          activeKey={activeTab} 
          onChange={(key) => {
            setActiveTab(key);
          }} 
        />
      )}
    </div>
  );
};

// ==================== 根组件 ====================

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  );
}

export default App;
