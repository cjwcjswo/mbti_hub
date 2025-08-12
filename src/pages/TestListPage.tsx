import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Test } from '../types'

const TestListPage = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTests();
  }, []);

  useEffect(() => {
    filterTests();
  }, [tests, activeFilter]);

  const loadTests = async () => {
    try {
      const mockTests: Test[] = [
        {
          id: 'test_1',
          title: '연애 MBTI 테스트',
          description: '연애 스타일에 따른 MBTI 성격 유형을 알아보세요!',
          category: '연애',
          questions: [],
          estimatedTime: 5,
          difficulty: 'medium',
          tags: ['연애', 'MBTI', '성격테스트']
        },
        {
          id: 'test_2',
          title: '직장생활 MBTI 테스트',
          description: '직장에서의 행동 패턴을 통해 MBTI를 분석해보세요.',
          category: '직장생활',
          questions: [],
          estimatedTime: 7,
          difficulty: 'hard',
          tags: ['직장생활', 'MBTI', '성격테스트']
        }
      ];
      
      setTests(mockTests);
      setLoading(false);
    } catch (error) {
      console.error('테스트 로드 실패:', error);
      setLoading(false);
    }
  };

  const filterTests = () => {
    if (activeFilter === 'all') {
      setFilteredTests(tests);
    } else {
      const filtered = tests.filter(test => 
        (test.tags && test.tags.includes(activeFilter)) || test.category === activeFilter
      );
      setFilteredTests(filtered);
    }
  };

  const categories = [
    { id: 'all', name: '전체' },
    { id: '연애', name: '연애' },
    { id: '직장생활', name: '직장생활' },
    { id: '취미', name: '취미' },
    { id: '학습', name: '학습' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-center mb-8">MBTI 테스트 목록</h1>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          다양한 주제의 MBTI 테스트를 통해 당신의 성격을 더 깊이 알아보세요.
        </p>

        {/* 필터 버튼 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === category.id
                  ? 'bg-primary-400 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 테스트 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty === 'easy' ? '쉬움' : test.difficulty === 'medium' ? '보통' : '어려움'}
                  </span>
                  <span className="text-sm text-gray-500">{test.estimatedTime}분</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                <p className="text-gray-600 mb-4">{test.description}</p>
                
                <Link
                  to={`/test/${test.id}`}
                  className="block w-full bg-gradient-to-r from-primary-400 to-secondary-500 text-white text-center py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  테스트 시작
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">해당 카테고리의 테스트가 없습니다.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TestListPage;
