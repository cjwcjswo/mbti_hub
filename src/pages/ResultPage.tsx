import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MBTIResult } from '../types'

const ResultPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>()
  const navigate = useNavigate()
  const [result, setResult] = useState<MBTIResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // localStorage에서 결과 가져오기
    const savedResult = localStorage.getItem(`testResult_${testId}`)
    
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult)
        setResult(parsedResult)
      } catch (error) {
        console.error('결과 파싱 오류:', error)
        // 파싱 실패 시 기본 결과 사용
        setResult(getDefaultResult())
      }
    } else {
      // 저장된 결과가 없으면 기본 결과 사용
      setResult(getDefaultResult())
    }
    
    setLoading(false)
  }, [testId])

  const getDefaultResult = (): MBTIResult => {
    return {
      mbtiType: 'ENFP',
      title: '열정적인 영감가',
      description: '당신은 창의적이고 열정적인 영감가입니다. 새로운 아이디어를 좋아하고 사람들과의 소통을 즐기는 타입입니다.',
      characteristics: [
        '창의적이고 혁신적인 사고',
        '사람들과의 소통을 즐김',
        '새로운 경험을 추구',
        '낙관적이고 긍정적인 성격'
      ],
      strengths: [
        '창의성과 혁신 능력',
        '사람들과의 원활한 소통',
        '적응력과 유연성',
        '동기부여 능력'
      ],
      weaknesses: [
        '일상적인 업무에 지루함을 느낌',
        '감정에 쉽게 좌우됨',
        '장기 계획 수립의 어려움',
        '갈등 상황 회피 경향'
      ],
      compatibility: {
        best: ['INFJ', 'INTJ'],
        good: ['ENFJ', 'ENTJ'],
        challenging: ['ISTJ', 'ESTJ']
      },
      percentage: {
        E: 65,
        I: 35,
        N: 70,
        S: 30,
        F: 60,
        T: 40,
        P: 55,
        J: 45
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">결과를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">테스트를 먼저 완료해주세요.</p>
          <button 
            onClick={() => navigate('/tests')}
            className="btn-primary"
          >
            테스트 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{result.mbtiType} - {result.title} | MBTI Hub</title>
        <meta name="description" content={result.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Result Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block bg-gradient-to-r from-primary-400 to-secondary-500 text-white text-6xl font-bold px-8 py-4 rounded-2xl mb-4"
            >
              {result.mbtiType}
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{result.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              {result.description}
            </p>
          </div>

          {/* MBTI Percentage Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">MBTI 성향 분석</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(result.percentage).map(([trait, percentage]) => (
                <div key={trait} className="text-center">
                  <div className="text-2xl font-bold text-primary-400 mb-2">{trait}</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary-400 to-secondary-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Characteristics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">주요 특징</h3>
              <ul className="space-y-2">
                {result.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-400 mr-2">•</span>
                    <span className="text-gray-700">{char}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">강점</h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Weaknesses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">개선할 점</h3>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2">⚠</span>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Compatibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">궁합</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">최고 궁합</h4>
                <div className="flex flex-wrap gap-2">
                  {result.compatibility.best.map((type) => (
                    <span key={type} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">좋은 궁합</h4>
                <div className="flex flex-wrap gap-2">
                  {result.compatibility.good.map((type) => (
                    <span key={type} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 mb-2">도전적 궁합</h4>
                <div className="flex flex-wrap gap-2">
                  {result.compatibility.challenging.map((type) => (
                    <span key={type} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/tests"
              className="btn-secondary text-center"
            >
              다른 테스트 하기
            </Link>
            <button
              onClick={() => {
                // 결과 공유 기능 (실제로는 더 복잡한 로직 필요)
                const shareText = `나의 MBTI 결과: ${result.mbtiType} - ${result.title}\n${result.description}`
                if (navigator.share) {
                  navigator.share({
                    title: 'MBTI 결과',
                    text: shareText,
                    url: window.location.href
                  })
                } else {
                  // 클립보드에 복사
                  navigator.clipboard.writeText(shareText)
                  alert('결과가 클립보드에 복사되었습니다!')
                }
              }}
              className="btn-primary"
            >
              결과 공유하기
            </button>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default ResultPage
