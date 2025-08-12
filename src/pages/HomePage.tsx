import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TestCard, Category, HomePageData } from '../types'
import { mockHomePageData } from '../data/mockData'

const HomePage = () => {
  const [homePageData, setHomePageData] = useState<HomePageData>({
    popularTests: [],
    categories: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API 호출 함수
  const fetchHomePageData = async (): Promise<HomePageData> => {
    try {
      // 실제 API 호출 시에는 아래 주석을 해제하고 사용
      // const response = await fetch('/api/home')
      // if (!response.ok) throw new Error('Failed to fetch home page data')
      // return await response.json()
      
      // Mock 데이터 반환 (개발/테스트용)
      await new Promise(resolve => setTimeout(resolve, 500)) // 로딩 시뮬레이션
      return mockHomePageData
    } catch (error) {
      console.error('Error fetching home page data:', error)
      throw error
    }
  }

  // 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await fetchHomePageData()
        setHomePageData(data)
      } catch (error) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.')
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getCategoryInfo = (categoryName: string): Category | undefined => {
    return homePageData.categories.find(cat => cat.name === categoryName)
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-400 to-secondary-500 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-5xl font-bold mb-6 md:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MBTI Hub에 오신 것을 환영합니다
          </motion.h1>
          <motion.p
            className="text-xl mb-8 opacity-90 md:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            다양한 MBTI 성격 유형 테스트로 당신의 성격을 더 깊이 알아보세요
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/tests"
              className="inline-block bg-white text-primary-400 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
            >
              테스트 시작하기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Popular Tests Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🔥 인기 테스트</h2>
            <p className="text-gray-600 text-lg">지금 가장 인기 있는 MBTI 테스트들을 확인해보세요</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {homePageData.popularTests.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <Link to={`/test/${test.id}`} className="block">
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">{test.thumbnail}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {test.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {test.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                        {test.category}
                      </span>
                      <span>{test.estimatedTime}분</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/tests"
              className="inline-block bg-gradient-to-r from-primary-400 to-secondary-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
            >
              모든 테스트 보기 →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category Tests Sections */}
      {homePageData.categories.map((category, categoryIndex) => (
        <section key={category.name} className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {category.emoji} {category.name} 테스트
              </h2>
              <p className="text-gray-600 text-lg">{category.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {category.tests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <Link to={`/test/${test.id}`} className="block">
                    <div className="p-6">
                      <div className="text-4xl mb-4 text-center">{test.thumbnail}</div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {test.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {test.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className={`${category.color} px-2 py-1 rounded-full`}>
                          {test.difficulty === 'easy' ? '쉬움' : test.difficulty === 'medium' ? '보통' : '어려움'}
                        </span>
                        <span>{test.estimatedTime}분</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                to={`/tests?category=${category.name}`}
                className="inline-block bg-gradient-to-r from-primary-400 to-secondary-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
              >
                {category.name} 테스트 전체보기 →
              </Link>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  )
}

export default HomePage
