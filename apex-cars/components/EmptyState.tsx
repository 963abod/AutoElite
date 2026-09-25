import { SearchX } from "lucide-react";

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-line bg-surface px-6 py-20 text-center">
      <SearchX className="h-8 w-8 text-champagne-deep" strokeWidth={1.5} />
      <p className="mt-4 text-base font-medium">
        لا توجد سيارات مطابقة لهذه الفلاتر
      </p>
      <p className="mt-1.5 max-w-xs text-sm text-ink-soft">
        جرّب توسيع نطاق البحث أو مسح بعض الفلاتر المُطبّقة حالياً.
      </p>
      <button
        onClick={onReset}
        className="mt-6 rounded-full border border-line bg-canvas px-5 py-2.5 text-sm font-medium transition-colors hover:border-champagne-deep"
      >
        مسح كل الفلاتر
      </button>
    </div>
  );
}
