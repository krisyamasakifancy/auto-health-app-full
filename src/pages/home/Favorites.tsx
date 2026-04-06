import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { 
  Heart, 
  Trash2, 
  Clock,
  Flame,
  ChefHat,
  Search,
  Filter,
  Grid3X3,
  List,
  Star
} from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  image: string;
  calories: number;
  time: number;
  difficulty: '简单' | '中等' | '困难';
  tags: string[];
  rating: number;
  isFavorite: boolean;
  category: string;
}

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [recipes, setRecipes] = useState<Recipe[]>([
    { 
      id: '1', 
      name: '牛油果鸡胸肉沙拉', 
      image: '🥗', 
      calories: 380, 
      time: 15, 
      difficulty: '简单', 
      tags: ['高蛋白', '低脂'],
      rating: 4.8,
      isFavorite: true,
      category: '沙拉'
    },
    { 
      id: '2', 
      name: '三文鱼藜麦碗', 
      image: '🍱', 
      calories: 450, 
      time: 25, 
      difficulty: '中等', 
      tags: ['Omega-3', '高纤维'],
      rating: 4.9,
      isFavorite: true,
      category: '主食'
    },
    { 
      id: '3', 
      name: '希腊酸奶碗', 
      image: '🥣', 
      calories: 280, 
      time: 5, 
      difficulty: '简单', 
      tags: ['早餐', '高蛋白'],
      rating: 4.7,
      isFavorite: true,
      category: '早餐'
    },
    { 
      id: '4', 
      name: '香煎牛排配蔬菜', 
      image: '🥩', 
      calories: 520, 
      time: 30, 
      difficulty: '中等', 
      tags: ['高蛋白', '生酮友好'],
      rating: 4.6,
      isFavorite: true,
      category: '主菜'
    },
    { 
      id: '5', 
      name: '蓝莓燕麦粥', 
      image: '🫐', 
      calories: 320, 
      time: 10, 
      difficulty: '简单', 
      tags: ['早餐', '高纤维'],
      rating: 4.5,
      isFavorite: true,
      category: '早餐'
    },
    { 
      id: '6', 
      name: '泰式虾仁沙拉', 
      image: '🦐', 
      calories: 280, 
      time: 20, 
      difficulty: '简单', 
      tags: ['低脂', '清爽'],
      rating: 4.8,
      isFavorite: true,
      category: '沙拉'
    },
  ]);

  const filters = [
    { id: 'all', name: '全部', count: recipes.length },
    { id: 'breakfast', name: '早餐', count: recipes.filter(r => r.category === '早餐').length },
    { id: 'salad', name: '沙拉', count: recipes.filter(r => r.category === '沙拉').length },
    { id: 'main', name: '主菜', count: recipes.filter(r => r.category === '主菜').length },
  ];

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    ));
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'breakfast' && recipe.category === '早餐') ||
      (activeFilter === 'salad' && recipe.category === '沙拉') ||
      (activeFilter === 'main' && recipe.category === '主菜');
    
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-6">
      <NavBar 
        title="我的收藏" 
        showBack={true}
        rightElement={
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2"
          >
            {viewMode === 'grid' ? (
              <List className="w-5 h-5 text-text-primary" />
            ) : (
              <Grid3X3 className="w-5 h-5 text-text-primary" />
            )}
          </button>
        }
      />

      <div className="pt-14">
        {/* 搜索栏 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索收藏的食谱..."
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-2xl outline-none focus:border-primary text-text-primary"
            />
          </div>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 pb-4 flex gap-2 overflow-x-auto"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-secondary shadow-card'
              }`}
            >
              {filter.name}
              <span className="ml-1 opacity-70">({filter.count})</span>
            </button>
          ))}
        </motion.div>

        <div className="px-6 py-4">
          {/* 网格视图 */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/plan/meal-detail/${recipe.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-card"
                >
                  <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative"
                  >
                    <span className="text-5xl">{recipe.image}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-text-primary mb-2 truncate">{recipe.name}</h3>
                    
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {recipe.time}分钟
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {recipe.calories}kcal
                      </span>
                    </div>
                    
                    <div className="flex gap-1 mt-3">
                      {recipe.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-text-muted text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* 列表视图 */
            <div className="space-y-3">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/plan/meal-detail/${recipe.id}`)}
                  className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-3xl"
                  >
                    {recipe.image}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary mb-1">{recipe.name}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-text-muted mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.time}分钟
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {recipe.calories}kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        {recipe.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{recipe.rating}</span>
                      <div className="flex gap-1 ml-2">
                        {recipe.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-text-muted text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="p-2"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* 空状态 */}
          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-text-muted">暂无收藏的食谱</p>
              <button 
                onClick={() => navigate('/plan/meal-detail/1')}
                className="mt-4 text-primary font-medium"
              >
                去浏览食谱
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
