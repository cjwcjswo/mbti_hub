from django.core.management.base import BaseCommand
from api.models import Category, Test, Question, QuestionOption

class Command(BaseCommand):
    help = 'MBTI Hub에 샘플 데이터를 생성합니다.'

    def handle(self, *args, **options):
        self.stdout.write('샘플 데이터 생성을 시작합니다...')
        
        # 카테고리 생성
        categories_data = [
            {
                'name': '성격 유형',
                'emoji': '🧠',
                'description': 'MBTI 성격 유형 테스트',
                'color': 'bg-blue-500'
            },
            {
                'name': '연애 스타일',
                'emoji': '💕',
                'description': '연애와 관련된 MBTI 테스트',
                'color': 'bg-pink-500'
            },
            {
                'name': '직업 적성',
                'emoji': '💼',
                'description': '직업과 관련된 MBTI 테스트',
                'color': 'bg-green-500'
            },
            {
                'name': '취미 생활',
                'emoji': '🎨',
                'description': '취미와 관련된 MBTI 테스트',
                'color': 'bg-purple-500'
            }
        ]
        
        categories = []
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            categories.append(category)
            if created:
                self.stdout.write(f'카테고리 생성: {category.name}')
        
        # 테스트 생성
        tests_data = [
            {
                'title': '기본 MBTI 성격 유형 테스트',
                'description': '당신의 기본적인 성격 유형을 알아보세요',
                'category': categories[0],
                'estimated_time': 10,
                'difficulty': 'easy',
                'thumbnail': '🧠'
            },
            {
                'title': '연애 스타일 MBTI 테스트',
                'description': '당신의 연애 스타일을 알아보세요',
                'category': categories[1],
                'estimated_time': 8,
                'difficulty': 'medium',
                'thumbnail': '💕'
            },
            {
                'title': '직업 적성 MBTI 테스트',
                'description': '당신에게 맞는 직업을 찾아보세요',
                'category': categories[2],
                'estimated_time': 12,
                'difficulty': 'medium',
                'thumbnail': '💼'
            },
            {
                'title': '취미 생활 MBTI 테스트',
                'description': '당신에게 맞는 취미를 찾아보세요',
                'category': categories[3],
                'estimated_time': 6,
                'difficulty': 'easy',
                'thumbnail': '🎨'
            },
            {
                'title': '디즈니 캐릭터 MBTI 테스트',
                'description': '당신과 닮은 디즈니 캐릭터를 찾아보세요',
                'category': categories[0],
                'estimated_time': 15,
                'difficulty': 'hard',
                'thumbnail': '🏰'
            },
            {
                'title': '에겐남/테토남 MBTI 테스트',
                'description': '최신 트렌드 에겐남/테토남 테스트',
                'category': categories[0],
                'estimated_time': 10,
                'difficulty': 'medium',
                'thumbnail': '⚡'
            }
        ]
        
        for test_data in tests_data:
            test, created = Test.objects.get_or_create(
                title=test_data['title'],
                defaults=test_data
            )
            if created:
                self.stdout.write(f'테스트 생성: {test.title}')
                
                # 각 테스트에 샘플 질문 추가
                questions_data = [
                    {
                        'text': '샘플 질문 1: 당신은 어떤 상황에서 더 편안함을 느끼나요?',
                        'order': 1,
                        'options': [
                            {
                                'text': '혼자 있는 시간',
                                'order': 1,
                                'scores': {'I': 2, 'E': 0}
                            },
                            {
                                'text': '사람들과 함께 있는 시간',
                                'order': 2,
                                'scores': {'E': 2, 'I': 0}
                            }
                        ]
                    },
                    {
                        'text': '샘플 질문 2: 문제를 해결할 때 어떤 방식을 선호하나요?',
                        'order': 2,
                        'options': [
                            {
                                'text': '논리적 분석',
                                'order': 1,
                                'scores': {'T': 2, 'F': 0}
                            },
                            {
                                'text': '감정적 직감',
                                'order': 2,
                                'scores': {'F': 2, 'T': 0}
                            }
                        ]
                    }
                ]
                
                for q_data in questions_data:
                    question = Question.objects.create(
                        test=test,
                        text=q_data['text'],
                        order=q_data['order']
                    )
                    
                    for opt_data in q_data['options']:
                        QuestionOption.objects.create(
                            question=question,
                            text=opt_data['text'],
                            order=opt_data['order'],
                            scores=opt_data['scores']
                        )
        
        self.stdout.write(
            self.style.SUCCESS('샘플 데이터 생성이 완료되었습니다!')
        )
