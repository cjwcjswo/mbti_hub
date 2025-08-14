from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Category, Test, Question, QuestionOption, TestResult
from .serializers import (
    CategorySerializer, TestSerializer, TestListSerializer,
    CategoryWithTestsSerializer, TestResultSerializer, TestResultCreateSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """카테고리 뷰셋"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']

    @action(detail=True, methods=['get'])
    def tests(self, request, pk=None):
        """카테고리별 테스트 목록"""
        category = self.get_object()
        tests = Test.objects.filter(category=category)
        serializer = TestListSerializer(tests, many=True)
        return Response({
            'success': True,
            'data': {
                'category': CategorySerializer(category).data,
                'tests': serializer.data
            }
        })

class TestViewSet(viewsets.ReadOnlyModelViewSet):
    """테스트 뷰셋"""
    queryset = Test.objects.select_related('category').prefetch_related('questions__options')
    serializer_class = TestSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'difficulty']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'created_at', 'estimated_time']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """액션에 따른 시리얼라이저 선택"""
        if self.action == 'list':
            return TestListSerializer
        return TestSerializer

    @action(detail=False, methods=['get'])
    def popular(self, request):
        """인기 테스트 목록"""
        # 최근 생성된 테스트 6개를 인기 테스트로 간주
        popular_tests = Test.objects.select_related('category').order_by('-created_at')[:6]
        serializer = TestListSerializer(popular_tests, many=True)
        return Response({
            'success': True,
            'data': serializer.data
        })

class TestResultViewSet(viewsets.ModelViewSet):
    """테스트 결과 뷰셋"""
    queryset = TestResult.objects.select_related('test')
    serializer_class = TestResultSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['test', 'mbti_type']
    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """액션에 따른 시리얼라이저 선택"""
        if self.action == 'create':
            return TestResultCreateSerializer
        return TestResultSerializer

    def create(self, request, *args, **kwargs):
        """테스트 결과 생성"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'data': TestResultSerializer(serializer.instance).data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'error': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

# 홈페이지 데이터를 위한 뷰
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home_data(request):
    """홈페이지 데이터"""
    try:
        # 인기 테스트 (최근 생성된 6개)
        popular_tests = Test.objects.select_related('category').order_by('-created_at')[:6]
        popular_tests_data = TestListSerializer(popular_tests, many=True).data

        # 카테고리별 테스트 (각 카테고리당 3개씩)
        categories = Category.objects.all()
        categories_data = []
        
        for category in categories:
            # 각 카테고리의 테스트를 3개로 제한
            category_tests = Test.objects.filter(category=category)[:3]
            category_data = dict(CategorySerializer(category).data)
            category_data['tests'] = TestListSerializer(category_tests, many=True).data
            categories_data.append(category_data)

        return Response({
            'success': True,
            'data': {
                'popularTests': popular_tests_data,
                'categories': categories_data
            }
        })
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
