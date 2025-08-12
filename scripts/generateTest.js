import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체 (ES 모듈에서는 사용할 수 없음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MBTI 테스트 템플릿 생성 함수
function generateMBTITest(topic, description) {
  const testId = `test_${Date.now()}`;
  const testData = {
    id: testId,
    title: `${topic} MBTI 테스트`,
    description: description,
    category: topic, // 카테고리 추가
    questions: generateQuestions(topic),
    resultTypes: generateMBTIResults(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [topic, 'MBTI', '성격테스트'],
    estimatedTime: 5, // 5분
    difficulty: 'medium'
  };

  return testData;
}

// 질문 생성 함수
function generateQuestions(topic) {
  const questions = [];
  const questionCount = Math.floor(Math.random() * 6) + 10; // 10-15개 질문

  for (let i = 1; i <= questionCount; i++) {
    const question = {
      id: i,
      text: generateQuestionText(topic, i),
      options: generateOptions(),
      category: getRandomCategory()
    };
    questions.push(question);
  }

  return questions;
}

// 질문 텍스트 생성
function generateQuestionText(topic, questionNumber) {
  const questionTemplates = [
    `${topic} 상황에서 당신은 어떻게 행동하시나요?`,
    `${topic}에 대해 어떻게 생각하시나요?`,
    `${topic}와 관련된 상황에서 당신의 선택은?`,
    `${topic}에 직면했을 때 당신은?`,
    `${topic}에 대한 당신의 관점은?`
  ];

  return questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
}

// 선택지 생성
function generateOptions() {
  const options = [
    {
      id: 1, // number로 변경
      text: '매우 그렇다',
      scores: generateRandomScores() // 'scores'로 속성명 변경
    },
    {
      id: 2,
      text: '그렇다',
      scores: generateRandomScores()
    },
    {
      id: 3,
      text: '보통이다',
      scores: generateRandomScores()
    },
    {
      id: 4,
      text: '아니다',
      scores: generateRandomScores()
    },
    {
      id: 5,
      text: '매우 아니다',
      scores: generateRandomScores()
    }
  ];

  return options;
}

// MBTI 점수 생성
function generateRandomScores() {
  const mbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
  const scores = {};
  
  mbtiTypes.forEach(type => {
    scores[type] = Math.floor(Math.random() * 5) + 1; // 1-5점
  });

  return scores;
}

// 카테고리 랜덤 선택
function getRandomCategory() {
  const categories = ['성격', '관계', '직업', '취미', '라이프스타일', '가치관'];
  return categories[Math.floor(Math.random() * categories.length)];
}

// MBTI 결과 타입 생성
function generateMBTIResults() {
  const mbtiTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
  const results = [];

  mbtiTypes.forEach(type => {
    const result = {
      mbtiType: type, // 'type'에서 'mbtiType'으로 변경
      title: `${type} 성격 유형`,
      description: `${type} 유형의 특징적인 성격을 가지고 있습니다.`,
      characteristics: generateCharacteristics(type),
      strengths: generateStrengths(type),
      weaknesses: generateWeaknesses(type),
      careerSuggestions: generateCareerSuggestions(type),
      compatibility: generateCompatibility(type), // 객체 구조로 변경
      percentage: generatePercentage(type), // percentage 추가
      type: type // 기존 호환성을 위해 유지
    };
    results.push(result);
  });

  return results;
}

// MBTI 퍼센티지 생성
function generatePercentage(type) {
  return {
    E: type.startsWith('E') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20,
    I: type.startsWith('I') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20,
    N: type.includes('N') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20,
    S: type.includes('S') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20,
    F: type.includes('F') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20,
    T: type.includes('T') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20,
    P: type.endsWith('P') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20,
    J: type.endsWith('J') ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 20
  };
}

// 특성 생성
function generateCharacteristics(type) {
  const characteristics = [
    '분석적 사고',
    '창의적 문제해결',
    '논리적 판단',
    '직관적 통찰',
    '체계적 계획',
    '유연한 적응'
  ];
  
  return characteristics.slice(0, 4);
}

// 강점 생성
function generateStrengths(type) {
  const strengths = [
    '논리적 사고',
    '창의성',
    '리더십',
    '공감능력',
    '실용성',
    '혁신성'
  ];
  
  return strengths.slice(0, 3);
}

// 약점 생성
function generateWeaknesses(type) {
  const weaknesses = [
    '완벽주의',
    '감정적 민감성',
    '인내심 부족',
    '과도한 분석',
    '갈등 회피',
    '변화 저항'
  ];
  
  return weaknesses.slice(0, 2);
}

// 직업 제안 생성
function generateCareerSuggestions(type) {
  const careers = [
    '엔지니어',
    '디자이너',
    '교사',
    '의사',
    '변호사',
    '예술가',
    '경영자',
    '연구원'
  ];
  
  return careers.slice(0, 4);
}

// 호환성 생성 (객체 구조로 변경)
function generateCompatibility(type) {
  const allTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];
  const shuffled = allTypes.sort(() => 0.5 - Math.random());
  
  return {
    best: shuffled.slice(0, 2),
    good: shuffled.slice(2, 5),
    challenging: shuffled.slice(5, 8)
  };
}

// 메인 실행 함수
function main() {
  console.log('🚀 MBTI 테스트 생성 시작...');
  
  const topics = [
    '연애',
    '직장생활',
    '친구관계',
    '취미활동',
    '여행',
    '음식',
    '패션',
    '운동',
    '독서',
    '음악'
  ];

  topics.forEach(topic => {
    const testData = generateMBTITest(topic, `${topic}에 대한 당신의 성격 유형을 알아보세요!`);
    
    // 파일로 저장
    const fileName = `${topic}_mbti_test.json`;
    const filePath = path.join(__dirname, '..', 'data', 'tests', fileName);
    
    fs.writeFileSync(filePath, JSON.stringify(testData, null, 2), 'utf8');
    console.log(`✅ ${fileName} 생성 완료`);
  });

  console.log('\n🎉 모든 MBTI 테스트 생성이 완료되었습니다!');
}

// 스크립트 실행
console.log('스크립트 로드됨');
console.log('import.meta.url:', import.meta.url);
console.log('process.argv[1]:', process.argv[1]);

// 조건을 단순화
main();

export {
  generateMBTITest,
  generateQuestions,
  generateMBTIResults
};
