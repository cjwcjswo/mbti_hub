# 🚀 MBTI Hub 배포 가이드 (Vercel + Railway)

## 📋 사전 준비사항

### 1. GitHub 저장소 생성
- GitHub에 프로젝트를 업로드
- 저장소를 public으로 설정 (무료 플랜 사용 시)

### 2. 계정 생성
- [Vercel](https://vercel.com) 계정 생성
- [Railway](https://railway.app) 계정 생성

---

## 🔧 백엔드 배포 (Railway)

### 1단계: Railway 프로젝트 생성

1. **Railway 대시보드 접속**
   - https://railway.app 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "New Project" 클릭
   - "Deploy from GitHub repo" 선택
   - MBTI Hub 저장소 선택
   - "Deploy Now" 클릭

3. **서비스 설정**
   - 프로젝트가 생성되면 자동으로 서버 폴더를 인식
   - Python 프로젝트로 자동 설정됨

### 2단계: PostgreSQL 데이터베이스 추가

1. **데이터베이스 추가**
   - 프로젝트에서 "New" 클릭
   - "Database" → "PostgreSQL" 선택
   - 데이터베이스가 생성됨

2. **환경 변수 설정**
   - PostgreSQL 서비스에서 "Connect" 탭 클릭
   - "Variables" 탭에서 다음 환경 변수 설정:

```env
DB_ENGINE=django.db.backends.postgresql
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=[Railway에서 제공하는 비밀번호]
DB_HOST=[Railway에서 제공하는 호스트]
DB_PORT=5432
SECRET_KEY=your-secret-key-here
DEBUG=False
```

### 3단계: Django 앱 배포

1. **빌드 설정 확인**
   - Railway가 자동으로 `requirements.txt`를 인식
   - `Procfile`이 올바르게 설정되어 있는지 확인

2. **배포 실행**
   - "Deploy" 버튼 클릭
   - 배포 로그 확인

3. **마이그레이션 실행**
   - 배포 완료 후 "Deployments" 탭에서 최신 배포 클릭
   - "View Logs"에서 다음 명령어 실행:

```bash
python manage.py migrate
python manage.py seed_data
```

### 4단계: 도메인 확인

1. **배포 URL 확인**
   - Railway 대시보드에서 배포된 URL 확인
   - 예: `https://your-app-name.railway.app`

2. **API 테스트**
   - 브라우저에서 `https://your-app-name.railway.app/api/home/` 접속
   - JSON 응답 확인

---

## 🎨 프론트엔드 배포 (Vercel)

### 1단계: Vercel 프로젝트 생성

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 생성**
   - "New Project" 클릭
   - MBTI Hub 저장소 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - Framework Preset: Vite
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 2단계: 환경 변수 설정

1. **API URL 설정**
   - "Environment Variables" 섹션에서 다음 추가:

```env
VITE_API_BASE_URL=https://your-railway-app-name.railway.app/api
```

2. **API 설정 파일 업데이트**
   - `src/config/api.ts` 파일에서 Railway URL로 업데이트:

```typescript
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8000/api'
  : 'https://your-railway-app-name.railway.app/api';
```

### 3단계: 배포 실행

1. **배포 시작**
   - "Deploy" 버튼 클릭
   - 빌드 과정 모니터링

2. **배포 완료 확인**
   - 배포된 URL 확인
   - 예: `https://mbti-hub.vercel.app`

---

## 🔗 도메인 연결

### 커스텀 도메인 설정 (선택사항)

1. **Vercel 도메인 설정**
   - Vercel 프로젝트 → "Settings" → "Domains"
   - 커스텀 도메인 추가
   - DNS 설정 안내에 따라 도메인 설정

2. **Railway 도메인 설정**
   - Railway 프로젝트 → "Settings" → "Domains"
   - 커스텀 도메인 추가

---

## 🧪 배포 후 테스트

### 1. 프론트엔드 테스트
- Vercel URL에서 홈페이지 접속
- 모든 페이지 정상 작동 확인
- API 호출 정상 작동 확인

### 2. 백엔드 테스트
- Railway URL에서 API 엔드포인트 테스트
- 데이터베이스 연결 확인
- 마이그레이션 완료 확인

### 3. 통합 테스트
- 프론트엔드에서 백엔드 API 호출 테스트
- CORS 설정 확인
- 전체 워크플로우 테스트

---

## 🔧 문제 해결

### 일반적인 문제들

1. **CORS 오류**
   - Django CORS 설정 확인
   - Vercel 도메인을 CORS_ALLOWED_ORIGINS에 추가

2. **데이터베이스 연결 오류**
   - Railway 환경 변수 확인
   - PostgreSQL 서비스 상태 확인

3. **빌드 오류**
   - Vercel 빌드 로그 확인
   - 의존성 설치 문제 확인

4. **API 호출 실패**
   - Railway 서비스 상태 확인
   - 환경 변수 설정 확인

---

## 📊 모니터링

### Vercel 모니터링
- Analytics 탭에서 트래픽 확인
- Functions 탭에서 API 호출 모니터링

### Railway 모니터링
- Metrics 탭에서 리소스 사용량 확인
- Logs 탭에서 애플리케이션 로그 확인

---

## 💰 비용 관리

### Vercel 무료 플랜
- 월 100GB 대역폭
- 월 100시간 함수 실행
- 개인 프로젝트 무제한

### Railway 무료 플랜
- 월 $5 크레딧
- PostgreSQL 데이터베이스 포함
- 충분한 개발/테스트 용량

---

## 🔄 업데이트 배포

### 자동 배포
- GitHub에 push하면 자동 배포
- Vercel과 Railway 모두 자동 배포 지원

### 수동 배포
- Vercel: "Redeploy" 버튼
- Railway: "Deploy" 버튼

---

## 📞 지원

문제가 발생하면:
1. 배포 로그 확인
2. 환경 변수 설정 확인
3. 서비스 상태 확인
4. 필요시 서비스 재시작