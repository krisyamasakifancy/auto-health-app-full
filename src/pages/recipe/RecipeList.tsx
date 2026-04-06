import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  ChefHat, 
  Clock, 
  Flame, 
  Users, 
  Star,
  ChevronRight,
  Heart,
  Share2,
  Plus
} from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  image: string;
  calories: number;
  time: number;
  servings: number;
  difficulty: '简单' | '中等' | '困难';
  rating: number;
  reviews: number;
  author: string;
  tags: string[];
}

const RecipeList: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: '全部', icon: '🍽️' },
    { id: 'breakfast', name: '早餐', icon: '🍳' },
    { id: 'lunch', name: '午餐', icon: '🍱' },
    { id: 'dinner', name: '晚餐', icon: '🥗' },
    { id: 'snack', name: '加餐', icon: '🍎' },
    { id: 'dessert', name: '甜品', icon: '🧁' },
  ];

  const [activeCategory, setActiveCategory] = React.useState('all');

  const recipes: Recipe[] = [
    {
      id: '1',
      name: '牛油果鸡胸肉沙拉',
      image: '🥗',
      calories: 380,
      time: 15,
      servings: 2,
      difficulty: '简单',
      rating: 4.8,
      reviews: 128,
      author: '营养师小王',
      tags: ['高蛋白', '低脂'],
    },
    {
      id: '2',
      name: '三文鱼藜麦碗',
      image: '🍱',
      calories: 450,
      time: 25,
      servings: 1,
      difficulty: '中等',
      rating: 4.9,
      reviews: 96,
      author: '健康生活家',
      tags: ['Omega-3', '高纤维'],
    },
    {
      id: '3',
      name: '燕麦蓝莓酸奶杯',
      image: '🥣',
      calories: 280,
      time: 10,
      servings: 1,
      difficulty: '简单',
      rating: 4.7,
      reviews: 215,
      author: '早餐达人',
      tags: ['快手', '益生菌'],
    },
    {
      id: '4',
      name: '香煎鸡胸配蔬菜',
      image: '🍗',
      calories: 420,
      time: 30,
      servings: 2,
      difficulty: '中等',
      rating: 4.6,
      reviews: 78,
      author: '健身厨男',
      tags: ['增肌', '低脂'],
    },
    {
      id: '5',
      name: '意式蔬菜浓汤',
      image: '🍲',
      calories: 220,
      time: 40,
      servings: 4,
      difficulty: '简单',
      rating: 4.5,
      reviews: 156,
      author: '意式厨房',
      tags: ['素食', '暖胃'],
    },
    {
      id: '6',
      name: '日式照烧鸡饭',
      image: '🍛',
      calories: 520,
      time: 35,
      servings: 2,
      difficulty: '中等',
      rating: 4.8,
      reviews: 203,
      author: '日式料理',
      tags: ['下饭', '蛋白质'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar 
        title="健康食谱" 
        showBack={true}
        rightElement={
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share2 className="w-5 h-5 text-text-primary" />
          </button>
        }
      />

      <div className="pt-20 pb-8">
        {/* 分类标签 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 px-4 mb-6 overflow-x-auto pb-2"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-secondary hover:bg-gray-100'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* 食谱网格 */}
        <div className="px-4 grid grid-cols-2 gap-4">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/plan/meal-detail/${recipe.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-card cursor-pointer hover:shadow-card-hover transition-shadow"
            >
              {/* 图片区域 */}
              <div className="relative h-32 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-5xl">
                {recipe.image}
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white">
                  <Heart className="w-4 h-4 text-text-muted" />
                </button>
              </div>

              {/* 内容区域 */}
              <div className="p-3">
                <h3 className="font-semibold text-text-primary text-sm mb-1 truncate">{recipe.name}</h3>
                
                <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                  <span className="flex items-center gap-0.5">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {recipe.calories}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3 text-blue-500" />
                    {recipe.time}min
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{recipe.rating}</span>
                    <span className="text-xs text-text-muted">({recipe.reviews})</span>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    recipe.difficulty === '简单' ? 'bg-green-100 text-green-600' :
                    recipe.difficulty === '中等' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 加载更多 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Button variant="outline" size="md">
            加载更多食谱
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeList;
