import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faKey, faArrowRight, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const AuthForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    
    // 获取现有用户数据
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (isRegister) {
      // 检查邮箱是否已存在
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        alert('该邮箱已被注册，请直接登录！');
        setIsLoading(false);
        return;
      }
      
      // 创建新用户（简单存储，无密码加密）
      const newUser = {
        id: Date.now().toString(),
        email,
        password // 注意：实际项目应加密存储
      };
      
      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      localStorage.setItem('loggedInUser', JSON.stringify(newUser));
      onLogin(newUser);
    } else {
      // 登录验证
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        onLogin(user);
      } else {
        alert('邮箱或密码错误，请重试！');
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-[#0a1120] border border-cyan-500/30 rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部装饰 */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
        
        <div className="p-6 md:p-8">
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-900/30 border-2 border-cyan-500/50 rounded-full mb-4">
              <FontAwesomeIcon 
                icon={isRegister ? faUserPlus : faSignInAlt} 
                className="text-2xl text-cyan-400" 
              />
            </div>
            <h2 className="text-2xl font-bold text-cyan-100 font-mono tracking-wide">
              {isRegister ? '创建账户' : '登录系统'}
            </h2>
            <p className="text-cyan-500/70 text-sm mt-2 font-mono">
              {isRegister ? '加入编程探险队' : '欢迎回来，指挥官'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* 邮箱输入 */}
              <div>
                <label className="block text-cyan-500/80 text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                  电子邮箱
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-[#050b14] border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,245,255,0.1)] transition-all text-slate-300 placeholder-slate-600"
                    required
                  />
                  <div className="absolute top-3 right-3 text-cyan-500/30">
                    <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                  </div>
                </div>
              </div>

              {/* 密码输入 */}
              <div>
                <label className="block text-cyan-500/80 text-xs font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faKey} className="text-xs" />
                  访问密钥
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full px-4 py-3 bg-[#050b14] border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(0,245,255,0.1)] transition-all text-slate-300 placeholder-slate-600"
                    required
                  />
                  <div className="absolute top-3 right-3 text-cyan-500/30">
                    <FontAwesomeIcon icon={faKey} className="text-sm" />
                  </div>
                </div>
              </div>

              {/* 提交按钮 */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all active:scale-[0.98] font-mono tracking-wider flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>处理中...</span>
                ) : (
                  <>
                    <span>{isRegister ? 'CREATE_ACCOUNT' : 'ACCESS_SYSTEM'}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* 切换表单 */}
          <div className="mt-6 pt-6 border-t border-cyan-900/30 text-center">
            <p className="text-cyan-500/70 text-sm font-mono">
              {isRegister ? '已有账户？' : '还没有账户？'}
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="ml-1 text-cyan-400 hover:text-cyan-300 font-bold underline-offset-2 hover:underline transition-colors"
              >
                {isRegister ? '立即登录' : '注册新账户'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;