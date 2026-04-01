import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faSpinner, faEnvelopeOpen, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('验证链接无效，缺少令牌参数');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || '邮箱验证成功！');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.error || '验证失败，请重试');
        }
      } catch (err) {
        setStatus('error');
        setMessage('网络连接失败，请检查后重试');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#050b14] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'linear-gradient(#00f5ff 1px, transparent 1px), linear-gradient(90deg, #00f5ff 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#0a1525]/90 backdrop-blur-md rounded-xl p-8 md:p-12 border border-cyan-500/20 shadow-[0_0_30px_rgba(0,245,255,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50"></div>

          <div className="text-center">
            {status === 'loading' && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-900/30 border-2 border-cyan-500/50 rounded-full mb-6 shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                  <FontAwesomeIcon icon={faSpinner} className="text-4xl text-cyan-400 animate-spin" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-4 font-['Orbitron',sans-serif]">
                  验证中...
                </h1>
                <p className="text-cyan-200/60 text-sm font-mono">
                  正在验证你的邮箱，请稍候
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/30 border-2 border-green-500/50 rounded-full mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-pulse">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-green-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-green-300 mb-4 font-['Orbitron',sans-serif]">
                  验证成功！
                </h1>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  {message}
                </p>
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg mb-6">
                  <p className="text-green-400 text-sm font-mono flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faEnvelopeOpen} />
                    邮箱验证完成，账户已激活
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-cyan-400/70 text-sm font-mono">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xs" />
                  <span>3秒后自动跳转到登录页...</span>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="mt-6 w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all active:scale-95 flex items-center justify-center gap-2 font-mono tracking-wider border border-cyan-400/50"
                >
                  <span>立即登录</span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/30 border-2 border-red-500/50 rounded-full mb-6 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-red-300 mb-4 font-['Orbitron',sans-serif]">
                  验证失败
                </h1>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  {message}
                </p>
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg mb-6">
                  <p className="text-red-400 text-xs font-mono">
                    可能原因：验证链接已过期、令牌无效或已被使用
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate('/register')}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all active:scale-95 font-mono tracking-wider border border-cyan-400/50"
                  >
                    重新注册
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-bold rounded-lg border border-slate-600 hover:border-slate-500 transition-all active:scale-95 font-mono tracking-wider"
                  >
                    返回首页
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-cyan-500/70 text-sm font-mono">
            © 2026 孟想的编程天地 By HAISNAP
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;