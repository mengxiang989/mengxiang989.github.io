import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faEnvelope, faLock, faSpinner, faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/authStore';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('请填写所有字段');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('邮箱格式不正确');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '登录失败，请检查邮箱和密码');
      }

      if (data.token) {
        // 安全地存储用户数据到 localStorage
        try {
          localStorage.setItem('token', data.token);
          localStorage.setItem('loggedInUser', JSON.stringify(data.user));
          login(formData.email, formData.password);
        } catch (storageError) {
          console.error('存储用户数据失败:', storageError);
          throw new Error('登录成功但保存会话失败，请刷新页面重试');
        }
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError(err.message || '登录失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-900/30 border-2 border-cyan-500/50 rounded-full mb-4 shadow-[0_0_20px_rgba(0,245,255,0.3)]">
            <FontAwesomeIcon icon={faSignInAlt} className="text-2xl text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 font-['Orbitron',sans-serif]">
            用户登录
          </h1>
          <p className="text-cyan-200/60 text-sm font-mono">访问孟想的编程天地</p>
        </div>

        <div className="bg-[#0a1525]/90 backdrop-blur-md rounded-xl p-8 border border-cyan-500/20 shadow-[0_0_30px_rgba(0,245,255,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50"></div>

          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center gap-3 animate-fade-in">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 text-xl" />
              <div>
                <p className="text-green-300 font-bold text-sm">登录成功！</p>
                <p className="text-green-400/70 text-xs">正在跳转...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-3 animate-fade-in">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400 text-xl" />
              <p className="text-red-300 text-sm font-mono">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-cyan-300 text-sm font-bold mb-2 font-mono flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-xs" />
                邮箱地址
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="输入你的邮箱"
                required
                className="w-full px-4 py-3 bg-[#050b14] border border-cyan-500/30 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
              />
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-bold mb-2 font-mono flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} className="text-xs" />
                密码
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="输入你的密码"
                required
                className="w-full px-4 py-3 bg-[#050b14] border border-cyan-500/30 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2 font-mono tracking-wider border border-cyan-400/50"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  <span>登录中...</span>
                </>
              ) : success ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>登录成功</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSignInAlt} />
                  <span>立即登录</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-cyan-500/10 text-center">
            <p className="text-slate-400 text-sm font-mono">
              还没有账户？
              <Link 
                to="/register" 
                className="text-cyan-400 hover:text-cyan-300 ml-2 font-bold hover:underline transition-colors"
              >
                立即注册
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-cyan-500/70 hover:text-cyan-400 text-sm font-mono transition-colors inline-flex items-center gap-2"
          >
            <span>&lt;</span>
            返回首页
            <span>/&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;