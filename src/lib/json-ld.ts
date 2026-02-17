import { PRICES } from '@/data/prices';

export function getOrganizationJsonLd() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com';

    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Mam Nature Swiss AG',
        url: baseUrl,
        logo: '/images/website_details/mam-nature_full_logo.svg',
        description: 'Swiss-engineered water filtration, revitalization, and anti-limescale solutions.',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'CH'
        },
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'info@mam-nature.com'
        }
    };
}

export function getProductJsonLd(product: {
    name: string;
    description: string;
    image: string;
    slug: string;
    priceKey?: string;
    brand?: string;
}) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mam-nature.com';
    const url = `${baseUrl}/shop/${product.slug}`;

    // Get base price (Europe as default reference)
    let price = 0;
    let currency = 'EUR';

    if (product.priceKey && PRICES[product.priceKey]) {
        price = PRICES[product.priceKey].Europe;
    }

    const schema: any = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        sku: product.priceKey,
        brand: {
            '@type': 'Brand',
            name: product.brand || 'Mam Nature Swiss'
        },
        offers: {
            '@type': 'Offer',
            url: url,
            priceCurrency: currency,
            price: price,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition'
        }
    };

    return schema;
}
