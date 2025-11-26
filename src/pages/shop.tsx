import {useGames} from "@/hooks/useGames.ts";
import {useCart} from "@/hooks/useCart.ts";
import {useCheckout} from "@/hooks/useCheckout.ts";
import {GameCard} from "@/components/shop/GameCard.tsx";
import {SkeletonCard} from "@/components/shop/SkeletonCard.tsx";
import {GameLoadError} from "@/components/shop/GameLoadError.tsx";
import {ShoppingCartComponent} from "@/components/shop/ShoppingCartComponent.tsx";
import {useState} from "react";
import {Button} from "@heroui/button";
import {Search, ShoppingCart} from "lucide-react";
import {Badge} from "@heroui/badge";
import {Input} from "@heroui/input";

const SKELETON_COUNT = 10;

export function ShopPage() {
    const {isError, isLoading, refetch, games} = useGames();
    const {cart, addToCart, removeFromCart, isAddingToCart, itemCount} = useCart();
    const {checkout, isCheckingOut} = useCheckout();
    const [searchQuery, setSearchQuery] = useState("");

    const [isCartOpen, setIsCartOpen] = useState(false);

    if (isError) {
        return <GameLoadError onRetry={refetch}/>
    }
    if (games?.length === 0) {
        return <div>No items found</div>
    }
    const filteredGames = games?.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <>
            <div className={"p-4 sm:p-8"}>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex-2 max-w-md">
                        <Input
                            placeholder="Search in your library..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            startContent={<Search size={20} className="text-white/40"/>}
                            classNames={{
                                input: "bg-transparent text-white",
                                inputWrapper: "bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20"
                            }}
                        />
                    </div>
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
                    ) : (filteredGames?.map((game) => (
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