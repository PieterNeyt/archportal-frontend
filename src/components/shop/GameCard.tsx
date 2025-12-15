import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {useContext, useMemo, useState} from "react";
import {ShoppingCart} from "lucide-react";
import {Button} from "@heroui/button";
import SecurityContext from "@/context/SecurityContext.ts";
import ImageMemo from "@/components/ImageMemo.tsx";

interface ShopCardProps {
    title: string;
    image: string | null;
    price: number;
    gameId: string;
    onAddToCart: (gameId: string) => void;
    onPress?: () => void;
}

export function GameCard({title, image, price, gameId, onAddToCart, onPress}: ShopCardProps) {
    const [imageFailed, setImageFailed] = useState(false);
    const {isAuthenticated, login} = useContext(SecurityContext);
    const onImageError = () => {
        setImageFailed(true);
    };
    const imageElement = useMemo(() => {
        return ImageMemo({image, title, imageFailed, onImageError});
    }, [image, imageFailed, title]);

    const addToCart = () => {
        if (isAuthenticated())
            onAddToCart(gameId);
        else
            login();
    }

    return (
        <div onClick={onPress}>
            <Card
                className={"py-0 w-[250px] h-[380px] sm:w-[300px] bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden cursor-pointer"}
            >
                <CardBody className={"p-0 overflow-hidden"}>
                    {imageElement}
                </CardBody>
                <CardHeader className={"pt-2 px-4 flex-col items-start"}>
                    <h4 className={"font-bold text-large truncate w-full"}>{title}</h4>
                    <p className={"text-xl font-bold text-primary"}>€{price.toFixed(2)}</p>
                </CardHeader>
                <CardFooter className={"pt-0 px-4 pb-4"}>
                    <div
                        className="w-full"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                    >
                        <Button
                            color="primary"
                            className="w-full"
                            startContent={<ShoppingCart size={18}/>}
                            onPress={addToCart}
                        >
                            Add
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}