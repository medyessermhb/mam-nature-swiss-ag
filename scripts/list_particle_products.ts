
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

async function items() {
    const { data, error } = await supabase
        .from('product_prices')
        .select('*')
        .ilike('id', '%particle%');

    if (error) console.error(error);
    else console.table(data);
}

items();
