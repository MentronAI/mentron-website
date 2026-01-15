import React from 'react';
import Footer from '@/components/layout/footer';

export default function AboutPage() {
  return (
    <>
      <div className="flex-1 px-6 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 font-display tracking-tight">About Mentron</h1>
          
          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Our Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                At Mentron, we're on a mission to revolutionize education through the power of artificial intelligence. 
                We believe that every student deserves personalized attention and every educator should have access to 
                cutting-edge tools that make teaching more effective and efficient.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Our Story</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Founded in January 2025, Mentron emerged from a simple observation: traditional learning management systems 
                weren't keeping pace with the rapid advancement of AI technology. Our team of educators, technologists, 
                and AI experts came together to create a solution that would bridge this gap.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900 font-display">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">Innovation</h3>
                  <p className="text-slate-600">
                    We continuously push the boundaries of what's possible in educational technology.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">Accessibility</h3>
                  <p className="text-slate-600">
                    We believe quality education should be accessible to everyone.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">Privacy</h3>
                  <p className="text-slate-600">
                    We prioritize the security and privacy of our users' data.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-primary transition-colors">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">Impact</h3>
                  <p className="text-slate-600">
                    We measure our success by the positive change we create in education.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Our Technology</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Mentron leverages the latest advancements in artificial intelligence, including large language models 
                and machine learning, to provide intelligent educational tools. Our platform is built on a foundation of 
                robust security measures and scalable infrastructure to ensure reliable performance for institutions of any size.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Join Us</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                Whether you're an educational institution looking to transform your learning management system or an 
                individual seeking to enhance your learning journey, we invite you to join us in shaping the future 
                of education.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
