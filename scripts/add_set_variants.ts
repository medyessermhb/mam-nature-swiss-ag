
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const BASE_PRODUCTS = [
    'mam-nature-eco-set',
    'mam-nature-eco-set-plus',
    'mam-nature-water-treatment-complete-set',
    'mam-nature-water-treatment-complete-set-plus'
];

async function migrate() {
    console.log("Fetching base product prices...");
    const { data: baseProducts, error: fetchError } = await supabase
        .from('product_prices')
        .select('*')
        .in('id', BASE_PRODUCTS);

    if (fetchError) {
        console.error("Error fetching base products:", fetchError);
        return;
    }

    if (!baseProducts || baseProducts.length === 0) {
        console.log("No base products found.");
        return;
    }

    const newProducts = baseProducts.map(p => {
        const newId = `${p.id}-auto`;
        return {
            id: newId,
            name: `${p.name} (Auto Backwash)`,
            price_eu: (p.price_eu || 0) + 90,
            price_ch: (p.price_ch || 0) + 90,
            price_ma: (p.price_ma || 0) + 900,
        };
    });

    console.log("Preparing to insert/upsert new variants:", newProducts.map(p => p.id));

    const { error: insertError } = await supabase
        .from('product_prices')
        .upsert(newProducts);

    if (insertError) {
        console.error("Error inserting new products:", insertError);
    } else {
        console.log("Successfully added auto-backwash variants.");
    }
}

migrate();
