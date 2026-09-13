import { DevisModalProvider } from '../../context/DevisModalContext';
import SchemaOrganisation from '../../components/public/SchemaOrganisation';
import Header from '../../components/public/Header';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Services from '../../components/public/Services';
import Methode from '../../components/public/Methode';
import PourquoiChoisir from '../../components/public/PourquoiChoisir';
import Realisations from '../../components/public/Realisations';
import Actualites from '../../components/public/Actualites';
import ContactSection from '../../components/public/ContactSection';
import Footer from '../../components/public/Footer';

export default function VitrinePage() {
  return (
    <DevisModalProvider>
      <SchemaOrganisation />
      <a href="#accueil" className="lien-evitement">Aller au contenu principal</a>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Methode />
        <PourquoiChoisir />
        <Realisations />
        <Actualites />
        <ContactSection />
      </main>
      <Footer />
    </DevisModalProvider>
  );
}
