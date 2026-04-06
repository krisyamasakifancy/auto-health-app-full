import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NavBar, Input, Button, Card } from '../../components';
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Flame,
  Clock,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'food' | 'recipe' | 'exercise';
  name: string;
  calories?: number;
  duration?: number;
  image: string;
  tags: string[];
  isFavorite?: boolean;
}

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'food' | 'recipe' | 'exercise'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'calories' | 'time'>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  // 模拟搜索结果
  const results: SearchResult[] = [
    { id: '1', type: 'food', name: '鸡胸肉', calories: 165, image: '🍗', tags: ['高蛋白', '低脂'], isFavorite: true },
    { id: '2', type: 'food', name: '燕麦', calories: 389, image: '🌾', tags: ['高纤维', '全谷物'] },
    { id: '3', type: 'recipe', name: '鸡胸肉沙拉', calories: 380, duration: 15, image: '🥗', tags: ['高蛋白', '快手菜'], isFavorite: true },
    { id: '4', type: 'recipe', name: '牛油果吐司', calories: 320, duration: 10, image: '🥑', tags: ['素食', '早餐'] },
    { id: '5', type: 'exercise', name: '慢跑', calories: 300, duration: 30, image: '🏃', tags: ['有氧', '燃脂'] },
    { id: '6', type: 'exercise', name: '瑜伽', calories: 150, duration: 45, image: '🧘', tags: ['柔韧', '放松'] },
    { id: '7', type: 'food', name: '三文鱼', calories: 208, image: '🐟', tags: ['Omega-3', '高蛋白'] },
    { id: '8', type: 'recipe', name: '藜麦碗', calories: 450, duration: 25, image: '🍱', tags: ['高纤维', '均衡'] },
  ];

  const filteredResults = results.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.includes(searchQuery));
    return matchesFilter && matchesSearch;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === 'calories') return (b.calories || 0) - (a.calories || 0);
    if (sortBy === 'time') return (a.duration || 0) - (b.duration || 0);
    return 0;
  });

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'food') {
      navigate(`/food-detail/${result.id}`);
    } else if (result.type === 'recipe') {
      navigate(`/plan/meal-detail/${result.id}`);
    } else if (result.type === 'exercise') {
      navigate(`/exercise-detail/${result.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="搜索结果" showBack={true} />
      
      <div className="pt-20 px-4 pb-8">
        {/* 搜索栏 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索食物、食谱、运动..."
              className="w-full pl-12 pr-12 py-3 bg-white rounded-2xl border border-gray-200 focus:border-primary focus:outline-none"
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${showFilters ? 'bg-primary text-white' : 'text-text-muted hover:bg-gray-100'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 筛选标签 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-4 overflow-x-auto pb-2"
        >
          {[
            { id: 'all', label: '全部' },
            { id: 'food', label: '食物' },
            { id: 'recipe', label: '食谱' },
            { id: 'exercise', label: '运动' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-text-secondary hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* 排序和结果数 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-between mb-4"
        >
          <span className="text-text-muted text-sm">
            找到 {sortedResults.length} 个结果
          </span>
          <button 
            onClick={() => setSortBy(sortBy === 'relevance' ? 'calories' : 'relevance')}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortBy === 'relevance' ? '相关度' : sortBy === 'calories' ? '热量' : '时间'}
          </button>
        </motion.div>

        {/* 结果列表 */}
        <div className="space-y-3">
          {sortedResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => handleResultClick(result)}
              className="bg-white rounded-2xl p-4 shadow-card cursor-pointer hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-3xl">
                  {result.image}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">{result.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-primary-50 text-primary text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {result.isFavorite && (
                      <span className="text-yellow-400">★</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                    {result.calories && (
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {result.calories} kcal
                      </span>
                    )}
                    {result.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        {result.duration} min
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted" />
              </div>
            </motion.div>
          ))}
        </div>

        {sortedResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-text-secondary">未找到相关结果</p>
            <p className="text-text-muted text-sm mt-1">换个关键词试试</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
