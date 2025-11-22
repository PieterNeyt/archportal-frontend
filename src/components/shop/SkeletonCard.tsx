import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Skeleton} from "@heroui/skeleton";

export function SkeletonCard() {
    return (
        <Card className={"py-4 w-[250px] h-[350px] sm:w-[300px]"}>
            <CardBody className={"overflow-visible py-2 px-4 flex justify-center items-center"}>
                <Skeleton className={"object-cover rounded-xl aspect-video w-full h-full"}/>
            </CardBody>
            <CardHeader className={"pt-2 px-4 flex-col items-start"}>
                <Skeleton className={"w-3/5 rounded-lg"}>
                    <div className={"h-5 rounded-lg bg-default-200"}></div>
                </Skeleton>
            </CardHeader>
            <CardFooter className={"pt-0 px-4 pb-4 flex-col items-end overflow-hidden"}>
                <Skeleton className={"w-1/6 rounded-lg"}>
                    <div className={"h-4 rounded-lg bg-primary"}></div>
                </Skeleton>
            </CardFooter>
        </Card>
    );
}