# PostgreSQL 마이그레이션 완료!

## 다음 단계를 따라주세요:

### 1. PostgreSQL 설치 및 설정
- `POSTGRESQL_SETUP.md` 파일을 참고하여 PostgreSQL을 설치하세요
- 데이터베이스 `mbti_hub`를 생성하세요

### 2. 환경 변수 설정
`.env` 파일에서 실제 데이터베이스 정보를 입력하세요:
```env
DB_PASSWORD=your_actual_password
```

### 3. 기존 SQLite 데이터 백업 (선택사항)
```bash
python backup_sqlite.py
```

### 4. 의존성 설치
```bash
pip install -r requirements.txt
```

### 5. 마이그레이션 실행
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. 시드 데이터 생성
```bash
python manage.py seed_data
```

### 7. 서버 실행
```bash
python manage.py runserver
```

## 주의사항
- `.env` 파일은 절대 Git에 커밋하지 마세요
- 프로덕션 환경에서는 강력한 비밀번호를 사용하세요
- 데이터베이스 연결이 실패하면 `POSTGRESQL_SETUP.md`의 문제 해결 섹션을 참고하세요