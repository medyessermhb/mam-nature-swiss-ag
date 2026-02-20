'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/styles/Auth.module.css';
import { useLanguage } from '@/context/LanguageContext';

const CONTENT_EN = {
    title: "Set New Password",
    subtitle: "Enter your new password below",
    password: "New Password",
    btn: "Update Password",
    loading: "Updating...",
    success: "Password updated successfully!",
    error: "Error updating password.",
    login: "Go to Login"
};

const CONTENT_FR = {
    title: "Nouveau mot de passe",
    subtitle: "Entrez votre nouveau mot de passe ci-dessous",
    password: "Nouveau mot de passe",
    btn: "Mettre à jour",
    loading: "Mise à jour en cours...",
    success: "Mot de passe mis à jour avec succès !",
    error: "Erreur lors de la mise à jour.",
    login: "Aller à la connexion"
};

const CONTENT_DE = {
    title: "Neues Passwort festlegen",
    subtitle: "Geben Sie unten Ihr neues Passwort ein",
    password: "Neues Passwort",
    btn: "Passwort aktualisieren",
    loading: "Aktualisierung...",
    success: "Passwort erfolgreich aktualisiert!",
    error: "Fehler beim Aktualisieren des Passworts.",
    login: "Zur Anmeldung"
};

export default function ResetPasswordPage() {
    const { language } = useLanguage();
    const isFrench = language === 'fr';
    const isGerman = language === 'de';
    const content = isFrench ? CONTENT_FR : isGerman ? CONTENT_DE : CONTENT_EN;
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Check if session exists (user must be logged in via magic link to reset)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                router.push('/login'); // Redirect if no session (magic link invalid/expired)
            }
        });
    }, [router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setMessage({ type: 'error', text: error.message || content.error });
        } else {
            setMessage({ type: 'success', text: content.success });
            // Redirect after short delay
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
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

                {!message?.text?.includes(content.success) ? (
                    <form onSubmit={handleUpdate} className={styles.form}>
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
                ) : (
                    <div className={styles.footerLink}>
                        <Link href="/login" className={styles.link}>{content.login}</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
