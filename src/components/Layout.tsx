import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AdBanner from './AdBanner'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AdBanner position="header" />
      <main className="flex-1">
        {children}
      </main>
      <AdBanner position="footer" />
      <Footer />
    </div>
  )
}

export default Layout
