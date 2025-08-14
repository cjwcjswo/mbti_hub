from rest_framework import serializers
from .models import Category, Test, Question, QuestionOption, TestResult

class CategorySerializer(serializers.ModelSerializer):
    """카테고리 시리얼라이저"""
    class Meta:
        model = Category
        fields = ['id', 'name', 'emoji', 'description', 'color', 'created_at']

class QuestionOptionSerializer(serializers.ModelSerializer):
    """질문 옵션 시리얼라이저"""
    class Meta:
        model = QuestionOption
        fields = ['id', 'text', 'order', 'scores']

class QuestionSerializer(serializers.ModelSerializer):
    """질문 시리얼라이저"""
    options = QuestionOptionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = ['id', 'text', 'order', 'options']

class TestSerializer(serializers.ModelSerializer):
    """테스트 시리얼라이저"""
    category = CategorySerializer(read_only=True)
    questions = QuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Test
        fields = [
            'id', 'title', 'description', 'category', 
            'estimated_time', 'difficulty', 'thumbnail',
            'questions', 'created_at'
        ]

class TestListSerializer(serializers.ModelSerializer):
    """테스트 목록용 시리얼라이저 (간단한 정보만)"""
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Test
        fields = [
            'id', 'title', 'description', 'category',
            'estimated_time', 'difficulty', 'thumbnail'
        ]

class CategoryWithTestsSerializer(serializers.ModelSerializer):
    """테스트가 포함된 카테고리 시리얼라이저"""
    tests = TestListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'emoji', 'description', 'color', 'tests']

class TestResultSerializer(serializers.ModelSerializer):
    """테스트 결과 시리얼라이저"""
    test = TestListSerializer(read_only=True)
    
    class Meta:
        model = TestResult
        fields = [
            'id', 'test', 'mbti_type', 'title', 'description',
            'characteristics', 'strengths', 'weaknesses',
            'compatibility', 'percentage', 'time_spent', 'created_at'
        ]

class TestResultCreateSerializer(serializers.ModelSerializer):
    """테스트 결과 생성용 시리얼라이저"""
    class Meta:
        model = TestResult
        fields = [
            'test', 'mbti_type', 'title', 'description',
            'characteristics', 'strengths', 'weaknesses',
            'compatibility', 'percentage', 'answers', 'time_spent'
        ]
