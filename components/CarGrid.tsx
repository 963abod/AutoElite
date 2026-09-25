"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Car } from "@/types/car";
import { CarCard } from "@/components/CarCard";
import { EmptyState } from "@/components/EmptyState";

export function CarGrid({
  cars,
  onReset,
}: {
  cars: Car[];
  onReset: () => void;
}) {
  if (cars.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
