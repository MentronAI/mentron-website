import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-0 pb-0 bg-white">
      <div className="container lg:pl-0 lg:pr-0 mx-auto pr-0 pl-0">
        <div className="lg:px-10 lg:py-12 bg-white border-neutral-200 border rounded-3xl pt-10 pr-6 pb-10 pl-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] mb-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Brand */}
            <div className="lg:w-1/3 space-y-5">
              <div className="flex items-center gap-3">
                <Image 
                  src="/logo/mentron_logo.webp" 
                  alt="Mentron Logo" 
                  width={36} 
                  height={36} 
                  className="h-9 w-auto rounded-xl"
                  unoptimized
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-neutral-900 tracking-tight font-geist">Mentron</span>
                  <span className="text-[11px] uppercase text-neutral-400 tracking-[0.16em] font-geist">Learn Smarter</span>
                </div>
              </div>
              <p className="text-sm text-neutral-500 max-w-sm font-geist leading-relaxed">
                Transforming education with intelligent AI solutions for institutions, educators,
                and students. Your AI study partner that actually understands you.
              </p>
              <div className="flex items-center gap-3 text-neutral-500">
                {/* Twitter/X */}
                <a href="https://twitter.com/mentron" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-[#0077FF] hover:text-[#0077FF] transition-colors">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com/company/mentron" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-[#0077FF] hover:text-[#0077FF] transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                {/* GitHub */}
                <a href="https://github.com/mentron-ai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-[#0077FF] hover:text-[#0077FF] transition-colors">
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              {/* Solutions Column */}
              <div className="space-y-3">
                <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Solutions</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><Link href="/institutional-demo" className="hover:text-[#0077FF] transition-colors font-geist">For Institutions</Link></li>
                  <li><Link href="/#features" className="hover:text-[#0077FF] transition-colors font-geist">Features</Link></li>
                  <li><Link href="/#integrations" className="hover:text-[#0077FF] transition-colors font-geist">Integrations</Link></li>
                </ul>
              </div>

              {/* Resources Column */}
              <div className="space-y-3">
                <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Resources</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><Link href="/blogs" className="hover:text-[#0077FF] transition-colors font-geist">Blog</Link></li>
                  <li><Link href="/#faq" className="hover:text-[#0077FF] transition-colors font-geist">FAQ</Link></li>
                  <li><Link href="/help" className="hover:text-[#0077FF] transition-colors font-geist">Help Center</Link></li>
                </ul>
              </div>

              {/* Company Column */}
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 font-geist">Company</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><Link href="/about" className="hover:text-[#0077FF] transition-colors font-geist">About</Link></li>
                  <li><Link href="/privacy" className="hover:text-[#0077FF] transition-colors font-geist">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-[#0077FF] transition-colors font-geist">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-400 font-geist">
              © 2026 Mentron. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
