import { DevisModalProvider } from '../../context/DevisModalContext';
import Header from '../../components/public/Header';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Services from '../../components/public/Services';
import PourquoiChoisir from '../../components/public/PourquoiChoisir';
import Realisations from '../../components/public/Realisations';
import ContactSection from '../../components/public/ContactSection';
import Footer from '../../components/public/Footer';

export default function VitrinePage() {
  return (
    <DevisModalProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <PourquoiChoisir />
        <Realisations />
        <ContactSection />
      </main>
      <Footer />
    </DevisModalProvider>
  );
}
