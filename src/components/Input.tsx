import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  passwordToggle?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helper,
  icon,
  clearable = false,
  passwordToggle = false,
  className = '',
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled,
  ...rest
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const baseStyles = `
    w-full px-4 py-3 rounded-xl
    bg-white border-2
    text-text-primary placeholder:text-text-muted
    transition-all duration-200
    focus:outline-none
    disabled:opacity-50 disabled:bg-gray-50
  `;

  const stateStyles = error
    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
    : isFocused
    ? 'border-primary focus:ring-2 focus:ring-primary-100'
    : 'border-gray-200 hover:border-gray-300';

  const paddingStyles = icon ? 'pl-12' : '';
  const clearableStyles = (clearable && value) || (passwordToggle && type === 'password') ? 'pr-12' : '';

  const handleClear = () => {
    if (onChange) {
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* 左侧图标 */}
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}

        {/* 输入框 */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseStyles} ${stateStyles} ${paddingStyles} ${clearableStyles}`}
          {...rest}
        />

        {/* 右侧操作按钮 */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {clearable && value && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4 text-text-muted" />
            </motion.button>
          )}
          
          {passwordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-text-muted hover:text-text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* 错误/帮助文本 */}
      {(error || helper) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-text-muted'}`}>
          {error || helper}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
