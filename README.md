# MBTI Hub

다양한 MBTI 성격 유형 테스트들을 제공하는 플랫폼 웹 서비스입니다.

## 🚀 주요 기능

- **다양한 MBTI 테스트**: 연애, 직장생활, 친구관계 등 다양한 주제의 MBTI 테스트
- **AI 기반 테스트 생성**: 최신 트렌드에 맞는 MBTI 테스트 자동 생성
- **자동화된 웹페이지 생성**: 생성된 테스트를 자동으로 웹페이지로 변환
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- **광고 수익화**: Google AdSense, 쿠팡 파트너스 연동 지원

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Styled Components, Framer Motion
- **Routing**: React Router DOM
- **State Management**: React Query
- **SEO**: React Helmet Async

## 📁 프로젝트 구조

```
mbti-hub/
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   ├── pages/              # 페이지 컴포넌트
│   ├── hooks/              # 커스텀 훅
│   ├── utils/              # 유틸리티 함수
│   ├── types/              # TypeScript 타입 정의
│   ├── assets/             # 이미지, 아이콘 등 정적 파일
│   ├── data/               # 테스트 데이터
│   └── styles/             # 전역 스타일
├── scripts/                # AI 테스트 생성 및 파싱 스크립트
├── data/                   # 원본 테스트 데이터
└── public/                 # 정적 파일
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. MBTI 테스트 생성

```bash
# AI를 통해 새로운 MBTI 테스트 생성
npm run generate-test

# 생성된 테스트를 웹페이지용으로 파싱
npm run parse-tests
```

### 4. 빌드

```bash
npm run build
```

## 📝 MBTI 테스트 생성 프로세스

1. **AI 테스트 생성**: `scripts/generateTest.js`를 통해 다양한 주제의 MBTI 테스트를 자동 생성
2. **데이터 파싱**: `scripts/parseTests.js`를 통해 생성된 테스트를 웹페이지용 데이터로 변환
3. **자동 웹페이지 생성**: 파싱된 데이터를 기반으로 테스트 페이지 자동 생성

## 🎨 테스트 템플릿 구조

```json
{
  "id": "test_id",
  "title": "테스트 제목",
  "description": "테스트 설명",
  "questions": [
    {
      "id": 1,
      "text": "질문 내용",
      "options": [
        {
          "id": "A",
          "text": "선택지 내용",
          "score": {
            "INTJ": 3,
            "INTP": 2,
            // ... 다른 MBTI 유형별 점수
          }
        }
      ]
    }
  ],
  "resultTypes": [
    {
      "type": "INTJ",
      "title": "INTJ 성격 유형",
      "description": "유형 설명",
      "characteristics": ["특성1", "특성2"],
      "strengths": ["강점1", "강점2"],
      "weaknesses": ["약점1", "약점2"],
      "careerSuggestions": ["직업1", "직업2"],
      "compatibility": ["호환유형1", "호환유형2"]
    }
  ]
}
```

## 📊 광고 수익화

### Google AdSense 설정

1. `.env` 파일에 AdSense 설정 추가:
```env
REACT_APP_ADS_ENABLED=true
REACT_APP_ADSENSE_CLIENT_ID=your_client_id
```

2. 광고 슬롯 설정:
```javascript
const adSlots = {
  header: '1234567890',
  footer: '0987654321',
  content: '1122334455',
  sidebar: '5566778899'
};
```

### 쿠팡 파트너스 설정

```env
REACT_APP_COUPANG_ACCESS_KEY=your_access_key
REACT_APP_COUPANG_SECRET_KEY=your_secret_key
REACT_APP_COUPANG_TAG_ID=your_tag_id
```

## 🔧 환경 변수

```env
# 개발 환경
NODE_ENV=development

# 광고 설정
REACT_APP_ADS_ENABLED=false
REACT_APP_ADSENSE_CLIENT_ID=
REACT_APP_COUPANG_ACCESS_KEY=
REACT_APP_COUPANG_SECRET_KEY=
REACT_APP_COUPANG_TAG_ID=

# API 설정
REACT_APP_API_URL=http://localhost:3000/api
```

## 📱 반응형 디자인

- **모바일**: 320px ~ 768px
- **태블릿**: 768px ~ 1024px
- **데스크톱**: 1024px 이상

## 🚀 배포

### Vercel 배포

1. Vercel CLI 설치:
```bash
npm i -g vercel
```

2. 배포:
```bash
vercel
```

### Netlify 배포

1. 빌드 파일 생성:
```bash
npm run build
```

2. `dist` 폴더를 Netlify에 업로드

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- 이메일: contact@mbtihub.com
- 프로젝트 링크: [https://github.com/your-username/mbti-hub](https://github.com/your-username/mbti-hub)
