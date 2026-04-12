"use client";

import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Check } from "lucide-react";
import styles from "./AnimatedFeatureCarousel.module.css";

type StaticImageData = string;

interface ImageSet {
  step1img1: StaticImageData;
  step1img2: StaticImageData;
  step2img1: StaticImageData;
  step2img2: StaticImageData;
  step3img: StaticImageData;
  step4img: StaticImageData;
  alt: string;
}

interface Step {
  id: string;
  name: string;
  title: string;
  description: string;
}

const TOTAL_STEPS = 4;

const steps: readonly Step[] = [
  {
    id: "1",
    name: "01 Stagnation",
    title: "M9ayed f Nafs La Place",
    description: "You wake up, go to work, come back exhausted. Months pass — nothing changes. You've tried Ecom, Trading, Dropshipping — and watched your money vanish.",
  },
  {
    id: "2",
    name: "02 Paralysis",
    title: "Overthinking = Zero Action",
    description: "Every week it's a new idea. You research for hours, get excited, then freeze. L'analyse paralysie kat qtelk.",
  },
  {
    id: "3",
    name: "03 The Trap",
    title: "L Flous 3merha Makatkafi",
    description: "10,000-17,000 MAD/month sounds okay until rent, transport, food, and life eat it all. Zero savings. Zero progress.",
  },
  {
    id: "4",
    name: "04 Breaking Point",
    title: "L'avenir Wa9ef",
    description: "\"Rbbi 3tani had l9isma.\" That thought hits every night. You can't plan a future — no marriage, no car. You scroll seeing others succeed while you stand still.",
  },
];

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const;

type AnimationPreset = keyof typeof ANIMATION_PRESETS;

interface AnimatedStepImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  preset?: AnimationPreset;
  delay?: number;
}

const StepImage = forwardRef<HTMLImageElement, any>(({ src, alt, className, style, ...props }, ref) => {
  return (
    <img
      ref={ref}
      alt={alt}
      className={className}
      src={src}
      style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
      {...props}
    />
  );
});
StepImage.displayName = "StepImage";

const MotionStepImage = motion(StepImage);

const AnimatedStepImage = ({ preset = "fadeInScale", delay = 0, className, ...props }: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset];
  return <MotionStepImage className={`${styles.img} ${className}`} {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />;
};

function useNumberCycler(totalSteps: number = TOTAL_STEPS, interval: number = 5000) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval]);

  const setStep = useCallback((stepIndex: number) => {
    setCurrentNumber(stepIndex % totalSteps);
  }, [totalSteps]);

  return { currentNumber, setStep };
}

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
};

function StepsNav({ current, onChange }: { current: number; onChange: (index: number) => void }) {
  return (
    <div className={styles.navContainer}>
      <ol className={styles.navList}>
        {steps.map((step, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;
          return (
            <motion.li key={step.name} initial="inactive" animate={isCurrent ? "active" : "inactive"} variants={stepVariants} transition={{ duration: 0.3 }} className={styles.navItem}>
              <button
                type="button"
                className={`${styles.navButton} ${isCurrent ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}
                onClick={() => onChange(stepIdx)}
              >
                <span className={styles.navIndicator}>
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : <span>{stepIdx + 1}</span>}
                </span>
                <span className={styles.navText}>{step.name}</span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export function AnimatedFeatureCarousel({ image }: { image: ImageSet }) {
  const { currentNumber: step, setStep } = useNumberCycler();

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className={styles.imageLayer}>
            <AnimatedStepImage alt={image.alt} style={{ width: "60%", left: "0", top: "15%", zIndex: 2 }} src={image.step1img1} preset="slideInLeft" />
            <AnimatedStepImage alt={image.alt} style={{ width: "70%", left: "30%", top: "35%", zIndex: 1 }} src={image.step1img2} preset="slideInRight" delay={0.1} />
          </div>
        );
      case 1:
        return (
          <div className={styles.imageLayer}>
            <AnimatedStepImage alt={image.alt} style={{ width: "55%", left: "5%", top: "20%", zIndex: 2 }} src={image.step2img1} preset="fadeInScale" />
            <AnimatedStepImage alt={image.alt} style={{ width: "55%", left: "45%", top: "45%", zIndex: 1 }} src={image.step2img2} preset="fadeInScale" delay={0.1} />
          </div>
        );
      case 2:
        return (
          <div className={styles.imageLayer}>
            <AnimatedStepImage alt={image.alt} style={{ width: "95%", left: "5%", top: "25%", zIndex: 1 }} src={image.step3img} preset="fadeInScale" />
          </div>
        );
      case 3:
        return (
          <div className={styles.imageLayer}>
            <AnimatedStepImage alt={image.alt} style={{ width: "95%", left: "5%", top: "25%", zIndex: 1 }} src={image.step4img} preset="fadeInScale" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.carouselCard}>
        <div className={styles.cardInner}>
          <div className={styles.contentWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className={styles.textLayout}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.stepEyebrow}>{steps[step].name}</span>
                <h2 className={styles.stepTitle}>{steps[step].title}</h2>
                <p className={styles.stepDesc}>{steps[step].description}</p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`img-${step}`} {...ANIMATION_PRESETS.fadeInScale}>
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <StepsNav current={step} onChange={setStep} />
      </motion.div>
    </div>
  );
}
