import React from 'react';
import { motion } from 'framer-motion';

export interface TagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  label,
  selected = false,
  onClick,
  className = '',
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center gap-2 px-5 py-3 rounded-full
        text-sm font-medium transition-all duration-200
        ${selected 
          ? 'bg-text-primary text-white shadow-md' 
          : 'bg-white text-text-primary border border-gray-200 hover:border-gray-300'}
        ${className}
      `}
    >
      <span className={`
        w-2 h-2 rounded-full transition-colors
        ${selected ? 'bg-white' : 'bg-gray-300'}
      `} />
      {label}
    </motion.button>
  );
};

export interface TagGroupProps {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({
  tags,
  selectedTags,
  onChange,
  className = '',
}) => {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter(t => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {tags.map((tag, index) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
        >
          <Tag
            label={tag}
            selected={selectedTags.includes(tag)}
            onClick={() => toggleTag(tag)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Tag;
