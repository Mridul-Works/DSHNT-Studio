// /v2 — a self-contained copy of the home page. Its components, content and
// stylesheet live in src/components/v2, src/data/v2 and ./v2.css, so the two
// versions can be changed independently.
import Header from "@/components/v2/Header";
import Hero from "@/components/v2/Hero";
import Opens from "@/components/v2/Opens";
import Aperture from "@/components/v2/Aperture";
import About from "@/components/v2/About";
import Services from "@/components/v2/Services";
import Process from "@/components/v2/Process";
import EnquiryForm from "@/components/v2/EnquiryForm";
import Footer from "@/components/v2/Footer";
import "./v2.css";

export default function HomeV2() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Opens />
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
