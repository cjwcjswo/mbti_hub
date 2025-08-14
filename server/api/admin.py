from django.contrib import admin
from .models import Category, Test, Question, QuestionOption, TestResult

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'emoji', 'color', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']
    ordering = ['name']

@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'difficulty', 'estimated_time', 'created_at']
    list_filter = ['category', 'difficulty', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['-created_at']
    list_select_related = ['category']

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['text', 'test', 'order', 'created_at']
    list_filter = ['test', 'created_at']
    search_fields = ['text']
    ordering = ['test', 'order']
    list_select_related = ['test']

@admin.register(QuestionOption)
class QuestionOptionAdmin(admin.ModelAdmin):
    list_display = ['text', 'question', 'order', 'created_at']
    list_filter = ['question__test', 'created_at']
    search_fields = ['text']
    ordering = ['question', 'order']
    list_select_related = ['question']

@admin.register(TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ['mbti_type', 'test', 'title', 'time_spent', 'created_at']
    list_filter = ['mbti_type', 'test', 'created_at']
    search_fields = ['mbti_type', 'title', 'description']
    ordering = ['-created_at']
    list_select_related = ['test']
    readonly_fields = ['created_at']
