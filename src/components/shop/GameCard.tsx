import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Image} from "@heroui/image";
import {useEffect, useState} from "react";
import {Gamepad2} from "lucide-react";

interface ShopCardProps {
    title: string;
    description: string;
    image: string | null;
}

export function GameCard({title, description, image}: ShopCardProps) {
    const [imageFailed, setImageFailed] = useState(false);

    useEffect(() => {
        setImageFailed(false);
    }, [image])

    const handleImageError = () => {
        setImageFailed(true);
    }

    return (
        <Card isHoverable className={"py-4 w-[250px] h-[350px] sm:w-[300px]"}>
            <CardBody className={"overflow-visible py-2 px-4 flex justify-center items-center"}>
                {(imageFailed || !image) ? (
                    <div>
                        <Gamepad2 size={"64"} className={"text-default-500 mb-2"}/>
                        <p className={"text-small text-default-500"}>Image missing</p>
                    </div>
                ) : (
                    <Image
                        alt={title}
                        className={"object-cover rounded-xl aspect-video w-full h-full"}
                        src={image}
                        onError={handleImageError}
                        isBlurred
                        removeWrapper
                    />
                )}
            </CardBody>
            <CardHeader className={"pt-2 px-4 flex-col items-start"}>
                <h4 className={"font-bold text-large truncate"}>{title}</h4>
            </CardHeader>
            <CardFooter className={"pt-0 px-4 pb-4 flex-col items-start overflow-hidden"}>
                <p className={"text-tiny text-default-500 line-clamp-2"}>{description}</p>
            </CardFooter>
        </Card>
    )
}