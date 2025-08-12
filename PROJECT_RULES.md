# MBTI Hub 프로젝트 규칙

## 🌏 언어 규칙

### 기본 규칙
- **사용자가 영어로 질문해도 한글로 답변**
- 모든 코드 주석은 한글로 작성
- 모든 변수명, 함수명은 영어로 작성 (코딩 표준 준수)
- 모든 UI 텍스트는 한글로 표시

### 적용 범위
- ✅ 코드 주석
- ✅ README 문서
- ✅ 에러 메시지
- ✅ 사용자 인터페이스
- ✅ 개발 가이드라인
- ❌ 코드 변수명/함수명 (영어 유지)

## 📁 프로젝트 구조

```
mbti-hub/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── hooks/         # 커스텀 훅
│   ├── utils/         # 유틸리티 함수
│   ├── types/         # TypeScript 타입 정의
│   ├── assets/        # 이미지, 폰트 등
│   ├── data/          # 정적 데이터
│   └── styles/        # 글로벌 스타일
├── scripts/           # 자동화 스크립트
├── data/              # AI 생성 테스트 데이터
└── public/            # 정적 파일
```

## 🎯 개발 가이드라인

### 1. 컴포넌트 작성 규칙
```typescript
// ✅ 좋은 예시
const TestPage: React.FC = () => {
  // 테스트 진행 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  // 사용자 답변 처리 함수
  const handleAnswerSelect = (questionId: number, optionId: number) => {
    // 답변 로직 구현
  }
  
  return (
    <div>
      {/* 테스트 진행률 표시 */}
      <ProgressBar />
    </div>
  )
}
```

### 2. 스타일링 규칙
- Styled Components 사용
- 일관된 색상 팔레트 적용
- 반응형 디자인 필수

### 3. 상태 관리 규칙
- React Query로 서버 상태 관리
- 로컬 상태는 useState/useReducer 사용
- 전역 상태는 Context API 사용

## 🤖 AI 자동화 규칙

### 테스트 생성 프로세스
1. **AI가 질문 생성** → `scripts/generateTest.js`
2. **파일로 추출** → `data/tests/` 폴더
3. **데이터 파싱** → `scripts/parseTests.js`
4. **웹페이지 자동 생성** → `src/data/`

### 템플릿 구조
```json
{
  "id": "테스트_고유_ID",
  "title": "테스트 제목",
  "description": "테스트 설명",
  "category": "카테고리",
  "questions": [
    {
      "id": 1,
      "text": "질문 내용",
      "options": [
        {
          "id": 1,
          "text": "선택지 내용",
          "scores": {"E": 2, "I": 0}
        }
      ]
    }
  ]
}
```

## 💰 수익화 규칙

### 광고 시스템
- **구글 애드센스**: 전면 광고, 배너 광고
- **쿠팡 파트너스**: 제휴 링크, 상품 추천
- **광고 배치**: 헤더, 푸터, 콘텐츠 사이

### 환경 변수 설정
```env
# 광고 설정
VITE_GOOGLE_ADSENSE_ID=ca-pub-xxxxxxxxxx
VITE_COUPANG_PARTNERS_ID=xxxxxxxxxx

# API 설정
VITE_API_URL=https://api.mbtihub.com
```

## 🚀 배포 규칙

### 빌드 프로세스
1. `npm run build` - 프로덕션 빌드
2. `npm run preview` - 빌드 결과 미리보기
3. Vercel/Netlify 배포

### 환경별 설정
- **개발**: `NODE_ENV=development`
- **스테이징**: `NODE_ENV=staging`
- **프로덕션**: `NODE_ENV=production`

## 📝 문서화 규칙

### 코드 주석
```typescript
/**
 * MBTI 테스트 결과를 계산하는 함수
 * @param answers 사용자 답변 배열
 * @returns MBTI 유형과 점수
 */
const calculateMBTIResult = (answers: Answer[]): MBTIResult => {
  // 계산 로직
}
```

### README 작성
- 프로젝트 개요
- 설치 및 실행 방법
- 주요 기능 설명
- 기술 스택 정보
- 기여 가이드라인

## 🔧 개발 도구 규칙

### 필수 도구
- **에디터**: VS Code
- **확장 프로그램**: 
  - TypeScript
  - ESLint
  - Prettier
  - Styled Components

### 코드 품질
- ESLint 규칙 준수
- Prettier 자동 포맷팅
- TypeScript 엄격 모드 사용

## 📞 커뮤니케이션 규칙

### 이슈 보고
- 한글로 상세한 설명
- 스크린샷 첨부
- 재현 단계 명시

### 코드 리뷰
- 건설적인 피드백
- 한글로 코멘트 작성
- 코드 개선 제안

---

**마지막 업데이트**: 2024년 12월
**버전**: 1.0.0
