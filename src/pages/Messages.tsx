import React from 'react';
import { motion } from 'framer-motion';

export const Messages = () => (
  <div className="page-container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-h2 text-text-primary mb-4">Messages</h1>
      <p className="text-body text-text-secondary">Chat with your nutrition coach here.</p>
    </motion.div>
  </div>
);

export default Messages;
