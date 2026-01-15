import React from 'react';
import Footer from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <>
      <div className="flex-1 px-6 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 font-display tracking-tight">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <p className="text-slate-500 mb-4">
                Last updated: January 2024
              </p>
              
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">1. Agreement to Terms</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  By accessing or using Mentron's platform and services, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
                  from using or accessing this platform.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">2. Use License</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Permission is granted to temporarily access and use Mentron's platform for personal, educational, 
                  or institutional use, subject to the following restrictions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>You must not modify or copy the platform's materials</li>
                  <li>You must not use the materials for commercial purposes</li>
                  <li>You must not attempt to decompile or reverse engineer the platform</li>
                  <li>You must not remove any copyright or proprietary notations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">3. User Responsibilities</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  As a user of Mentron, you are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Maintaining the confidentiality of your account</li>
                  <li>All activities that occur under your account</li>
                  <li>Ensuring your use complies with applicable laws</li>
                  <li>Respecting intellectual property rights</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">4. Contact Information</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Questions about the Terms of Service should be sent to us at:
                </p>
                <p className="text-slate-900 font-medium">
                  Email: legal@mentron.in
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
