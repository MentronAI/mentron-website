"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#key-features", label: "Features" },
  { href: "/#features", label: "Tools" },
  { href: "/blogs", label: "Blogs" },
  { href: "/#faq", label: "FAQ" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      {/* Fixed navbar — transparent over hero, white bg on scroll */}
      <nav
        className={`fixed top-0 left-4 right-4 z-50 rounded-b-2xl transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-slate-200/50"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 lg:px-8 h-[60px] lg:h-[68px]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo/mentron.webp"
              alt="Mentron"
              width={100}
              height={20}
              className={`h-[18px] lg:h-[22px] w-auto transition-all duration-300 ${
                scrolled || !isHome ? "[filter:none]" : "brightness-0 invert"
              }`}
              unoptimized
            />
          </Link>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? (scrolled || !isHome) ? "text-slate-900" : "text-white"
                    : (scrolled || !isHome)
                      ? "text-slate-500 hover:text-slate-900"
                      : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/institutional-demo"
              className={`text-[14px] font-semibold py-2.5 px-6 rounded-full transition-all duration-300 ${
                (scrolled || !isHome)
                  ? "bg-primary hover:bg-primary-dark text-white"
                  : "bg-white text-slate-900 hover:bg-white/90"
              }`}
            >
              Get Early Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[4px]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="menu"
          >
            <span
              className={`block w-[18px] h-[1.5px] transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[5.5px] bg-slate-700"
                  : (scrolled || !isHome) ? "bg-slate-700" : "bg-white"
              }`}
            />
            <span
              className={`block w-[18px] h-[1.5px] transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0 bg-slate-700"
                  : (scrolled || !isHome) ? "bg-slate-700" : "bg-white"
              }`}
            />
            <span
              className={`block w-[18px] h-[1.5px] transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[5.5px] bg-slate-700"
                  : (scrolled || !isHome) ? "bg-slate-700" : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          <div className="flex flex-col gap-0 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xl font-medium py-4 border-b border-slate-100 transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/institutional-demo"
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-2xl transition-all text-center text-lg"
          >
            Get Early Access
          </Link>
          <p className="text-xs text-slate-400 text-center mt-4">
            Your AI Study Partner.
          </p>
        </div>
      </div>
    </>
  )
}
