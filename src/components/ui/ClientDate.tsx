'use client';

import { useEffect, useState } from 'react';

interface ClientDateProps {
    date: string | Date;
    options?: Intl.DateTimeFormatOptions;
    fallback?: string;
}

export default function ClientDate({ date, options, fallback = '-' }: ClientDateProps) {
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
        if (!date) return;
        const d = new Date(date);
        setFormattedDate(d.toLocaleDateString(undefined, options));
    }, [date, options]);

    if (!formattedDate) return <>{fallback}</>;

    return <>{formattedDate}</>;
}
