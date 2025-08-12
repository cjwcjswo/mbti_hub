import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Test, Question, Answer, QuestionOption, MBTIResult } from '../types'

const TestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>()
  const navigate = useNavigate()
  const [test, setTest] = useState<Test | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제로는 API에서 테스트 데이터를 가져옴
    const mockTest: Test = {
      id: testId || '1',
      title: '연애 스타일 MBTI 테스트',
      description: '당신의 연애 스타일을 알아보세요',
      category: '연애',
      questions: [
        {
          id: 1,
          text: '새로운 사람을 만날 때 어떤 기분이 드나요?',
          options: [
            { id: 1, text: '설렘과 기대감이 가득하다', scores: { E: 2, I: 0 } },
            { id: 2, text: '조금 긴장되지만 호기심이 있다', scores: { E: 1, I: 1 } },
            { id: 3, text: '차분하게 관찰한다', scores: { E: 0, I: 2 } }
          ]
        },
        {
          id: 2,
          text: '데이트 계획을 세울 때 어떤 스타일인가요?',
          options: [
            { id: 1, text: '즉흥적으로 결정한다', scores: { P: 2, J: 0 } },
            { id: 2, text: '대략적인 계획을 세운다', scores: { P: 1, J: 1 } },
            { id: 3, text: '세밀하게 계획한다', scores: { P: 0, J: 2 } }
          ]
        }
      ],
      estimatedTime: 5,
      difficulty: 'medium'
    }

    setTest(mockTest)
    setLoading(false)
  }, [testId])

  // MBTI 점수 계산 함수
  const calculateMBTIScore = (answers: Answer[], test: Test): MBTIResult => {
    const scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    }

    // 각 답변에 대해 점수 계산
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
      scores.S > scores.N ? 'S' : 'N',
      scores.T > scores.F ? 'T' : 'F',
      scores.J > scores.P ? 'J' : 'P'
    ].join('')

    // 퍼센테이지 계산
    const totalE = scores.E + scores.I
    const totalS = scores.S + scores.N
    const totalT = scores.T + scores.F
    const totalJ = scores.J + scores.P

    const percentage = {
      E: totalE > 0 ? Math.round((scores.E / totalE) * 100) : 50,
      I: totalE > 0 ? Math.round((scores.I / totalE) * 100) : 50,
      S: totalS > 0 ? Math.round((scores.S / totalS) * 100) : 50,
      N: totalS > 0 ? Math.round((scores.N / totalS) * 100) : 50,
      T: totalT > 0 ? Math.round((scores.T / totalT) * 100) : 50,
      F: totalT > 0 ? Math.round((scores.F / totalT) * 100) : 50,
      J: totalJ > 0 ? Math.round((scores.J / totalJ) * 100) : 50,
      P: totalJ > 0 ? Math.round((scores.P / totalJ) * 100) : 50
    }

    // MBTI 결과 매핑 (실제로는 더 복잡한 로직이 필요)
    const mbtiResults: { [key: string]: Omit<MBTIResult, 'mbtiType' | 'percentage'> } = {
      'ENFP': {
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
        }
      },
      // 다른 MBTI 유형들도 추가 가능
      'INTJ': {
        title: '전략적 사상가',
        description: '당신은 전략적이고 분석적인 사상가입니다. 복잡한 문제를 해결하는 것을 즐기고 독립적인 성격을 가지고 있습니다.',
        characteristics: [
          '전략적 사고와 계획',
          '독립적이고 분석적인 성격',
          '높은 기준과 완벽주의',
          '지적 호기심이 강함'
        ],
        strengths: [
          '전략적 사고 능력',
          '분석적 문제 해결',
          '독립적인 판단',
          '장기적 비전'
        ],
        weaknesses: [
          '감정 표현의 어려움',
          '타인과의 소통 부족',
          '완벽주의적 성향',
          '유연성 부족'
        ],
        compatibility: {
          best: ['ENFP', 'ENTP'],
          good: ['INFJ', 'INTP'],
          challenging: ['ESFP', 'ESTP']
        }
      }
    }

    const defaultResult = {
      title: 'MBTI 결과',
      description: '당신의 MBTI 유형 결과입니다.',
      characteristics: ['분석적 사고', '독립적 성격'],
      strengths: ['논리적 사고', '독립성'],
      weaknesses: ['감정 표현 부족', '소통 어려움'],
      compatibility: {
        best: ['ENFP'],
        good: ['INFJ'],
        challenging: ['ESFP']
      }
    }

    const result = mbtiResults[mbtiType] || defaultResult

    return {
      mbtiType,
      percentage,
      ...result
    }
  }

  const handleAnswerSelect = (questionId: number, optionId: string) => {
    const newAnswers = [...answers]
    const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === questionId)
    
    if (existingAnswerIndex >= 0) {
      newAnswers[existingAnswerIndex] = { questionId, selectedOptionId: optionId }
    } else {
      newAnswers.push({ questionId, selectedOptionId: optionId })
    }
    
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < (test?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // 테스트 완료 - MBTI 결과 계산
      if (test) {
        const mbtiResult = calculateMBTIScore(answers, test)
        // 결과를 localStorage에 저장하거나 state로 전달
        localStorage.setItem(`testResult_${testId}`, JSON.stringify(mbtiResult))
        navigate(`/result/${testId}`)
      }
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const getCurrentAnswer = () => {
    const currentQuestion = test?.questions[currentQuestionIndex]
    if (!currentQuestion) return null
    return answers.find(a => a.questionId === currentQuestion.id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">테스트를 찾을 수 없습니다</h2>
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

  const currentQuestion = test.questions[currentQuestionIndex]
  const currentAnswer = getCurrentAnswer()
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100

  return (
    <>
      <Helmet>
        <title>{test.title} - MBTI Hub</title>
        <meta name="description" content={test.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              질문 {currentQuestionIndex + 1} / {test.questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-400 to-secondary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.text}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id.toString())}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  currentAnswer?.selectedOptionId === option.id.toString()
                    ? 'border-primary-400 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.text}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            이전
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              !currentAnswer
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-400 to-secondary-500 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
            }`}
          >
            {currentQuestionIndex === test.questions.length - 1 ? '결과 보기' : '다음'}
          </button>
        </div>
      </div>
    </>
  )
}

export default TestPage
