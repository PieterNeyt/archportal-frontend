import {Card, CardBody, CardHeader, Skeleton} from "@heroui/react";
import {BLURRY_BACKGROUND} from "@/styles/customClasses.ts";


export function ProfileCardSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className={BLURRY_BACKGROUND}>
                <CardHeader className="flex gap-4 items-center">
                    <Skeleton className="rounded-full w-20 h-20 bg-default-300/20"/>
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-32 rounded-lg bg-default-300/20"/>
                        <Skeleton className="h-4 w-24 rounded-lg bg-default-300/20"/>
                    </div>
                </CardHeader>
                <CardBody>
                    <Skeleton className="h-10 w-full rounded-lg mb-4 bg-default-300/20"/>
                    <Skeleton className="h-40 w-full rounded-lg bg-default-300/20"/>
                </CardBody>
            </Card>
        </div>
    )
}