import Modal from '../ui/Modal';
import DevisFormulaire from './DevisFormulaire';

// La modale se ferme dès l'envoi réussi et cède la place à la confirmation
// SweetAlert, bien plus visible qu'un message dans le formulaire.
export default function DevisModal({ ouvert, onFermer }) {
  return (
    <Modal ouvert={ouvert} onFermer={onFermer} titre="Demander un devis" largeur={640}>
      <p style={{ margin: '0 0 24px', color: 'var(--texte-doux)', fontSize: 15 }}>
        Décrivez-nous votre chantier : nous revenons vers vous avec une proposition adaptée.
      </p>
      <DevisFormulaire onEnvoye={onFermer} />
    </Modal>
  );
}
