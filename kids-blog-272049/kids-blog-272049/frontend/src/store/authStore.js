import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,

      // 注册用户 - 调用后端API
      register: async (email, nickname, password) => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              nickname: nickname || email.split('@')[0],
              password
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || '注册失败');
          }

          // 注册成功后自动登录
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
            
            set({
              user: data.user,
              isAuthenticated: true
            });
          }

          return data.user;
        } catch (error) {
          console.error('注册失败:', error);
          throw error;
        }
      },

      // 登录用户 - 调用后端API
      login: async (email, password) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || '登录失败');
          }

          // 存储令牌和用户信息
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('loggedInUser', JSON.stringify(data.user));
            
            set({
              user: data.user,
              isAuthenticated: true
            });
          }

          return data.user;
        } catch (error) {
          console.error('登录失败:', error);
          throw error;
        }
      },

      // 退出登录
      logout: () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        
        set({
          user: null,
          isAuthenticated: false
        });
      },

      // 自动登录 - 从localStorage恢复会话
      autoLogin: async () => {
        try {
          const loggedInUser = localStorage.getItem('loggedInUser');
          const token = localStorage.getItem('token');
          
          if (loggedInUser && token) {
            // 验证令牌有效性
            const response = await fetch('/api/auth/me', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (response.ok) {
              const data = await response.json();
              set({
                user: data.user,
                isAuthenticated: true
              });
              return true;
            } else {
              // 令牌无效，清除本地数据
              localStorage.removeItem('loggedInUser');
              localStorage.removeItem('token');
              set({
                user: null,
                isAuthenticated: false
              });
            }
          }
        } catch (error) {
          console.error('自动登录失败:', error);
        }
        return false;
      },

      // 更新用户信息
      updateUser: async (userData) => {
        const { user } = get();
        if (!user) return;

        try {
          const token = localStorage.getItem('token');
          const response = await fetch('/api/auth/update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error('更新用户信息失败');
          }

          const data = await response.json();
          const updatedUser = { ...user, ...data.user };

          localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

          set({
            user: updatedUser
          });
        } catch (error) {
          console.error('更新用户失败:', error);
          throw error;
        }
      },

      // 迁移localStorage用户数据到服务器（兼容旧版本）
      migrateLocalUsers: async () => {
        try {
          const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
          
          if (localUsers.length === 0) {
            return { success: 0, failed: 0 };
          }

          const response = await fetch('/api/auth/migrate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ users: localUsers }),
          });

          const data = await response.json();

          if (response.ok) {
            // 迁移成功后清除本地用户列表
            localStorage.removeItem('users');
            console.log('用户数据迁移完成:', data);
          }

          return data;
        } catch (error) {
          console.error('用户数据迁移失败:', error);
          throw error;
        }
      },

      // 初始化用户数据（向下兼容）
      initUsers: () => {
        try {
          const storedUsers = localStorage.getItem('users');
          if (storedUsers) {
            set({ users: JSON.parse(storedUsers) });
          }
        } catch (error) {
          console.error('初始化用户数据失败:', error);
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        users: state.users
      })
    }
  )
);

export default useAuthStore;