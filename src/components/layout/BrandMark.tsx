import React from 'react';
import { cn } from '../../utils/cn';
import { asset } from '../../utils/asset';

const LOGO_URL = asset("/5b0ddfcc-5015-4d2e-9e1a-35d7993d4cef_removalai_preview.png");


interface BrandMarkProps {
  /** True when the mark sits on a photograph or other dark surface. */
  onImage?: boolean;
  className?: string;
}

/**
 * The logo is deep green artwork, so it is shown as-is on light surfaces and
 * flattened to white over photography and in dark mode, where green would sink.
 */
export function BrandMark({ onImage = false, className }: BrandMarkProps) {
  return (
    <img
      src={LOGO_URL}
      alt="Lanka Yoga &amp; Ayurveda Resort"
      className={cn(
        'w-auto select-none object-contain',
        onImage ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert',
        className
      )} />);


}