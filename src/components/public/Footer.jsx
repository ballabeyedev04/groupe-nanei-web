import { Link } from 'react-router-dom';
import { LogoEntete } from './Logo';
import Icone from '../ui/Icone';
import useCoordonnees from '../../hooks/useCoordonnees';
import { NAVIGATION, SERVICES, defilerVers } from '../../data/site';

function LienAncre({ href, children }) {
  return (
    <a href={href} onClick={(e) => { e.preventDefault(); defilerVers(href); }}>
      {children}
    </a>
  );
}

export default function Footer() {
  const annee = new Date().getFullYear();
  const { telephone, email, adresse } = useCoordonnees();

  return (
    <footer className="pied">
      <div className="conteneur pied-grille">
        <div className="pied-presentation">
          <LogoEntete variante="blanc" />
          <p>
            Logistique de chantier pour les entreprises du BTP : flux, accès, livraisons, bennes, propreté et
            sécurité logistique.
          </p>
        </div>

        <nav aria-labelledby="pied-navigation">
          <h2 id="pied-navigation">Navigation</h2>
          <ul>
            {NAVIGATION.map((l) => (
              <li key={l.href}><LienAncre href={l.href}>{l.label}</LienAncre></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.titre}><LienAncre href="#services">{s.titre}</LienAncre></li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul>
            {telephone && (
              <li className="pied-contact">
                <Icone nom="telephone" taille={18} />
                <a href={`tel:${telephone.replace(/\s+/g, '')}`}>{telephone}</a>
              </li>
            )}
            {email && (
              <li className="pied-contact">
                <Icone nom="email" taille={18} />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            )}
            {adresse && (
              <li className="pied-contact">
                <Icone nom="lieu" taille={18} />
                <span>{adresse}</span>
              </li>
            )}
            <li><LienAncre href="#contact">Demander un devis</LienAncre></li>
          </ul>
        </div>
      </div>

      <div className="pied-bas">
        <div className="conteneur pied-bas-ligne">
          <span>© {annee} Groupe Nanei. Tous droits réservés.</span>
          <nav aria-label="Informations légales">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
          </nav>
          <button type="button" className="bouton-haut" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Haut de page <Icone nom="haut" taille={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
