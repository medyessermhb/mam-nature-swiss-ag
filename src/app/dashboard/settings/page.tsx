'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

const CONTENT_EN = {
    title: "Account Settings",
    subtitle: "Update your personal information and shipping details.",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone Number",
    address: "Street Address",
    city: "City",
    zip: "ZIP / Postal Code",
    country: "Country",
    btn: "Save Changes",
    loading: "Saving...",
    success: "Profile updated successfully!",
    error: "Error updating profile.",
    back: "Back to Dashboard"
};

const CONTENT_FR = {
    title: "Paramètres du compte",
    subtitle: "Mettez à jour vos informations personnelles et de livraison.",
    firstName: "Prénom",
    lastName: "Nom",
    phone: "Téléphone",
    address: "Adresse",
    city: "Ville",
    zip: "Code Postal",
    country: "Pays",
    btn: "Enregistrer",
    loading: "Enregistrement...",
    success: "Profil mis à jour avec succès !",
    error: "Erreur lors de la mise à jour.",
    back: "Retour au tableau de bord"
};

export default function SettingsPage() {
    const { language } = useLanguage();
    const content = language === 'fr' ? CONTENT_FR : CONTENT_EN;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push('/login');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('first_name, last_name, phone, address, city, zip, country')
                .eq('id', session.user.id)
                .single();

            if (data) {
                setFormData({
                    first_name: data.first_name || '',
                    last_name: data.last_name || '',
                    phone: data.phone || '',
                    address: data.address || '',
                    city: data.city || '',
                    zip: data.zip || '',
                    country: data.country || ''
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: session.user.id,
                ...formData,
                updated_at: new Date().toISOString()
            });

        if (error) {
            console.error('Settings update error:', error.message, error);
            setMessage({ type: 'error', text: `${content.error} (${error.message})` });
        } else {
            console.log('Settings updated successfully');
            setMessage({ type: 'success', text: content.success });
        }
        setSaving(false);
    };

    if (loading) return <div style={{ padding: 50, textAlign: 'center' }}>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>{content.title}</h1>
                    <p className={styles.subtitle}>{content.subtitle}</p>
                </div>
                <Link href="/dashboard" className={styles.backLink}>
                    {content.back}
                </Link>
            </div>

            {message && (
                <div style={{
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    backgroundColor: message.type === 'error' ? '#FEF2F2' : '#F0FDF4',
                    color: message.type === 'error' ? '#991B1B' : '#166534',
                    border: `1px solid ${message.type === 'error' ? '#FECACA' : '#BBF7D0'}`
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.card} style={{ maxWidth: '800px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>{content.firstName}</label>
                        <input
                            name="first_name"
                            type="text"
                            className={styles.input}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>{content.lastName}</label>
                        <input
                            name="last_name"
                            type="text"
                            className={styles.input}
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                    <label className={styles.label}>{content.phone}</label>
                    <input
                        name="phone"
                        type="text"
                        className={styles.input}
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.formGroup} style={{ marginBottom: '20px' }}>
                    <label className={styles.label}>{content.address}</label>
                    <input
                        name="address"
                        type="text"
                        className={styles.input}
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>{content.city}</label>
                        <input
                            name="city"
                            type="text"
                            className={styles.input}
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>{content.zip}</label>
                        <input
                            name="zip"
                            type="text"
                            className={styles.input}
                            value={formData.zip}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className={styles.formGroup} style={{ marginBottom: '30px' }}>
                    <label className={styles.label}>{content.country}</label>
                    <input
                        name="country"
                        type="text"
                        className={styles.input}
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className={styles.actionBtn} disabled={saving}>
                    {saving ? content.loading : content.btn}
                </button>
            </form>
        </div>
    );
}
