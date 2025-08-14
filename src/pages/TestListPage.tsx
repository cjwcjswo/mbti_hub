import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import { TestCard } from '../types'

const TestListPage = () => {
  const [tests, setTests] = useState<TestCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<string>('')

  const fetchTests = async (category?: string) => {
    try {
      let url = API_ENDPOINTS.TESTS
      if (category) {
        url += `?category=${encodeURIComponent(category)}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch tests')
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data')
      }

      return result.data
    } catch (error) {
      console.error('Error fetching tests:', error)
      // API 호출 실패 시 빈 배열 반환
      return []
    }
  }

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setActiveFilter(categoryFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    const loadTests = async () => {
      try {
        setLoading(true)
        const testsData = await fetchTests(activeFilter)
        setTests(testsData)
      } catch (err) {
        setError('테스트 목록을 불러오는 중 오류가 발생했습니다.')
        console.error('Error loading tests:', err)
      } finally {
        setLoading(false)
      }
    }

    loadTests()
  }, [activeFilter])

  const getCategoryColor = (categoryName: string) => {
    const colors: { [key: string]: string } = {
      '성격 유형': 'bg-blue-100 text-blue-800',
      '연애 스타일': 'bg-pink-100 text-pink-800',
      '직업 적성': 'bg-green-100 text-green-800',
      '취미 생활': 'bg-purple-100 text-purple-800'
    }
    return colors[categoryName] || 'bg-gray-100 text-gray-800'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">테스트 목록을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            MBTI 테스트 목록
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            다양한 MBTI 테스트를 통해 당신의 성격을 알아보세요
          </motion.p>
        </div>

        {/* 필터 표시 */}
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="inline-flex items-center bg-white rounded-lg shadow-sm px-4 py-2">
              <span className="text-gray-600 mr-2">현재 필터:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(activeFilter)}`}>
                {activeFilter}
              </span>
              <button
                onClick={() => {
                  setActiveFilter('')
                  window.history.pushState({}, '', '/tests')
                }}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* 테스트 그리드 */}
        {tests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              테스트를 찾을 수 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              {activeFilter ? `${activeFilter} 카테고리의 테스트가 없습니다.` : '현재 등록된 테스트가 없습니다.'}
            </p>
            <Link
              to="/"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link to={`/test/${test.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{test.thumbnail}</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                          {test.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {test.category.name}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {test.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        ⏱️ {test.estimatedTime}분
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                        {test.difficulty === 'easy' ? '쉬움' :
                          test.difficulty === 'medium' ? '보통' : '어려움'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* 전체보기 버튼 */}
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              to="/tests"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              모든 테스트 보기
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default TestListPage
