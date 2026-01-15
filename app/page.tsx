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
import Footer from "@/components/layout/footer";

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
      <Footer />
    </>
  );
}