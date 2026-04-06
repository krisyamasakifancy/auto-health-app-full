import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { Shield, Eye, Database, Share2, Lock, Trash2, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: '我们收集的信息',
      content: `我们收集以下类型的信息：

• 账户信息：姓名、邮箱、手机号码
• 身体数据：身高、体重、年龄、性别
• 健康数据：饮食记录、运动记录、体重变化
• 设备信息：设备型号、操作系统版本、IP地址
• 使用数据：应用功能使用情况、访问时间`,
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: '信息使用方式',
      content: `我们使用您的信息用于：

• 提供和改进我们的服务
• 生成个性化的饮食和运动建议
• 计算营养摄入和消耗
• 发送服务通知和健康提醒
• 分析使用趋势以优化用户体验
• 防止欺诈和滥用`,
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: '数据安全',
      content: `我们采用业界标准的安全措施保护您的数据：

• 数据加密传输（TLS/SSL）
• 敏感数据加密存储
• 严格的访问控制和权限管理
• 定期安全审计和漏洞扫描

尽管我们尽力保护您的数据，但互联网传输永远不可能完全安全。`,
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      title: '信息共享',
      content: `我们不会出售您的个人信息。仅在以下情况分享数据：

• 获得您的明确同意
• 与服务提供商合作（如云服务、支付处理）
• 遵守法律要求或政府请求
• 保护我们的权利和用户安全

所有第三方合作伙伴均受保密协议约束。`,
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      title: '您的权利',
      content: `您对您的数据拥有以下权利：

• 访问权：查看我们持有的您的数据
• 更正权：更正不准确的信息
• 删除权：请求删除您的账户和数据
• 导出权：导出您的健康数据
• 撤回同意：随时撤回数据处理同意

您可以通过应用设置或联系我们行使这些权利。`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: '联系我们',
      content: `如果您对隐私政策有任何疑问，请联系：

邮箱：privacy@nutrilife.app
数据保护官：dpo@nutrilife.app
地址：北京市朝阳区健康大厦 18 层

我们会在 30 个工作日内回复您的请求。`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="隐私政策" showBack={true} />

      <div className="pt-20 px-4 pb-8">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            隐私政策
          </h1>
          <p className="text-text-muted">
            最后更新：2024年1月15日
          </p>
        </motion.div>

        {/* 简介 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 rounded-2xl p-5 mb-6"
        >
          <p className="text-blue-800 text-sm leading-relaxed">
            NutriLife 重视您的隐私。本隐私政策说明我们如何收集、使用、存储和保护您的个人信息。使用我们的服务即表示您同意本政策所述的做法。
          </p>
        </motion.div>

        {/* 内容区块 */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  {section.icon}
                </div>
                <h2 className="font-semibold text-text-primary">{section.title}</h2>
              </div>
              <div className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-green-50 rounded-xl text-sm text-green-700"
        >
          我们承诺保护您的隐私。如需了解更多信息，请查看完整的隐私政策文档或联系我们的数据保护团队。
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
