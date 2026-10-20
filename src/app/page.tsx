import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { Methodology } from "@/components/sections/Methodology";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { PrivacyDialog } from "@/components/PrivacyDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";

/** Landing page única: todas las secciones viven en "/" y se navega por anclas. */
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <HeroSlider />
        <Services />
        <Benefits />
        <Methodology />
        {siteConfig.sections.projects && <Projects />}
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <PrivacyDialog />
      <WhatsAppButton />
    </>
  );
}
