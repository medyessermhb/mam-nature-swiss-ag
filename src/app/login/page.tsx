'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
  title: "Welcome Back",
  subtitle: "Sign in to access your dashboard",
  email: "Email Address",
  password: "Password",
  btn: "Sign In",
  loading: "Signing in...",
  noAccount: "Don't have an account?",
  register: "Register here",
  error: "Invalid email or password."
};

const CONTENT_FR = {
  title: "Bon retour",
  subtitle: "Connectez-vous pour accéder à votre tableau de bord",
  email: "Adresse Email",
  password: "Mot de passe",
  btn: "Se connecter",
  loading: "Connexion...",
  noAccount: "Pas encore de compte ?",
  register: "S'inscrire ici",
  error: "Email ou mot de passe incorrect."
};

const CONTENT_DE = {
  title: "Willkommen zurück",
  subtitle: "Melden Sie sich an, um auf Ihr Dashboard zuzugreifen",
  email: "E-Mail-Adresse",
  password: "Passwort",
  btn: "Anmelden",
  loading: "Anmeldung...",
  noAccount: "Noch kein Konto?",
  register: "Hier registrieren",
  error: "Ungültige E-Mail oder Passwort."
};

const CONTENT_ES = {
  title: "Bienvenido de nuevo",
  subtitle: "Inicie sesión para acceder a su panel",
  email: "Dirección de correo electrónico",
  password: "Contraseña",
  btn: "Iniciar sesión",
  loading: "Iniciando sesión...",
  noAccount: "¿No tiene una cuenta?",
  register: "Regístrese aquí",
  error: "Correo electrónico o contraseña no válidos."
};

export default function LoginPage() {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const isGerman = language === 'de';
  const isSpanish = language === 'es';
  const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : isSpanish ? CONTENT_ES : CONTENT_EN;

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(content.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>

        {errorMsg && <div className={styles.error}>{errorMsg}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{content.email}</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>{content.password}</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <div style={{ textAlign: 'right', marginTop: '5px' }}>
              <Link href="/forgot-password" className={styles.link} style={{ fontSize: '13px' }}>
                {isFrench ? 'Mot de passe oublié ?' : isGerman ? 'Passwort vergessen?' : isSpanish ? '¿Olvidó su contraseña?' : 'Forgot Password?'}
              </Link>
            </div>
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? content.loading : content.btn}
          </button>
        </form>

        <div className={styles.footerLink}>
          {content.noAccount} <Link href="/register" className={styles.link}>{content.register}</Link>
        </div>
      </div>
    </div>
  );
}