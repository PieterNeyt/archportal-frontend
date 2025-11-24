import {useGame} from "@/hooks/useGame.ts";
import {useCart} from "@/hooks/useCart.ts";
import {useCheckout} from "@/hooks/useCheckout.ts";
import {GameCard} from "@/components/shop/GameCard.tsx";
import {SkeletonCard} from "@/components/shop/SkeletonCard.tsx";
import {GameLoadError} from "@/components/shop/GameLoadError.tsx";
import {ShoppingCartComponent} from "@/components/shop/ShoppingCartComponent.tsx";
import {useState} from "react";
import {Button} from "@heroui/button";
import {ShoppingCart} from "lucide-react";
import {Badge} from "@heroui/badge";

const SKELETON_COUNT = 10;

export function ShopPage() {
    const {isError, isLoading, refetch, games} = useGame();
    const {cart, addToCart, removeFromCart, isAddingToCart, itemCount} = useCart();
    const {checkout, isCheckingOut} = useCheckout();

    const [isCartOpen, setIsCartOpen] = useState(false);

    if (isError) {
        return <GameLoadError onRetry={refetch}/>
    }
    if (games?.length === 0) {
        return <div>No items found</div>
    }

    return (
        <>
            <div className={"p-4 sm:p-8"}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={"text-3xl font-bold"}>Game shop</h2>
                    <Badge content={itemCount} color="primary" isInvisible={itemCount === 0}>
                        <Button
                            isIconOnly
                            color="primary"
                            variant="flat"
                            onPress={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={24}/>
                        </Button>
                    </Badge>
                </div>
                <div className={"grid gap-6 justify-items-center"}
                     style={{
                         gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
                     }}>
                    {isLoading ? (
                        Array(SKELETON_COUNT).fill(0).map((_, index) => (
                            <SkeletonCard key={index}/>
                        ))
                    ) : (games?.map((game) => (
                                <GameCard
                                    key={game.id}
                                    title={game.title}
                                    description={game.description}
                                    image={game.imageUrl}
                                    price={game.price}
                                    gameId={game.id}
                                    onAddToCart={addToCart}
                                    isAddingToCart={isAddingToCart}
                                />
                            )
                        )
                    )}
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