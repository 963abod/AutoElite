"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Car } from "@/types/car";
import { buildCarWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton({ car, url }: { car: Car; url: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={buildCarWhatsAppLink(car, url)}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp px-6 py-4 text-sm font-semibold text-white shadow-ambient"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
      طلب استفسار عبر واتساب
    </motion.a>
  );
}
