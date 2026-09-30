import { DevisModalProvider } from '../../context/DevisModalContext';
import SchemaOrganisation from '../../components/public/SchemaOrganisation';
import Header from '../../components/public/Header';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Services from '../../components/public/Services';
import Methode from '../../components/public/Methode';
import PourquoiChoisir from '../../components/public/PourquoiChoisir';
import Realisations from '../../components/public/Realisations';
import BandeauAppel from '../../components/public/BandeauAppel';
import Actualites from '../../components/public/Actualites';
import ContactSection from '../../components/public/ContactSection';
import Footer from '../../components/public/Footer';

// Progression : qui nous sommes → ce que nous faisons → comment → pourquoi
// nous → preuves terrain → appel à l'action → actualités → contact.
export default function VitrinePage() {
  return (
    <DevisModalProvider>
      <SchemaOrganisation />
      <a href="#contenu" className="lien-evitement">Aller au contenu principal</a>
      <Header />
      <main id="contenu">
        <Hero />
        <About />
        <Services />
        <Methode />
        <PourquoiChoisir />
        <Realisations />
        <BandeauAppel />
        <Actualites />
        <ContactSection />
      </main>
      <Footer />
    </DevisModalProvider>
  );
}
