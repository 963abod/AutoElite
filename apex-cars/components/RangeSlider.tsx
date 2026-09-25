"use client";

import * as Slider from "@radix-ui/react-slider";

export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
}: {
  label: string;
  value: [number, number];
  min: number;
  max: number;
  step?: number;
  onChange: (value: [number, number]) => void;
  formatValue: (n: number) => string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="tabular-nums text-ink-soft">
          {formatValue(value[0])} — {formatValue(value[1])}
        </span>
      </div>
      <Slider.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange([v[0], v[1]] as [number, number])}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="relative h-1.5 grow rounded-full bg-surface-2">
          <Slider.Range className="absolute h-full rounded-full bg-champagne-deep" />
        </Slider.Track>
        <Slider.Thumb
          aria-label={`${label} - الحد الأدنى`}
          className="block h-5 w-5 rounded-full border-2 border-champagne-deep bg-canvas shadow-card transition-transform hover:scale-110 focus-visible:outline-none"
        />
        <Slider.Thumb
          aria-label={`${label} - الحد الأقصى`}
          className="block h-5 w-5 rounded-full border-2 border-champagne-deep bg-canvas shadow-card transition-transform hover:scale-110 focus-visible:outline-none"
        />
      </Slider.Root>
    </div>
  );
}
