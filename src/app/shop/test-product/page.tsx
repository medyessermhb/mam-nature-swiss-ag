'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { usePricing } from '@/context/PricingContext';
// ProductPage.module.css doesn't exist, using inline styles for this test page
// ProductPage.module.css doesn't exist, using inline styles for this test page

export default function TestProductPage() {
    const { addToCart } = useCart();
    const { getPrice, getRawPrice, currency } = usePricing();

    const product = {
        id: 'test-product',
        name: 'TEST PRODUCT',
        priceKey: 'test-product',
        image: 'https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/products/cartridge%20(1).webp',
    };

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: getRawPrice(product.priceKey),
            image: product.image,
            currency: currency
        });
    };

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: 150, minHeight: '80vh', textAlign: 'center', paddingLeft: 20, paddingRight: 20 }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 20 }}>TEST PRODUCT</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: 40 }}>
                    This product is for <strong>payment testing purposes only</strong>.<br />
                    Do not purchase if you are a real customer.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 50, alignItems: 'center', flexWrap: 'wrap' }}>
                    <img
                        src={product.image}
                        alt="Test Product"
                        width={300}
                        height={300}
                        style={{ objectFit: 'contain' }}
                    />

                    <div style={{ textAlign: 'left' }}>
                        <h2 style={{ fontSize: '2rem', color: '#D52D25', marginBottom: 20 }}>
                            {getPrice(product.priceKey)}
                        </h2>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                background: '#D52D25',
                                color: 'white',
                                border: 'none',
                                padding: '15px 40px',
                                fontSize: '1.2rem',
                                borderRadius: '50px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
