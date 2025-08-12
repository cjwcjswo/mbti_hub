import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* MBTI Hub 소개 */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">MBTI Hub</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              다양한 MBTI 성격 유형 테스트를 통해 자신을 더 깊이 이해해보세요. 
              AI 기반 테스트 생성과 정확한 결과 분석을 제공합니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/tests" className="text-gray-300 hover:text-white transition-colors duration-200">
                  테스트 목록
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  소개
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  도움말
                </a>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">연락처</h4>
            <ul className="space-y-2 text-gray-300">
              <li>이메일: contact@mbtihub.com</li>
              <li>카카오톡: @mbtihub</li>
              <li>운영시간: 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 MBTI Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
