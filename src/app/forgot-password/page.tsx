'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
    title: "Reset Password",
    subtitle: "Enter your email to receive a reset link",
    email: "Email Address",
    btn: "Send Reset Link",
    loading: "Sending...",
    back: "Back to Login",
    success: "Check your email for the reset link!",
    error: "Error sending reset email. Please try again."
};

const CONTENT_FR = {
    title: "Réinitialiser le mot de passe",
    subtitle: "Entrez votre email pour recevoir un lien",
    email: "Adresse Email",
    btn: "Envoyer le lien",
    loading: "Envoi en cours...",
    back: "Retour à la connexion",
    success: "Vérifiez votre email pour le lien de réinitialisation !",
    error: "Erreur lors de l'envoi. Veuillez réessayer."
};

const CONTENT_DE = {
    title: "Passwort zurücksetzen",
    subtitle: "Geben Sie Ihre E-Mail-Adresse ein, um einen Link zu erhalten",
    email: "E-Mail-Adresse",
    btn: "Link senden",
    loading: "Senden...",
    back: "Zurück zur Anmeldung",
    success: "Überprüfen Sie Ihre E-Mail auf den Wiederherstellungslink!",
    error: "Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut."
};

const CONTENT_ES = {
    title: "Restablecer contraseña",
    subtitle: "Ingrese su correo electrónico para recibir un enlace",
    email: "Dirección de correo electrónico",
    btn: "Enviar enlace",
    loading: "Enviando...",
    back: "Volver a iniciar sesión",
    success: "¡Revise su correo para el enlace de restablecimiento!",
    error: "Error al enviar el correo. Por favor, inténtelo de nuevo."
};

export default function ForgotPasswordPage() {
    const { language } = useLanguage();
    const isFrench = language === 'fr';
    const isGerman = language === 'de';
    const isSpanish = language === 'es';
    const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : isSpanish ? CONTENT_ES : CONTENT_EN;

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        });

        if (error) {
            setMessage({ type: 'error', text: error.message || content.error });
        } else {
            setMessage({ type: 'success', text: content.success });
            setEmail('');
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

                <form onSubmit={handleReset} className={styles.form}>
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
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? content.loading : content.btn}
                    </button>
                </form>

                <div className={styles.footerLink}>
                    <Link href="/login" className={styles.link}>{content.back}</Link>
                </div>
            </div>
        </div>
    );
}
