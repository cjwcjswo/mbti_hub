import { HomePageData } from '../types'

export const mockHomePageData: HomePageData = {
  popularTests: [
    {
      id: '1',
      title: '연애 스타일 MBTI 테스트',
      description: '당신의 연애 스타일을 알아보세요',
      category: { id: 1, name: '연애', emoji: '💕', description: '연애 관련 테스트', color: 'bg-pink-100 text-pink-700' },
      estimatedTime: 5,
      difficulty: 'medium',
      thumbnail: '💕'
    },
    {
      id: '2',
      title: '디즈니 캐릭터 MBTI 테스트',
      description: '당신과 가장 닮은 디즈니 캐릭터는?',
      category: { id: 2, name: '엔터테인먼트', emoji: '🎬', description: '엔터테인먼트 관련 테스트', color: 'bg-purple-100 text-purple-700' },
      estimatedTime: 8,
      difficulty: 'easy',
      thumbnail: '🏰'
    },
    {
      id: '3',
      title: '에겐남/에겐녀 vs 테토남/테토녀 MBTI',
      description: '2025년 최고 인기 밈으로 알아보는 성격 유형',
      category: { id: 3, name: '트렌드', emoji: '🔥', description: '트렌드 관련 테스트', color: 'bg-orange-100 text-orange-700' },
      estimatedTime: 10,
      difficulty: 'easy',
      thumbnail: '🧬'
    },
    {
      id: '4',
      title: '직업 성향 MBTI 테스트',
      description: '당신에게 가장 적합한 직업은?',
      category: { id: 4, name: '진로', emoji: '💼', description: '진로 관련 테스트', color: 'bg-blue-100 text-blue-700' },
      estimatedTime: 12,
      difficulty: 'hard',
      thumbnail: '💼'
    }
  ],
  categories: [
    {
      id: 1,
      name: '연애',
      emoji: '💕',
      description: '연애 관련 MBTI 테스트들을 확인해보세요',
      color: 'bg-pink-100 text-pink-700',
      created_at: '2025-01-01T00:00:00Z',
      tests: [
        {
          id: '1',
          title: '연애 스타일 MBTI 테스트',
          description: '당신의 연애 스타일을 알아보세요',
          category: { id: 1, name: '연애', emoji: '💕', description: '연애 관련 테스트', color: 'bg-pink-100 text-pink-700' },
          estimatedTime: 5,
          difficulty: 'medium',
          thumbnail: '💕'
        },
        {
          id: '5',
          title: '연인과의 궁합 MBTI 테스트',
          description: '연인과의 MBTI 궁합을 확인해보세요',
          category: { id: 1, name: '연애', emoji: '💕', description: '연애 관련 테스트', color: 'bg-pink-100 text-pink-700' },
          estimatedTime: 7,
          difficulty: 'easy',
          thumbnail: '💑'
        }
      ]
    },
    {
      id: 2,
      name: '엔터테인먼트',
      emoji: '🎬',
      description: '엔터테인먼트 관련 MBTI 테스트들을 확인해보세요',
      color: 'bg-purple-100 text-purple-700',
      created_at: '2025-01-01T00:00:00Z',
      tests: [
        {
          id: '2',
          title: '디즈니 캐릭터 MBTI 테스트',
          description: '당신과 가장 닮은 디즈니 캐릭터는?',
          category: '엔터테인먼트',
          estimatedTime: 8,
          difficulty: 'easy',
          thumbnail: '🏰'
        },
        {
          id: '6',
          title: 'K-POP 아이돌 MBTI 테스트',
          description: '당신과 가장 닮은 K-POP 아이돌은?',
          category: '엔터테인먼트',
          estimatedTime: 6,
          difficulty: 'easy',
          thumbnail: '🎤'
        }
      ]
    },
    {
      name: '트렌드',
      emoji: '🔥',
      description: '트렌드 관련 MBTI 테스트들을 확인해보세요',
      color: 'bg-orange-100 text-orange-700',
      tests: [
        {
          id: '3',
          title: '에겐남/에겐녀 vs 테토남/테토녀 MBTI',
          description: '2025년 최고 인기 밈으로 알아보는 성격 유형',
          category: '트렌드',
          estimatedTime: 10,
          difficulty: 'easy',
          thumbnail: '🧬'
        },
        {
          id: '7',
          title: '2025년 트렌드 MBTI 테스트',
          description: '2025년 트렌드로 알아보는 성격 유형',
          category: '트렌드',
          estimatedTime: 8,
          difficulty: 'medium',
          thumbnail: '🔥'
        }
      ]
    },
    {
      name: '진로',
      emoji: '🎯',
      description: '진로 관련 MBTI 테스트들을 확인해보세요',
      color: 'bg-blue-100 text-blue-700',
      tests: [
        {
          id: '4',
          title: '직업 성향 MBTI 테스트',
          description: '당신에게 가장 적합한 직업은?',
          category: '진로',
          estimatedTime: 12,
          difficulty: 'hard',
          thumbnail: '💼'
        },
        {
          id: '8',
          title: '학과 선택 MBTI 테스트',
          description: 'MBTI로 알아보는 적성에 맞는 학과',
          category: '진로',
          estimatedTime: 10,
          difficulty: 'medium',
          thumbnail: '🎓'
        }
      ]
    }
  ]
}
