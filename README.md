# Health App - React + Tailwind CSS

一款健康饮食追踪 App 的 React 实现，基于 46 张设计图还原。

## 📁 项目结构

```
health-app/
├── src/
│   ├── components/          # 基础组件库
│   │   ├── Button.tsx      # 按钮组件
│   │   ├── NavBar.tsx      # 导航栏组件
│   │   ├── TabBar.tsx      # 底部Tab栏
│   │   ├── Card.tsx        # 卡片组件
│   │   ├── Input.tsx       # 输入框组件
│   │   └── index.ts        # 组件导出
│   ├── pages/              # 页面组件
│   │   ├── index.tsx       # 示例页面
│   │   ├── GoalSelection.tsx # 目标选择页
│   │   └── Login.tsx       # 登录页
│   ├── hooks/              # 自定义Hooks
│   ├── utils/              # 工具函数
│   ├── assets/             # 静态资源
│   ├── App.tsx             # 主应用
│   ├── main.tsx            # 入口文件
│   └── index.css           # 全局样式
├── public/                 # 公共资源
├── index.html              # HTML模板
├── tailwind.config.js      # Tailwind配置
├── postcss.config.js       # PostCSS配置
├── vite.config.ts          # Vite配置
├── tsconfig.json           # TypeScript配置
└── package.json            # 依赖配置
```

## 🎨 设计规范

### 颜色系统
| 名称 | 色值 | 用途 |
|------|------|------|
| Primary | `#10B981` | 主色调、选中状态 |
| Background | `#E8E8F0` | 页面背景 |
| Text Primary | `#1A1A1A` | 主文字、按钮背景 |
| Text Secondary | `#6B7280` | 次要文字 |
| Accent Orange | `#F97316` | 强调色 |

### 字体规范
- **H1**: 32px, font-weight: 700
- **H2**: 28px, font-weight: 700
- **H3**: 24px, font-weight: 600
- **Body**: 16px, font-weight: 400
- **Caption**: 12px, font-weight: 400

### 间距规范
- 页面边距: 24px (px-6)
- 卡片内边距: 16px (p-4)
- 元素间距: 12px (gap-3)
- 区块间距: 32px (space-y-8)

### 圆角规范
- 小: 8px (rounded-lg)
- 中: 12px (rounded-xl)
- 大: 16px (rounded-2xl)
- 全圆: 9999px (rounded-full)

## 🚀 快速开始

### 1. 安装依赖
```bash
cd health-app
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

## 📦 组件使用示例

### Button 按钮
```tsx
import { Button } from './components';

// 主要按钮
<Button variant="primary" size="full">Get Started</Button>

// 轮廓按钮
<Button variant="outline" size="md">Cancel</Button>

// 带图标
<Button variant="primary" icon={<ArrowRight/>�? iconPosition="right">Next</Button>
```

### Card 卡片
```tsx
import { Card } from './components';

// 基础卡片
<Card>Content</Card>

// 可选中卡片
<Card
  selectable
  selected={isSelected}
  onClick={handleClick}
  icon={<Icon/>�? title="Title"
  description="Description"
/>
```

### Input 输入框
```tsx
import { Input } from './components';

<Input
  label="Email"
  placeholder="Enter email"
  icon={<Mail/>�? clearable
  passwordToggle
  error="Error message"
/>
```

### NavBar 导航栏
```tsx
import { NavBar } from './components';

<NavBar
  title="Page Title"
  showBack={true}
  showClose={false}
  onBack={handleBack}
/>
```

### TabBar 底部导航
```tsx
import { TabBar } from './components';

const [activeTab, setActiveTab] = useState('home');

<TabBar
  activeKey={activeTab}
  onChange={setActiveTab}
/>
```

## 🔧 自定义配置

### Tailwind 主题扩展
在 `tailwind.config.js` 中修改主题配置：

```js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#你的主色',
      },
    },
  },
}
```

## 📱 移动端适配

- 使用 `viewport-fit=cover` 适配刘海屏
- 支持安全区域 `env(safe-area-inset-*)`
- 禁止缩放 `maximum-scale=1.0, user-scalable=no`
- 触摸反馈 `active:scale-95`

## 🎯 后续集成

1. **图片资源**: 将设计图切图放入 `src/assets/images/`
2. **页面开发**: 在 `src/pages/` 中添加新页面
3. **路由配置**: 在 `App.tsx` 中配置路由
4. **状态管理**: 可集成 Zustand 或 Redux Toolkit

## 📄 打包成 App

### Android (Capacitor)
```bash
npm install @capacitor/core @capacitor/android
npx cap add android
npx cap open android
```

### iOS (Capacitor)
```bash
npm install @capacitor/core @capacitor/ios
npx cap add ios
npx cap open ios
```
