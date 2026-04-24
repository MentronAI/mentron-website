import HeroSection from "@/components/sections/hero-section";
import ProblemSection from "@/components/sections/problem-section";
import KeyFeatures from "@/components/sections/key-features";
import StudentFeatures from "@/components/sections/student-features";
import TeacherBenefits from "@/components/sections/teacher-benefits";
import Integrations from "@/components/sections/integrations";
import FAQSection from "@/components/sections/faq-section";
import CTASection from "@/components/sections/cta-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <KeyFeatures />
      <StudentFeatures />
      <TeacherBenefits />
      <Integrations />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
