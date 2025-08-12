import React from 'react'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">MBTI Hub 소개</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            다양한 MBTI 성격 유형 테스트를 통해 자신을 더 깊이 이해하고, 
            AI 기반의 정확한 분석으로 의미 있는 인사이트를 제공합니다.
          </p>
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-primary-400 to-secondary-500 text-white rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">우리의 미션</h2>
          <p className="text-lg leading-relaxed opacity-90">
            MBTI Hub는 개인의 성격 유형을 정확하고 재미있게 분석하여, 
            자신을 더 잘 이해하고 타인과의 관계를 개선할 수 있도록 돕는 것을 목표로 합니다.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">AI 기반 분석</h3>
            <p className="text-gray-600 leading-relaxed">
              최신 AI 기술을 활용하여 정확하고 개인화된 MBTI 분석 결과를 제공합니다.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">상세한 분석</h3>
            <p className="text-gray-600 leading-relaxed">
              단순한 유형 분류를 넘어서 성향 비율, 강점, 약점, 궁합까지 상세히 분석합니다.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">다양한 테스트</h3>
            <p className="text-gray-600 leading-relaxed">
              연애, 직장생활, 취미 등 다양한 주제의 MBTI 테스트를 제공합니다.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">모바일 친화적</h3>
            <p className="text-gray-600 leading-relaxed">
              모든 디바이스에서 편리하게 이용할 수 있는 반응형 디자인입니다.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">개인정보 보호</h3>
            <p className="text-gray-600 leading-relaxed">
              사용자의 개인정보를 안전하게 보호하며, 결과는 로컬에만 저장됩니다.
            </p>
          </motion.div>

          {/* Feature 6 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">지속적 업데이트</h3>
            <p className="text-gray-600 leading-relaxed">
              새로운 테스트와 기능을 지속적으로 추가하여 더 나은 서비스를 제공합니다.
            </p>
          </motion.div>
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-gray-50 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">기술 스택</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚛️</div>
              <h4 className="font-semibold text-gray-800">React</h4>
              <p className="text-sm text-gray-600">프론트엔드</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <h4 className="font-semibold text-gray-800">Tailwind CSS</h4>
              <p className="text-sm text-gray-600">스타일링</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤖</div>
              <h4 className="font-semibold text-gray-800">AI/ML</h4>
              <p className="text-sm text-gray-600">분석 엔진</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-800">Analytics</h4>
              <p className="text-sm text-gray-600">데이터 분석</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">문의하기</h2>
          <p className="text-gray-600 mb-6">
            서비스에 대한 문의사항이나 제안사항이 있으시면 언제든 연락주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@mbtihub.com"
              className="inline-block bg-primary-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-primary-500 hover:-translate-y-0.5"
            >
              이메일 보내기
            </a>
            <a
              href="https://t.me/mbtihub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5"
            >
              텔레그램 채널
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutPage
