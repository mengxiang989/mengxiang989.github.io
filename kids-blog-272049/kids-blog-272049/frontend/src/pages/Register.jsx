import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faLock, faUser, faSpinner, faCheckCircle, faExclamationTriangle, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailValidation, setEmailValidation] = useState({
    isValidating: false,
    isValid: null,
    message: ''
  });

  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateEmailDomain = async (email) => {
    if (!validateEmailFormat(email)) {
      return { isValid: false, message: '邮箱格式不正确' };
    }

    const domain = email.split('@')[1];
    const commonDomains = [
      'gmail.com', 'qq.com', '163.com', '126.com', 'outlook.com', 
      'hotmail.com', 'yahoo.com', 'sina.com', 'sohu.com', 'foxmail.com',
      '139.com', 'yeah.net', 'aliyun.com', 'vip.qq.com', 'icloud.com'
    ];

    if (commonDomains.includes(domain.toLowerCase())) {
      return { isValid: true, message: '邮箱域名有效' };
    }

    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
      const data = await response.json();
      
      if (data.Answer && data.Answer.length > 0) {
        return { isValid: true, message: '邮箱域名有效' };
      } else {
        return { isValid: false, message: '邮箱域名不存在或无效' };
      }
    } catch (err) {
      return { isValid: true, message: '无法验证域名，但格式正确' };
    }
  };

  const handleEmailChange = async (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    setError('');

    if (value.trim() === '') {
      setEmailValidation({ isValidating: false, isValid: null, message: '' });
      return;
    }

    if (!validateEmailFormat(value)) {
      setEmailValidation({ 
        isValidating: false, 
        isValid: false, 
        message: '邮箱格式不正确（示例：user@example.com）' 
      });
      return;
    }

    setEmailValidation({ isValidating: true, isValid: null, message: '正在验证邮箱...' });

    const result = await validateEmailDomain(value);
    setEmailValidation({ 
      isValidating: false, 
      isValid: result.isValid, 
      message: result.message 
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('请填写所有必填项');
      return false;
    }

    if (!validateEmailFormat(formData.email)) {
      setError('邮箱格式不正确');
      return false;
    }

    if (emailValidation.isValid === false) {
      setError('请输入有效的邮箱地址');
      return false;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少为 6 位');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          nickname: formData.nickname || '编程探险家',
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '注册失败，请稍后重试');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || '注册失败，请稍后重试');
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
            <FontAwesomeIcon icon={faUserPlus} className="text-2xl text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 font-['Orbitron',sans-serif]">
            创建账户
          </h1>
          <p className="text-cyan-200/60 text-sm font-mono">加入孟想的编程天地</p>
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
                <p className="text-green-300 font-bold text-sm">注册成功！</p>
                <p className="text-green-400/70 text-xs">正在跳转到登录页...</p>
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
                邮箱地址 <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  placeholder="输入你的邮箱"
                  required
                  className="w-full px-4 py-3 pr-10 bg-[#050b14] border border-cyan-500/30 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {emailValidation.isValidating && (
                    <FontAwesomeIcon icon={faSpinner} className="text-cyan-400 animate-spin" />
                  )}
                  {!emailValidation.isValidating && emailValidation.isValid === true && (
                    <FontAwesomeIcon icon={faCircleCheck} className="text-green-400" />
                  )}
                  {!emailValidation.isValidating && emailValidation.isValid === false && (
                    <FontAwesomeIcon icon={faCircleXmark} className="text-red-400" />
                  )}
                </div>
              </div>
              {emailValidation.message && (
                <p className={`mt-2 text-xs font-mono flex items-center gap-2 ${
                  emailValidation.isValid === true ? 'text-green-400' :
                  emailValidation.isValid === false ? 'text-red-400' :
                  'text-cyan-400'
                }`}>
                  {emailValidation.isValidating && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
                  {emailValidation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-bold mb-2 font-mono flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-xs" />
                昵称 <span className="text-slate-500 text-xs font-normal">(可选)</span>
              </label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="给自己起个酷炫的名字"
                className="w-full px-4 py-3 bg-[#050b14] border border-cyan-500/30 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
              />
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-bold mb-2 font-mono flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} className="text-xs" />
                密码 <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="至少 6 位字符"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-[#050b14] border border-cyan-500/30 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
              />
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-bold mb-2 font-mono flex items-center gap-2">
                <FontAwesomeIcon icon={faLock} className="text-xs" />
                确认密码 <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="再次输入密码"
                required
                className="w-full px-4 py-3 bg-[#050b14] border border-cyan-500/30 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || success || emailValidation.isValid === false}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2 font-mono tracking-wider border border-cyan-400/50"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  <span>注册中...</span>
                </>
              ) : success ? (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>注册成功</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>立即注册</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-cyan-500/10 text-center">
            <p className="text-slate-400 text-sm font-mono">
              已有账户？
              <Link 
                to="/login" 
                className="text-cyan-400 hover:text-cyan-300 ml-2 font-bold hover:underline transition-colors"
              >
                立即登录
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

export default Register;