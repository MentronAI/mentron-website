import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Footer from '@/components/layout/footer';

export default function ThankYouPage() {
  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-display">Thank You!</h1>
        <p className="text-lg text-slate-600 max-w-md mb-10">
          Your request for an institutional demo has been received. Our team will contact you shortly to schedule a session.
        </p>
        <Link 
          href="/" 
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-primary/25"
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
