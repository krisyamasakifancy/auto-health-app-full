import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar, Button } from '../../components';
import { 
  Download, 
  FileSpreadsheet,
  FileJson,
  FileText,
  Calendar,
  Check,
  Loader2,
  ChevronRight
} from 'lucide-react';

const DataExport: React.FC = () => {
  const navigate = useNavigate();
  const [format, setFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [dataTypes, setDataTypes] = useState({
    weight: true,
    food: true,
    exercise: true,
    water: true,
    goals: true,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const formats = [
    { id: 'csv', name: 'CSV 表格', icon: <FileSpreadsheet className="w-5 h-5" />, desc: '适合 Excel 分析' },
    { id: 'json', name: 'JSON 数据', icon: <FileJson className="w-5 h-5" />, desc: '结构化数据格式' },
    { id: 'pdf', name: 'PDF 报告', icon: <FileText className="w-5 h-5" />, desc: '可视化图表报告' },
  ] as const;

  const dateRanges = [
    { id: '7d', label: '最近7天' },
    { id: '30d', label: '最近30天' },
    { id: '90d', label: '最近90天' },
    { id: 'all', label: '全部数据' },
  ] as const;

  const handleExport = async () => {
    setIsExporting(true);
    
    // 模拟导出过程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    setIsComplete(true);
    
    setTimeout(() => {
      setIsComplete(false);
    }, 3000);
  };

  const toggleDataType = (type: keyof typeof dataTypes) => {
    setDataTypes({ ...dataTypes, [type]: !dataTypes[type] });
  };

  const selectedCount = Object.values(dataTypes).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background pb-32">
      <NavBar title="数据导出" showBack={true} />

      <div className="pt-14">
        <div className="px-6 py-6 space-y-6">
          {/* 格式选择 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-bold text-text-primary mb-4">选择格式</h3>
            
            <div className="space-y-3">
              {formats.map((f, index) => (
                <motion.div
                  key={f.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setFormat(f.id)}
                  className={`bg-white rounded-2xl p-4 shadow-card flex items-center justify-between cursor-pointer transition-all ${
                    format === f.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      format === f.id ? 'bg-primary-100 text-primary' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{f.name}</p>
                      <p className="text-sm text-text-muted">{f.desc}</p>
                    </div>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    format === f.id ? 'border-primary bg-primary' : 'border-gray-300'
                  }`}>
                    {format === f.id && <div className="w-3 h-3 bg-white rounded-full" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 时间范围 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-text-primary mb-4">时间范围</h3>
            
            <div className="grid grid-cols-4 gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setDateRange(range.id)}
                  className={`py-3 rounded-xl text-sm font-medium transition-colors ${
                    dateRange === range.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-secondary shadow-card'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 数据类型 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary">选择数据</h3>
              <span className="text-sm text-text-muted">已选 {selectedCount} 项</span>
            </div>
            
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              {[
                { id: 'weight', label: '体重记录', count: '45条记录' },
                { id: 'food', label: '饮食记录', count: '128条记录' },
                { id: 'exercise', label: '运动记录', count: '32条记录' },
                { id: 'water', label: '饮水记录', count: '156条记录' },
                { id: 'goals', label: '目标完成情况', count: '12个目标' },
              ].map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => toggleDataType(item.id as keyof typeof dataTypes)}
                  className={`flex items-center justify-between p-4 cursor-pointer ${
                    index !== 4 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div>
                    <p className="font-medium text-text-primary">{item.label}</p>
                    <p className="text-sm text-text-muted">{item.count}</p>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                    dataTypes[item.id as keyof typeof dataTypes]
                      ? 'bg-primary'
                      : 'border-2 border-gray-300'
                  }`}>
                    {dataTypes[item.id as keyof typeof dataTypes] && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 导出说明 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 rounded-2xl p-4"
          >
            <p className="text-sm text-text-secondary">
              导出的数据将发送至您的注册邮箱，同时可在此页面直接下载。数据导出可能需要几分钟时间，请耐心等待。
            </p>
          </motion.div>
        </div>
      </div>

      {/* 导出按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom">
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-green-500 text-white rounded-2xl py-4 flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              导出成功，请查看邮箱
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="primary"
                size="full"
                disabled={isExporting || selectedCount === 0}
                onClick={handleExport}
              >
                {isExporting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    正在导出...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    导出数据
                  </span>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DataExport;
