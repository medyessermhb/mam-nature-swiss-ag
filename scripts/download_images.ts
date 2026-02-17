
import fs from 'fs';
import path from 'path';
import https from 'https';

// Configuration
const SOURCE_DIR = path.join(process.cwd(), 'src');
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const SUPABASE_URL_PATTERN = /https:\/\/nqhluawiejltjghgnbwl\.supabase\.co\/storage\/v1\/object\/public\/([^"'\)\s]+)/g;

if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Recursive file walker
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (file.match(/\.(ts|tsx|js|jsx)$/)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

// Helper to download image
async function downloadImage(url: string, destPath: string) {
    if (fs.existsSync(destPath)) {
        console.log(`Skipping existing: ${destPath}`);
        return;
    }

    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${url} -> ${destPath}`);
                resolve(true);
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}

// Main execution
async function main() {
    console.log('Scanning for Supabase images...');

    const files = getAllFiles(SOURCE_DIR);
    const urls = new Set<string>();
    const urlToLocalMap: Record<string, string> = {};

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        let match;
        while ((match = SUPABASE_URL_PATTERN.exec(content)) !== null) {
            urls.add(match[0]);
        }
    }

    console.log(`Found ${urls.size} unique image URLs.`);

    for (const url of urls) {
        // Extract path after /public/
        const urlObj = new URL(url);
        // Path looks like /storage/v1/object/public/WEBSITE-P/products/HYDROGEEN%20BOOSTER.webp
        // We want WEBSITE-P/products/HYDROGEEN BOOSTER.webp

        // Decode URI component to handle %20
        const rawPath = decodeURIComponent(urlObj.pathname.split('/public/')[1]);

        // Clean up path slightly
        const safePath = rawPath.replace(/\s+/g, '_');
        const localPath = path.join(IMAGES_DIR, safePath);

        urlToLocalMap[url] = `/images/${safePath}`;

        try {
            await downloadImage(url, localPath);
        } catch (error) {
            console.error(`Error downloading ${url}:`, error);
        }
    }

    // Save the map for next step
    fs.writeFileSync('image_map.json', JSON.stringify(urlToLocalMap, null, 2));
    console.log('Download complete. Map saved to image_map.json');
}

main();
