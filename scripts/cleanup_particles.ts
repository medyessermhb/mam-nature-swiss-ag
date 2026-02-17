
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

async function cleanup() {
    console.log("Removing duplicate entries...");
    const { error } = await supabase
        .from('product_prices')
        .delete()
        .in('id', ['particle-filter-no-backwash', 'particle-filter-auto-backwash']);

    if (error) console.error("Error deleting:", error);
    else console.log("Successfully deleted duplicates.");
}

cleanup();
