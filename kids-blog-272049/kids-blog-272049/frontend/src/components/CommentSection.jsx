import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUser, faClock, faTrash, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    const loadComments = () => {
      const savedComments = localStorage.getItem(`article_${articleId}_comments`);
      if (savedComments) {
        try {
          setComments(JSON.parse(savedComments));
        } catch (e) {
          console.error('Failed to parse comments from localStorage', e);
          setComments([]);
        }
      }
    };
    
    loadComments();

    const handleStorageChange = (e) => {
      if (e.key === `article_${articleId}_comments`) {
        loadComments();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [articleId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('请先登录后再发表评论');
      return;
    }
    if (!newComment.trim() || newComment.length > 500) return;

    setIsSubmitting(true);
    const newCommentObj = {
      id: Date.now(),
      userId: user.id,
      user: user.nickname || user.email.split('@')[0],
      text: newComment,
      date: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
    };

    const updatedComments = [newCommentObj, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`article_${articleId}_comments`, JSON.stringify(updatedComments));
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: `article_${articleId}_comments`,
      newValue: JSON.stringify(updatedComments)
    }));
    
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleDelete = (commentId, commentUserId) => {
    if (!user) {
      alert('请先登录');
      return;
    }
    if (user.id !== commentUserId) {
      alert('你只能删除自己的评论');
      return;
    }
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem(`article_${articleId}_comments`, JSON.stringify(updatedComments));
    
    window.dispatchEvent(new StorageEvent('storage', {
      key: `article_${articleId}_comments`,
      newValue: JSON.stringify(updatedComments)
    }));
  };

  return (
    <section className="bg-[#0d1526]/80 backdrop-blur-md rounded-xl p-6 md:p-10 shadow-2xl border border-cyan-500/10 relative overflow-hidden">
      <div className="absolute top-4 right-6 text-6xl text-cyan-500/5 font-mono font-bold pointer-events-none select-none">
        COMMENTS
      </div>

      <h3 className="text-2xl font-bold text-cyan-100 mb-8 flex items-center font-mono">
        <FontAwesomeIcon icon={faUser} className="mr-4 text-cyan-500" />
        通讯记录 ({comments.length})
      </h3>

      <div className="space-y-6 mb-12">
        {comments.length === 0 ? (
          <div className="text-center py-10 bg-[#050b14]/50 rounded-lg border border-dashed border-cyan-900">
            <p className="text-cyan-500/50 font-mono text-sm">&lt; NO_DATA_FOUND: 暂无通讯记录 /&gt;</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 rounded bg-gradient-to-br from-cyan-900 to-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold shadow-[0_0_10px_rgba(0,245,255,0.1)] group-hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] transition-all">
                {comment.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 bg-[#0a1120] p-4 rounded-lg border border-cyan-500/10 group-hover:border-cyan-500/30 group-hover:bg-[#0f1929] transition-all duration-300 relative">
                <div className="absolute top-4 -left-1.5 w-3 h-3 bg-[#0a1120] border-l border-t border-cyan-500/10 transform -rotate-45 group-hover:bg-[#0f1929] group-hover:border-cyan-500/30 transition-colors"></div>
                
                <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                  <h4 className="font-bold text-cyan-300 text-sm font-mono tracking-wide flex items-center gap-2">
                    {comment.user}
                  </h4>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <FontAwesomeIcon icon={faClock} className="text-cyan-500/70" />
                    {comment.date}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{comment.text}</p>
                {user && user.id === comment.userId && (
                  <button
                    onClick={() => handleDelete(comment.id, comment.userId)}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 font-mono transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    删除
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col gap-4">
          <label className="text-xs text-cyan-500/70 font-mono font-bold uppercase ml-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            New Transmission
          </label>
          
          {!user ? (
            <div className="bg-[#050b14]/80 border border-cyan-500/20 rounded-lg p-6 text-center">
              <p className="text-cyan-300 mb-4 font-mono">请登录后发表评论</p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all font-mono tracking-wide border border-cyan-400/50"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                立即登录
              </Link>
            </div>
          ) : (
            <>
              <div className="relative">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="输入你的想法..."
                  maxLength={500}
                  className="w-full h-32 p-4 bg-[#050b14] border border-cyan-500/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,245,255,0.15)] transition-all resize-none text-slate-300 placeholder-slate-600 font-sans"
                ></textarea>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/30 pointer-events-none"></div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-slate-500 font-mono">
                  {newComment.length}/500
                </span>
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting || newComment.length > 500}
                  className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-8 py-3 rounded font-bold shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)] transition-all active:scale-95 font-mono tracking-wide border border-cyan-400/50"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className={newComment.trim() && !isSubmitting ? "animate-pulse" : ""} />
                  SEND_DATA
                </button>
              </div>
            </>
          )}
        </div>
        <div id={`slot-comment-section-${articleId}`} className="hidden"></div>
      </form>
    </section>
  );
};

export default CommentSection;