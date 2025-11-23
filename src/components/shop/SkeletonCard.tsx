import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Skeleton} from "@heroui/skeleton";

export function SkeletonCard() {
    return (
        <Card className={"py-4 w-[250px] h-[350px] sm:w-[300px] bg-black/20 backdrop-blur-md border border-white/10"}>
            <CardBody className={"overflow-visible py-2 px-4 flex justify-center items-center"}>
                <Skeleton className={"object-cover rounded-xl aspect-video w-full h-full bg-white/10"}>
                    <div className={"w-full h-full"}></div>
                </Skeleton>
            </CardBody>
            <CardHeader className={"pt-2 px-4 flex-col items-start"}>
                <Skeleton className={"w-3/5 rounded-lg bg-white/10"}>
                    <div className={"h-5 rounded-lg"}></div>
                </Skeleton>
            </CardHeader>
            <CardFooter className={"pt-0 px-4 pb-4 flex-col items-end overflow-hidden"}>
                <Skeleton className={"w-1/6 rounded-lg bg-white/10"}>
                    <div className={"h-4 rounded-lg"}></div>
                </Skeleton>
            </CardFooter>
        </Card>
    );
}