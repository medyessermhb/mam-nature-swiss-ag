
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrate() {
    console.log('Starting migration for Centralized Pricing...');

    // 1. Add 'addon-automatic-backwash'
    // Price: 90 EUR (approx 95 CHF, 950 MAD - verify checks)
    const addonProduct = {
        id: 'addon-automatic-backwash',
        name: 'Automatic Backwash Addon',
        price_ma: 950,
        price_ch: 95,
        price_eu: 90,
        description: 'Add-on price for Automatic Backwash upgrade'
    };

    // 2. Add 'mam-nature-particle-lime-set-auto'
    // Base price for Particle Lime Set is likely around (148 + 590) = 738? 
    // Getting base price first to be safe, or just insert if we know it.
    // Actually, we should just ensure the ID exists for cart logic. 
    // The price in DB for the combined set should be Base + 90.
    // Let's fetch the base price first.

    const { data: baseProduct, error: fetchError } = await supabase
        .from('product_prices')
        .select('*')
        .eq('id', 'mam-nature-particle-lime-set')
        .single();

    if (fetchError || !baseProduct) {
        console.error('Error fetching base particle-lime-set:', fetchError);
        // Proceeding with addon only if this fails would be bad for the set, but let's try.
    }

    const basePriceMa = baseProduct?.price_ma || 0;
    const basePriceCh = baseProduct?.price_ch || 0;
    const basePriceEu = baseProduct?.price_eu || 0;

    const setAutoProduct = {
        id: 'mam-nature-particle-lime-set-auto',
        name: 'PARTICLE & LIME SET (Automatic Backwash)',
        price_ma: basePriceMa + 950,
        price_ch: basePriceCh + 95,
        price_eu: basePriceEu + 90,
    };

    const productsToUpsert = [addonProduct];
    if (baseProduct) {
        productsToUpsert.push(setAutoProduct);
    }

    const { error } = await supabase
        .from('product_prices')
        .upsert(productsToUpsert, { onConflict: 'id' });

    if (error) {
        console.error('Error updating prices:', error);
    } else {
        console.log('✅ Successfully added/updated addon-automatic-backwash');
        if (baseProduct) {
            console.log(`✅ Successfully added/updated mam-nature-particle-lime-set-auto (Base: ${basePriceEu} + 90 = ${setAutoProduct.price_eu})`);
        } else {
            console.warn('⚠️ Could not create auto variant for particle-lime-set because base product was not found.');
        }
    }
}

migrate();
