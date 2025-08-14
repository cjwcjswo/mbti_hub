#!/usr/bin/env python
"""
SQLite 데이터를 PostgreSQL로 마이그레이션하기 위한 백업 스크립트
"""

import os
import sys
import django
from datetime import datetime

# Django 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mbti_hub.settings')
django.setup()

from api.models import Category, Test, Question, QuestionOption, TestResult

def backup_sqlite_data():
    """SQLite 데이터를 JSON 형태로 백업"""
    
    backup_data = {
        'timestamp': datetime.now().isoformat(),
        'categories': [],
        'tests': [],
        'questions': [],
        'question_options': [],
        'test_results': []
    }
    
    # 카테고리 백업
    for category in Category.objects.all():
        backup_data['categories'].append({
            'id': category.pk,
            'name': category.name,
            'emoji': category.emoji,
            'description': category.description,
            'color': category.color,
            'created_at': category.created_at.isoformat(),
            'updated_at': category.updated_at.isoformat(),
        })
    
    # 테스트 백업
    for test in Test.objects.all():
        backup_data['tests'].append({
            'id': test.pk,
            'title': test.title,
            'description': test.description,
            'category_id': test.category.pk,
            'estimated_time': test.estimated_time,
            'difficulty': test.difficulty,
            'thumbnail': test.thumbnail,
            'created_at': test.created_at.isoformat(),
            'updated_at': test.updated_at.isoformat(),
        })
    
    # 질문 백업
    for question in Question.objects.all():
        backup_data['questions'].append({
            'id': question.pk,
            'test_id': question.test.pk,
            'text': question.text,
            'order': question.order,
            'created_at': question.created_at.isoformat(),
            'updated_at': question.updated_at.isoformat(),
        })
    
    # 질문 옵션 백업
    for option in QuestionOption.objects.all():
        backup_data['question_options'].append({
            'id': option.pk,
            'question_id': option.question.pk,
            'text': option.text,
            'order': option.order,
            'scores': option.scores,
            'created_at': option.created_at.isoformat(),
            'updated_at': option.updated_at.isoformat(),
        })
    
    # 테스트 결과 백업
    for result in TestResult.objects.all():
        backup_data['test_results'].append({
            'id': result.pk,
            'test_id': result.test.pk,
            'mbti_type': result.mbti_type,
            'title': result.title,
            'description': result.description,
            'characteristics': result.characteristics,
            'strengths': result.strengths,
            'weaknesses': result.weaknesses,
            'compatibility': result.compatibility,
            'percentage': result.percentage,
            'answers': result.answers,
            'time_spent': result.time_spent,
            'created_at': result.created_at.isoformat(),
        })
    
    # JSON 파일로 저장
    import json
    backup_filename = f'sqlite_backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
    
    with open(backup_filename, 'w', encoding='utf-8') as f:
        json.dump(backup_data, f, ensure_ascii=False, indent=2)
    
    print(f"백업 완료: {backup_filename}")
    print(f"총 {len(backup_data['categories'])} 개 카테고리")
    print(f"총 {len(backup_data['tests'])} 개 테스트")
    print(f"총 {len(backup_data['questions'])} 개 질문")
    print(f"총 {len(backup_data['question_options'])} 개 옵션")
    print(f"총 {len(backup_data['test_results'])} 개 결과")

if __name__ == '__main__':
    backup_sqlite_data()