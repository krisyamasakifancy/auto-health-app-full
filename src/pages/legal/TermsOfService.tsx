import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components';
import { FileText, Shield, Users, Lock, Cookie, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: '服务条款',
      content: `欢迎使用 NutriLife（"我们"、"我们的"或"本应用"）。本服务条款（"条款"）规范您对我们提供的移动应用、网站及相关服务（统称"服务"）的访问和使用。

通过下载、安装、访问或使用我们的服务，您确认已阅读、理解并同意受这些条款的约束。如果您不同意这些条款，请勿使用我们的服务。`,
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: '账户注册',
      content: `要使用我们服务的某些功能，您需要注册一个账户。注册时，您同意提供准确、完整和最新的信息。您有责任保护您的账户凭据安全，并对您账户下的所有活动负责。

您必须年满 13 岁才能使用我们的服务。如果您未满 18 岁，请在父母或监护人的监督下使用。`,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: '健康免责声明',
      content: `NutriLife 提供的所有内容（包括饮食建议、运动计划和营养信息）仅供参考，不构成医疗建议、诊断或治疗。

在开始任何饮食或运动计划之前，请咨询合格的医疗保健提供者。如果您有任何健康状况或正在服用药物，请在使用我们的服务前咨询医生。`,
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: '数据隐私',
      content: `我们重视您的隐私。您的个人数据和健康信息将按照我们的隐私政策进行处理。我们采取合理的安全措施来保护您的数据，但请注意，互联网传输永远不可能完全安全。`,
    },
    {
      icon: <Cookie className="w-5 h-5" />,
      title: '订阅与付款',
      content: `我们的某些服务需要付费订阅。订阅将按您选择的周期自动续费，除非您取消。您可以通过账户设置管理您的订阅。

所有付款均通过第三方支付处理商进行。我们不在我们的服务器上存储您的完整支付信息。`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: '联系我们',
      content: `如果您对这些条款有任何疑问，请通过以下方式联系我们：

邮箱：legal@nutrilife.app
地址：北京市朝阳区健康大厦 18 层
客服热线：400-888-8888`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar title="用户协议" showBack={true} />

      <div className="pt-20 px-4 pb-8">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            服务条款
          </h1>
          <p className="text-text-muted">
            最后更新：2024年1月15日
          </p>
        </motion.div>

        {/* 内容区块 */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary">
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
          className="mt-8 p-4 bg-yellow-50 rounded-xl text-sm text-yellow-700"
        >
          继续使用我们的服务即表示您同意这些条款。我们会不时更新这些条款，更新后的条款将在应用中发布。
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
