import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import { Answer, Test } from '../types'

const TestPage = () => {
  const { testId } = useParams<{ testId: string }>()
  const navigate = useNavigate()
  const [test, setTest] = useState<Test | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startTime] = useState(Date.now())

  const fetchTest = async (id: string): Promise<Test | null> => {
    try {
      const response = await fetch(API_ENDPOINTS.TEST_DETAIL(id))
      if (!response.ok) throw new Error('Failed to fetch test')
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch test data')
      }

      return result.data
    } catch (error) {
      console.error('Error fetching test:', error)
      return null
    }
  }

  useEffect(() => {
    const loadTest = async () => {
      if (!testId) return

      try {
        setLoading(true)
        const testData = await fetchTest(testId)
        if (testData) {
          setTest(testData)
        } else {
          setError('테스트를 찾을 수 없습니다.')
        }
      } catch (err) {
        setError('테스트를 불러오는 중 오류가 발생했습니다.')
        console.error('Error loading test:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTest()
  }, [testId])

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    const newAnswers = [...answers]
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId)

    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex].selectedOptionId = optionId
    } else {
      newAnswers.push({ questionId, selectedOptionId: optionId })
    }

    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < (test?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // 테스트 완료 - 결과 계산 및 저장
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      const testResult = calculateMBTIResult(test!, answers, timeSpent)

      // localStorage에 결과 저장
      localStorage.setItem(`testResult_${testId}`, JSON.stringify(testResult))

      // 결과 페이지로 이동
      navigate(`/result/${testId}`)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateMBTIResult = (test: Test, answers: Answer[], timeSpent: number) => {
    // MBTI 점수 계산
    const scores = {
      E: 0, I: 0,
      N: 0, S: 0,
      F: 0, T: 0,
      P: 0, J: 0
    }

    answers.forEach(answer => {
      const question = test.questions.find(q => q.id === answer.questionId)
      if (question) {
        const selectedOption = question.options.find(opt => opt.id.toString() === answer.selectedOptionId)
        if (selectedOption && selectedOption.scores) {
          Object.entries(selectedOption.scores).forEach(([trait, score]) => {
            if (trait in scores) {
              scores[trait as keyof typeof scores] += score
            }
          })
        }
      }
    })

    // MBTI 유형 결정
    const mbtiType = [
      scores.E > scores.I ? 'E' : 'I',
      scores.N > scores.S ? 'N' : 'S',
      scores.F > scores.T ? 'F' : 'T',
      scores.P > scores.J ? 'P' : 'J'
    ].join('')

    // 퍼센테이지 계산
    const totalE = scores.E + scores.I
    const totalN = scores.N + scores.S
    const totalF = scores.F + scores.T
    const totalP = scores.P + scores.J

    const percentage = {
      E: totalE > 0 ? Math.round((scores.E / totalE) * 100) : 50,
      I: totalE > 0 ? Math.round((scores.I / totalE) * 100) : 50,
      N: totalN > 0 ? Math.round((scores.N / totalN) * 100) : 50,
      S: totalN > 0 ? Math.round((scores.S / totalN) * 100) : 50,
      F: totalF > 0 ? Math.round((scores.F / totalF) * 100) : 50,
      T: totalF > 0 ? Math.round((scores.T / totalF) * 100) : 50,
      P: totalP > 0 ? Math.round((scores.P / totalP) * 100) : 50,
      J: totalP > 0 ? Math.round((scores.J / totalP) * 100) : 50
    }

    // MBTI 결과 데이터 (실제로는 서버에서 가져와야 함)
    const mbtiResults: { [key: string]: any } = {
      'INTJ': {
        title: '건축가',
        description: '상상력이 풍부하고 전략적인 사상가',
        characteristics: ['전략적 사고', '독립적', '분석적'],
        strengths: ['논리적 사고', '장기 계획', '혁신적 아이디어'],
        weaknesses: ['완벽주의', '타인과의 소통 부족', '감정 표현 어려움'],
        compatibility: {
          best: ['ENFP', 'ENTP'],
          good: ['INFJ', 'INTP'],
          challenging: ['ESFP', 'ESTP']
        }
      },
      'INTP': {
        title: '논리술사',
        description: '혁신적인 발명가',
        characteristics: ['논리적 분석', '창의적 사고', '객관적'],
        strengths: ['문제 해결 능력', '창의성', '객관적 분석'],
        weaknesses: ['실행력 부족', '감정적 소통 어려움', '일상적 업무 싫어함'],
        compatibility: {
          best: ['ENTJ', 'ESTJ'],
          good: ['INTJ', 'INFP'],
          challenging: ['ESFJ', 'ENFJ']
        }
      }
      // 다른 MBTI 유형들도 추가 가능
    }

    const result = mbtiResults[mbtiType] || {
      title: `${mbtiType} 유형`,
      description: '당신의 MBTI 유형입니다.',
      characteristics: ['특징 1', '특징 2'],
      strengths: ['강점 1', '강점 2'],
      weaknesses: ['약점 1', '약점 2'],
      compatibility: {
        best: [],
        good: [],
        challenging: []
      }
    }

    return {
      testId: test.id,
      mbtiType,
      title: result.title,
      description: result.description,
      characteristics: result.characteristics,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      compatibility: result.compatibility,
      percentage,
      answers,
      timeSpent,
      completedAt: new Date().toISOString()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">테스트를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '테스트를 찾을 수 없습니다.'}</p>
          <button
            onClick={() => navigate('/tests')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            테스트 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = test.questions[currentQuestionIndex]
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id)
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
              <p className="text-gray-600">{test.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">진행률</div>
              <div className="text-lg font-semibold text-purple-600">
                {currentQuestionIndex + 1} / {test.questions.length}
              </div>
            </div>
          </div>

          {/* 진행률 바 */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* 질문 */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id.toString())}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${currentAnswer?.selectedOptionId === option.id.toString()
                  ? 'border-purple-500 bg-purple-50 text-purple-900'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium">{option.text}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${currentQuestionIndex === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            whileHover={currentQuestionIndex > 0 ? { scale: 1.05 } : {}}
            whileTap={currentQuestionIndex > 0 ? { scale: 0.95 } : {}}
          >
            이전
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${!currentAnswer
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            whileHover={currentAnswer ? { scale: 1.05 } : {}}
            whileTap={currentAnswer ? { scale: 0.95 } : {}}
          >
            {currentQuestionIndex === test.questions.length - 1 ? '결과 보기' : '다음'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default TestPage
