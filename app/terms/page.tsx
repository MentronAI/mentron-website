import React from 'react';
import Footer from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <>
      <div className="flex-1 px-6 lg:px-16 pt-[72px] lg:pt-[80px] pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 font-display tracking-tight">Terms of Service</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-500 mb-4">Last updated: June 2026</p>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              These Terms of Service (&quot;Terms&quot;) govern your use of the Mentron AI-powered learning platform
              (&quot;Platform&quot;) operated by Mentron Technologies LLP (&quot;Mentron&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
              By accessing or using the Platform, you agree to be bound by these Terms.
            </p>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">1. Definitions</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Platform</strong>: The Mentron web application, APIs, integrations, and related services available at mentron.in</li>
                  <li><strong>User</strong>: Any individual who accesses or uses the Platform, including students, teachers, administrators, and institutional staff</li>
                  <li><strong>Institution</strong>: A school, college, university, corporate organization, or other entity that holds an account with Mentron</li>
                  <li><strong>Content</strong>: Course materials, quizzes, flashcards, mind maps, assessments, and other educational materials on the Platform</li>
                  <li><strong>Services</strong>: All features provided through the Platform including adaptive learning, AI quiz generation, FSRS-based spaced repetition, analytics, and integrations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">2. Agreement to Terms</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  By creating an account, accessing, or using the Platform, you confirm that you have read, understood, and agree
                  to these Terms. If you are using the Platform on behalf of an Institution, you represent that you have authority
                  to bind that Institution to these Terms. If you do not agree, you must not use the Platform.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">3. Account Registration</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>You must provide accurate and complete information when registering</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You must be at least 18 years old, or use the Platform under the supervision of a parent, guardian, or educational institution that has consented on your behalf</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">4. Use License and Restrictions</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">
                  Subject to these Terms, Mentron grants you a limited, non-exclusive, non-transferable, revocable license to
                  access and use the Platform for educational purposes. You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Reverse engineer, decompile, or disassemble any part of the Platform</li>
                  <li>Access or attempt to access the Platform through automated means (bots, scrapers) without prior written consent</li>
                  <li>Use the Platform to transmit harmful, offensive, or unlawful content</li>
                  <li>Share your account credentials with unauthorized individuals</li>
                  <li>Interfere with or disrupt the Platform&apos;s infrastructure or other users&apos; access</li>
                  <li>Use the Platform in violation of any applicable law or regulation</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">5. Subscription and Payment</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Some features of the Platform require a paid subscription, arranged through your Institution or individually</li>
                  <li>Pricing is communicated at the time of subscription and may be updated with 30 days&apos; notice</li>
                  <li>All fees are listed in Indian Rupees (INR) unless otherwise stated</li>
                  <li>Institutional subscriptions are invoiced per the terms of the institutional agreement</li>
                  <li>We do not offer automatic refunds. Refund requests are evaluated on a case-by-case basis</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">6. Intellectual Property</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>The Platform, its source code, design, and branding are owned by Mentron Technologies LLP and protected by intellectual property laws</li>
                  <li>User-generated Content (quizzes you author, notes you create) remains your property. By uploading Content, you grant Mentron a limited license to process, display, and use it solely to provide the Services</li>
                  <li>AI-generated Content (auto-generated quizzes, flashcards, mind maps) is licensed to you for educational use within the Platform</li>
                  <li>You must not remove, alter, or obscure any proprietary notices on the Platform</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">7. Academic Integrity</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Mentron is designed to support genuine learning. Users must not use the Platform to cheat on assessments,
                  plagiarize content, misrepresent their identity or capabilities, or undermine the educational process.
                  Institutions are responsible for defining and enforcing their own academic integrity policies. Mentron
                  provides tools (audit logs, proctoring integrations, anomaly detection) to assist institutions but does not
                  enforce academic policies directly.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">8. Third-Party Integrations</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  The Platform integrates with third-party services including Canvas, Moodle, Google Classroom, and other
                  LMS platforms via LTI 1.3 and API connections. Your use of these integrations is also subject to the
                  third party&apos;s terms of service. Mentron is not responsible for the availability, accuracy, or policies
                  of third-party services. Data shared with third-party integrations is governed by this Privacy Policy and
                  your institution&apos;s data agreements.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">9. Disclaimer of Warranties</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or
                  implied, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.
                  We do not warrant that the Platform will be uninterrupted, error-free, or free of harmful components.
                  AI-generated content is provided for educational support and should be reviewed by qualified instructors
                  before use in formal assessments.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">10. Limitation of Liability</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  To the maximum extent permitted by applicable law, Mentron Technologies LLP and its officers, directors,
                  employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages, or any loss of profits, data, or business opportunities, arising out of or in connection with your
                  use of the Platform. Our total liability shall not exceed the fees paid by you to Mentron in the 12 months
                  preceding the claim.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">11. Indemnification</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  You agree to indemnify and hold harmless Mentron Technologies LLP and its officers, directors, employees,
                  and agents from any claims, damages, losses, costs, or expenses (including reasonable legal fees) arising
                  from your use of the Platform, your violation of these Terms, or your violation of any rights of another
                  party.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">12. Termination</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>You may stop using the Platform at any time</li>
                  <li>We may suspend or terminate your access if you violate these Terms, with notice where practicable</li>
                  <li>Institutional accounts are subject to the termination provisions in the institutional agreement</li>
                  <li>Upon termination, your right to use the Platform ceases immediately. We will retain your data in accordance with our Privacy Policy&apos;s retention schedule</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">13. Modifications</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated via the
                  Platform or by email at least 30 days before taking effect. Continued use of the Platform after changes
                  take effect constitutes acceptance of the revised Terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">14. Governing Law and Dispute Resolution</h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>These Terms are governed by the laws of India</li>
                  <li>Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu, India</li>
                  <li>You agree to attempt to resolve disputes through good-faith negotiation before initiating legal proceedings</li>
                  <li>Any arbitration shall be conducted in accordance with the Arbitration and Conciliation Act, 1996</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">15. Severability</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall
                  continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary
                  to make it valid and enforceable.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">16. Data Processing</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Your personal data is processed in accordance with our{' '}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>, which forms part of these Terms.
                  By using the Platform, you consent to the data practices described in the Privacy Policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900">17. Contact</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-4">For questions about these Terms:</p>
                <p className="text-slate-900 font-medium">
                  Email: legal@mentron.in<br />
                  Mentron Technologies LLP<br />
                  North Andalpuram, Rajapalayam &ndash; 626108<br />
                  Tamil Nadu, India
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
