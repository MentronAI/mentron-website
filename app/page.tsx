import HeroSection from "@/components/sections/hero-section";
import WhyMentron from "@/components/sections/why-mentron";
import TimeSavings from "@/components/sections/time-savings";
import BentoPremium from "@/components/sections/bento-premium";
import IpadPreview from "@/components/sections/ipad-preview";
import Integrations from "@/components/sections/integrations";
import FAQSection from "@/components/sections/faq-section";
import CTASection from "@/components/sections/cta-section";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyMentron />
      <TimeSavings />
      <BentoPremium />
      <IpadPreview />
      <Integrations />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
