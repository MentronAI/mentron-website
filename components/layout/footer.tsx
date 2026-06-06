import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Github, X } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-12 pb-0 bg-[#F8F7F5]">
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
                  <span className="text-sm font-semibold text-neutral-900 tracking-tight">Mentron</span>
                  <span className="text-[11px] uppercase text-neutral-400 tracking-[0.16em]">Learn Smarter</span>
                </div>
              </div>
              <p className="text-sm text-neutral-500 max-w-sm leading-relaxed">
                Transforming education with intelligent AI solutions for institutions, educators,
                and students. Your AI study partner that actually understands you.
              </p>
              <div className="flex items-center gap-3 text-neutral-500">
                {/* LinkedIn */}
                <span aria-label="LinkedIn — coming soon" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center cursor-not-allowed opacity-50">
                  <Linkedin className="w-3.5 h-3.5" />
                </span>
                {/* X (Twitter) */}
                <a href="https://x.com/mentrontech" target="_blank" rel="noopener noreferrer" aria-label="Mentron on X" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <X className="w-3.5 h-3.5" />
                </a>
                {/* GitHub */}
                <a href="https://github.com/mentrontech" target="_blank" rel="noopener noreferrer" aria-label="Mentron on GitHub" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <Github className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              {/* Solutions Column */}
              <div className="space-y-3">
                <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em]">Solutions</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><Link href="/institutional-demo" className="hover:text-primary transition-colors">For Institutions</Link></li>
                  <li><Link href="/#features" className="hover:text-primary transition-colors">Features</Link></li>
                  <li><Link href="/#integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
                </ul>
              </div>

              {/* Resources Column */}
              <div className="space-y-3">
                <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em]">Resources</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><Link href="/blogs" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li><Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                  <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                </ul>
              </div>

              {/* Company Column */}
              <div className="space-y-3">
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400">Company</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                  <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-400">
              © 2026 Mentron. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
