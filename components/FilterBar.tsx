"use client";

import * as Popover from "@radix-ui/react-popover";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRANDS } from "@/lib/data";
import { FilterPanelContent } from "@/components/FilterPanelContent";
import type { CarFilters } from "@/types/car";

export function FilterBar({
  filters,
  onChange,
  activeCount,
  onReset,
}: {
  filters: CarFilters;
  onChange: (next: CarFilters) => void;
  activeCount: number;
  onReset: () => void;
}) {
  function toggleBrand(brand: string) {
    const active = filters.brands.includes(brand);
    onChange({
      ...filters,
      brands: active
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  }

  return (
    <div className="sticky top-[65px] z-30 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 sm:px-8">
        <div className="scrollbar-none flex flex-1 items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => onChange({ ...filters, brands: [] })}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
              filters.brands.length === 0
                ? "border-ink bg-ink text-canvas"
                : "border-line bg-surface text-ink-soft hover:border-champagne-deep"
            )}
          >
            كل الماركات
          </button>
          {BRANDS.map((brand) => {
            const active = filters.brands.includes(brand);
            return (
              <button
                key={brand}
                type="button"
                onClick={() => toggleBrand(brand)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                  active
                    ? "border-champagne-deep bg-champagne-pale text-ink"
                    : "border-line bg-surface text-ink-soft hover:border-champagne-deep"
                )}
              >
                {brand}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {activeCount > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              type="button"
              onClick={onReset}
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-xs text-ink-soft transition-colors hover:border-champagne-deep sm:flex"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} />
              مسح الفلاتر ({activeCount})
            </motion.button>
          )}
        </AnimatePresence>

        {/* Desktop: Radix Popover */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="relative hidden shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-champagne-deep md:inline-flex"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
              فلترة متقدمة
              {activeCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne-deep text-[11px] font-semibold text-canvas">
                  {activeCount}
                </span>
              )}
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="end"
              sideOffset={12}
              className="z-50 w-[22rem] rounded-xl2 border border-line bg-canvas p-6 shadow-ambient-lg data-[state=open]:animate-fade-up"
            >
              <FilterPanelContent filters={filters} onChange={onChange} />
              <Popover.Arrow className="fill-canvas" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {/* Mobile: vaul bottom drawer */}
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <button
              type="button"
              className="relative inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
              {activeCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne-deep text-[11px] font-semibold text-canvas">
                  {activeCount}
                </span>
              )}
            </button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px]" />
            <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] rounded-t-2xl border-t border-line bg-canvas px-6 pb-8 pt-4">
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-line" />
              <Drawer.Title className="mb-5 text-base font-semibold">
                فلترة متقدمة
              </Drawer.Title>
              <div className="overflow-y-auto">
                <FilterPanelContent filters={filters} onChange={onChange} />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}
