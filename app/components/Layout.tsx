import Header from '../../components/Header'
import Footer from './Footer'
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="pt-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}

