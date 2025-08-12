import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'
import HomePage from '@pages/HomePage'
import TestListPage from '@pages/TestListPage'
import TestPage from '@pages/TestPage'
import ResultPage from '@pages/ResultPage'
import AboutPage from '@pages/AboutPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tests" element={<TestListPage />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/result/:testId" element={<ResultPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  )
}

export default App
