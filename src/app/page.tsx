import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Roll from "@/components/Roll";
import Story from "@/components/Story";
import Services from "@/components/Services";
import Process from "@/components/Process";
import EnquiryForm from "@/components/EnquiryForm";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Grain from "@/components/Grain";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Roll />
        <Story />
        <Services />
        <Process />
        <EnquiryForm />
      </main>
      <Footer />
      <Grain />
      <Cursor />
    </>
  );
}
