'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, Check
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// --- DATA CONFIGURATION ---

const CONTENT_EN = {
  headline: {
    line1: "Mam Nature Swiss",
    line2: "Water Filtration",
    line3: "beyond imagination."
  },
  features: {
    cartridge: {
      title: "The Swiss Water Cartridge",
      text: "A new dimension of Water Filtration: Unique retention rates for all contaminants, maintaining the natural mineralization at high water volume."
    },
    dynamizer: {
      title: "The Swiss Water Dynamizer",
      text: "Re-energized and restructured water for cellavailability, unique skin hydration and unprecedented taste."
    }
  },
  cta: "Transform Your Water",
  benefits: [
    {
      title: "Personal Care",
      texts: [
        "Your skin absorbs. Give it healing water.",
        "Your skin deserves better than chlorine."
      ],
      image: "/images/WEBSITE-P/composents/SHOWER.webp"
    },
    {
      title: "Taste",
      texts: [
        "Purity in every cup. Excellence in taste.",
        "Infuse excellence. cup after cup."
      ],
      image: "/images/WEBSITE-P/composents/COFFEE.webp"
    },
    {
      title: "Health",
      texts: [
        "Bought organic. Toxic when rinsed. Not anymore.",
        "Bought organic. washed pure. Finally."
      ],
      image: "/images/WEBSITE-P/composents/WASHING_VEGIES.webp"
    },
    {
      title: "Durability",
      texts: [
        "Less limescale more durability for your devices.",
        "Your appliances deserve excellence. So does your body."
      ],
      image: "/images/WEBSITE-P/composents/WASHING_MACHINE.webp"
    },
    {
      title: "Hydration",
      texts: [
        "The only water that speaks your body's language.",
        "Water the way nature meant it."
      ],
      image: "/images/WEBSITE-P/composents/WATER_DRINKING.webp"
    }
  ],
  products: [
    {
      id: 'complete',
      name: 'Complete Set',
      image: "/images/products/autobackwash/complete_set_aqmos_auto_backwash.webp",
      // --- EDIT OUTPUT POINT HERE (x, y are % from top-left) ---
      outputPoint: { x: 90, y: 80 }, // Desktop: Bottom-Right
      mobileOutputPoint: { x: 10, y: 80 } // Mobile output
    },
    {
      id: 'eco',
      name: 'Eco Set',
      image: "/images/products/autobackwash/eco_set_aqmos_auto_backwash.webp",
      // --- EDIT OUTPUT POINT HERE (x, y are % from top-left) ---
      outputPoint: { x: 82, y: 10 }, // Desktop: Top-Right
      mobileOutputPoint: { x: 10, y: 10 }, // Mobile output
      // --- CONTROL POINT: steers trunk direction before branching (% of product) ---
      mobileTrunkControlPoint: { x: 0, y: 10 } // Mobile: steer trunk downward-left
    }
  ],
  trust: {
    swiss: "Made in Switzerland",
    warranty: "Lifetime Warranty",
    eco: "Eco-Friendly"
  }
};

const CONTENT_FR = {
  headline: {
    line1: "Simplicité",
    line2: "Absolue.",
    line3: "Économique & Écologique."
  },
  features: {
    cartridge: {
      title: "La Cartouche Swiss Water",
      text: "Au-delà de la simple filtration. Un bouclier offrant une eau parfaitement filtrée, douce, naturellement minéralisée et énergisée."
    },
    dynamizer: {
      title: "Le Dynamiseur Swiss Water",
      text: "L'intelligence de la nature au service du bien-être."
    }
  },
  cta: "Transformez Votre Eau",
  benefits: [
    {
      title: "Soin Personnel",
      texts: [
        "Votre peau absorbe. Offrez-lui une eau qui soigne.",
        "Votre peau mérite mieux que du chlore. PFAS"
      ],
      image: "/images/WEBSITE-P/composents/SHOWER.webp"
    },
    {
      title: "Goût",
      texts: [
        "Pureté en tasse. Excellence en bouche.",
        "Infusez l'excellence tasse après tasse."
      ],
      image: "/images/WEBSITE-P/composents/COFFEE.webp"
    },
    {
      title: "Santé",
      texts: [
        "Bio à l'achat Toxique au lavage Plus maintenant",
        "Bio à l'achat pur au lavage Enfin."
      ],
      image: "/images/WEBSITE-P/composents/WASHING_VEGIES.webp"
    },
    {
      title: "Durabilité",
      texts: [
        "Moins de calcaire plus de vie pour vos appareils et vous.",
        "Vos électroménager mérite l'excellence votre corps aussi."
      ],
      image: "/images/WEBSITE-P/composents/WASHING_MACHINE.webp"
    },
    {
      title: "Hydratation",
      texts: [
        "La seule eau qui parle le langage du corps.",
        "L'eau que la nature aurait voulu pour vous."
      ],
      image: "/images/WEBSITE-P/composents/WATER_DRINKING.webp"
    }
  ],
  products: [
    {
      id: 'complete',
      name: 'Set Complet',
      image: "/images/products/autobackwash/complete_set_aqmos_auto_backwash.webp",
      // --- EDIT OUTPUT POINT HERE (x, y are % from top-left) ---
      outputPoint: { x: 80, y: 75 }, // Desktop: Bottom-Right
      mobileOutputPoint: { x: 10, y: 80 } // Mobile output
    },
    {
      id: 'eco',
      name: 'Eco Set',
      image: "/images/products/autobackwash/eco_set_aqmos_auto_backwash.webp",
      // --- EDIT OUTPUT POINT HERE (x, y are % from top-left) ---
      outputPoint: { x: 80, y: 25 }, // Desktop: Top-Right
      mobileOutputPoint: { x: 10, y: 10 }, // Mobile output
      // --- CONTROL POINT: steers trunk direction before branching (% of product) ---
      mobileTrunkControlPoint: { x: 10, y: 80 } // Mobile: steer trunk downward-left
    }
  ],
  trust: {
    swiss: "Fabriqué en Suisse",
    warranty: "Garantie à Vie",
    eco: "Éco-Responsable"
  }
};

const CONTENT_DE = {
  headline: {
    line1: "Absolute",
    line2: "Einfachheit.",
    line3: "Ökonomisch & Ökologisch."
  },
  features: {
    cartridge: {
      title: "Die Swiss Water Kartusche",
      text: "Mehr als nur Filtration. Ein Schutzschild, das perfekt gefiltertes, weiches, natürlich mineralisiertes und energetisiertes Wasser bietet."
    },
    dynamizer: {
      title: "Der Swiss Water Dynamisierer",
      text: "Die Intelligenz der Natur im Dienste des Wohlbefindens."
    }
  },
  cta: "Verwandeln Sie Ihr Wasser",
  benefits: [
    {
      title: "Körperpflege",
      texts: [
        "Ihre Haut absorbiert. Geben Sie ihr Wasser, das heilt.",
        "Ihre Haut verdient Besseres als Chlor und PFAS."
      ],
      image: "/images/WEBSITE-P/composents/SHOWER.webp"
    },
    {
      title: "Geschmack",
      texts: [
        "Reinheit in jeder Tasse. Exzellenz im Geschmack.",
        "Aufguss für Aufguss Exzellenz."
      ],
      image: "/images/WEBSITE-P/composents/COFFEE.webp"
    },
    {
      title: "Gesundheit",
      texts: [
        "Bio gekauft. Giftig beim Waschen. Jetzt nicht mehr.",
        "Bio gekauft, rein gewaschen. Endlich."
      ],
      image: "/images/WEBSITE-P/composents/WASHING_VEGIES.webp"
    },
    {
      title: "Haltbarkeit",
      texts: [
        "Weniger Kalk, mehr Lebensdauer für Ihre Geräte und Sie.",
        "Ihre Haushaltsgeräte verdienen Exzellenz. Ihr Körper auch."
      ],
      image: "/images/WEBSITE-P/composents/WASHING_MACHINE.webp"
    },
    {
      title: "Hydratation",
      texts: [
        "Das einzige Wasser, das die Sprache des Körpers spricht.",
        "Das Wasser, das die Natur für Sie vorgesehen hat."
      ],
      image: "/images/WEBSITE-P/composents/WATER_DRINKING.webp"
    }
  ],
  products: [
    {
      id: 'complete',
      name: 'Komplettset',
      image: "/images/products/autobackwash/complete_set_aqmos_auto_backwash.webp",
      outputPoint: { x: 80, y: 75 },
      mobileOutputPoint: { x: 10, y: 80 }
    },
    {
      id: 'eco',
      name: 'Eco Set',
      image: "/images/products/autobackwash/eco_set_aqmos_auto_backwash.webp",
      outputPoint: { x: 80, y: 25 },
      mobileOutputPoint: { x: 10, y: 10 },
      mobileTrunkControlPoint: { x: 10, y: 80 }
    }
  ],
  trust: {
    swiss: "Hergestellt in der Schweiz",
    warranty: "Lebenslange Garantie",
    eco: "Umweltfreundlich"
  }
};

// --- COMPONENTS ---

const FeatureBlock = ({ title, text, delay }: { title: string, text: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="mb-3 lg:mb-6 pl-3 lg:pl-4 border-l-2 border-slate-200 hover:border-[#da291c] transition-colors duration-300"
  >
    <h3 className="text-sm lg:text-lg font-bold text-[#da291c] mb-0.5 lg:mb-1 flex items-center gap-1 lg:gap-2">
      {title}
      <ChevronRight size={16} className="text-[#da291c] hidden lg:inline" />
    </h3>
    <p className="text-slate-600 text-xs lg:text-sm leading-snug lg:leading-relaxed max-w-sm">
      {text}
    </p>
  </motion.div>
);

const BenefitCard = React.forwardRef<HTMLDivElement, { image: string, title: string, texts: string[], delay: number, animationDuration: string, isLast?: boolean, isLeftColumn?: boolean, onDropletRef?: (el: HTMLDivElement | null) => void }>(
  ({ image, title, texts, delay, animationDuration, isLast = false, isLeftColumn = false, onDropletRef }, ref) => {
    const [index, setIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (texts.length <= 1) return;
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % texts.length);
      }, 4000); // 4 seconds per message
      return () => clearInterval(interval);
    }, [texts.length]);

    // Activate blue border after animation duration
    useEffect(() => {
      // Parse "3.5s" to 3500ms
      const durationSec = parseFloat(animationDuration);
      const timeout = setTimeout(() => {
        setIsActive(true);
      }, durationSec * 1000 * 0.9); // Activate slightly before end for visual continuity
      return () => clearTimeout(timeout);
    }, [animationDuration]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: delay }}
        className={`group relative z-20 ${isLast ? 'col-span-2 lg:col-span-1' : ''}`}
      >
        {/* Card - transparent on mobile, glassmorphic on desktop */}
        <div
          className={`
          relative overflow-visible
          bg-transparent lg:bg-white/60 lg:backdrop-blur-md
          border-none lg:border ${isActive ? 'lg:border-[#52c3ff] lg:shadow-[0_0_15px_rgba(82,195,255,0.6)]' : 'lg:border-white/80'}
          p-1 lg:p-4 rounded-xl
          lg:hover:bg-white lg:hover:scale-[1.02] lg:hover:shadow-lg
          transition-all duration-500
          cursor-default
          lg:min-h-[110px] flex items-center
        `}>
          <div className="hidden lg:block absolute top-0 left-0 w-1 h-full bg-[#52c3ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className={`flex ${isLast ? 'flex-col' : isLeftColumn ? 'flex-row-reverse' : 'flex-row'} lg:flex-row items-center gap-1 lg:gap-6 w-full`}>
            {/* Water Drop Image Container */}
            <div ref={onDropletRef} className="relative w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0">
              <div className={`absolute inset-0 bg-white shadow-xl
               rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%] rounded-tl-none
               transform ${isLast ? 'rotate-45' : isLeftColumn ? 'rotate-90' : 'rotate-0'} lg:-rotate-45 overflow-hidden transition-transform duration-300 group-hover:scale-105 border-2 lg:border-4 border-white`}
              >
                <img
                  src={image}
                  alt={title}
                  className={`w-full h-full object-cover transform ${isLast ? '-rotate-45' : isLeftColumn ? '-rotate-90' : 'rotate-0'} lg:rotate-45 scale-150`}
                />
              </div>
            </div>
            <div className={`flex-grow overflow-hidden relative lg:py-2 ${isLast ? 'text-center' : 'text-left'} lg:text-left`}>
              <h3 className="hidden lg:block font-bold text-slate-800 text-lg mb-1 uppercase tracking-wide">{title}</h3>
              {/* Mobile: static text, Desktop: animated rotating */}
              <div className="lg:hidden">
                <p className="text-sm text-slate-700 leading-snug font-medium">{texts[index]}</p>
              </div>
              <div className="hidden lg:block relative h-[48px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-base text-slate-700 leading-snug font-medium absolute top-0 left-0 w-full"
                  >
                    {texts[index]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  });

BenefitCard.displayName = 'BenefitCard';

// SVG Overlay Component - Trunk and Branch pattern
const ConnectorOverlay = ({
  containerRef,
  cardRefs,
  productRef,
  outputPoint
}: {
  containerRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  productRef: React.RefObject<HTMLDivElement | null>,
  outputPoint: { x: number, y: number }
}) => {
  const [trunkPath, setTrunkPath] = useState('');
  const [branchPaths, setBranchPaths] = useState<string[]>([]);
  const [sourcePos, setSourcePos] = useState({ x: 0, y: 0 });

  const updatePaths = useCallback(() => {
    if (!containerRef.current || !productRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const productRect = productRef.current.getBoundingClientRect();

    // Source: product output point
    const srcX = productRect.left + (productRect.width * outputPoint.x / 100) - containerRect.left;
    const srcY = productRect.top + (productRect.height * outputPoint.y / 100) - containerRect.top;
    setSourcePos({ x: srcX, y: srcY });

    // Calculate all card end points
    const cardPoints = cardRefs.current.map((card) => {
      if (!card) return null;
      const cardRect = card.getBoundingClientRect();
      return {
        x: (cardRect.left - containerRect.left) + 20,
        y: cardRect.top + (cardRect.height / 2) - containerRect.top
      };
    }).filter(Boolean) as { x: number, y: number }[];

    if (cardPoints.length === 0) return;

    // Junction point: midway between source and cards
    const avgCardX = cardPoints.reduce((s, p) => s + p.x, 0) / cardPoints.length;
    const junctionX = srcX + (avgCardX - srcX) * 0.5;
    const avgCardY = cardPoints.reduce((s, p) => s + p.y, 0) / cardPoints.length;
    const junctionY = avgCardY;

    // Trunk: source -> junction
    const trunk = `M ${srcX} ${srcY} C ${srcX + 60} ${srcY}, ${junctionX} ${junctionY - 30}, ${junctionX} ${junctionY}`;
    setTrunkPath(trunk);

    // Branches: junction -> each card
    const branches = cardPoints.map((pt) => {
      const cp1X = junctionX + 40;
      const cp1Y = junctionY + (pt.y - junctionY) * 0.3;
      const cp2X = pt.x - 60;
      const cp2Y = pt.y;
      return `M ${junctionX} ${junctionY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${pt.x} ${pt.y}`;
    });
    setBranchPaths(branches);
  }, [containerRef, cardRefs, productRef, outputPoint]);

  useEffect(() => {
    updatePaths();
    window.addEventListener('resize', updatePaths);
    const interval = setInterval(updatePaths, 100);
    return () => {
      window.removeEventListener('resize', updatePaths);
      clearInterval(interval);
    }
  }, [updatePaths]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
      {/* Trunk line */}
      {trunkPath && (
        <>
          <path d={trunkPath} fill="none" stroke="white" strokeWidth="6" strokeOpacity="0.8" />
          <path d={trunkPath} fill="none" stroke="#52c3ff" strokeWidth="2" />
          <circle r="3" fill="#52c3ff">
            <animateMotion dur="2s" repeatCount="indefinite" path={trunkPath} />
          </circle>
        </>
      )}
      {/* Branch lines */}
      {branchPaths.map((d, i) => (
        <React.Fragment key={i}>
          <path d={d} fill="none" stroke="white" strokeWidth="6" strokeOpacity="0.8" />
          <path d={d} fill="none" stroke="#52c3ff" strokeWidth="2" />
          <circle r="3" fill="#52c3ff">
            <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" path={d} />
          </circle>
        </React.Fragment>
      ))}
      {/* Source dot */}
      <circle cx={sourcePos.x} cy={sourcePos.y} r="6" fill="#52c3ff" stroke="white" strokeWidth="2" />
    </svg>
  );
};

// Mobile SVG Overlay - Trunk and Branch pattern (vertical)
const MobileConnectorOverlay = ({
  containerRef,
  dropletRefs,
  productRef,
  outputPoint = { x: 50, y: 95 },
  trunkControlPoint
}: {
  containerRef: React.RefObject<HTMLDivElement | null>,
  dropletRefs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  productRef: React.RefObject<HTMLDivElement | null>,
  outputPoint?: { x: number, y: number },
  trunkControlPoint?: { x: number, y: number }
}) => {
  const [trunkPath, setTrunkPath] = useState('');
  const [branchPaths, setBranchPaths] = useState<string[]>([]);
  const [sourcePos, setSourcePos] = useState({ x: 0, y: 0 });

  const updatePaths = useCallback(() => {
    if (!containerRef.current || !productRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const productRect = productRef.current.getBoundingClientRect();

    // Source: configurable output point
    const srcX = productRect.left + (productRect.width * outputPoint.x / 100) - containerRect.left;
    const srcY = productRect.top + (productRect.height * outputPoint.y / 100) - containerRect.top;
    setSourcePos({ x: srcX, y: srcY });

    // Calculate all droplet end points
    const dropletPoints = dropletRefs.current.map((droplet) => {
      if (!droplet) return null;
      const r = droplet.getBoundingClientRect();
      return {
        x: r.left + (r.width / 2) - containerRect.left,
        y: (r.top - containerRect.top) + 10
      };
    }).filter(Boolean) as { x: number, y: number }[];

    if (dropletPoints.length === 0) return;

    // Junction: defaults to straight down
    const minDropletY = Math.min(...dropletPoints.map(p => p.y));
    let junctionY = srcY + (minDropletY - srcY) * 0.5;
    let junctionX = srcX;

    // Trunk: straight down by default
    let trunk = `M ${srcX} ${srcY} L ${junctionX} ${junctionY}`;

    // If a control point is provided, customize the trunk path
    if (trunkControlPoint) {
      // Junction based on control point (X relative to product, Y stays dynamic based on droplets)
      junctionX = productRect.left + (productRect.width * trunkControlPoint.x / 100) - containerRect.left;

      // Control point for the curve (midway vertically)
      const cpX = srcX + (junctionX - srcX) * 0.2;
      const cpY = srcY + (junctionY - srcY) * 0.8;

      // Bezier curve to steered junction
      trunk = `M ${srcX} ${srcY} Q ${srcX} ${srcY + 50}, ${junctionX} ${junctionY}`;
    }

    setTrunkPath(trunk);

    // Branches: junction -> each droplet
    const branches = dropletPoints.map((pt) => {
      const midY = junctionY + (pt.y - junctionY) * 0.4;
      return `M ${junctionX} ${junctionY} C ${junctionX} ${midY}, ${pt.x} ${midY}, ${pt.x} ${pt.y}`;
    });
    setBranchPaths(branches);
  }, [containerRef, dropletRefs, productRef, outputPoint, trunkControlPoint]);

  useEffect(() => {
    updatePaths();
    window.addEventListener('resize', updatePaths);
    const interval = setInterval(updatePaths, 100);
    return () => {
      window.removeEventListener('resize', updatePaths);
      clearInterval(interval);
    }
  }, [updatePaths]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
      {/* Trunk line */}
      {trunkPath && (
        <>
          <path d={trunkPath} fill="none" stroke="white" strokeWidth="6" strokeOpacity="0.8" />
          <path d={trunkPath} fill="none" stroke="#52c3ff" strokeWidth="2" />
          <circle r="3" fill="#52c3ff">
            <animateMotion dur="1.5s" repeatCount="indefinite" path={trunkPath} />
          </circle>
        </>
      )}
      {/* Branch lines */}
      {branchPaths.map((d, i) => (
        <React.Fragment key={i}>
          <path d={d} fill="none" stroke="white" strokeWidth="6" strokeOpacity="0.8" />
          <path d={d} fill="none" stroke="#52c3ff" strokeWidth="2" />
          <circle r="3" fill="#52c3ff">
            <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={d} />
          </circle>
        </React.Fragment>
      ))}
      {/* Source dot */}
      <circle cx={sourcePos.x} cy={sourcePos.y} r="6" fill="#52c3ff" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default function Hero() {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dropletRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isFrench = language === 'fr';
  const content = isFrench ? CONTENT_FR : language === 'de' ? CONTENT_DE : CONTENT_EN;

  // Auto-play slider
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % content.products.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, content.products.length]);

  const activeProduct = content.products[currentSlide];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-100 selection:text-red-900 overflow-x-hidden relative">

      <main ref={containerRef} className="py-12 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center relative">

        {/* Desktop Connector Layer */}
        <div className="hidden lg:block absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <ConnectorOverlay
                containerRef={containerRef}
                cardRefs={cardRefs}
                productRef={productRef}
                outputPoint={activeProduct.outputPoint || { x: 50, y: 50 }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Connector Layer */}
        <div className="lg:hidden absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id + '-mobile'}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <MobileConnectorOverlay
                containerRef={containerRef}
                dropletRefs={dropletRefs}
                productRef={productRef}
                outputPoint={activeProduct.mobileOutputPoint || { x: 50, y: 95 }}
                trunkControlPoint={activeProduct.mobileTrunkControlPoint}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8 items-center relative z-10">

          {/* Mobile-only headline - centered at top, spans full width */}
          <div className="col-span-2 lg:hidden text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                <span className="text-[#da291c]">{content.headline.line1}</span> {' '}
                {content.headline.line2} {' '}
                <span className="text-slate-400">{content.headline.line3}</span>
              </h1>
            </motion.div>
          </div>

          {/* 1. LEFT COLUMN (Desktop) / LEFT SIDE (Mobile): Text & Features */}
          <div className="lg:col-span-4 flex flex-col order-1 lg:order-1 pt-0 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Desktop-only headline */}
              <div className="hidden lg:block">
                <h2 className="text-[#da291c] font-bold tracking-widest text-xs uppercase mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-[#da291c]"></span>
                  Swiss Engineering
                </h2>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                  <span className="text-[#da291c]">{content.headline.line1}</span> <br />
                  {content.headline.line2} <br />
                  <span className="text-slate-400">{content.headline.line3}</span>
                </h1>
              </div>

              <div className="space-y-2">
                <FeatureBlock
                  title={content.features.cartridge.title}
                  text={content.features.cartridge.text}
                  delay={0.4}
                />

                {/* Dynamizer only for Complete Set (index 0) */}
                <AnimatePresence>
                  {currentSlide === 0 && (
                    <FeatureBlock
                      title={content.features.dynamizer.title}
                      text={content.features.dynamizer.text}
                      delay={0.5}
                    />
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>

          {/* 2. CENTER COLUMN (Desktop) / RIGHT SIDE (Mobile): Product Slider */}
          <div
            className="lg:col-span-4 order-2 lg:order-2 relative z-10 flex flex-col items-center justify-center h-[280px] lg:h-[650px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[250px] font-bold text-white opacity-80 select-none pointer-events-none z-0">
              +
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-blue-100/50 blur-[80px] rounded-full pointer-events-none z-0" />

            {/* Floating Product Image - Ref Added */}
            <motion.div
              ref={productRef}
              className="relative z-10 w-full h-full flex items-center justify-center perspective-1000"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl -scale-x-100 lg:scale-x-100"
                  initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>
            </motion.div>


          </div>

          {/* 3. RIGHT COLUMN (Desktop) / BELOW PRODUCT (Mobile): Benefits */}
          <div className="col-span-2 lg:col-span-4 order-3 grid grid-cols-2 lg:grid-cols-1 gap-3 relative z-20 mt-8 lg:mt-0">
            {content.benefits.map((item, index) => (
              <BenefitCard
                key={index}
                ref={el => { cardRefs.current[index] = el; }}
                onDropletRef={el => { dropletRefs.current[index] = el; }}
                image={item.image}
                title={item.title}
                texts={item.texts}
                delay={0.8 + (index * 0.1)}
                animationDuration={`${3 + index * 0.5}s`}
                isLast={index === content.benefits.length - 1}
                isLeftColumn={index % 2 === 0 && index !== content.benefits.length - 1}
              />
            ))}
          </div>

        </div>
      </main>

      {/* Bottom Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 py-4 hidden lg:block z-40 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Check className="text-[#da291c]" size={14} /> {content.trust.swiss}
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-[#da291c]" size={14} /> {content.trust.warranty}
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-[#da291c]" size={14} /> {content.trust.eco}
          </div>
        </div>
      </div>

    </div>
  );
}