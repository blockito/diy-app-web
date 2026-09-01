import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Comparison from '@/components/Comparison';
import { Features, HowItWorks } from '@/components/Sections';
import { Download, Faq, Footer } from '@/components/Closing';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Comparison />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
