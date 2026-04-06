import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center"
      >
        {/* Mascot */}
        <div className="w-32 h-32 mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
            <circle cx="50" cy="50" r="45" fill="#60A5FA" />
            <ellipse cx="50" cy="55" rx="25" ry="22" fill="#E5E7EB" />
            <ellipse cx="35" cy="50" rx="8" ry="7" fill="#1A1A1A" />
            <ellipse cx="65" cy="50" rx="8" ry="7" fill="#1A1A1A" />
            <circle cx="35" cy="50" r="3" fill="white" />
            <circle cx="65" cy="50" r="3" fill="white" />
            <ellipse cx="50" cy="62" rx="4" ry="3" fill="#1A1A1A" />
            <path d="M45 70 Q50 75 55 70" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-h2 text-text-primary mb-4">Welcome to Health App</h1>
        <p className="text-body text-text-secondary text-center mb-8">Start your journey to a healthier lifestyle</p>

        <div className="space-y-3 w-full max-w-xs">
          <Button variant="primary" size="full" onClick={() => navigate('/goal-selection')}>
            Get Started
          </Button>
          <Button variant="outline" size="full" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
