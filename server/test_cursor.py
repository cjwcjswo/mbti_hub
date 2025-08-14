"""
Cursor Python 기능 테스트 파일
Ctrl+우클릭으로 함수 정의로 이동하는 기능을 테스트합니다.
"""

from django.http import JsonResponse
from rest_framework import serializers
from api.models import Category, Test, Question

def test_function():
    """테스트 함수 - Ctrl+우클릭으로 이 함수로 이동할 수 있어야 합니다."""
    return "Hello from test function"

class TestSerializer(serializers.ModelSerializer):
    """테스트 시리얼라이저 - Ctrl+우클릭으로 클래스 정의로 이동할 수 있어야 합니다."""
    class Meta:
        model = Test
        fields = ['id', 'title', 'description']

def get_test_data():
    """테스트 데이터를 반환하는 함수"""
    categories = Category.objects.all()
    tests = Test.objects.select_related('category').all()
    
    return {
        'categories': list(categories),
        'tests': list(tests)
    }

if __name__ == "__main__":
    # 이 파일을 직접 실행할 때의 테스트 코드
    result = test_function()
    print(result)
    
    # Django 모델 테스트
    try:
        data = get_test_data()
        print(f"Found {len(data['categories'])} categories and {len(data['tests'])} tests")
    except Exception as e:
        print(f"Error: {e}")

