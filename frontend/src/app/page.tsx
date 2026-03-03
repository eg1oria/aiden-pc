import Header from '@/components/Header/Header';
import Intro from '@/components/Intro/Intro';
import ScrollScene from '@/components/ScrollCube';
import PCBuildSection from '@/components/Slot/Slot';

export default function Home() {
  return (
    <>
      <Header />
      <ScrollScene />
      <Intro />
      <PCBuildSection />
      <Intro />
    </>
  );
}
