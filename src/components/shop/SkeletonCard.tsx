import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Skeleton} from "@heroui/skeleton";

export function SkeletonCard() {
    // Extra utility voor donkere skeletons
    const skeletonClass =
        "bg-white/10 before:bg-white/5 after:bg-white/20 dark:bg-white/10";

    return (
        <Card
            className={
                "py-0 w-[250px] h-[380px] sm:w-[300px] " +
                "bg-black/30 backdrop-blur-xl border border-white/10 overflow-hidden"
            }
        >
            <CardBody className="p-0 overflow-hidden">
                <div className="h-[300px] overflow-hidden border-b border-white/10">
                    <Skeleton
                        className={`w-full h-full rounded-none ${skeletonClass}`}
                    />
                </div>
            </CardBody>

            <div className="flex flex-col flex-1 backdrop-blur-xl bg-black/20">
                <CardHeader className="pt-4 px-4 pb-2 flex-col items-start w-full">
                    <Skeleton className={`w-4/5 h-5 rounded-lg mb-1 ${skeletonClass}`}/>
                </CardHeader>

                <CardFooter className="pt-2 px-4 pb-4 flex-col items-start mt-auto w-full">
                    <Skeleton className={`w-1/4 h-3 rounded-lg mb-2 ${skeletonClass}`}/>
                    <Skeleton className={`w-1/3 h-6 rounded-lg ${skeletonClass}`}/>
                </CardFooter>
            </div>
        </Card>
    );
}
