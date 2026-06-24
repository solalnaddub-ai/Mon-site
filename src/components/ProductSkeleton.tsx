/** Shimmer placeholder shown while the catalog loads (Quick Ref §3 progressive-loading). */
export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] border-2 border-ink-700 bg-ink-800" />
      <div className="mt-3 flex justify-between">
        <div className="h-5 w-2/3 bg-ink-700" />
        <div className="h-5 w-12 bg-ink-700" />
      </div>
    </div>
  );
}
