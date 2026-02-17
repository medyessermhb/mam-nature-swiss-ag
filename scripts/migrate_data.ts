
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// OLD CREDS (From previous .env.local snapshot)
const OLD_URL = 'https://nqhluawiejltjghgnbwl.supabase.co';
const OLD_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xaGx1YXdpZWpsdGpnaGduYndsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDI1OTExMywiZXhwIjoyMDg1ODM1MTEzfQ.vHWgSqo-4Nh6swbzE2o2AISh-sCvhdL54CKyyadRqLw';

// NEW CREDS (From current .env.local)
const NEW_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const NEW_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!NEW_URL || !NEW_KEY) {
    console.error('Missing New Supabase Credentials in .env.local');
    process.exit(1);
}

const oldDb = createClient(OLD_URL, OLD_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
const newDb = createClient(NEW_URL, NEW_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

// TABLES TO MIGRATE (Order matters for FKs)
// profiles is handled nicely via trigger usually, but we might want to upsert to ensure data matches
const TABLES = [
    'profiles',
    'product_prices',
    'orders',
    'tickets',
    'ticket_messages',
    'contact_messages'
];

async function migrateUsers() {
    console.log('--- Migrating Users ---');
    let { data: { users }, error } = await oldDb.auth.admin.listUsers();
    if (error) {
        console.error('Error fetching old users:', error);
        return;
    }

    if (!users) return;

    console.log(`Found ${users.length} users to migrate.`);

    for (const user of users) {
        // Check if exists
        const { data: existing } = await newDb.auth.admin.getUserById(user.id);
        if (existing && existing.user) {
            console.log(`User ${user.email} already exists.`);
            continue;
        }

        console.log(`Creating user ${user.email}...`);
        const { error: createError } = await newDb.auth.admin.createUser({
            id: user.id, // Preserve UUID!
            email: user.email,
            email_confirm: true, // Auto confirm
            user_metadata: user.user_metadata,
            password: 'TEMPORARY_PASSWORD_RESET_REQUIRED_123!' // User must reset
        });

        if (createError) {
            console.error(`Failed to create user ${user.email}:`, createError.message);
        }
    }
}

async function migrateTable(tableName: string) {
    console.log(`--- Migrating ${tableName} ---`);

    // 1. Fetch all data
    const { data: rows, error } = await oldDb.from(tableName).select('*');
    if (error) {
        console.error(`Error reading ${tableName}:`, error.message);
        return;
    }

    if (!rows || rows.length === 0) {
        console.log(`No rows in ${tableName}.`);
        return;
    }

    console.log(`Found ${rows.length} rows in ${tableName}.`);

    // 2. Insert (Chunked if needed, but for now simple)
    const { error: insertError } = await newDb.from(tableName).upsert(rows);
    if (insertError) {
        console.error(`Error inserting into ${tableName}:`, insertError.message);
    } else {
        console.log(`Successfully migrated ${tableName}.`);
    }
}

async function run() {
    await migrateUsers();

    for (const table of TABLES) {
        await migrateTable(table);
    }

    console.log('--- Migration Complete ---');
}

run();
