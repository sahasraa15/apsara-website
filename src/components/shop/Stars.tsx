import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex text-gold", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-3.5", i < Math.round(rating) ? "fill-current" : "fill-transparent")}
          strokeWidth={i < Math.round(rating) ? 0 : 1.5}
        />
      ))}
    </span>
  );
}
