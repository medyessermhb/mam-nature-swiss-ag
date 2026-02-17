'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Info, CheckSquare } from 'lucide-react';
import styles from './ProductsGrid.module.css';
// 1. Import Contexts and Data
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';


import ProductOptionModal from '@/components/ui/ProductOptionModal'; // Import Modal

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

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

    // SPECIAL CASE: Particle Filter Options
    if (product.id === 'particle-filter') {
      setIsModalOpen(true);
      return;
    }

    // SPECIAL CASE: Sets with Auto Backwash Option
    const SETS_WITH_OPTIONS = [
      'mam-nature-eco-set',
      'mam-nature-eco-set-plus',
      'mam-nature-water-treatment-complete-set',
      'mam-nature-water-treatment-complete-set-plus'
    ];

    if (SETS_WITH_OPTIONS.includes(product.id)) {
      setIsModalOpen(true);
      return;
    }

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

  const handleOptionConfirm = (selectedId: string) => {
    // Determine details based on selection

    // PARTICLE FILTER LOGIC
    if (product.id === 'particle-filter') {
      const isManual = selectedId === 'water-particle-filter-manual';
      const priceKey = selectedId;
      const rawPrice = getRawPrice(priceKey);
      const suffix = isManual ? '(Without Automatic Backwash)' : '(With Automatic Backwash)';
      const name = `${product.name} ${suffix}`;

      // Select image based on variant
      let finalImage = product.image;
      if (isManual) {
        finalImage = "/images/products/PARTICLE FILTER/PARTICLE FILTER NO BACKWASH Aqmos AQ1 Particle Filter 1.webp";
      } else {
        finalImage = "/images/products/PARTICLE FILTER/Particle Filter WITH Autom. Backwash FRONT view 1.webp";
      }

      addToCart({
        id: selectedId,
        name: name,
        price: rawPrice,
        currency: currency || 'EUR',
        image: finalImage
      });

      setIsModalOpen(false);
      return;
    }

    // SETS LOGIC
    const isAuto = selectedId.endsWith('-auto');
    const priceKey = selectedId;
    const rawPrice = getRawPrice(priceKey);
    const suffix = isAuto ? '(With Automatic Backwash)' : '(Without Automatic Backwash)';
    const name = `${product.name} ${suffix}`;

    let finalImage = product.image;

    // Image Mapping for Sets
    if (product.id === 'mam-nature-eco-set') {
      finalImage = isAuto
        ? "/images/products/AUTOBACKWASH/Eco Set+Aqmos AUTO BACKWASH.webp"
        : "/images/products/WITHOUT AUTO BACKWASH/Eco Set+Aqmos 1 WITHOUT AUTOMATIC BACKWASH.webp";
    } else if (product.id === 'mam-nature-eco-set-plus') {
      finalImage = isAuto
        ? "/images/products/AUTOBACKWASH/Eco Set PLUS+Aqmos incl. autom. Backwash 1.webp"
        : "/images/products/WITHOUT AUTO BACKWASH/Eco Set Plus + Aqmos 1 WITHOUT AUTOMATIC BACKWASH.webp";
    } else if (product.id === 'mam-nature-water-treatment-complete-set') {
      finalImage = isAuto
        ? "/images/products/AUTOBACKWASH/complete set+Aqmos incl. autom. Backwash 1.webp"
        : "/images/products/WITHOUT AUTO BACKWASH/mam nature complete set + WITHOUT AUTOMATIC BACKWASH.webp";
    } else if (product.id === 'mam-nature-water-treatment-complete-set-plus') {
      finalImage = isAuto
        ? "/images/products/AUTOBACKWASH/complete set plus+ Aqmos incl automatic Backwash 1.webp"
        : "/images/products/WITHOUT AUTO BACKWASH/complete set plus+ WITHOUT AUTOMATIC BACKWASH.webp";
    }

    addToCart({
      id: selectedId,
      name: name,
      price: rawPrice,
      currency: currency || 'EUR',
      image: finalImage
    });

    setIsModalOpen(false);
  };

  // Prepare options for modal
  let options = [];

  if (product.id === 'particle-filter') {
    options = [
      {
        id: 'water-particle-filter-manual',
        label: 'Without Automatic Backwash',
        price: getPrice('water-particle-filter-manual')
      },
      {
        id: 'water-particle-filter',
        label: 'With Automatic Backwash',
        price: getPrice('water-particle-filter')
      }
    ];
  } else {
    // Generic Set Options
    // Base ID is Manual (no suffix)
    // Auto ID has '-auto' suffix
    options = [
      {
        id: product.id,
        label: 'Without Automatic Backwash',
        price: getPrice(product.priceKey) // Base price key usually matches ID for main sets
      },
      {
        id: `${product.id}-auto`,
        label: 'With Automatic Backwash (+90 EUR)',
        price: getPrice(`${product.id}-auto`)
      }
    ];
  }

  return (
    <>
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

      {/* Option Modal */}
      <ProductOptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleOptionConfirm}
        productName={product.name}
        options={options}
      />
    </>
  );
}