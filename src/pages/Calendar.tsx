import React from 'react';
import { motion } from 'framer-motion';

export const Calendar = () => (
  <div className="page-container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-h2 text-text-primary mb-4">Calendar</h1>
      <p className="text-body text-text-secondary">Your meal plan and schedule will appear here.</p>
    </motion.div>
  </div>
);

export default Calendar;
