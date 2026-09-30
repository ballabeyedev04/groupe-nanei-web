import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import VitrinePage from './pages/public/VitrinePage';
import IntrouvablePage from './pages/public/IntrouvablePage';

// Seule la vitrine est chargée d'emblée : pages légales et back-office sont
// découpés en fichiers séparés, téléchargés uniquement quand on les ouvre.
// Le visiteur du site ne télécharge donc jamais le code de l'admin.
const MentionsLegalesPage = lazy(() => import('./pages/public/MentionsLegalesPage'));
const ConfidentialitePage = lazy(() => import('./pages/public/ConfidentialitePage'));
const Admin = lazy(() => import('./routes/AdminRoutes'));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<VitrinePage />} />
        <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
        <Route path="/politique-de-confidentialite" element={<ConfidentialitePage />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<IntrouvablePage />} />
      </Routes>
    </Suspense>
  );
}
