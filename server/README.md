# MBTI Hub Django API Server

MBTI 테스트 플랫폼을 위한 Django REST Framework 기반 API 서버입니다.

## 🚀 기술 스택

### 핵심 기술
- **Django 5.0** - 웹 프레임워크
- **Django REST Framework 3.14** - API 개발
- **SQLite** - 개발용 데이터베이스 (프로덕션에서는 PostgreSQL 권장)
- **Django CORS Headers** - CORS 처리

### 개발 도구
- **pytest** - 테스팅
- **black** - 코드 포맷팅
- **isort** - import 정렬
- **flake8** - 린팅

## 📁 프로젝트 구조

```
server/
├── mbti_hub/          # Django 프로젝트 설정
│   ├── settings.py    # 프로젝트 설정
│   ├── urls.py        # 메인 URL 설정
│   └── wsgi.py        # WSGI 설정
├── api/               # API 앱
│   ├── models.py      # 데이터 모델
│   ├── serializers.py # DRF 시리얼라이저
│   ├── views.py       # API 뷰
│   ├── urls.py        # API URL
│   └── admin.py       # Django Admin 설정
├── manage.py          # Django 관리 명령어
├── requirements.txt   # 의존성 목록
└── README.md          # 프로젝트 문서
```

## 🛠️ 설치 및 실행

### 1. 가상환경 생성 및 활성화
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 또는
venv\Scripts\activate     # Windows
```

### 2. 의존성 설치
```bash
pip install -r requirements.txt
```

### 3. 데이터베이스 마이그레이션
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. 슈퍼유저 생성 (선택사항)
```bash
python manage.py createsuperuser
```

### 5. 개발 서버 실행
```bash
python manage.py runserver
```

서버가 `http://localhost:8000`에서 실행됩니다.

## 📚 API 엔드포인트

### 홈페이지 데이터
- `GET /api/home/` - 홈페이지에 필요한 데이터 (인기 테스트, 카테고리별 테스트)

### 카테고리
- `GET /api/categories/` - 카테고리 목록
- `GET /api/categories/{id}/` - 카테고리 상세
- `GET /api/categories/{id}/tests/` - 카테고리별 테스트 목록

### 테스트
- `GET /api/tests/` - 테스트 목록
- `GET /api/tests/{id}/` - 테스트 상세 (질문 포함)
- `GET /api/tests/popular/` - 인기 테스트 목록

### 테스트 결과
- `GET /api/results/` - 테스트 결과 목록
- `GET /api/results/{id}/` - 테스트 결과 상세
- `POST /api/results/` - 테스트 결과 생성

## 🔧 관리자 페이지

Django Admin 페이지에 접근하여 데이터를 관리할 수 있습니다:
- URL: `http://localhost:8000/admin/`
- 기본 계정: `admin` (비밀번호는 생성 시 설정)

## 🎯 주요 기능

### 1. MBTI 테스트 관리
- 카테고리별 테스트 분류
- 질문과 옵션 관리
- MBTI 점수 계산 로직

### 2. API 응답 형식
모든 API 응답은 다음과 같은 형식을 따릅니다:
```json
{
  "success": true,
  "data": { ... }
}
```

### 3. 필터링 및 검색
- 카테고리별 필터링
- 난이도별 필터링
- 제목/설명 검색
- 정렬 기능

## 🚀 배포 준비

### 프로덕션 설정
1. `DEBUG = False` 설정
2. `SECRET_KEY` 변경
3. PostgreSQL 데이터베이스 사용
4. 정적 파일 수집: `python manage.py collectstatic`
5. Gunicorn으로 서버 실행

### 환경 변수
```bash
export SECRET_KEY="your-secret-key"
export DATABASE_URL="postgresql://user:password@localhost/dbname"
export DEBUG="False"
```

## 📝 개발 가이드

### 코드 스타일
```bash
# 코드 포맷팅
black .

# import 정렬
isort .

# 린팅
flake8 .
```

### 테스팅
```bash
pytest
```

## 🔗 프론트엔드 연동

React 프론트엔드에서 API를 호출할 때:
```javascript
// 홈페이지 데이터 가져오기
const response = await fetch('http://localhost:8000/api/home/');
const data = await response.json();

// 테스트 목록 가져오기
const tests = await fetch('http://localhost:8000/api/tests/');
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
