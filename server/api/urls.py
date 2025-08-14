from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# 라우터 설정
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'tests', views.TestViewSet)
router.register(r'results', views.TestResultViewSet)

urlpatterns = [
    # 라우터 URL
    path('', include(router.urls)),
    
    # 홈페이지 데이터
    path('home/', views.home_data, name='home_data'),
]
