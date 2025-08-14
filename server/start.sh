#!/bin/bash

# 가상환경 활성화
source /opt/venv/bin/activate

# 데이터베이스 마이그레이션
echo "Running database migrations..."
python manage.py migrate

# 시드 데이터 생성
echo "Creating seed data..."
python manage.py seed_data

# Django 서버 시작
echo "Starting Django server..."
gunicorn mbti_hub.wsgi:application --bind 0.0.0.0:$PORT
