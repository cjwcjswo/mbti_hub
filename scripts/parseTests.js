import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname 대체 (ES 모듈에서는 사용할 수 없음)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 테스트 파일들을 파싱하여 웹페이지용 데이터로 변환
function parseTestFiles() {
  const testsDir = path.join(__dirname, '..', 'data', 'tests');
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  
  // 출력 디렉토리 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 테스트 파일들 읽기
  const testFiles = fs.readdirSync(testsDir).filter(file => file.endsWith('.json'));
  const allTests = [];
  const testIndex = {};

  console.log(`📁 ${testFiles.length}개의 테스트 파일을 파싱합니다...`);

  testFiles.forEach((file, index) => {
    try {
      const filePath = path.join(testsDir, file);
      const testData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // 테스트 데이터 정리
      const cleanedTest = cleanTestData(testData, index + 1);
      allTests.push(cleanedTest);
      
      // 인덱스에 추가
      testIndex[cleanedTest.id] = {
        title: cleanedTest.title,
        description: cleanedTest.description,
        tags: cleanedTest.tags,
        estimatedTime: cleanedTest.estimatedTime,
        difficulty: cleanedTest.difficulty,
        questionCount: cleanedTest.questions.length
      };

      console.log(`✅ ${file} 파싱 완료`);
    } catch (error) {
      console.error(`❌ ${file} 파싱 실패:`, error.message);
    }
  });

  // 전체 테스트 목록 저장
  const testsListPath = path.join(outputDir, 'testsList.json');
  fs.writeFileSync(testsListPath, JSON.stringify(allTests, null, 2), 'utf8');
  console.log(`📄 테스트 목록 저장: ${testsListPath}`);

  // 테스트 인덱스 저장
  const testIndexPath = path.join(outputDir, 'testIndex.json');
  fs.writeFileSync(testIndexPath, JSON.stringify(testIndex, null, 2), 'utf8');
  console.log(`📄 테스트 인덱스 저장: ${testIndexPath}`);

  // 개별 테스트 파일들을 src/data/tests 디렉토리에 복사
  const individualTestsDir = path.join(outputDir, 'tests');
  if (!fs.existsSync(individualTestsDir)) {
    fs.mkdirSync(individualTestsDir, { recursive: true });
  }

  allTests.forEach(test => {
    const individualTestPath = path.join(individualTestsDir, `${test.id}.json`);
    fs.writeFileSync(individualTestPath, JSON.stringify(test, null, 2), 'utf8');
  });

  console.log(`📁 개별 테스트 파일들 저장: ${individualTestsDir}`);

  // 통계 생성
  generateStatistics(allTests);

  console.log('\n🎉 모든 테스트 파싱이 완료되었습니다!');
}

// 테스트 데이터 정리
function cleanTestData(testData, index) {
  return {
    id: testData.id || `test_${index}`,
    title: testData.title,
    description: testData.description,
    category: testData.category || extractCategory(testData.tags),
    questions: testData.questions.map((q, qIndex) => ({
      ...q,
      id: qIndex + 1,
      options: q.options.map((opt, optIndex) => ({
        ...opt,
        id: optIndex + 1, // number로 변경
        scores: opt.scores || opt.score || {} // 'scores'로 통일
      }))
    })),
    resultTypes: testData.resultTypes?.map(result => ({
      ...result,
      mbtiType: result.mbtiType || result.type, // 'mbtiType'으로 통일
      compatibility: result.compatibility || {
        best: [],
        good: [],
        challenging: []
      },
      percentage: result.percentage || generateDefaultPercentage(result.mbtiType || result.type)
    })),
    createdAt: testData.createdAt,
    updatedAt: testData.updatedAt,
    tags: testData.tags || [],
    estimatedTime: testData.estimatedTime || 5,
    difficulty: testData.difficulty || 'medium'
  };
}

// 기본 퍼센티지 생성
function generateDefaultPercentage(mbtiType) {
  return {
    E: mbtiType?.startsWith('E') ? 70 : 30,
    I: mbtiType?.startsWith('I') ? 70 : 30,
    N: mbtiType?.includes('N') ? 70 : 30,
    S: mbtiType?.includes('S') ? 70 : 30,
    F: mbtiType?.includes('F') ? 70 : 30,
    T: mbtiType?.includes('T') ? 70 : 30,
    P: mbtiType?.endsWith('P') ? 70 : 30,
    J: mbtiType?.endsWith('J') ? 70 : 30
  };
}

// 카테고리 추출
function extractCategory(tags) {
  const categories = {
    '연애': 'relationship',
    '직장생활': 'career',
    '친구관계': 'social',
    '취미활동': 'hobby',
    '여행': 'lifestyle',
    '음식': 'lifestyle',
    '패션': 'lifestyle',
    '운동': 'health',
    '독서': 'hobby',
    '음악': 'hobby'
  };

  for (const tag of tags) {
    if (categories[tag]) {
      return categories[tag];
    }
  }
  
  return 'general';
}

// 통계 생성
function generateStatistics(tests) {
  const stats = {
    totalTests: tests.length,
    totalQuestions: tests.reduce((sum, test) => sum + test.questions.length, 0),
    averageQuestions: Math.round(tests.reduce((sum, test) => sum + test.questions.length, 0) / tests.length),
    categories: {},
    difficulties: {},
    tags: {}
  };

  tests.forEach(test => {
    // 카테고리 통계
    const category = test.category || 'general';
    stats.categories[category] = (stats.categories[category] || 0) + 1;

    // 난이도 통계
    const difficulty = test.difficulty || 'medium';
    stats.difficulties[difficulty] = (stats.difficulties[difficulty] || 0) + 1;

    // 태그 통계
    test.tags.forEach(tag => {
      stats.tags[tag] = (stats.tags[tag] || 0) + 1;
    });
  });

  // 통계 파일 저장
  const statsPath = path.join(__dirname, '..', 'src', 'data', 'statistics.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf8');
  console.log(`📊 통계 생성: ${statsPath}`);

  // 통계 출력
  console.log('\n📈 생성된 테스트 통계:');
  console.log(`- 총 테스트 수: ${stats.totalTests}`);
  console.log(`- 총 질문 수: ${stats.totalQuestions}`);
  console.log(`- 평균 질문 수: ${stats.averageQuestions}`);
  console.log(`- 카테고리별:`, stats.categories);
  console.log(`- 난이도별:`, stats.difficulties);
}

// MBTI 결과 계산 함수
function calculateMBTIResult(answers, testData) {
  const scores = {
    'I': 0, 'E': 0,
    'N': 0, 'S': 0,
    'T': 0, 'F': 0,
    'J': 0, 'P': 0
  };

  // 답변에 따른 점수 계산
  answers.forEach(answer => {
    const question = testData.questions.find(q => q.id === answer.questionId);
    const selectedOption = question.options.find(opt => opt.id.toString() === answer.selectedOptionId);
    
    if (selectedOption && selectedOption.scores) {
      // MBTI 유형별 점수를 4가지 선호도로 변환
      Object.keys(selectedOption.scores).forEach(mbtiType => {
        const score = selectedOption.scores[mbtiType];
        
        // I/E (내향/외향)
        if (mbtiType.startsWith('I')) scores['I'] += score;
        if (mbtiType.startsWith('E')) scores['E'] += score;
        
        // N/S (직관/감각)
        if (mbtiType.includes('N')) scores['N'] += score;
        if (mbtiType.includes('S')) scores['S'] += score;
        
        // T/F (사고/감정)
        if (mbtiType.includes('T')) scores['T'] += score;
        if (mbtiType.includes('F')) scores['F'] += score;
        
        // J/P (판단/인식)
        if (mbtiType.endsWith('J')) scores['J'] += score;
        if (mbtiType.endsWith('P')) scores['P'] += score;
      });
    }
  });

  // MBTI 유형 결정
  const mbtiType = [
    scores['E'] > scores['I'] ? 'E' : 'I',
    scores['N'] > scores['S'] ? 'N' : 'S',
    scores['T'] > scores['F'] ? 'T' : 'F',
    scores['J'] > scores['P'] ? 'J' : 'P'
  ].join('');

  return mbtiType;
}

// 메인 실행
parseTestFiles();

export {
  parseTestFiles,
  cleanTestData,
  calculateMBTIResult
};
