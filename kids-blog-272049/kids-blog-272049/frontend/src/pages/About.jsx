import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faGlobe, 
  faCode, 
  faRocket, 
  faTerminal,
  faMicrochip,
  faSatelliteDish
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 pb-20 font-sans">
      <main className="max-w-4xl mx-auto px-4 pt-24">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6 border border-gray-200">
            <FontAwesomeIcon icon={faUser} className="text-3xl text-gray-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            关于本站
          </h1>
          
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            记录编程学习的点点滴滴
          </p>
        </header>

        <section className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 border border-gray-300">
              <FontAwesomeIcon icon={faRocket} className="text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">博客简介</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              欢迎来到<span className="font-semibold text-gray-900">孟想的编程天地</span>！这是一个专注于分享编程学习心得和有趣项目的个人博客。
            </p>
            <p className="text-gray-700 leading-relaxed">
              在这里，你会看到从<span className="text-blue-600">Scratch积木编程</span>到<span className="text-blue-600">Python代码</span>的学习记录，
              从简单的<span className="text-blue-600">打印语句</span>到有趣的<span className="text-blue-600">小游戏开发</span>，
              每一个项目都是成长的见证。
            </p>
            <p className="text-gray-700 leading-relaxed">
              编程对我来说就像是<span className="font-semibold">魔法</span>一样神奇！用几行代码就能让电脑听我的指挥，
              创造出各种有趣的东西。虽然有时候会遇到<span className="text-red-600">bug</span>（程序错误），
              但解决问题的过程让我觉得自己像个真正的程序员！
            </p>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-8 border border-gray-200 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 border border-gray-300">
              <FontAwesomeIcon icon={faMicrochip} className="text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">作者信息</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-600" />
                <span className="text-gray-900 font-semibold">姓名</span>
              </div>
              <p className="text-gray-700 ml-8">孟想</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FontAwesomeIcon icon={faTerminal} className="text-gray-600" />
                <span className="text-gray-900 font-semibold">身份</span>
              </div>
              <p className="text-gray-700 ml-8">编程探索者 & 小学生开发者</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FontAwesomeIcon icon={faCode} className="text-gray-600" />
                <span className="text-gray-900 font-semibold">技术栈</span>
              </div>
              <p className="text-gray-700 ml-8">Scratch, Python, JavaScript, HTML/CSS</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FontAwesomeIcon icon={faSatelliteDish} className="text-gray-600" />
                <span className="text-gray-900 font-semibold">座右铭</span>
              </div>
              <p className="text-gray-700 ml-8">每个伟大的程序员都是从"Hello World"开始的！</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;