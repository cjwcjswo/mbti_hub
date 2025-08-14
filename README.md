# 🧠 MBTI Hub

다양한 MBTI 테스트로 당신의 성격을 더 깊이 알아보세요!

## 🚀 배포된 서비스

- **프론트엔드**: [Vercel](https://vercel.com)에서 호스팅
- **백엔드 API**: [Railway](https://railway.app)에서 호스팅
- **데이터베이스**: PostgreSQL (Railway 제공)

## 🛠️ 기술 스택

### 프론트엔드
- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** (스타일링)
- **Framer Motion** (애니메이션)
- **React Router** (라우팅)

### 백엔드
- **Django 5.0** + **Python 3.12**
- **Django REST Framework** (API)
- **PostgreSQL** (데이터베이스)
- **Django CORS Headers** (CORS 처리)

## 📁 프로젝트 구조

```
mbti-hub/
├── src/                    # 프론트엔드 소스
│   ├── components/         # React 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── types/             # TypeScript 타입 정의
│   ├── config/            # 설정 파일
│   └── styles/            # 스타일 파일
├── server/                # 백엔드 소스
│   ├── api/               # Django 앱
│   ├── mbti_hub/          # Django 프로젝트 설정
│   └── requirements.txt   # Python 의존성
├── vercel.json           # Vercel 배포 설정
├── Procfile              # Railway 배포 설정
└── DEPLOYMENT_GUIDE.md   # 배포 가이드
```

## 🚀 로컬 개발 환경 설정

### 프론트엔드 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 백엔드 실행

```bash
# 서버 디렉토리로 이동
cd server

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Linux/macOS
# 또는
venv\Scripts\activate     # Windows

# 의존성 설치
pip install -r requirements.txt

# 환경 변수 설정
cp .env.example .env
# .env 파일에서 실제 값으로 수정

# 데이터베이스 마이그레이션
python manage.py migrate

# 시드 데이터 생성
python manage.py seed_data

# 개발 서버 실행
python manage.py runserver
```

## 🌐 API 엔드포인트

### 홈페이지 데이터
- `GET /api/home/` - 홈페이지에 필요한 데이터

### 테스트 관련
- `GET /api/tests/` - 테스트 목록
- `GET /api/tests/{id}/` - 특정 테스트 상세 정보
- `GET /api/tests/popular/` - 인기 테스트 목록

### 카테고리 관련
- `GET /api/categories/` - 카테고리 목록
- `GET /api/categories/{id}/tests/` - 카테고리별 테스트

### 테스트 결과
- `POST /api/test-results/` - 테스트 결과 저장
- `GET /api/test-results/` - 테스트 결과 목록

## 📊 데이터 모델

### Category (카테고리)
- `name`: 카테고리명
- `emoji`: 이모지
- `description`: 설명
- `color`: 색상 클래스

### Test (테스트)
- `title`: 테스트 제목
- `description`: 테스트 설명
- `category`: 카테고리 (ForeignKey)
- `estimated_time`: 예상 소요시간
- `difficulty`: 난이도 (easy/medium/hard)
- `thumbnail`: 썸네일

### Question (질문)
- `test`: 테스트 (ForeignKey)
- `text`: 질문 내용
- `order`: 순서

### QuestionOption (질문 옵션)
- `question`: 질문 (ForeignKey)
- `text`: 옵션 내용
- `order`: 순서
- `scores`: MBTI 점수 (JSON)

### TestResult (테스트 결과)
- `test`: 테스트 (ForeignKey)
- `mbti_type`: MBTI 유형
- `title`: 결과 제목
- `description`: 결과 설명
- `characteristics`: 특징
- `strengths`: 강점
- `weaknesses`: 약점
- `compatibility`: 호환성
- `percentage`: 각 지표별 퍼센트
- `answers`: 답변 데이터 (JSON)
- `time_spent`: 소요 시간

## 🎯 주요 기능

### 1. 홈페이지
- 인기 테스트 표시
- 카테고리별 테스트 분류
- 반응형 디자인

### 2. 테스트 목록
- 카테고리별 필터링
- 검색 기능
- 정렬 기능

### 3. 테스트 진행
- 단계별 질문 진행
- 답변 저장
- 진행률 표시

### 4. 결과 페이지
- MBTI 유형 표시
- 상세한 성격 분석
- 호환성 정보
- 공유 기능

## 🔧 개발 가이드

### 새로운 테스트 추가

1. **백엔드에서 데이터 생성**
   ```bash
   python manage.py shell
   ```
   
   ```python
   from api.models import Category, Test, Question, QuestionOption
   
   # 카테고리 생성
   category = Category.objects.create(
       name="새 카테고리",
       emoji="🎯",
       description="새로운 카테고리입니다"
   )
   
   # 테스트 생성
   test = Test.objects.create(
       title="새 테스트",
       description="새로운 테스트입니다",
       category=category,
       estimated_time=10,
       difficulty="medium"
   )
   
   # 질문 및 옵션 추가
   question = Question.objects.create(
       test=test,
       text="새로운 질문입니다",
       order=1
   )
   
   QuestionOption.objects.create(
       question=question,
       text="옵션 1",
       order=1,
       scores={"E": 2, "I": 0}
   )
   ```

2. **프론트엔드에서 표시**
   - 자동으로 API에서 데이터를 가져와서 표시

### 스타일 수정

- Tailwind CSS 클래스 사용
- `src/styles/global.css`에서 커스텀 스타일 추가

### 애니메이션 추가

- Framer Motion 사용
- `motion.div` 컴포넌트로 애니메이션 적용

## 🚀 배포

자세한 배포 가이드는 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)를 참조하세요.

### 빠른 배포

1. **GitHub에 코드 업로드**
2. **Railway에서 백엔드 배포**
3. **Vercel에서 프론트엔드 배포**
4. **환경 변수 설정**

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**MBTI Hub** - 당신의 성격을 더 깊이 알아보세요! 🧠✨