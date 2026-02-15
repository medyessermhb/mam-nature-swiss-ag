import React from 'react';
import styles from '@/styles/Dashboard.module.css';

interface StatusBadgeProps {
    status: string;
    labels?: Record<string, string>; // Optional mapping for translations
}

export default function StatusBadge({ status, labels }: StatusBadgeProps) {
    const s = status?.toLowerCase() || '';

    let className = styles.statusGray;
    if (s.includes('paid')) className = styles.statusBlue;
    else if (s.includes('ship')) className = styles.statusYellow;
    else if (s.includes('deliver')) className = styles.statusGreen;
    else if (s === 'open') className = styles.statusBlue;
    else if (s === 'closed') className = styles.statusGray;
    else if (s === 'cancelled') className = styles.statusRed;
    else if (s === 'processing') className = styles.statusBlue;

    // Use the provided label map if available, otherwise just use the status text
    // We handle the case where status might be an internal code (like 'awaiting_payment')
    const displayText = labels?.[status] || labels?.[s] || status.replace('_', ' ');

    return (
        <span className={`${styles.statusBadge} ${className}`}>
            {displayText}
        </span>
    );
}
