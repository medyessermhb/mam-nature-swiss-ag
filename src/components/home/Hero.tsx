'use client';

import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import MessageSpot from './MessageSpot';
import { useLanguage } from '@/context/LanguageContext'; // <--- Import Context

// --- DATA CONFIGURATION ---

const SLIDES_EN = [
  {
    id: 0,
    images: {
      desktop: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/BANNERS/complete%20set%20en.webp",
      bigMobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/BANNERS/complete%20set%20big%20en.webp",
      mobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/BANNERS/complete%20set%20small%20en.webp"
    },
    messageSpots: [
      { pos: 'pos1', size: 'messageLg', maxW: 'maxw1', texts: ["Your skin absorbs. Give it healing water.", "Your skin deserves better than chlorine."] },
      { pos: 'pos2', size: 'messageSm', maxW: 'maxw2', texts: ["Purity in every cup. Excellence in taste.", "Infuse excellence. cup after cup."] },
      { pos: 'pos3', size: 'messageLg', maxW: 'maxw3', texts: ["Bought organic. Toxic when rinsed. Not anymore.", "Bought organic. washed pure. Finally."] },
      { pos: 'pos4', size: 'messageSm', maxW: 'maxw4', texts: ["Less limescale more durability for your devices.", "Your appliances deserve excellence. So does your body."] },
      { pos: 'pos5', size: 'messageSm', maxW: 'maxw5', texts: ["The only water that speaks your body's language.", "Water the way nature meant it."] },
    ]
  },
  {
    id: 1,
    images: {
      desktop: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/BANNERS/eco%20set%20en.webp",
      bigMobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/BANNERS/eco%20set%20big%20en.webp",
      mobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/BANNERS/eco%20set%20small%20en.webp"
    },
    messageSpots: [
      { pos: 'pos1', size: 'messageLg', maxW: 'maxw1', texts: ["Your skin absorbs. Give it healing water.", "Your skin deserves better than chlorine."] },
      { pos: 'pos2', size: 'messageSm', maxW: 'maxw2', texts: ["Purity in every cup. Excellence in taste.", "Infuse excellence. cup after cup."] },
      { pos: 'pos3', size: 'messageLg', maxW: 'maxw3', texts: ["Bought organic. Toxic when rinsed. Not anymore.", "Bought organic. washed pure. Finally."] },
      { pos: 'pos4', size: 'messageSm', maxW: 'maxw4', texts: ["Less limescale more durability for your devices.", "Your appliances deserve excellence. So does your body."] },
      { pos: 'pos5', size: 'messageSm', maxW: 'maxw5', texts: ["The only water that speaks your body's language.", "Water the way nature meant it."] },
    ]
  }
];

const SLIDES_FR = [
  {
    id: 0,
    images: {
      desktop: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/FR/complete%20set%20fr.webp",
      bigMobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/FR/complete%20set%20big%20fr.webp",
      mobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/FR/complete%20set%20small%20fr.webp"
    },
    messageSpots: [
      { pos: 'pos1', size: 'messageLg', maxW: 'maxw1', texts: ["Votre peau absorbe. Offrez-lui une eau qui soigne.", "Votre peau mérite mieux que du chlore. PFAS"] },
      { pos: 'pos2', size: 'messageSm', maxW: 'maxw2', texts: ["Pureté en tasse. Excellence en bouche.", "Infusez l'excellence tasse après tasse."] },
      { pos: 'pos3', size: 'messageLg', maxW: 'maxw3', texts: ["Bio à l'achat Toxique au lavage Plus maintenant", "Bio à l'achat pur au lavage Enfin."] },
      { pos: 'pos4', size: 'messageSm', maxW: 'maxw4', texts: ["Moins de calcaire plus de vie pour vos appareils et vous.", "Vos électroménager mérite l'excellence votre corps aussi."] },
      { pos: 'pos5', size: 'messageSm', maxW: 'maxw5', texts: ["La seule eau qui parle le langage du corps.", "L'eau que la nature aurait voulu pour vous."] },
    ]
  },
  {
    id: 1,
    images: {
      desktop: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/FR/eco%20set%20%20fr.webp",
      bigMobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/FR/eco%20set%20big%20fr.webp",
      mobile: "https://nqhluawiejltjghgnbwl.supabase.co/storage/v1/object/public/WEBSITE-P/FR/eco%20set%20small%20fr.webp"
    },
    messageSpots: [
      { pos: 'pos1', size: 'messageLg', maxW: 'maxw1', texts: ["Votre peau absorbe. Offrez-lui une eau qui soigne.", "Votre peau mérite mieux que du chlore. PFAS"] },
      { pos: 'pos2', size: 'messageSm', maxW: 'maxw2', texts: ["Pureté en tasse. Excellence en bouche.", "Infusez l'excellence tasse après tasse."] },
      { pos: 'pos3', size: 'messageLg', maxW: 'maxw3', texts: ["Bio à l'achat Toxique au lavage Plus maintenant", "Bio à l'achat pur au lavage Enfin."] },
      { pos: 'pos4', size: 'messageSm', maxW: 'maxw4', texts: ["Moins de calcaire plus de vie pour vos appareils et vous.", "Vos électroménager mérite l'excellence votre corps aussi."] },
      { pos: 'pos5', size: 'messageSm', maxW: 'maxw5', texts: ["La seule eau qui parle le langage du corps.", "L'eau que la nature aurait voulu pour vous."] },
    ]
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { language } = useLanguage(); // Get language
  const SLIDE_DURATION = 10000;

  // Select appropriate slides based on language (default to EN)
  const isFrench = language === 'fr'
  const activeSlides = isFrench ? SLIDES_FR : SLIDES_EN;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused, activeSlides.length]);

  return (
    <div 
      className={styles.heroWrapper}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.heroContainer}>
        <div className={styles.heroSlider}>
          {activeSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            >
              {/* Images */}
              <img src={slide.images.desktop} alt="Product Desktop" className={styles.desktopImg} loading="eager" />
              <img src={slide.images.bigMobile} alt="Product Tablet" className={styles.bigMobileImg} loading="eager" />
              <img src={slide.images.mobile} alt="Product Mobile" className={styles.mobileImg} loading="eager" />

              {/* Messages */}
              {slide.messageSpots.map((spot, i) => (
                <MessageSpot
                  key={i}
                  isActiveSlide={index === currentSlide}
                  positionClass={spot.pos}
                  sizeClass={spot.size}
                  maxWidthClass={spot.maxW}
                  messages={spot.texts}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className={styles.sliderNav}>
          {activeSlides.map((_, index) => (
            <div 
              key={index}
              className={`${styles.sliderDot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}