// src/components/home/MessageSpot.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

interface MessageSpotProps {
  messages: string[];
  positionClass: string; // e.g., 'pos1'
  sizeClass: string;     // e.g., 'messageLg'
  maxWidthClass: string; // e.g., 'maxw1'
  isActiveSlide: boolean;
}

export default function MessageSpot({ 
  messages, 
  positionClass, 
  sizeClass, 
  maxWidthClass,
  isActiveSlide 
}: MessageSpotProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState<'entering' | 'active' | 'leaving'>('entering');
  const [progressWidth, setProgressWidth] = useState(0);
  const MESSAGE_DURATION = 5000;

  // Reset when slide becomes active
  useEffect(() => {
    if (isActiveSlide) {
      setCurrentIndex(0);
      setAnimState('entering');
      // Small delay to trigger the 'entering' animation class
      const timer = setTimeout(() => setAnimState('active'), 700);
      return () => clearTimeout(timer);
    }
  }, [isActiveSlide]);

  // Message Cycling Logic
  useEffect(() => {
    if (!isActiveSlide || messages.length <= 1) return;

    const interval = setInterval(() => {
      // 1. Leave
      setAnimState('leaving');

      setTimeout(() => {
        // 2. Change Text & Enter
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setAnimState('entering');

        setTimeout(() => {
          // 3. Active
          setAnimState('active');
        }, 50); 
      }, 500); // Wait for leave animation

    }, MESSAGE_DURATION);

    return () => clearInterval(interval);
  }, [isActiveSlide, messages.length]);

  // Progress Bar Animation (Simple CSS transition wrapper)
  useEffect(() => {
    if (animState === 'active') {
      setProgressWidth(100);
    } else {
      setProgressWidth(0);
    }
  }, [animState]);

  // Determine text alignment for progress bar origin
  const getTransformOrigin = () => {
    // Note: This approximates the CSS logic based on position class
    if (positionClass.includes('pos1') || positionClass.includes('pos5')) return 'left center';
    if (positionClass.includes('pos3')) return 'right center';
    return 'center center';
  };

  return (
    <div className={`${styles.messageContainer} ${styles[positionClass]} ${styles[sizeClass]} ${styles[maxWidthClass]} ${animState === 'entering' ? styles.entering : ''}`}>
      <div className={`${styles.messageText} ${styles[animState]}`}>
        {messages[currentIndex]}
      </div>
      
      {/* Progress Bar */}
      <div 
        className={styles.messageProgress} 
        style={{ 
          transform: `scaleX(${progressWidth / 100})`,
          transformOrigin: getTransformOrigin(),
          transition: animState === 'active' ? `transform ${MESSAGE_DURATION}ms linear` : 'none'
        }}
      />

      {/* Dots Indicator */}
      {messages.length > 1 && (
        <div className={styles.messageIndicator}>
          {messages.map((_, idx) => (
            <div 
              key={idx} 
              className={`${styles.indicatorDot} ${idx === currentIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}