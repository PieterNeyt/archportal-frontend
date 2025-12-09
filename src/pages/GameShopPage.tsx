import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Badge } from "@heroui/badge"; // Nodig voor de cart teller
import { useGame } from "@/hooks/useGames";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { ShoppingCartComponent } from "@/components/shop/ShoppingCartComponent"; // Importeer je cart component
import { useContext, useState } from "react";
import SecurityContext from "@/context/SecurityContext";
import { ArrowLeft, ShoppingCart, LogIn, Gamepad2 } from "lucide-react";

export function GameShopPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // 1. Hooks voor Game Data
    const { game, isLoading, isError } = useGame(id!);

    // 2. Hooks voor Cart & Checkout
    const { cart, addToCart, removeFromCart, itemCount } = useCart();
    const { checkout, isCheckingOut } = useCheckout();
    const [isCartOpen, setIsCartOpen] = useState(false);

    // 3. Auth
    const { isAuthenticated, login } = useContext(SecurityContext);
    const isAuth = isAuthenticated();

    // 4. Local State
    const [imageFailed, setImageFailed] = useState(false);

    const handleAddToCart = () => {
        if (isAuth && game) {
            addToCart(game.id);
            setIsCartOpen(true);
        } else {
            login();
        }
    };

    if (isError || !game) {
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">

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