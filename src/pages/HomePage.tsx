import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import { HomePageData } from '../types'

const HomePage = () => {
  const [data, setData] = useState<HomePageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHomePageData = async (): Promise<HomePageData | null> => {
    try {
      // Django API 서버 호출
      const response = await fetch(API_ENDPOINTS.HOME)
      if (!response.ok) throw new Error('Failed to fetch home page data')
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data')
      }

      return result.data
    } catch (error) {
      console.error('Error fetching home page data:', error)
      // API 호출 실패 시 null 반환
      return null
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const homeData = await fetchHomePageData()

        if (homeData) {
          setData(homeData)
        } else {
          setError('서버에서 데이터를 가져올 수 없습니다.')
        }
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.')
        console.error('Error loading home page data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
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

  if (!data) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              MBTI Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              다양한 MBTI 테스트로 당신의 성격을 더 깊이 알아보세요
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 인기 테스트 섹션 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">인기 테스트</h2>
            <Link
              to="/tests"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              전체보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.popularTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/test/${test.id}`}>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{test.thumbnail}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
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
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        ⏱️ {test.estimatedTime}분
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${test.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        test.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {test.difficulty === 'easy' ? '쉬움' :
                          test.difficulty === 'medium' ? '보통' : '어려움'}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리별 테스트 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">카테고리별 테스트</h2>
            <Link
              to="/tests"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              전체보기 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{category.emoji}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {category.tests.slice(0, 3).map((test) => (
                    <Link
                      key={test.id}
                      to={`/test/${test.id}`}
                      className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{test.thumbnail}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{test.title}</h4>
                          <p className="text-sm text-gray-500">
                            ⏱️ {test.estimatedTime}분
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to={`/tests?category=${encodeURIComponent(category.name)}`}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  {category.name} 테스트 전체보기 →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
