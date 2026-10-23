import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Wall from "@/components/Wall";
import Aperture from "@/components/Aperture";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Wall />
        <Aperture />
        <About />
        <Services />
        <Process />
        <EnquiryForm />
      </main>
      <Footer />
    </>
  );
}
