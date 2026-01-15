import React from 'react';
import Footer from '@/components/layout/footer';

export default function PrivacyPage() {
  return (
    <>
      <div className="flex-1 px-6 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 font-display tracking-tight">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <p className="text-slate-500 mb-4">
                Last updated: May 2025
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Introduction</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Mentron ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our educational platform and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Information We Collect</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm mb-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Name and contact information</li>
                  <li>Educational institution affiliation</li>
                  <li>Login credentials</li>
                  <li>Course enrollment information</li>
                  <li>Performance and assessment data</li>
                </ul>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-slate-900">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Platform usage statistics</li>
                  <li>Learning patterns and preferences</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">How We Use Your Information</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>To provide and maintain our services</li>
                  <li>To personalize your learning experience</li>
                  <li>To analyze and improve our platform</li>
                  <li>To communicate with you about our services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Data Security</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Contact Us</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-slate-900 font-medium">
                  Email: privacy@mentron.in
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
