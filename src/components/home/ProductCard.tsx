'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Info, CheckSquare } from 'lucide-react';
import styles from './ProductsGrid.module.css';
// 1. Import Contexts and Data
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';


export interface ProductType {
  id: string;
  name: string;
  subtitle?: string;
  slug: string;
  image: string;
  imageHeight: number;
  priceKey: string;
  features: string[];
  sliderGroups?: {
    img1: string;
    img2: string;
  }[];
}

export default function ProductCard({ product }: { product: ProductType }) {
  const { getPrice, getRawPrice, isLoading, currency, region } = usePricing(); // Get region & currency
  const { addToCart } = useCart(); // Get cart function
  const [currentSlideGroup, setCurrentSlideGroup] = useState(0);

  // Slider Logic
  useEffect(() => {
    if (!product.sliderGroups || product.sliderGroups.length < 2) return;

    const interval = setInterval(() => {
      setCurrentSlideGroup((prev) => (prev + 1) % (product.sliderGroups?.length || 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [product.sliderGroups]);

  // --- HANDLE ADD TO CART ---
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page
    e.stopPropagation();

    // 1. Get numeric price directly from context (Supabase source)
    const rawPrice = getRawPrice(product.priceKey);

    if (rawPrice === 0) {
      console.error(`Price not found for ${product.priceKey}`);
      return;
    }

    // 2. Add to Cart
    addToCart({
      id: product.id,
      name: product.name,
      price: rawPrice,
      currency: currency || 'EUR',
      image: product.image
    });
  };

  return (
    <Link href={`/shop/${product.slug}`} className={styles.card}>

      {/* Top Image Section */}
      <div className={styles.imageWrapper}>
        <h3 className={styles.productTitle}>
          {product.name}
          {product.subtitle && <span className={styles.subtitle}>{product.subtitle}</span>}
        </h3>

        <div className={styles.imageDisplayArea}>
          <div className={styles.mainImageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.mainImage}
              style={{ height: `${product.imageHeight}px` }}
              loading="lazy"
            />
          </div>

          {/* Mini Slider */}
          {product.sliderGroups && product.sliderGroups.length > 0 && (
            <div className={styles.sliderWrapper}>
              {product.sliderGroups.map((group, idx) => (
                <div
                  key={idx}
                  className={`${styles.sliderGroup} ${idx === currentSlideGroup ? styles.active : ''}`}
                >
                  <img src={group.img1} alt="" className={styles.sliderSmallImage} />
                  <img src={group.img2} alt="" className={styles.sliderSmallImage} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions Bar */}
        <div className={styles.actionsBar}>
          <button
            className={`${styles.iconBtn} ${styles.tooltipContainer}`}
            data-tooltip="Learn more"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/shop/${product.slug}`;
            }}
          >
            <Info size={18} />
          </button>

          <div className={styles.price}>
            {isLoading ? 'Loading...' : getPrice(product.priceKey)}
          </div>

          <button
            className={`${styles.iconBtn} ${styles.tooltipContainer}`}
            data-tooltip="Add to cart"
            onClick={handleAddToCart} // <--- Connected Handler
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentArea}>
        <ul className={styles.features}>
          {product.features.map((feature, idx) => (
            <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <div style={{ minWidth: '16px', marginTop: '4px', color: 'var(--icon-blue)' }}>
                <CheckSquare size={14} />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

    </Link>
  );
}