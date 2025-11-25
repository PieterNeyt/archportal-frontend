import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

interface LibrarySkeletonCardProps {
    viewMode: 'grid' | 'list';
}

export function LibrarySkeletonCard({ viewMode }: LibrarySkeletonCardProps) {
    const skeletonClass = "bg-white/10 before:bg-white/5 after:bg-white/20";

    if (viewMode === 'list') {
        return (
            <Card className="bg-black/30 backdrop-blur-xl border border-white/10 h-32">
                <CardBody className="p-0 flex flex-row">
                    <Skeleton className={`w-48 h-full rounded-l-xl rounded-r-none ${skeletonClass}`} />
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <Skeleton className={`w-1/3 h-6 rounded-lg mb-2 ${skeletonClass}`} />
                            <Skeleton className={`w-2/3 h-4 rounded-lg ${skeletonClass}`} />
                        </div>
                        <Skeleton className={`w-24 h-10 rounded-lg ${skeletonClass}`} />
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card className="bg-black/30 backdrop-blur-xl border border-white/10 overflow-hidden">
            <CardBody className="p-0">
                <Skeleton className={`w-full h-48 rounded-t-xl rounded-b-none ${skeletonClass}`} />
                <div className="p-4">
                    <Skeleton className={`w-3/4 h-5 rounded-lg mb-2 ${skeletonClass}`} />
                    <Skeleton className={`w-1/2 h-4 rounded-lg mb-4 ${skeletonClass}`} />
                    <Skeleton className={`w-full h-10 rounded-lg ${skeletonClass}`} />
                </div>
            </CardBody>
        </Card>
    );
}