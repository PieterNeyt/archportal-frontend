import {useGames} from "@/hooks/useGames.ts";
import {useCart} from "@/hooks/useCart.ts";
import {useCheckout} from "@/hooks/useCheckout.ts";
import {GameCard} from "@/components/shop/GameCard.tsx";
import {SkeletonCard} from "@/components/shop/SkeletonCard.tsx";
import {GameLoadError} from "@/components/shop/GameLoadError.tsx";
import {ShoppingCartComponent} from "@/components/shop/shoppingcart/ShoppingCartComponent.tsx";
import {useMemo, useState} from "react";
import {Button} from "@heroui/button";
import {ArrowUpDown, Filter, Search, ShoppingCart} from "lucide-react";
import {Badge} from "@heroui/badge";
import {Input} from "@heroui/input";
import {Select, SelectItem} from "@heroui/select";
import {GameGenre} from "@/model/library.ts";
import {selectClasses} from "@/styles/customClasses.ts";
import {Game} from "@/model/game.ts";
import {useNavigate} from "react-router-dom";
import useToastEffect from "@/hooks/useToastEffect.ts";

enum SortOption {
    ALPHABETICAL = "ALPHABETICAL",
    PRICE_LOW_HIGH = "PRICE_LOW_HIGH",
    PRICE_HIGH_LOW = "PRICE_HIGH_LOW"
}

const SKELETON_COUNT = 10;

const formatLabel = (label: string) => {
    return label.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
};

export default function ShopPage() {
    const {isError, isLoading, refetch, games} = useGames();
    const {cart, addToCartMutation, addToCart, removeFromCart, itemCount} = useCart();
    const { isCheckingOut} = useCheckout();

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set([]));
    const [sortOption, setSortOption] = useState<Set<string>>(new Set([SortOption.ALPHABETICAL]));
    const [isCartOpen, setIsCartOpen] = useState(false);

    const hasActiveFilters = searchQuery !== "" ||
        selectedGenres.size > 0 ||
        !sortOption.has(SortOption.ALPHABETICAL);

    const handleReset = () => {
        setSearchQuery("");
        setSelectedGenres(new Set([]));
        setSortOption(new Set([SortOption.ALPHABETICAL]));
    };

    useToastEffect(addToCartMutation,
        "Added to cart",
        "Failed to add",
        `Successfully added Game to cart`
    );

    const filteredAndSortedGames = useMemo(() => {
        if (!games) return [];

        const result = games.filter((game: Game) => {
            const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenres.size === 0 || selectedGenres.has(game.genre);
            return matchesSearch && matchesGenre;
        });

        const currentSort = Array.from(sortOption)[0] as SortOption;
        return result.sort((a, b) => {
            switch (currentSort) {
                case SortOption.PRICE_LOW_HIGH:
                    return a.price - b.price;
                case SortOption.PRICE_HIGH_LOW:
                    return b.price - a.price;
                case SortOption.ALPHABETICAL:
                default:
                    return a.title.localeCompare(b.title);
            }
        });
    }, [games, searchQuery, selectedGenres, sortOption]);


    if (isError) {
        return <GameLoadError onRetry={refetch}/>
    }

    if (!isLoading && games?.length === 0) {
        return <div>No items found</div>
    }

    return (
        <>
            <div className={"p-4 sm:p-8"}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">

                    <div className="flex flex-1 flex-wrap gap-4 w-full max-w-4xl items-center">
                        <Input
                            className="w-full sm:w-auto sm:flex-1 min-w-[200px]"
                            placeholder="Search in your shop..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            startContent={<Search size={20} className="text-white/40"/>}
                            classNames={{
                                input: "bg-transparent text-white",
                                inputWrapper: "bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20"
                            }}
                            isClearable
                            onClear={() => setSearchQuery("")}
                            aria-label={"Search for a game"}
                        />

                        <Select
                            placeholder="Genres"
                            selectionMode="multiple"
                            selectedKeys={selectedGenres}
                            onSelectionChange={(keys) => setSelectedGenres(keys as Set<string>)}
                            className="w-full sm:w-[200px]"
                            startContent={<Filter size={18} className="text-white/40"/>}
                            classNames={selectClasses}
                            aria-label="Select your genres"
                        >
                            {(Object.values(GameGenre) as string[]).map((genre) => (
                                <SelectItem key={genre} textValue={formatLabel(genre)}>
                                    {formatLabel(genre)}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            placeholder="Sort on"
                            selectionMode="single"
                            disallowEmptySelection
                            selectedKeys={sortOption}
                            onSelectionChange={(keys) => setSortOption(keys as Set<string>)}
                            className="w-full sm:w-[180px]"
                            startContent={<ArrowUpDown size={18} className="text-white/40"/>}
                            classNames={selectClasses}
                            aria-label={"Sort on"}
                        >
                            <SelectItem key={SortOption.ALPHABETICAL}>Title (A-Z)</SelectItem>
                            <SelectItem key={SortOption.PRICE_LOW_HIGH}>Price (Low - High)</SelectItem>
                            <SelectItem key={SortOption.PRICE_HIGH_LOW}>Price (High - Low)</SelectItem>
                        </Select>

                        <Button
                            color="danger"
                            variant="flat"
                            onPress={handleReset}
                            isDisabled={!hasActiveFilters}
                            className={`transition-opacity ${!hasActiveFilters ? 'opacity-50' : 'opacity-100'}`}
                        >
                            Clear Filters
                        </Button>
                    </div>

                    <div className="flex-none self-end sm:self-center">
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
                </div>

                <div className={"grid gap-6 justify-items-center"}
                     style={{
                         gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
                     }}>
                    {isLoading ? (
                        Array(SKELETON_COUNT).fill(0).map((_, index) => (
                            <SkeletonCard key={index}/>
                        ))
                    ) : filteredAndSortedGames.length > 0 ? (
                        filteredAndSortedGames.map((game: Game) => (
                            <GameCard
                                key={game.id}
                                title={game.title}
                                image={game.imageUrl}
                                price={game.price}
                                gameId={game.id}
                                onAddToCart={addToCart}
                                onPress={() => navigate(`/shop/game/${game.id}`)}
                            />
                        ))
                    ) : (
                        <div
                            className="col-span-full flex flex-col items-center justify-center text-white/50 py-10 gap-4">
                            <p>No games found matching your filters.</p>
                            <Button
                                color="primary"
                                variant="flat"
                                onPress={handleReset}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <ShoppingCartComponent
                cart={cart}
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                onRemoveItem={removeFromCart}
                isCheckingOut={isCheckingOut}
            />
        </>
    );
}