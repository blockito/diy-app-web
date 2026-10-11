import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Comparison from '@/components/Comparison';
import Place from '@/components/Place';
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
        <Place />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
