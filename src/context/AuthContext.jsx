import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as authService from '../service/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  // "verifie" : tant qu'on n'a pas interrogé /auth/me une première fois, on
  // ne sait pas s'il y a une session — évite un flash de redirection vers
  // /admin/login au premier rendu si le cookie est en fait encore valide.
  const [verifie, setVerifie] = useState(false);

  useEffect(() => {
    authService
      .obtenirSessionCourante()
      .then(setAdmin)
      .catch(() => setAdmin(null))
      .finally(() => setVerifie(true));
  }, []);

  const seConnecter = useCallback(async (email, motDePasse) => {
    const admin = await authService.login(email, motDePasse);
    setAdmin(admin);
    return admin;
  }, []);

  const seDeconnecter = useCallback(async () => {
    await authService.logout().catch(() => {});
    setAdmin(null);
  }, []);

  // Après une modification du profil : le menu et l'avatar suivent aussitôt.
  const mettreAJourAdmin = useCallback((misAJour) => setAdmin(misAJour), []);

  return (
    <AuthContext.Provider value={{ admin, verifie, seConnecter, seDeconnecter, mettreAJourAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé sous <AuthProvider>.');
  return ctx;
}
