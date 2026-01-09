import HeroSection from "@/components/sections/hero-section";
import TrustSignals from "@/components/sections/trust-signals";
import ProblemSection from "@/components/sections/problem-section";
import TeacherBenefits from "@/components/sections/teacher-benefits";
import HowItWorks from "@/components/sections/how-it-works";
import WhyMentron from "@/components/sections/why-mentron";
import StudentFeatures from "@/components/sections/student-features";
import Testimonials from "@/components/sections/testimonials";
import StatsSection from "@/components/sections/stats-section";
import Integrations from "@/components/sections/integrations";
import FAQSection from "@/components/sections/faq-section";
import CTASection from "@/components/sections/cta-section";
import { BrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignals />
      <ProblemSection />
      <TeacherBenefits />
      <HowItWorks />
      <WhyMentron />
      <StudentFeatures />
      <StatsSection />
      <Integrations />
      <Testimonials />
      <FAQSection />
      <CTASection />
      
      {/* Footer */}
      <footer className="pt-0 pb-0 bg-white">
        <div className="container lg:pl-0 lg:pr-0 mx-auto pr-0 pl-0">
          <div className="lg:px-10 lg:py-12 bg-white border-neutral-200 border rounded-3xl pt-10 pr-6 pb-10 pl-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] mb-12">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              {/* Brand */}
              <div className="lg:w-1/3 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0077FF] flex items-center justify-center text-white">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900 tracking-tight font-geist">Mentron</span>
                    <span className="text-[11px] uppercase text-neutral-400 tracking-[0.16em] font-geist">Learn Smarter</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 max-w-sm font-geist">
                  Transforming education with intelligent AI solutions for institutions, educators,
                  and students. Your AI study partner that actually understands you.
                </p>
                <div className="flex items-center gap-3 text-neutral-500">
                  {/* Twitter/X */}
                  <a href="https://twitter.com/mentron" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-[#0077FF] hover:text-[#0077FF] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.234 10.162L22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299l-.929-1.329L3.076 1.56h3.182l5.965 8.532l.929 1.329l7.754 11.09h-3.182z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="https://linkedin.com/company/mentron" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-[#0077FF] hover:text-[#0077FF] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037c-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85c3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1-2.063-2.065a2.064 2.064 0 1 1 2.063 2.065m1.782 13.019H3.555V9h3.564zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a href="https://github.com/mentron-ai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-[#0077FF] hover:text-[#0077FF] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Links */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                {/* Solutions Column */}
                <div className="space-y-3">
                  <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Solutions</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li><a href="/institutional-demo" className="hover:text-[#0077FF] transition-colors font-geist">For Institutions</a></li>
                    <li><a href="/individual-inquiry" className="hover:text-[#0077FF] transition-colors font-geist">For Individuals</a></li>
                    <li><a href="/#features" className="hover:text-[#0077FF] transition-colors font-geist">Features</a></li>
                    <li><a href="/#integrations" className="hover:text-[#0077FF] transition-colors font-geist">Integrations</a></li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div className="space-y-3">
                  <h3 className="uppercase text-xs font-medium text-neutral-400 tracking-[0.16em] font-geist">Resources</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li><a href="/blog" className="hover:text-[#0077FF] transition-colors font-geist">Blog</a></li>
                    <li><a href="/resources" className="hover:text-[#0077FF] transition-colors font-geist">Learning Resources</a></li>
                    <li><a href="/#faq" className="hover:text-[#0077FF] transition-colors font-geist">FAQ</a></li>
                    <li><a href="/help" className="hover:text-[#0077FF] transition-colors font-geist">Help Center</a></li>
                  </ul>
                </div>

                {/* Company Column */}
                <div className="space-y-3">
                  <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-400 font-geist">Company</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li><a href="/about" className="hover:text-[#0077FF] transition-colors font-geist">About</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}