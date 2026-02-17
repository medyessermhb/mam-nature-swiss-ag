'use client';

import React from 'react';
import { X } from 'lucide-react';
import styles from './ProductOptionModal.module.css';

interface Option {
    id: string;
    label: string;
    price: string; // Formatted price
}

interface ProductOptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (selectedId: string) => void;
    productName: string;
    options: Option[];
}

export default function ProductOptionModal({
    isOpen,
    onClose,
    onConfirm,
    productName,
    options
}: ProductOptionModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>

                <h3 className={styles.title}>{productName}</h3>
                <p className={styles.subtitle}>Please select an option:</p>

                <div className={styles.optionsList}>
                    {options.map((option) => (
                        <button
                            key={option.id}
                            className={styles.optionBtn}
                            onClick={() => onConfirm(option.id)}
                        >
                            <div className={styles.optionContent}>
                                <span className={styles.optionLabel}>{option.label}</span>
                                <span className={styles.optionPrice}>{option.price}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
