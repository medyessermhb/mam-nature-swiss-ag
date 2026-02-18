'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft, ChevronRight, Plus, Minus, FileText, Award,
    Check, Gem, ArrowLeftRight, Gauge, Wrench, CalendarCheck, ShieldCheck, X, AlertCircle
} from 'lucide-react';
import styles from '@/styles/Product.module.css';
import { usePricing } from '@/context/PricingContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';


// --- PRODUCT CONSTANTS ---
const PRODUCT_ID = 'mam-nature-essential-plus';
const PRODUCT_NAME = "THE ESSENTIAL PLUS";


// --- DATA DEFINITION ---
const CONTENT_EN = {
    nav: {
        product: 'Product',
        details: 'Technical Details',
        install: 'Installation',
        maint: 'Maintenance',
        reports: 'Reports'
    },
    product: {
        title: PRODUCT_NAME,
        subtitle: 'Fine Filter + Cartridge + Particle Filter',
        btnAdd: 'Add to Cart',
        priceTBD: 'Price Coming Soon',
        descBold: 'The ultimate whole-house filtration duo. Delivered with 1 x Particle Filter, 1 x Fine Filter Housing, and 1 x Filter Cartridge.',
        desc: "Complete protection for your home and health. The Particle Filter pre-filters sand, rust, and large debris, protecting your plumbing. The Fine Filter follows up with selective filtration, removing heavy metals, chlorine, and microplastics while preserving essential minerals."
    },
    details: {
        title: 'Technical Details in 3 Steps',
        particle: {
            title: '1. WATER PARTICLE FILTER',
            summary: 'Filters sediments and suspended particles with automatic backwash and integrated pressure regulator.',
            content: {
                text: 'Particle filter with automatic backwash, pressure regulator, and 360° connector. Compact, fully integrated solution made from medical-grade materials (316L stainless steel).',
                specs: 'Capacity: unlimited<br>Maintenance: none (fully automated solution).'
            }
        },
        fine: {
            title: '2. WATER FINE FILTER',
            summary: 'Unique filtration technology eliminating PFAS, heavy metals, aluminium, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium & radioactive substances.',
            content: {
                text: 'Unique selective Whole-House Adsorption Filtration System:',
                list: [
                    '1. Filter Media: Exclusive Mam Nature technology based on proteins fibers (combined with activated carbon) for the most complete & world unique adsorption filtration',
                    '2. Sterile cartridge: Sterility (by copper & iron hydroxide) in the cartridge without sterilizing agents entering the drinking water.'
                ],
                reduces: 'Reduces Chlorine, Pesticides, PFAS, Drug Residues, Phenol, Heavy Metals, Aluminium, Microplastics & including radioactive substances at a reduction rate of 95 - 99.9 % at large volumes of 2000 litres/hour.'
            }
        },
        cartridge: {
            title: '3. CARTRIDGE',
            summary: 'Patented technology that eliminates contaminants while preserving essential minerals.',
            content: {
                h4: 'The Swiss Water Cartridge',
                text1: 'Mam Nature Swiss® – Solving the impossible: Perfectly filtered, soft, and naturally mineralized water.',
                text2: 'The « SWISS WATER CARTRIDGE » : BEYOND FILTRATION – A TRUE PROTECTION UNMATCHED CONTAMINANT RENTENTION ',
                text3: 'Our 100% natural filtration technology, exclusive to Mam Nature Swiss®, combines natural protein fibers with activated carbon to achieve total adsorption, a world first. It eliminates contaminants while preserving minerals and trace elements being naturally present in water. Owing to its selective filtration system by full adsorption, this patented Swiss invention is the world unique universal solution, 100% natural, capable of eliminating PFAS, heavy metals, aluminum, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium, etc. - and even radioactive substances found in nuclear water.',
                specs: 'Flow rate: up to 1800 liters/hour.<br>Filter cartridge capacity (lifespan): 150m³<br>Maintenance: 10 minutes once per year (simple and no tools required).'
            }
        }
    },
    install: {
        title: 'Installation',
        cardTitle: 'Professional Installation',
        cardText: 'The Essential Plus Set is installed sequentially on your main water line by a qualified plumber (Particle Filter first, followed by the Fine Filter). This ensures clean, filtered water for every tap in your house.'
    },
    maint: {
        title: 'Maintenance & Warranty',
        maintTitle: 'Maintenance Routine',
        maintText: 'Particle Filter: Flush the valve manually every 1-2 months. Fine Filter: Change cartridge every 150 m³ (avg. 1 x per year).',
        warrantyTitle: 'Excellence Warranty',
        warrantyYears: '10 YEARS',
        warrantyText: "Made of durable materials, the housings of your filters are covered by a 10-year manufacturer's warranty."
    },
    reports: {
        title: 'Reports & Certificates',
        btnPerf: 'View Performance Report',
        btnCert: 'See Swiss Certification'
    }
};

const CONTENT_FR = {
    nav: {
        product: 'Produit',
        details: 'Détails Techniques',
        install: 'Installation',
        maint: 'Entretien',
        reports: 'Rapports'
    },
    product: {
        title: PRODUCT_NAME,
        subtitle: 'Filtre à Eau Fin + Cartouche + Filtre à Particules',
        btnAdd: 'Ajouter au panier',
        priceTBD: 'Prix à venir',
        descBold: 'Le duo ultime de filtration pour toute la maison. Livré avec 1 x Filtre à Particules, 1 x Boîtier de Filtre Fin et 1 x Cartouche Filtrante.',
        desc: "Protection complète pour votre maison et votre santé. Le filtre à particules préfiltre le sable, la rouille et les gros débris, protégeant ainsi votre plomberie. Le filtre fin effectue ensuite une filtration sélective, éliminant les métaux lourds, le chlore et les microplastiques tout en préservant les minéraux."
    },
    details: {
        title: 'Détails Techniques en 3 Étapes',
        particle: {
            title: '1. WATER PARTICLE FILTER',
            summary: 'Filtre les sédiments et particules en suspension avec retro-lavage automatique et régulateur de pression intégré.',
            content: {
                text: 'Filtre à particules avec retro-lavage automatique, régulateur de pression et connecteur 360°. Solution compacte en inox médical (316L).',
                specs: 'Capacité : illimitée<br>Entretien : aucun (solution entièrement automatisée).'
            }
        },
        fine: {
            title: '2. WATER FINE FILTER',
            summary: 'Unique filtration technology eliminating PFAS, heavy metals, aluminium, chlorine, fluoride, pesticides, pharmaceutical residues, industrial chemicals, arsenic, cadmium, chromium & radioactive substances.',
            content: {
                text: 'Unique selective Whole-House Adsorption Filtration System:',
                list: [
                    '1. Filter Media: Exclusive Mam Nature technology based on proteins fibers (combined with activated carbon) for the most complete & world unique adsorption filtration',
                    '2. Sterile cartridge: Sterility (by copper & iron hydroxide) in the cartridge without sterilizing agents entering the drinking water.'
                ],
                reduces: 'Reduces Chlorine, Pesticides, PFAS, Drug Residues, Phenol, Heavy Metals, Aluminium, Microplastics & including radioactive substances at a reduction rate of 95 - 99.9 % at large volumes of 2000 litres/hour.'
            }
        },
        cartridge: {
            title: '3. CARTOUCHE',
            summary: 'Technologie brevetée qui élimine les contaminants en préservant les minéraux essentiels.',
            content: {
                h4: 'The Swiss Water Cartridge',
                text1: 'Mam Nature Swiss® – Résoudre l\'impossible : Une eau parfaitement filtrée, douce et naturellement minéralisée.',
                text2: 'La « SWISS WATER CARTRIDGE » : Au-delà de la filtration, un véritable bouclier. SÉCURITÉ & PURETÉ INÉGALÉES',
                text3: 'Notre technologie de filtration 100% naturelle, exclusive à Mam Nature Swiss®, combine des fibres de protéines naturelles avec du charbon actif pour obtenir une adsorption totale, une première mondiale. Elle élimine les contaminants tout en préservant les minéraux et les oligo-éléments naturellement présents dans l\'eau. Grâce à son système de filtration sélective par adsorption complète, cette invention suisse brevetée est la solution universelle unique au monde, 100% naturelle, capable d\'éliminer PFAS, métaux lourds, aluminium, chlore, fluor, pesticides, résidus pharmaceutiques, produits chimiques industriels, arsenic, cadmium, chrome, etc. - et même les substances radioactives présentes dans l\'eau nucléaire.',
                specs: 'Débit : jusqu\'à 1800 litres/heure.<br>Capacité de la cartouche filtrante (durée de vie) : 150m³<br>Entretien : 10 minutes une fois par an (simple et sans outil).'
            }
        }
    },
    install: {
        title: 'Installation',
        cardTitle: 'Installation Professionnelle',
        cardText: "Le Set Essentiel Plus est installé de manière séquentielle sur votre arrivée d'eau principale par un plombier qualifié (Filtre à particules en premier, suivi du filtre fin). Cela garantit une eau propre et filtrée à chaque robinet."
    },
    maint: {
        title: 'Maintenance & Garantie',
        maintTitle: 'Routine d\'Entretien',
        maintText: 'Filtre à particules : Purgez la valve manuellement tous les 1-2 mois. Filtre fin : Changez la cartouche tous les 150 m³ (1 x par an en moyenne).',
        warrantyTitle: 'Garantie d\'Excellence',
        warrantyYears: '10 ANS',
        warrantyText: "Fabriqués en matériaux durables, les boîtiers de vos filtres sont couverts par une garantie constructeur de 10 ans."
    },
    reports: {
        title: 'Rapports & Certificats',
        btnPerf: 'Voir le Rapport de Performance',
        btnCert: 'Voir la Certification Suisse'
    }
};

export default function EssentialPlusSetPage() {
    const { getPrice, getRawPrice, isLoading, currency, region } = usePricing();
    const { addToCart } = useCart();
    const { language } = useLanguage();

    const isFrench = language === 'fr';
    const content = isFrench ? CONTENT_FR : CONTENT_EN;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeSection, setActiveSection] = useState('produit');
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
    const [modalUrl, setModalUrl] = useState<string | null>(null);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);

    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    // 1. Fine Filter, 2. Cartridge, 3. Particle Filter (Make sure to update the 3rd URL to the actual particle filter image)
    const IMAGES = [
        "/images/products/autobackwash/Essential plus +Aqmos 1 with AUTOMATIC BACKWASH.webp",
        "/images/WEBSITE-P/products/cartridge.webp",
        "/images/products/particle_filter/particle_filter_auto_backwash_front.webp"
    ];



    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, { rootMargin: '-40% 0px -60% 0px' });

        Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, []);

    // Auto-scroll active nav item into view on mobile
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth <= 991) {
            const activeNavLink = document.querySelector(`button[data-section="${activeSection}"]`);
            if (activeNavLink) {
                activeNavLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeSection]);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = window.innerWidth <= 991 ? 150 : 150;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % IMAGES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

    const handleAddToCart = () => {
        const rawPrice = getRawPrice(PRODUCT_ID);
        if (rawPrice === 0) return;
        const currencyCode = currency === 'MAD' ? 'Dhs' : currency || 'EUR';

        addToCart({
            id: PRODUCT_ID,
            name: PRODUCT_NAME,
            price: rawPrice,
            currency: currencyCode,
            image: IMAGES[0]
        });
    };

    return (
        <div className={styles.pageWrapper}>

            {/* SIDEBAR NAV */}
            <aside className={styles.stickyNav}>
                <nav>
                    <ul className={styles.navList}>
                        {[
                            { id: 'produit', label: content.nav.product },
                            { id: 'details', label: content.nav.details },
                            { id: 'installation', label: content.nav.install },
                            { id: 'maintenance', label: content.nav.maint },
                            { id: 'rapports', label: content.nav.reports }
                        ].map(item => (
                            <li key={item.id}>
                                <button
                                    data-section={item.id}
                                    className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                                    onClick={() => scrollTo(item.id)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className={styles.contentArea}>

                {/* 1. PRODUCT SECTION */}
                <section id="produit" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['produit'] = el }}>
                    <div className={styles.productGrid}>
                        <div className={styles.productGallery}>
                            <div className={styles.thumbnailList}>
                                {IMAGES.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        className={`${styles.thumbnail} ${idx === currentSlide ? styles.active : ''}`}
                                        onClick={() => setCurrentSlide(idx)}
                                        alt="thumbnail"
                                    />
                                ))}
                            </div>
                            <div className={styles.mainImageContainer}>
                                <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                    {IMAGES.map((img, idx) => (
                                        <img key={idx} src={img} alt={`${PRODUCT_NAME} View ${idx + 1}`} className={styles.sliderImage} />
                                    ))}
                                </div>
                                <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide}><ChevronLeft size={32} /></button>
                                <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide}><ChevronRight size={32} /></button>
                            </div>
                        </div>

                        <div className={styles.productDetails}>
                            <div className={styles.productInfoMobile}>
                                <h1 className={styles.productTitle}>{content.product.title}</h1>
                                <h2 className={styles.productSubtitle}>{content.product.subtitle}</h2>
                                <div className={styles.productPrice}>
                                    {isLoading
                                        ? 'Loading...'
                                        : getRawPrice(PRODUCT_ID) > 0
                                            ? getPrice(PRODUCT_ID)
                                            : <span style={{ color: '#D52D25', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={20} /> {content.product.priceTBD}</span>
                                    }
                                </div>
                            </div>
                            <div className={styles.cartForm}>
                                <button
                                    className={styles.addToCartButton}
                                    onClick={handleAddToCart}
                                    disabled={getRawPrice(PRODUCT_ID) === 0}
                                    style={{ opacity: getRawPrice(PRODUCT_ID) === 0 ? 0.5 : 1, cursor: getRawPrice(PRODUCT_ID) === 0 ? 'not-allowed' : 'pointer' }}
                                >
                                    {getRawPrice(PRODUCT_ID) === 0 ? content.product.priceTBD : content.product.btnAdd}
                                </button>
                            </div>
                            <div className={styles.productShortDescription}>
                                <p><strong>{content.product.descBold}</strong></p>
                                <p>{content.product.desc}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. DETAILS SECTION */}
                <section id="details" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['details'] = el }}>
                    <div className={styles.sectionHeader}><h2>{content.details.title}</h2></div>
                    <div className={styles.accordionContainer}>

                        {/* ITEM 1: PARTICLE FILTER */}
                        <div className={styles.accordionItem}>
                            <button className={styles.accordionHeader} onClick={() => toggleAccordion('particle')}>
                                <div className={styles.headerGrid}>
                                    <img src="/images/WEBSITE-P/products/PARTICLES_FILTER.webp" alt="Particle Filter" className={styles.headerImage} />
                                    <div className={styles.accordionTitle}>
                                        <strong>{content.details.particle.title}</strong>
                                        <p className={styles.summaryText}>{content.details.particle.summary}</p>
                                    </div>
                                </div>
                                {activeAccordion === 'particle' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
                            </button>
                            <div className={styles.accordionContent} style={{ maxHeight: activeAccordion === 'particle' ? '1000px' : '0' }}>
                                <div className={styles.accordionContentInner}>
                                    <p>{content.details.particle.content.text}</p>
                                    <p dangerouslySetInnerHTML={{ __html: content.details.particle.content.specs.replace('\n', '<br/>') }}></p>
                                </div>
                            </div>
                        </div>

                        {/* ITEM 2: FINE FILTER + CARTRIDGE (GROUPED) */}
                        <div className={styles.detailsGroupContainer}>
                            <div className={styles.groupedHeader}>
                                <img src="/images/website-assets/PRODUCT/fine_filter_with_cartridge.png" alt="Fine Filter Group" className={styles.groupedImage} />
                                <div className={styles.accordionItemsWrapper}>
                                    {/* Fine Filter Header */}
                                    <div className={styles.accordionItem}>
                                        <button className={styles.accordionHeader} onClick={() => toggleAccordion('fine')}>
                                            <div className={styles.headerGrid}>
                                                <div className={styles.accordionTitle}>
                                                    <strong>{content.details.fine.title}</strong>
                                                    <p className={styles.summaryText}>{content.details.fine.summary}</p>
                                                </div>
                                            </div>
                                            {activeAccordion === 'fine' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
                                        </button>
                                    </div>
                                    {/* Cartridge Header */}
                                    <div className={styles.accordionItem}>
                                        <button className={styles.accordionHeader} onClick={() => toggleAccordion('cartridge')}>
                                            <div className={styles.headerGrid}>
                                                <div className={styles.accordionTitle}>
                                                    <strong>{content.details.cartridge.title}</strong>
                                                    <p className={styles.summaryText}>{content.details.cartridge.summary}</p>
                                                </div>
                                            </div>
                                            {activeAccordion === 'cartridge' ? <Minus className={styles.toggleIcon} /> : <Plus className={styles.toggleIcon} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Fine Filter Content */}
                            <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'fine' ? '800px' : '0' }}>
                                <div className={styles.accordionContentInner} style={{ marginLeft: 0, paddingTop: '1.5rem' }}>
                                    <p><strong>{content.details.fine.content.text}</strong></p>
                                    <ul>
                                        {content.details.fine.content.list.map((it: string, idx: number) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{it}</li>)}
                                    </ul>
                                    <p><strong>{content.details.fine.content.reduces}</strong></p>
                                </div>
                            </div>

                            {/* Cartridge Content */}
                            <div className={`${styles.accordionContent} ${styles.fullWidth}`} style={{ maxHeight: activeAccordion === 'cartridge' ? '1200px' : '0' }}>
                                <div className={styles.accordionContentInner} style={{ marginLeft: 0, paddingTop: '1.5rem' }}>
                                    <h4>{content.details.cartridge.content.h4}</h4>
                                    <p><strong>{content.details.cartridge.content.text1}</strong></p>
                                    <p><strong>{content.details.cartridge.content.text2}</strong></p>
                                    <p>{content.details.cartridge.content.text3}</p>
                                    <p dangerouslySetInnerHTML={{ __html: content.details.cartridge.content.specs.replace('\n', '<br/>') }}></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. INSTALLATION SECTION */}
                <section id="installation" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['installation'] = el }}>
                    <div className={styles.sectionHeader}><h2>{content.install.title}</h2></div>
                    <div className={styles.installationCard}>
                        <h3><Wrench className={styles.redIcon} /> {content.install.cardTitle}</h3>
                        <p>{content.install.cardText}</p>
                    </div>
                </section>

                {/* 4. MAINTENANCE SECTION */}
                <section id="maintenance" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['maintenance'] = el }}>
                    <div className={styles.sectionHeader}><h2>{content.maint.title}</h2></div>
                    <div className={styles.maintenanceGrid}>
                        <div className={styles.maintenanceCard}>
                            <h3><CalendarCheck className={styles.redIcon} /> {content.maint.maintTitle}</h3>
                            <p>{content.maint.maintText}</p>
                        </div>
                        <div className={styles.warrantyCard}>
                            <h3><ShieldCheck className={styles.redIcon} /> {content.maint.warrantyTitle}</h3>
                            <div className={styles.warrantyHighlight}>{content.maint.warrantyYears.split(' ')[0]} <span>{content.maint.warrantyYears.split(' ')[1]}</span></div>
                            <p>{content.maint.warrantyText}</p>
                        </div>
                    </div>
                </section>

                {/* 5. REPORTS SECTION */}
                <section id="rapports" className={styles.contentSection} ref={el => { if (el) sectionRefs.current['rapports'] = el }}>
                    <div className={styles.sectionHeader}><h2>{content.reports.title}</h2></div>
                    <div className={styles.reportGrid}>
                        <button
                            className={styles.reportLink}
                            onClick={() => {
                                setModalUrl("/images/website-assets/certificates/The_Swiss_Water_Cartridge_Retention_Rates_Certificated_ETH_Zurich.pdf");
                                setIsLoadingPdf(true);
                            }}
                        >
                            <FileText className={styles.reportIcon} size={24} /> {content.reports.btnPerf}
                        </button>
                        <button
                            className={styles.reportLink}
                            onClick={() => {
                                setModalUrl("/images/website-assets/certificates/Certificate_SwissSafetyCenter_Pressure_Test_MNS-CS.pdf");
                                setIsLoadingPdf(true);
                            }}
                        >
                            <Award className={styles.reportIcon} size={24} /> {content.reports.btnCert}
                        </button>
                    </div>
                </section>

            </main>

            {/* PDF/IMAGE MODAL */}
            {modalUrl && (
                <div className={styles.modalOverlay} onClick={() => { setModalUrl(null); setIsLoadingPdf(false); }}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <span className={styles.modalTitle}>Document Preview</span>
                            <button className={styles.modalCloseBtn} onClick={() => { setModalUrl(null); setIsLoadingPdf(false); }}><X size={32} /></button>
                        </div>
                        <div className={styles.modalBody}>
                            {isLoadingPdf && (
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid #D52D25', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading PDF...</p>
                                    </div>
                                </div>
                            )}
                            <object
                                data={modalUrl}
                                type="application/pdf"
                                style={{ width: '100%', height: '100%', border: 'none', opacity: isLoadingPdf ? 0.5 : 1, transition: 'opacity 0.3s ease' }}
                                title="Document Preview"
                                onLoad={() => setIsLoadingPdf(false)}
                            >
                                <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
                                    <p>Preview not available.</p>
                                    <a href={modalUrl} download style={{ color: '#4ade80', textDecoration: 'underline' }}>
                                        Download PDF
                                    </a>
                                </div>
                            </object>
                        </div>
                        <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
                    </div>
                </div>
            )}
        </div>
    );
}