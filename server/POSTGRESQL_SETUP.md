# PostgreSQL 설정 가이드

## 1. PostgreSQL 설치

### Windows
1. [PostgreSQL 공식 사이트](https://www.postgresql.org/download/windows/)에서 다운로드
2. 설치 시 비밀번호를 기억해두세요
3. 기본 포트는 5432입니다

### macOS
```bash
brew install postgresql
brew services start postgresql
```

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## 2. 데이터베이스 생성

### PostgreSQL 접속
```bash
# Windows (pgAdmin 또는 psql 사용)
psql -U postgres

# macOS/Linux
sudo -u postgres psql
```

### 데이터베이스 및 사용자 생성
```sql
-- 데이터베이스 생성
CREATE DATABASE mbti_hub;

-- 사용자 생성 (선택사항)
CREATE USER mbti_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE mbti_hub TO mbti_user;

-- PostgreSQL 종료
\q
```

## 3. 환경 변수 설정

`.env` 파일을 편집하여 실제 데이터베이스 정보를 입력하세요:

```env
# Database Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=mbti_hub
DB_USER=postgres  # 또는 생성한 사용자명
DB_PASSWORD=your_actual_password
DB_HOST=localhost
DB_PORT=5432
```

## 4. Django 마이그레이션

```bash
# 가상환경 활성화
source venv/bin/activate  # Linux/macOS
# 또는
venv\Scripts\activate  # Windows

# 의존성 설치
pip install -r requirements.txt

# 마이그레이션 생성
python manage.py makemigrations

# 마이그레이션 적용
python manage.py migrate

# 시드 데이터 생성
python manage.py seed_data
```

## 5. 서버 실행

```bash
python manage.py runserver
```

## 6. 문제 해결

### 연결 오류
- PostgreSQL 서비스가 실행 중인지 확인
- 비밀번호가 올바른지 확인
- 포트가 5432인지 확인

### 권한 오류
- 데이터베이스 사용자에게 적절한 권한이 있는지 확인
- `pg_hba.conf` 파일에서 로컬 연결 허용 확인

### 의존성 오류
```bash
pip install psycopg2-binary
```

## 7. 개발/프로덕션 환경 분리

### 개발 환경 (.env.development)
```env
DEBUG=True
DB_PASSWORD=dev_password
```

### 프로덕션 환경 (.env.production)
```env
DEBUG=False
DB_PASSWORD=strong_production_password
```