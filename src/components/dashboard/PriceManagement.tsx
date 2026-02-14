'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, RefreshCw, AlertCircle, Check, DollarSign } from 'lucide-react';
import styles from '@/styles/Dashboard.module.css'; // Re-use dashboard styles if possible

interface ProductPrice {
    id: string;
    name: string;
    price_ma: number;
    price_ch: number;
    price_eu: number;
}

export default function PriceManagement() {
    const [prices, setPrices] = useState<ProductPrice[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        setLoading(true);
        setMessage(null);
        const { data, error } = await supabase
            .from('product_prices')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching prices:', error);
            setMessage({ type: 'error', text: 'Failed to load prices.' });
        } else {
            setPrices(data || []);
        }
        setLoading(false);
    };

    const handlePriceChange = (id: string, field: keyof ProductPrice, value: string) => {
        // Allow empty string for better typing experience, convert to 0 on save if needed
        // But here we store as number in state? Better to update state as is.
        // To simplify, let's keep state as number but handle input carefully.
        const numValue = parseFloat(value);
        setPrices(prices.map(p => p.id === id ? { ...p, [field]: isNaN(numValue) ? 0 : numValue } : p));
    };

    const savePrice = async (product: ProductPrice) => {
        setSaving(product.id);
        setMessage(null);

        const { error } = await supabase
            .from('product_prices')
            .update({
                price_ma: product.price_ma,
                price_ch: product.price_ch,
                price_eu: product.price_eu,
            })
            .eq('id', product.id);

        if (error) {
            console.error('Error updating price:', error);
            setMessage({ type: 'error', text: `Failed to update ${product.name}` });
        } else {
            setMessage({ type: 'success', text: `Updated ${product.name} successfully` });

            // Clear success message after 3 seconds
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
        setSaving(null);
    };

    return (
        <div className={styles.tableWrapper}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 10px' }}>
                <h3>Product Pricing</h3>
                <button onClick={fetchPrices} className={styles.actionBtn} title="Refresh Prices">
                    <RefreshCw size={18} className={loading ? 'spin' : ''} />
                </button>
            </div>

            {message && (
                <div style={{
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '6px',
                    backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                    color: message.type === 'success' ? '#166534' : '#991b1b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                </div>
            )}

            {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>Loading prices...</div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className={styles.table} style={{ minWidth: '800px' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Product Name</th>
                                <th style={{ width: '15%' }}>Price (MA) MAD</th>
                                <th style={{ width: '15%' }}>Price (CH) CHF</th>
                                <th style={{ width: '15%' }}>Price (EU) EUR</th>
                                <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <strong>{product.name}</strong><br />
                                        <small style={{ color: '#64748b' }}>{product.id}</small>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <input
                                                type="number"
                                                value={product.price_ma}
                                                onChange={(e) => handlePriceChange(product.id, 'price_ma', e.target.value)}
                                                className={styles.input}
                                                style={{ width: '100%', padding: '8px' }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <input
                                                type="number"
                                                value={product.price_ch}
                                                onChange={(e) => handlePriceChange(product.id, 'price_ch', e.target.value)}
                                                className={styles.input}
                                                style={{ width: '100%', padding: '8px' }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <input
                                                type="number"
                                                value={product.price_eu}
                                                onChange={(e) => handlePriceChange(product.id, 'price_eu', e.target.value)}
                                                className={styles.input}
                                                style={{ width: '100%', padding: '8px' }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => savePrice(product)}
                                            disabled={saving === product.id}
                                            className={styles.btn}
                                            style={{
                                                padding: '8px',
                                                background: '#0f172a',
                                                color: 'white',
                                                border: 'none',
                                                opacity: saving === product.id ? 0.7 : 1,
                                                cursor: saving === product.id ? 'not-allowed' : 'pointer'
                                            }}
                                            title="Save Changes"
                                        >
                                            {saving === product.id ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
