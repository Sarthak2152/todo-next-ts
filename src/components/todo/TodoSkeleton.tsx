import { Skeleton } from "@/components/ui/skeleton";

export function TodoSkeleton() {
  return (
    <li className="flex border rounded-lg p-4 justify-between">
      <div className="space-y-3">
        <Skeleton className="w-[200px] h-[24px]" />
        <Skeleton className="w-[180px] h-[24px]" />
        <Skeleton className="w-[100px] mt-4 h-[34px]" />
      </div>
      <div className="flex flex-col items-end justify-center  gap-4">
        <Skeleton className="w-[80px] h-[24px]" />
        <Skeleton className="w-[30px] h-[30px]" />
      </div>
    </li>
  );
}
