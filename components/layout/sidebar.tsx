"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <aside className={`lg:w-64 lg:fixed lg:h-screen flex flex-col z-50 bg-white lg:bg-transparent border-slate-200/50 border-b lg:border-b-0 lg:border-r pt-8 pr-8 pb-8 pl-8 justify-between transition-all duration-300 ${isOpen ? "h-screen" : "h-auto"}`}>
      <div className="w-full">
        <div className="mb-8 lg:mb-12 animate-fade-up flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <Image 
              src="/logo/mentron_logo.webp" 
              alt="Mentron Logo" 
              width={50} 
              height={32} 
              className="h-8 w-auto rounded-lg"
              unoptimized
            />
            <Image 
              src="/logo/mentron.webp" 
              alt="Mentron" 
              width={122} 
              height={24} 
              className="h-6 w-auto"
              unoptimized
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation - Hidden on mobile unless toggled */}
        <nav className={`${isOpen ? "flex" : "hidden"} lg:flex flex-col space-y-4 animate-fade-up`} style={{ animationDelay: "0.1s" }}>
          <Link href="/#hero" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">
            Home
          </Link>
          <Link href="/#features" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">
            Features
          </Link>
          <Link href="/#how-it-works" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">
            How It Works
          </Link>
          <Link href="/#testimonials" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">
            Testimonials
          </Link>
          <Link 
            href="/blogs" 
            onClick={() => setIsOpen(false)}
            className={`block text-lg font-medium hover:translate-x-1 transition-all ${
              pathname === '/blogs' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Blogs
          </Link>
          <Link href="/#faq" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-slate-500 hover:text-slate-900 hover:translate-x-1 transition-all">
            FAQ
          </Link>
        </nav>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} lg:block space-y-4 animate-fade-up mt-8 lg:mt-0`} style={{ animationDelay: "0.2s" }}>
        <Link 
          href="/institutional-demo" 
          onClick={() => setIsOpen(false)}
          className="block w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-xl transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 text-center"
        >
          Join Waitlist
        </Link>
        <p className="text-xs text-slate-400 text-center">Your AI Study Partner.</p>
      </div>
    </aside>
  )
}