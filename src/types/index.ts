// MBTI 테스트 관련 타입 정의
export interface Question {
  id: number
  text: string
  options: QuestionOption[]
  category?: string
}

export interface QuestionOption {
  id: number
  text: string
  scores: {
    [key: string]: number // MBTI 유형별 점수
  }
}

export interface Test {
  id: string
  title: string
  description: string
  category: string
  questions: Question[]
  estimatedTime: number // 분 단위
  difficulty: 'easy' | 'medium' | 'hard'
  thumbnail?: string
  resultTypes?: MBTIResult[]
  createdAt?: string
  updatedAt?: string
  tags?: string[]
}

// Django API 응답에 맞는 카테고리 타입
export interface Category {
  id: number
  name: string
  emoji: string
  description: string
  color: string
  created_at: string
  tests: TestCard[]
}

// 홈페이지에서 사용하는 통합 테스트 타입
export interface TestCard {
  id: string
  title: string
  description: string
  category: {
    id: number
    name: string
    emoji: string
    description: string
    color: string
  }
  estimatedTime: number
  difficulty: 'easy' | 'medium' | 'hard'
  thumbnail: string
}

// 홈페이지 데이터 타입
export interface HomePageData {
  popularTests: TestCard[]
  categories: Category[]
}

export interface MBTIResult {
  mbtiType: string // 예: 'INTJ', 'ENFP' 등
  title: string
  description: string
  characteristics: string[]
  strengths: string[]
  weaknesses: string[]
  compatibility: {
    best: string[]
    good: string[]
    challenging: string[]
  }
  percentage: {
    E: number
    I: number
    N: number
    S: number
    F: number
    T: number
    P: number
    J: number
  }
  careerSuggestions?: string[]
  type?: string // 기존 호환성을 위해 유지
}

export interface TestResult {
  testId: string
  answers: Answer[]
  result: MBTIResult
  completedAt: string
  timeSpent: number // 초 단위
}

export interface Answer {
  questionId: number
  selectedOptionId: string
}

// 광고 관련 타입
export interface AdConfig {
  enabled: boolean
  googleAdsense?: {
    clientId: string
    adSlots: AdSlot[]
  }
  coupangPartners?: {
    accessKey: string
    secretKey: string
    trackingId: string
  }
}

export interface AdSlot {
  id: string
  adUnitPath: string
  size: [number, number]
  position: 'top' | 'bottom' | 'sidebar' | 'inline'
}

// API 응답 타입
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 페이지네이션 타입
export interface PaginationParams {
  page?: number
  pageSize?: number
  search?: string
  category?: string
  difficulty?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next?: string
  previous?: string
  page: number
  totalPages: number
}
