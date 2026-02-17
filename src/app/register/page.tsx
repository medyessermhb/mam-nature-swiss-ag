'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
  title: "Create Account",
  subtitle: "Join Mam Nature for easier order tracking",
  name: "Full Name",
  email: "Email Address",
  password: "Password",
  btn: "Create Account",
  loading: "Creating account...",
  hasAccount: "Already have an account?",
  login: "Sign In",
  success: "Registration successful! Please check your email to confirm your account.",
  error: "An error occurred during registration."
};

const CONTENT_FR = {
  title: "Créer un compte",
  subtitle: "Rejoignez Mam Nature pour suivre vos commandes",
  name: "Nom complet",
  email: "Adresse Email",
  password: "Mot de passe",
  btn: "S'inscrire",
  loading: "Création en cours...",
  hasAccount: "Déjà un compte ?",
  login: "Se connecter",
  success: "Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.",
  error: "Une erreur est survenue lors de l'inscription."
};

export default function RegisterPage() {
  const { language } = useLanguage();
  const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: content.success });
      // Optional: Clear form
      setFullName('');
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>

        {message && (
          <div className={message.type === 'error' ? styles.error : styles.success}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{content.name}</label>
            <input
              type="text"
              className={styles.input}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
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
              minLength={6}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? content.loading : content.btn}
          </button>
        </form>

        <div className={styles.footerLink}>
          {content.hasAccount} <Link href="/login" className={styles.link}>{content.login}</Link>
        </div>
      </div>
    </div>
  );
}