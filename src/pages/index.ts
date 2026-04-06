export { default as Home } from './Home';
export { default as Calendar } from './Calendar';
export { default as Messages } from './Messages';
export { default as Profile } from './Profile';
export { default as GoalSelection } from './GoalSelection';
export { default as Login } from './Login';
export { default as FoodRestrictions } from './FoodRestrictions';
export { default as ActivityLevel } from './ActivityLevel';
export { default as MealsPerDay } from './MealsPerDay';
export { default as WaterOnboarding } from './WaterOnboarding';
export { default as TargetWeight } from './TargetWeight';
export { default as PlanSummary } from './PlanSummary';
export { default as PlanConfirmation } from './PlanConfirmation';

// 第一批：用户基础模块
export { default as Splash } from './Splash';
export { default as Welcome } from './Welcome';
export { default as Signup } from './Signup';
export { default as ProfileHome } from './profile/ProfileHome';
export { default as Account } from './profile/Account';
export { default as Settings } from './profile/Settings';
export { default as Notifications } from './profile/Notifications';
export { default as About } from './profile/About';
export { default as Feedback } from './profile/Feedback';

// 第二批：核心业务模块
export { default as HomeDashboard } from './home/HomeDashboard';
export { default as WaterTracker } from './home/WaterTracker';
export { default as WeightLog } from './home/WeightLog';
export { default as FoodDiary } from './home/FoodDiary';
export { default as QuickAdd } from './home/QuickAdd';
export { default as ExerciseLog } from './home/ExerciseLog';
export { default as ShoppingList } from './home/ShoppingList';
export { default as Favorites } from './home/Favorites';
export { default as Achievements } from './home/Achievements';
export { default as PlanCalendar } from './plan/PlanCalendar';
export { default as MealDetail } from './plan/MealDetail';
export { default as AIChat } from './chat/AIChat';

// 第二批新增：搜索、列表、详情页
export { default as SearchResults } from './search/SearchResults';
export { default as RecipeList } from './recipe/RecipeList';
export { default as FoodDetail } from './food/FoodDetail';
export { default as ExerciseDetail } from './exercise/ExerciseDetail';
export { default as GoalManagement } from './goal/GoalManagement';

// 第三批：订阅与功能闭环
export { default as Subscription } from './subscription/Subscription';
export { default as Payment } from './subscription/Payment';
export { default as PaymentSuccess } from './subscription/PaymentSuccess';
export { default as PaymentFailed } from './subscription/PaymentFailed';
export { default as DataExport } from './settings/DataExport';
export { default as PrivacySettings } from './settings/PrivacySettings';
export { default as HelpCenter } from './help/HelpCenter';

// 法律页面
export { default as TermsOfService } from './legal/TermsOfService';
export { default as PrivacyPolicy } from './legal/PrivacyPolicy';
