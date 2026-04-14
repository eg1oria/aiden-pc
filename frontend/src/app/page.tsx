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
import Hello from '@/components/Alice';
import List from '@/components/List';
import UseState from '@/components/UseState';
import Split from '@/components/Split';
export default function Home() {
  const list = ['Apple', 'PineApple', 'Груша'];
  return (
    <>
      <Header />
      <main>
        <List items={list} />
        <Hello name="" />
        <UseState />
        <Split />
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
