import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Image} from "@heroui/image";
import {useState} from "react";
import {Gamepad2, ShoppingCart} from "lucide-react";
import {Button} from "@heroui/button";

interface ShopCardProps {
    title: string;
    image: string | null;
    price: number;
    gameId: string;
    onAddToCart: (gameId: string) => void;
}

export function GameCard({title, image, price, gameId, onAddToCart}: ShopCardProps) {
    const [imageFailed, setImageFailed] = useState(false);

    const handleImageError = () => {
        setImageFailed(true);
    }


    return (
            <Card
                className={"py-0 w-[250px] h-[380px] sm:w-[300px] bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"}
            >
                <CardBody className={"p-0 overflow-hidden"}>
                    {(imageFailed || !image) ? (
                        <div
                            className="flex flex-col items-center justify-center h-[300px] bg-white/5 backdrop-blur-sm border-b border-white/10">
                            <Gamepad2 size={"64"} className={"text-white/40 mb-2"}/>
                            <p className={"text-sm text-white/40"}>Image missing</p>
                        </div>
                    ) : (
                        <div className="h-[300px] overflow-hidden border-b border-white/10">
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
                <CardHeader className={"pt-2 px-4 flex-col items-start"}>
                    <h4 className={"font-bold text-large truncate w-full"}>{title}</h4>
                    <p className={"text-xl font-bold text-primary"}>€{price.toFixed(2)}</p>
                </CardHeader>
                <CardFooter className={"pt-0 px-4 pb-4"}>
                    <Button
                        color="primary"
                        className="w-full"
                        startContent={<ShoppingCart size={18} />}
                        onPress={() =>
                            onAddToCart(gameId)}
                    >
                        Add
                    </Button>
                </CardFooter>
            </Card>
    )
}