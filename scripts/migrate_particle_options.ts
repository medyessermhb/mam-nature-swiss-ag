
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase Credentials');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrateOptions() {
    console.log('--- Migrating Particle Filter Options ---');

    // 1. Maintain existing "With Auto Backwash" (ID: water-particle-filter) at 238 EUR
    // It already exists, so we might just ensure its name/price if needed, but likely fine.

    // 2. Add "Without Auto Backwash" (ID: water-particle-filter-manual) at 148 EUR
    // Ratios based on existing: MA ~10.42, CH ~0.916
    const manualVariant = {
        id: 'water-particle-filter-manual',
        name: 'WATER PARTICLE FILTER (Manual)',
        price_eu: 148,
        price_ma: 1542, // Approx 148 * 10.42
        price_ch: 136   // Approx 148 * 0.916
    };

    const { error } = await supabase
        .from('product_prices')
        .upsert(manualVariant, { onConflict: 'id' });

    if (error) {
        console.error('Error upserting manual variant:', error);
    } else {
        console.log('Successfully added/updated manual variant:', manualVariant);
    }
}

migrateOptions();
