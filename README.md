# 🌿 NutriLife - 智能健康管理应用

> 45页全功能健康应用，1:1 复刻设计稿，完整工程化交付

![GitHub](https://img.shields.io/github/license/krisyamasakifancy/auto-health-app-full)
![GitHub last commit](https://img.shields.io/github/last-commit/krisyamasakifancy/auto-health-app-full)
![GitHub repo size](https://img.shields.io/github/repo-size/krisyamasakifancy/auto-health-app-full)

## 🚀 在线预览

**GitHub 仓库**: https://github.com/krisyamasakifancy/auto-health-app-full

## 📦 快速开始

```bash
# 克隆仓库
git clone https://github.com/krisyamasakifancy/auto-health-app-full.git
cd auto-health-app-full

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🛠 技术栈

- **框架**: Vite + React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图表**: Recharts
- **图标**: Lucide React
- **路由**: React Router DOM

## 📱 页面清单（45页）

### 第一批：用户基础模块（1-15页）
- Splash 启动页
- Welcome 欢迎页
- Login 登录页
- Signup 注册页
- GoalSelection 目标选择
- FoodRestrictions 饮食限制
- ActivityLevel 活动水平
- MealsPerDay 每日餐数
- WaterOnboarding 饮水引导
- TargetWeight 目标体重
- PlanSummary 计划摘要
- PlanConfirmation 计划确认

### 第二批：核心业务模块（16-35页）
- HomeDashboard 首页仪表盘
- WaterTracker 饮水追踪
- WeightLog 体重记录
- FoodDiary 饮食日记
- QuickAdd 快速添加
- ExerciseLog 运动记录
- ShoppingList 购物清单
- Favorites 收藏食谱
- Achievements 成就系统
- PlanCalendar 计划日历
- MealDetail 餐食详情
- AIChat AI教练聊天
- SearchResults 搜索结果
- RecipeList 食谱列表
- FoodDetail 食物详情
- ExerciseDetail 运动详情
- GoalManagement 目标管理

### 第三批：功能闭环模块（36-45页）
- Subscription 订阅管理
- Payment 支付页面
- PaymentSuccess 支付成功
- PaymentFailed 支付失败
- DataExport 数据导出
- PrivacySettings 隐私设置
- HelpCenter 帮助中心
- TermsOfService 用户协议
- PrivacyPolicy 隐私政策

## ✨ 核心功能

- ✅ 完整的用户注册/登录流程
- ✅ 个性化健康目标设置
- ✅ 饮食记录与追踪
- ✅ 运动记录与计时器
- ✅ 体重记录与图表可视化
- ✅ 饮水追踪与水波纹动画
- ✅ AI教练聊天功能
- ✅ 食谱浏览与收藏
- ✅ 成就系统
- ✅ 订阅与支付流程
- ✅ 数据导出
- ✅ 隐私设置
- ✅ 搜索功能
- ✅ 表单验证
- ✅ 页面转场动画

## 🎨 设计系统

### 主色调
- Primary: `#10B981` (Emerald Green)
- Background: `#E8E8F0`
- Text Primary: `#1A1A1A`
- Text Secondary: `#666666`

### 核心组件
- Button: 5种变体
- Input: 带标签、错误提示
- NavBar: 支持返回/关闭/更多
- TabBar: 底部导航
- Card: 卡片容器
- ListItem: 列表项

## 🚀 部署到 Vercel

### 方法一：GitHub 一键导入

1. 访问 https://vercel.com
2. 点击 "Add New Project"
3. 选择 `auto-health-app-full` 仓库
4. 点击 "Import"
5. 框架预设选择 "Vite"
6. 点击 "Deploy"

### 方法二：Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### 方法三：GitHub Actions 自动部署

在项目根目录创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📁 项目结构

```
auto-health-app-full/
├── src/
│   ├── pages/           # 45个页面
│   │   ├── home/        # 首页子页面
│   │   ├── plan/        # 计划子页面
│   │   ├── profile/     # 个人中心
│   │   ├── chat/        # AI聊天
│   │   ├── search/      # 搜索
│   │   ├── recipe/      # 食谱
│   │   ├── food/        # 食物
│   │   ├── exercise/    # 运动
│   │   ├── goal/        # 目标
│   │   ├── subscription/# 订阅
│   │   ├── settings/    # 设置
│   │   ├── help/        # 帮助
│   │   └── legal/       # 法律
│   ├── components/      # 原子组件
│   ├── context/         # 全局状态
│   └── App.tsx          # 路由配置
├── dist/                # 构建输出
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── vercel.json          # Vercel 配置
```

## 📝 License

MIT License © 2024 NutriLife

---

**由 OpenClaw + Kimi 全自动化工程交付** 🤖
