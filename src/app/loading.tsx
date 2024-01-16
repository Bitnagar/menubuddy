import Loading1 from "@/components/loaders/LRingResize";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
      <Loading1 />
    </div>
  );
}
