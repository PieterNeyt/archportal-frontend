import {Card, CardBody} from "@heroui/card";
import {Button} from "@heroui/button";
import {ArrowPathIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';

interface GameLoadErrorProps {
    onRetry: () => void;
}

export function GameLoadError({onRetry}: GameLoadErrorProps) {
    return (
        <Card className={"max-w-md mx-auto my-10 bg-card border-2 border-destructive shadow-lg"}>
            <CardBody className={"flex flex-col items-center p-8"}>
                <ExclamationTriangleIcon className={"text-destructive size-1/4"}/>

                <h2 className={"text-xl font-bold text-card-foreground mb-2"}>
                    Failed to Load Games
                </h2>

                <p className={"text-muted-foreground text-center mb-6"}>
                    We couldn't retrieve the game list. This might be due to a network connection issue or a temporary
                    server problem.
                </p>

                <Button
                    color={"primary"}
                    size={"lg"}
                    startContent={<ArrowPathIcon className={"size-5"}/>}

                    onPress={onRetry}
                >
                    Try Again
                </Button>
            </CardBody>
        </Card>
    );
}