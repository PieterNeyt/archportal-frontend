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
            <Card
                isHoverable
                className={"py-0 w-[250px] h-[380px] sm:w-[300px] bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-black/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <CardBody className={"p-0 overflow-hidden"}>
                    {(imageFailed || !image) ? (
                        <div
                            className="flex flex-col items-center justify-center h-[300px] bg-white/5 backdrop-blur-sm border-b border-white/10">
                            <Gamepad2 size={"64"} className={"text-white/40 mb-2"}/>
                            <p className={"text-sm text-white/40"}>Image missing</p>
                        </div>
                    ) : (
                        <div className="h-[200px] overflow-hidden border-b border-white/10">
                            <Image
                                alt={title}
                                className={"object-cover w-full h-full"}
                                src={image}
                                onError={handleImageError}
                                isBlurred
                                removeWrapper
                            />
                        </div>
                    )}
                </CardBody>

                <div className="flex flex-col flex-1 backdrop-blur-xl bg-black/20">
                    <CardHeader className={"pt-4 px-4 pb-2 flex-col items-start"}>
                        <h4 className={"font-bold text-lg text-white line-clamp-2 w-full"}>{title}</h4>
                    </CardHeader>

                    <CardFooter className={"pt-2 px-4 pb-4 flex-col items-start mt-auto"}>
                        <p className={"text-xs text-white/50 mb-1"}>Price:</p>
                        <p className={"text-2xl font-bold text-white"}>€{price}</p>
                    </CardFooter>
                </div>
            </Card>
        </Tooltip>
    )
}