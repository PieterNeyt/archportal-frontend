import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Badge } from "@heroui/badge";
import { useGame } from "@/hooks/useGames";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { ShoppingCartComponent } from "@/components/shop/ShoppingCartComponent";
import { useContext, useState } from "react";
import SecurityContext from "@/context/SecurityContext";
import { ArrowLeft, ShoppingCart, LogIn, Gamepad2 } from "lucide-react";
import useToastEffect from "@/hooks/useToastEffect";

export function GameShopPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { game, isLoading, isError: isGameError } = useGame(id!);

    const {
        cart,
        addToCart,
        addToCartMutation,
        removeFromCart,
        itemCount,
    } = useCart();

    const { checkout, isCheckingOut } = useCheckout();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { isAuthenticated, login } = useContext(SecurityContext);
    const isAuth = isAuthenticated();

    const [imageFailed, setImageFailed] = useState(false);

    useToastEffect(addToCartMutation,
        "Added to cart",
        "Failed to add",
        `Succesfully added to ${game?.title} to cart`
    );

    const handleAddToCart = () => {
        if (isAuth && game) {
            addToCart(game.id);
        } else {
            login();
        }
    };

    if (isGameError || !game) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-danger">Failed to load game</h2>
                    <p className="text-default-500">Something went wrong while fetching the game data.</p>
                </div>
                <Button color="primary" variant="flat" onPress={() => navigate('/shop')}>
                    Return to Shop
                </Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-[60vh]">
                <p className="animate-pulse text-default-500">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto p-4 max-w-6xl">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <Button
                        variant="light"
                        startContent={<ArrowLeft size={20} />}
                        onPress={() => navigate('/shop')}
                        className="pl-0 hover:bg-transparent hover:text-primary transition-colors"
                    >
                        Back to Shop
                    </Button>

                    <Badge content={itemCount} color="primary" isInvisible={itemCount === 0}>
                        <Button
                            isIconOnly
                            color="primary"
                            variant="flat"
                            onPress={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={24} />
                        </Button>
                    </Badge>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Image (Centered) */}
                    <div className="w-full flex justify-center items-center">
                        <div className="relative w-full max-w-[400px] aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden bg-black/30 border border-white/10 shadow-2xl shadow-purple-900/10 mx-auto">
                            {(imageFailed || !game.imageUrl) ? (
                                <div className="flex flex-col items-center justify-center w-full h-full text-white/20">
                                    <Gamepad2 size={80} strokeWidth={1} />
                                    <p className="mt-4 text-sm">No artwork available</p>
                                </div>
                            ) : (
                                <Image
                                    src={game.imageUrl}
                                    alt={game.title}
                                    className="object-cover w-full h-full"
                                    width="100%"
                                    height="100%"
                                    onError={() => setImageFailed(true)}
                                    isBlurred
                                />
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center space-y-6">

                        <div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Chip
                                    startContent={<Gamepad2 size={14} />}
                                    variant="flat"
                                    color="secondary"
                                    className="uppercase font-bold text-xs tracking-wider"
                                >
                                    {game.genre}
                                </Chip>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                                {game.title}
                            </h1>

                            <p className="text-3xl font-bold text-primary">
                                €{game.price.toFixed(2)}
                            </p>
                        </div>

                        <Divider className="my-4 bg-white/10" />

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white/90">About this game</h3>
                            <p className="text-default-400 leading-relaxed text-lg">
                                {game.description || "No description provided for this title."}
                            </p>
                        </div>

                        <div className="pt-4">
                            <Button
                                size="lg"
                                color={isAuth ? "primary" : "secondary"}
                                variant={isAuth ? "solid" : "flat"}
                                className="w-full md:w-auto min-w-[200px] font-semibold text-lg"
                                startContent={isAuth ? <ShoppingCart /> : <LogIn />}
                                onPress={handleAddToCart}
                            >
                                {isAuth ? "Add to Cart" : "Login to add to cart"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ShoppingCartComponent
                cart={cart}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onRemoveItem={removeFromCart}
                onCheckout={checkout}
                isCheckingOut={isCheckingOut}
            />
        </>
    );
}