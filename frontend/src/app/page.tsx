import Header from '@/components/Header/Header';
import ScrollSection from '@/components/ScrollSection';
import WhyUs from '@/components/WhyUs/WhyUs';
import ForWhom from '@/components/ForWhom/ForWhom';
import Configurator from '@/components/Configurator/Configurator';
import Process from '@/components/Process/Process';
import Testimonials from '@/components/Testimonials/Testimonials';
import FAQ from '@/components/FAQ/FAQ';
import AvitoForm from '@/components/AvitoForm/AvitoForm';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ScrollSection />
        <WhyUs />
        <ForWhom />
        <Configurator />
        <Process />
        <Testimonials />
        <FAQ />
        <AvitoForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
