
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

async function checkPrice() {
    const { data, error } = await supabase
        .from('product_prices')
        .select('*')
        .eq('id', 'water-particle-filter');

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Current Price Data:', data);
    }
}

checkPrice();
