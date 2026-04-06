# Health App - Global Architecture Documentation

## 1. Design Tokens (设计规范)

### 1.1 色彩系统

```javascript
// tailwind.config.js 扩展配置
{
  colors: {
    // 主色调 - Emerald Green
    primary: {
      DEFAULT: '#10B981',
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
    
    // 背景色
    background: {
      DEFAULT: '#E8E8F0',  // 主背景 - 浅灰紫
      light: '#F5F5F7',
      dark: '#1A1A1A',
      mint: '#E8F5E9',     // 特殊页面背景（如计划页）
      cream: '#FFF8E1',    // 庆祝页面背景
      blue: '#BBDEFB',     // 饮水引导页
    },
    
    // 强调色
    accent: {
      orange: '#F97316',    // 警告/高亮
      pink: '#E8A5B0',      // 浣熊嘴巴
      blue: '#60A5FA',      // 吉祥物背景
      purple: '#A78BFA',
      yellow: '#FCD34D',    // 低活动度
      red: '#FCA5A5',       // 不活跃状态
    },
    
    // 文字色
    text: {
      primary: '#1A1A1A',   // 主文字
      secondary: '#6B7280', // 次要文字
      muted: '#9CA3AF',     // 提示文字
      inverse: '#FFFFFF',   // 深色背景上的文字
    },
    
    // 边框色
    border: {
      light: '#E5E7EB',
      DEFAULT: '#D1D5DB',
      dark: '#9CA3AF',
    },
  }
}
```

### 1.2 字体层级

| 层级 | 大小 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| Display | 40px | 700 | 1.1 | 首页大标题 |
| H1 | 32px | 700 | 1.2 | 页面标题 |
| H2 | 28px | 700 | 1.25 | 区块标题 |
| H3 | 24px | 600 | 1.3 | 卡片标题 |
| H4 | 20px | 600 | 1.35 | 小标题 |
| Body | 16px | 400 | 1.5 | 正文 |
| Body-sm | 14px | 400 | 1.5 | 次要文字 |
| Caption | 12px | 400 | 1.4 | 标签、说明 |

### 1.3 间距规范

```javascript
{
  spacing: {
    'page': '24px',      // 页面左右边距
    'section': '32px',   // 区块间距
    'card': '16px',      // 卡片内边距
    'element': '12px',   // 元素间距
    'compact': '8px',    // 紧凑间距
  }
}
```

### 1.4 圆角规范

```javascript
{
  borderRadius: {
    'sm': '8px',         // 小元素
    'md': '12px',        // 按钮、输入框
    'lg': '16px',        // 卡片
    'xl': '20px',        // 大卡片
    '2xl': '24px',       // 按钮
    'full': '9999px',    // Pill、圆形
  }
}
```

### 1.5 阴影规范

```javascript
{
  boxShadow: {
    'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
    'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
    'button': '0 2px 8px rgba(0, 0, 0, 0.15)',
    'float': '0 8px 30px rgba(0, 0, 0, 0.2)',
  }
}
```

---

## 2. 路由总表 (45 Pages)

### 2.1 Onboarding Flow (引导流程) - 12 pages
```
/onboarding/splash              # 启动页 (Logo动画)
/onboarding/welcome             # 欢迎页
/onboarding/login               # 登录
/onboarding/signup              # 注册
/onboarding/goal-selection      # 目标选择 ✓
/onboarding/food-restrictions   # 食物限制 ✓
/onboarding/activity-level      # 活动水平 ✓
/onboarding/meals-per-day       # 每日餐数 ✓
/onboarding/target-weight       # 目标体重 ✓
/onboarding/water-onboarding    # 饮水引导 ✓
/onboarding/plan-summary        # 计划总结 ✓
/onboarding/plan-confirmation   # 计划确认 ✓
```

### 2.2 Main Tab Pages (主Tab) - 4 pages
```
/home                           # 首页 (今日概览)
/plan                           # 计划 (日历视图)
/chat                           # 聊天 (AI教练)
/profile                        # 我的 (个人中心)
```

### 2.3 Home Sub-pages (首页子页) - 8 pages
```
/home/today                     # 今日详情
/home/water-tracker             # 饮水追踪
/home/weight-log                # 体重记录
/home/food-diary                # 饮食日记
/home/exercise-log              # 运动记录
/home/quick-add                 # 快速添加
/home/stats                     # 统计数据
/home/achievements              # 成就系统
```

### 2.4 Plan Sub-pages (计划子页) - 6 pages
```
/plan/calendar                  # 日历视图
/plan/meal-detail/:id           # 餐食详情
/plan/recipe/:id                # 食谱详情
/plan/shopping-list             # 购物清单
/plan/meal-prep                 # 备餐计划
/plan/favorites                 # 收藏食谱
```

### 2.5 Chat Sub-pages (聊天子页) - 4 pages
```
/chat/list                      # 对话列表
/chat/ai-coach                  # AI教练聊天
/chat/history                   # 历史记录
/chat/settings                  # 聊天设置
```

### 2.6 Profile Sub-pages (个人中心) - 11 pages
```
/profile/settings               # 设置
/profile/account                # 账户信息
/profile/notifications          # 通知设置
/profile/privacy                # 隐私设置
/profile/goals                  # 目标管理
/profile/preferences            # 偏好设置
/profile/subscription           # 订阅管理
/profile/help                   # 帮助中心
/profile/about                  # 关于我们
/profile/feedback               # 反馈
/profile/data-export            # 数据导出
```

---

## 3. 组件库 (Component Library)

### 3.1 基础组件 (Atoms)

#### Button 按钮
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text';
  size: 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}
```

#### Input 输入框
```typescript
interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  clearable?: boolean;
  passwordToggle?: boolean;
  error?: string;
  helper?: string;
}
```

#### Tag 标签
```typescript
interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

interface TagGroupProps {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}
```

### 3.2 复合组件 (Molecules)

#### NavBar 导航栏
```typescript
interface NavBarProps {
  title?: string;
  showBack?: boolean;
  showClose?: boolean;
  showMore?: boolean;
  transparent?: boolean;
  onBack?: () => void;
  rightElement?: ReactNode;
}
```

#### TabBar 底部导航
```typescript
interface TabItem {
  key: string;
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
}

interface TabBarProps {
  activeKey: string;
  items?: TabItem[];
  onChange: (key: string) => void;
}
```

#### Card 卡片
```typescript
interface CardProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
}
```

#### RadioCard 单选卡片
```typescript
interface RadioCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}
```

#### ListItem 列表项
```typescript
interface ListItemProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  divider?: boolean;
}
```

### 3.3 特殊组件 (Organisms)

#### ScrollPicker 滚轮选择器
```typescript
interface ScrollPickerProps {
  options: (string | number)[];
  value: string | number;
  onChange: (value: string | number) => void;
  unit?: string;
}
```

#### ProgressBar 进度条
```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  showLabel?: boolean;
}
```

#### MascotBubble 吉祥物气泡
```typescript
interface MascotBubbleProps {
  message: string;
  variant?: 'default' | 'celebration' | 'thinking';
}
```

---

## 4. 项目结构

```
health-app/
├── public/                     # 静态资源
│   ├── icons/                  # 图标资源
│   └── images/                 # 图片资源
├── src/
│   ├── components/             # 组件库
│   │   ├── atoms/              # 原子组件
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Tag.tsx
│   │   │   └── Icon.tsx
│   │   ├── molecules/          # 复合组件
│   │   │   ├── NavBar.tsx
│   │   │   ├── TabBar.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── RadioCard.tsx
│   │   │   └── ListItem.tsx
│   │   └── organisms/          # 特殊组件
│   │       ├── ScrollPicker.tsx
│   │       ├── ProgressBar.tsx
│   │       ├── MascotBubble.tsx
│   │       └── Chart.tsx
│   ├── pages/                  # 页面
│   │   ├── onboarding/         # 引导流程
│   │   ├── main/               # 主页面
│   │   └── sub/                # 子页面
│   ├── hooks/                  # 自定义Hooks
│   ├── stores/                 # 状态管理 (Zustand)
│   ├── utils/                  # 工具函数
│   ├── types/                  # TypeScript类型
│   ├── constants/              # 常量
│   └── styles/                 # 样式文件
├── tailwind.config.js          # Tailwind配置
├── tsconfig.json               # TypeScript配置
└── package.json                # 依赖配置
```

---

## 5. 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | React | ^18.2.0 |
| 路由 | React Router DOM | ^6.20.0 |
| 样式 | Tailwind CSS | ^3.3.6 |
| 动画 | Framer Motion | ^10.16.0 |
| 图标 | Lucide React | ^0.294.0 |
| 构建 | Vite | ^5.0.0 |
| 类型 | TypeScript | ^5.3.0 |
| 状态 | Zustand (可选) | - |
| 移动端 | Capacitor (打包) | - |

---

## 6. 已完成的页面

| 页面 | 路径 | 状态 |
|------|------|------|
| 目标选择 | /goal-selection | ✅ 已完成 |
| 食物限制 | /food-restrictions | ✅ 已完成 |
| 活动水平 | /activity-level | ✅ 已完成 |
| 每日餐数 | /meals-per-day | ✅ 已完成 |
| 饮水引导 | /water-onboarding | ✅ 已完成 |
| 登录 | /login | ✅ 已完成 |
| 首页框架 | /home | ✅ 已完成 |

---

## 7. 下一步开发计划

### Phase 2 - 核心功能页 (Next)
- [ ] Home Dashboard (首页仪表盘)
- [ ] Water Tracker (饮水追踪)
- [ ] Weight Log (体重记录)
- [ ] Plan Calendar (计划日历)

### Phase 3 - 社交与扩展
- [ ] AI Chat (AI教练聊天)
- [ ] Recipe Detail (食谱详情)
- [ ] Profile Settings (个人设置)

---

*Generated for Health App Project*
