import {Gamepad2} from "lucide-react";
import {Image} from "@heroui/image";

interface GameCardToolTipContentProps {
    title: string;
    description: string;
    image: string | null;
    price: number;
    imageFailed: boolean;
    handleImageError: () => void;
}

export function GameCardToolTipContent({
                                           title,
                                           description,
                                           image,
                                           price,
                                           imageFailed,
                                           handleImageError
                                       }: GameCardToolTipContentProps) {
    return (
        <div className={"w-80 p-4 rounded-xl bg-card shadow-2xl border border-border"}>
            {(imageFailed || !image) ? (
                <div>
                    <Gamepad2 size={"64"} className={"text-default-500 mb-2"}/>
                    <p className={"text-small text-default-500"}>Image missing</p>
                </div>
            ) : (
                <Image
                    alt={title}
                    className={"w-full h-48 object-cover rounded-md mb-3"}
                    src={image}
                    onError={handleImageError}
                    isBlurred
                    removeWrapper
                />
            )}

            <div className={"flex justify-between items-start mb-2"}>
                <h4 className={"text-xl font-bold text-card-foreground line-clamp-2"}>{title}</h4>
                <p className={"text-xl font-extrabold text-primary ml-4 shrink-0"}>€{price}</p>
            </div>

            <p className={"text-sm text-muted-foreground line-clamp-4"}>
                {description}
            </p>
        </div>
    );
}