// API 설정 파일
const isDevelopment = import.meta.env.DEV;

// 개발 환경에서는 로컬 서버, 프로덕션에서는 Railway 서버 사용
export const API_BASE_URL = isDevelopment
  ? 'http://localhost:8000/api'
  : import.meta.env.VITE_API_BASE_URL || 'https://your-railway-app-name.railway.app/api';

// API 엔드포인트들
export const API_ENDPOINTS = {
  HOME: `${API_BASE_URL}/home/`,
  TESTS: `${API_BASE_URL}/tests/`,
  TEST_DETAIL: (id: string) => `${API_BASE_URL}/tests/${id}/`,
  CATEGORIES: `${API_BASE_URL}/categories/`,
  TEST_RESULTS: `${API_BASE_URL}/test-results/`,
} as const;