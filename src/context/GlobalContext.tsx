import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== 类型定义 ====================

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: 'male' | 'female';
  goal?: 'lose' | 'maintain' | 'gain';
  targetWeight?: number;
  dailyCalorieGoal?: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface LoadingState {
  global: boolean;
  page: boolean;
  action: string | null;
}

interface GlobalState {
  auth: AuthState;
  loading: LoadingState;
  theme: 'light' | 'dark';
  language: 'zh-CN' | 'en';
}

type Action =
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_GLOBAL_LOADING'; payload: boolean }
  | { type: 'SET_PAGE_LOADING'; payload: boolean }
  | { type: 'SET_ACTION_LOADING'; payload: string | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LANGUAGE'; payload: 'zh-CN' | 'en' };

// ==================== 初始状态 ====================

const initialState: GlobalState = {
  auth: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  loading: {
    global: false,
    page: false,
    action: null,
  },
  theme: 'light',
  language: 'zh-CN',
};

// ==================== Reducer ====================

function globalReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: null,
          token: null,
        },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: state.auth.user ? { ...state.auth.user, ...action.payload } : null,
        },
      };
    case 'SET_GLOBAL_LOADING':
      return {
        ...state,
        loading: { ...state.loading, global: action.payload },
      };
    case 'SET_PAGE_LOADING':
      return {
        ...state,
        loading: { ...state.loading, page: action.payload },
      };
    case 'SET_ACTION_LOADING':
      return {
        ...state,
        loading: { ...state.loading, action: action.payload },
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
}

// ==================== Context ====================

interface GlobalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
  // 便捷方法
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setGlobalLoading: (loading: boolean) => void;
  setPageLoading: (loading: boolean) => void;
  setActionLoading: (action: string | null) => void;
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// ==================== Provider ====================

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // 便捷方法
  const login = useCallback((user: User, token: string) => {
    // 保存到 localStorage
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    const currentUser = state.auth.user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: userData });
    }
  }, [state.auth.user]);

  const setGlobalLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_GLOBAL_LOADING', payload: loading });
  }, []);

  const setPageLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_PAGE_LOADING', payload: loading });
  }, []);

  const setActionLoading = useCallback((action: string | null) => {
    dispatch({ type: 'SET_ACTION_LOADING', payload: action });
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    // 更新 HTML class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // 初始化时从 localStorage 恢复
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value: GlobalContextType = {
    state,
    dispatch,
    login,
    logout,
    updateUser,
    setGlobalLoading,
    setPageLoading,
    setActionLoading,
    toggleTheme,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
      {/* 全局加载遮罩 */}
      <AnimatePresence>
        {state.loading.global && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center"
            >
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-text-primary font-medium">
                {state.loading.action || '加载中...'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlobalContext.Provider>
  );
};

// ==================== Hook ====================

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};

// 便捷 Hooks
export const useAuth = () => {
  const { state, login, logout, updateUser } = useGlobal();
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token,
    login,
    logout,
    updateUser,
  };
};

export const useLoading = () => {
  const { state, setGlobalLoading, setPageLoading, setActionLoading } = useGlobal();
  return {
    isGlobalLoading: state.loading.global,
    isPageLoading: state.loading.page,
    actionLoading: state.loading.action,
    setGlobalLoading,
    setPageLoading,
    setActionLoading,
  };
};

export const useTheme = () => {
  const { state, toggleTheme } = useGlobal();
  return {
    theme: state.theme,
    toggleTheme,
  };
};

export default GlobalContext;
