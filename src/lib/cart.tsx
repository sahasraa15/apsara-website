"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productById } from "@/lib/products";

export type CartLine = {
  key: string;
  id: string;
  qty: number;
  price: number;
  shade?: string;
  bundle?: string;
};

type AddOptions = {
  shade?: string;
  bundle?: string;
  price?: number;
  qty?: number;
  from?: HTMLElement | null;
  color?: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (id: string, options?: AddOptions) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  bump: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "apsara-bag-v1";

type Flight = { id: number; x: number; y: number; tx: number; ty: number; color: string };

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((id: string, options: AddOptions = {}) => {
    const product = productById[id];
    if (!product) return;
    const key = [id, options.shade, options.bundle].filter(Boolean).join("|");
    const qty = options.qty ?? 1;
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
      }
      return [
        ...prev,
        {
          key,
          id,
          qty,
          price: options.price ?? product.price,
          shade: options.shade,
          bundle: options.bundle,
        },
      ];
    });

    const bag = document.getElementById("bag-button");
    if (options.from && bag) {
      const a = options.from.getBoundingClientRect();
      const b = bag.getBoundingClientRect();
      setFlights((f) => [
        ...f,
        {
          id: Date.now() + Math.random(),
          x: a.left + a.width / 2,
          y: a.top + a.height / 2,
          tx: b.left + b.width / 2,
          ty: b.top + b.height / 2,
          color: options.color ?? product.glass,
        },
      ]);
      setTimeout(() => setBump((n) => n + 1), 750);
    } else {
      setBump((n) => n + 1);
    }
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
    return { lines, count, subtotal, open, setOpen, add, setQty, clear, bump };
  }, [lines, open, add, setQty, clear, bump]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[90]">
        <AnimatePresence>
          {flights.map((f) => (
            <motion.span
              key={f.id}
              className="absolute block size-5 rounded-full"
              style={{
                left: 0,
                top: 0,
                background: `radial-gradient(circle at 35% 30%, #f3dda4, ${f.color} 55%, #0a1c10)`,
                boxShadow: `0 0 24px ${f.color}, 0 0 60px #e3c27c88`,
              }}
              initial={{ x: f.x - 10, y: f.y - 10, scale: 0.4, opacity: 0 }}
              animate={{
                x: [f.x - 10, (f.x + f.tx) / 2 - 10, f.tx - 10],
                y: [f.y - 10, Math.min(f.y, f.ty) - 140, f.ty - 10],
                scale: [0.6, 1.6, 0.5],
                opacity: [0, 1, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.5, 0, 0.2, 1] }}
              onAnimationComplete={() =>
                setFlights((all) => all.filter((x) => x.id !== f.id))
              }
            />
          ))}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
