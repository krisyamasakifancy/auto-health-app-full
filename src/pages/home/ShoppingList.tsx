import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Plus, 
  Trash2, 
  Check,
  ShoppingBag,
  Utensils,
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
  recipe?: string;
}

const ShoppingList: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: '鸡胸肉', category: '肉类', quantity: '500g', checked: false, recipe: '藜麦沙拉' },
    { id: '2', name: '藜麦', category: '谷物', quantity: '200g', checked: false, recipe: '藜麦沙拉' },
    { id: '3', name: '生菜', category: '蔬菜', quantity: '1颗', checked: true, recipe: '藜麦沙拉' },
    { id: '4', name: '小番茄', category: '蔬菜', quantity: '200g', checked: false, recipe: '藜麦沙拉' },
    { id: '5', name: '希腊酸奶', category: '乳制品', quantity: '2盒', checked: false },
    { id: '6', name: '燕麦', category: '谷物', quantity: '500g', checked: true },
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: '其他',
      quantity: '1份',
      checked: false,
    };
    
    setItems([...items, newItem]);
    setNewItemName('');
    setShowAddInput(false);
  };

  const categories = Array.from(new Set(items.map(item => item.category)));
  
  const checkedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;

  // 推荐购买（基于食谱）
  const recipeSuggestions = [
    { name: '藜麦沙拉', items: 4, checked: 1 },
    { name: '鸡胸肉意面', items: 5, checked: 0 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <NavBar 
        title="购物清单" 
        showBack={true}
        rightElement={
          <button 
            onClick={() => setItems(items.filter(i => !i.checked))}
            className="p-2 text-text-muted"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        }
      />

      <div className="pt-14">
        {/* 进度概览 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-text-primary px-6 py-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70">购物进度</p>
              <p className="text-3xl font-bold">{checkedCount}/{totalCount}</p>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <p className="text-white/70 text-sm mt-2">已完成 {Math.round(progress)}%</p>
        </motion.div>

        <div className="px-6 py-6 space-y-6">
          {/* 按食谱购买 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">基于食谱</h3>
              <button className="text-primary text-sm">查看全部</button>
            </div>

            <div className="space-y-3">
              {recipeSuggestions.map((recipe, index) => (
                <motion.div
                  key={recipe.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{recipe.name}</p>
                      <p className="text-sm text-text-muted">
                        {recipe.checked}/{recipe.items} 项已购买
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 购物清单 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">购物清单</h3>
              <span className="text-sm text-text-muted">{items.length} 项</span>
            </div>

            {categories.map((category, categoryIndex) => (
              <div key={category} className="mb-6">
                <h4 className="text-sm text-text-muted mb-3">{category}</h4>
                <div className="space-y-2">
                  {items
                    .filter(item => item.category === category)
                    .map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + categoryIndex * 0.1 + itemIndex * 0.05 }}
                        className="bg-white rounded-xl p-4 shadow-card flex items-center gap-4"
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            item.checked 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}
                        >
                          {item.checked && <Check className="w-4 h-4 text-white" />}
                        </button>

                        <div className="flex-1">
                          <p className={`font-medium ${item.checked ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                            {item.name}
                          </p>
                          {item.recipe && (
                            <p className="text-xs text-text-muted">用于: {item.recipe}</p>
                          )}
                        </div>

                        <span className="text-sm text-text-secondary">{item.quantity}</span>

                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-2 text-text-muted hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                </div>
              </div>
            ))}

            {/* 添加新物品 */}
            {showAddInput ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 shadow-card flex items-center gap-4"
              >
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="输入物品名称..."
                  className="flex-1 outline-none text-text-primary"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <button
                  onClick={addItem}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
                >
                  添加
                </button>
                <button
                  onClick={() => setShowAddInput(false)}
                  className="text-text-muted"
                >
                  取消
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowAddInput(true)}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-text-muted flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="w-5 h-5" />
                添加物品
              </button>
            )}
          </motion.div>

          {/* AI 推荐 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 text-white"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold mb-1">AI 购物建议</h4>
                <p className="text-white/80 text-sm mb-3">
                  根据你的饮食计划，建议本周购买三文鱼、牛油果和蓝莓，补充优质蛋白和抗氧化剂。
                </p>
                <button className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  添加到清单
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
