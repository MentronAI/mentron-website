import React from 'react';
import Footer from '@/components/layout/footer';

export default function PrivacyPage() {
  return (
    <>
      <div className="flex-1 px-6 lg:px-16 pt-[72px] lg:pt-[80px] pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 font-display tracking-tight">Privacy Policy</h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-500 mb-4">Last updated: June 2026</p>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Mentron Technologies LLP (&quot;Mentron&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the AI-powered learning platform at mentron.in.
              This Privacy Policy describes how we collect, use, store, and protect information when you use our platform.
              We are a Data Fiduciary under the Digital Personal Data Protection Act, 2023 (DPDP Act) and are committed to
              handling your data responsibly.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">1. Definitions</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Data Principal</strong>: The individual to whom the personal data relates (students, teachers, administrators, or other users).</li>
                  <li><strong>Data Fiduciary</strong>: Mentron Technologies LLP, LLPIN: ACV-3361, which determines the purposes and means of processing personal data.</li>
                  <li><strong>Consent Manager</strong>: A person registered with the Board who enables Data Principals to review, manage, and withdraw consent.</li>
                  <li><strong>Personal Data</strong>: Any data about an identifiable individual, including name, email, learning activity, and assessment results.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                <li>Name and contact information (email, phone number)</li>
                <li>Educational institution affiliation and role (student, teacher, administrator)</li>
                <li>Account credentials (hashed passwords)</li>
                <li>Course enrollment and learning path selections</li>
                <li>Performance data, assessment responses, and quiz results</li>
                <li>Demo request information (institution type, current LMS, number of students)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">2.2 Usage Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                <li>Device type, browser, and operating system</li>
                <li>IP address and approximate geographic location</li>
                <li>Pages visited, features used, and session duration</li>
                <li>Learning interaction patterns (concepts studied, flashcards reviewed, mind maps created)</li>
                <li>Error logs and crash reports for debugging</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">2.3 Automatically Collected Data</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Cookies and similar technologies for authentication and preferences</li>
                <li>Analytics data via Google Analytics 4 (anonymized where possible)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">3. How We Use Your Information</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">We process personal data for the following lawful purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Service delivery</strong>: Operating the platform, managing accounts, and providing learning features (adaptive learning, FSRS-based spaced repetition, mind maps, quiz generation)</li>
                  <li><strong>Personalization</strong>: Adapting learning paths and content difficulty to individual learner needs</li>
                  <li><strong>Analytics and improvement</strong>: Aggregated analysis to improve platform features and educational outcomes</li>
                  <li><strong>Communication</strong>: Responding to support requests, sending account notifications, and (with consent) product updates</li>
                  <li><strong>Legal compliance</strong>: Meeting obligations under Indian law, accreditation requirements, and institutional agreements</li>
                  <li><strong>Safety and security</strong>: Detecting and preventing fraud, abuse, and unauthorized access</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">4. Lawful Basis for Processing</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">Under the DPDP Act, we process data based on:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Consent</strong>: Where you have provided clear, affirmative consent (e.g., creating an account, submitting a demo request)</li>
                  <li><strong>Legitimate use</strong>: Where processing is necessary for the stated purpose (e.g., grading an assessment you submitted)</li>
                  <li><strong>Legal obligation</strong>: Where required by law, regulation, or court order</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">5. Data Principal Rights</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">Under Sections 12–14 of the DPDP Act, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Access</strong>: Request a copy of your personal data held by us</li>
                  <li><strong>Correction</strong>: Request correction of inaccurate or incomplete data</li>
                  <li><strong>Erasure</strong>: Request deletion of your data (subject to legal retention requirements)</li>
                  <li><strong>Nomination</strong>: Nominate another individual to exercise your rights in the event of death or incapacity</li>
                  <li><strong>Withdraw consent</strong>: Withdraw previously given consent at any time; withdrawal does not affect the lawfulness of processing prior to withdrawal</li>
                  <li><strong>Grievance redressal</strong>: Contact our Grievance Officer (see Section 12)</li>
                </ul>
                <p className="text-slate-600 mt-4">To exercise any of these rights, contact us at privacy@mentron.in. We will respond within 30 days.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">6. Children&apos;s Data Protection</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">
                  Mentron serves K-12 educational institutions. For users under the age of 18, we require verifiable parental
                  consent before processing personal data. Institutional accounts are responsible for obtaining this consent
                  through their own enrollment processes. We do not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Use children&apos;s data for behavioral advertising or commercial profiling</li>
                  <li>Share children&apos;s personal data with third parties except as required for service delivery or legal compliance</li>
                  <li>Collect more data from children than is necessary for educational purposes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">7. Data Retention</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Account data</strong>: Retained while your account is active and for 90 days after deletion request</li>
                  <li><strong>Learning data</strong>: Retained for the duration of institutional enrollment plus 1 academic year for accreditation reporting</li>
                  <li><strong>Demo requests</strong>: Retained for 12 months, then deleted unless a contract is in place</li>
                  <li><strong>Analytics data</strong>: Anonymized within 30 days; aggregated data retained indefinitely</li>
                  <li><strong>Logs</strong>: Security and access logs retained for 90 days</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">8. Data Security</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">We implement appropriate technical and organizational measures:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
                  <li>Role-based access controls with least-privilege principles</li>
                  <li>Regular security assessments and vulnerability scanning</li>
                  <li>Employee training on data protection and incident response</li>
                  <li>Audit logging of administrative access to personal data</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">9. Cross-Border Data Transfer</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">
                  Our primary infrastructure is hosted on Vercel (AWS) and Supabase. Data may be processed in data centers
                  outside India. We ensure that transfers to countries not notified by the Indian government under the DPDP Act
                  are made only with your consent or under appropriate safeguards. All processing partners maintain equivalent
                  security standards.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">10. Third-Party Service Providers</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">We use the following categories of sub-processors:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Hosting</strong>: Vercel (application hosting), Supabase (database and authentication)</li>
                  <li><strong>Analytics</strong>: Google Analytics 4 (anonymized, aggregated usage data)</li>
                  <li><strong>Email</strong>: Transactional email providers for account notifications</li>
                  <li><strong>LMS Integrations</strong>: Canvas, Moodle, Google Classroom (via LTI 1.3 / API)</li>
                </ul>
                <p className="text-slate-600 mt-4">We maintain data processing agreements with all sub-processors and will update this list as providers change.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">11. AI-Specific Data Usage</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">
                  Mentron uses AI for adaptive learning, quiz generation, flashcard scheduling (FSRS), and mind map creation.
                  Your data is used as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><strong>Personalization</strong>: Learning data is used to personalize your experience (adaptive paths, spaced repetition scheduling)</li>
                  <li><strong>Content generation</strong>: AI-generated quizzes and flashcards are derived from course content, not from other users&apos; data</li>
                  <li><strong>Model training</strong>: We do not use your personal data to train general-purpose AI models. Fine-tuning for your institution uses only your institution&apos;s data, which is not shared with others</li>
                  <li><strong>Human review</strong>: AI-generated assessments may be reviewed by instructors at your institution; Mentron staff do not review individual learning data without explicit authorization</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">12. Data Breach Notification</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600">
                  In the event of a personal data breach that is likely to cause harm to Data Principals, we will notify
                  the Data Protection Board of India and affected individuals without undue delay, and in any case within
                  72 hours of becoming aware of the breach, as required under the DPDP Act.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">13. Grievance Officer</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">
                  As required under Section 10 of the DPDP Act, you may contact our Grievance Officer:
                </p>
                <p className="text-slate-900 font-medium">
                  Email: privacy@mentron.in<br />
                  Mentron Technologies LLP, North Andalpuram, Rajapalayam &ndash; 626108, Tamil Nadu, India
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">14. Changes to This Policy</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600">
                  We may update this Privacy Policy from time to time. Material changes will be communicated via the platform
                  or by email. Continued use of the platform after changes constitutes acceptance of the updated policy.
                  The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">15. Contact Us</h2>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-600 mb-4">For privacy-related questions or to exercise your data rights:</p>
                <p className="text-slate-900 font-medium">
                  Email: privacy@mentron.in<br />
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
