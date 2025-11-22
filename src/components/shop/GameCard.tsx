import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Image} from "@heroui/image";
import {useCallback, useEffect, useRef, useState} from "react";
import {Gamepad2} from "lucide-react";
import {Tooltip} from "@heroui/tooltip";
import {GameCardToolTipContent} from "@/components/shop/GameCardToolTipContent.tsx";

interface ShopCardProps {
    title: string;
    description: string;
    image: string | null;
    price: number;
}

export function GameCard({title, description, image, price}: ShopCardProps) {
    const [imageFailed, setImageFailed] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setImageFailed(false);
    }, [image])

    const handleImageError = () => {
        setImageFailed(true);
    }

    const handleMouseEnter = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setIsTooltipOpen(true);
        }, 500);
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setIsTooltipOpen(false);
    }, []);

    return (
        <Tooltip
            content={<GameCardToolTipContent title={title} image={image} description={description} price={price}
                                             imageFailed={imageFailed} handleImageError={handleImageError}/>}
            placement={"right-start"}
            isOpen={isTooltipOpen}
            delay={1000}
            closeDelay={0}
            className={"pointer-events-none"}
            classNames={{
                base: "p-0 rounded-xl shadow-2xl",
                content: "pointer-events-none"
            }}
        >
            <Card isHoverable className={"py-4 w-[250px] h-[350px] sm:w-[300px]"}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
            >
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
                <CardFooter className={"pt-0 px-4 pb-4 flex-col items-end overflow-hidden"}>
                    <p className={"text-small text-default-500 line-clamp-2"}>€{price}</p>
                </CardFooter>
            </Card>
        </Tooltip>
    )
}