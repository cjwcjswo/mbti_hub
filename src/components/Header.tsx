import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gradient">
            MBTI Hub
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              홈
            </Link>
            <Link 
              to="/tests" 
              className="text-gray-700 hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              테스트 목록
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              소개
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
