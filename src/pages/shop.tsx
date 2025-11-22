import {useGames} from "@/hooks/useGames.ts";
import {GameCard} from "@/components/shop/GameCard.tsx";
import {SkeletonCard} from "@/components/shop/SkeletonCard.tsx";
import {GameLoadError} from "@/components/shop/GameLoadError.tsx";

const SKELETON_COUNT = 10;

export function ShopPage() {
    const {isError, isLoading, refetch, games} = useGames();

    if (isError) {
        return <GameLoadError onRetry={refetch}/>
    }

    return (
        <div className={"p-4 sm:p-8"}>
            <h2 className={"text-3xl font-bold mb-6"}>Game shop</h2>
            <div className={"grid gap-6 justify-items-center"}
                 style={{
                     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
                 }}>
                {isLoading ? (
                    Array(SKELETON_COUNT).fill(0).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))
                ) : (games?.map((game, index) => (
                            <GameCard key={index} title={game.title}
                                      description={game.description} image={game.imageUrl}
                                      price={game.price}/>
                        )
                    )
                )}

            </div>
        </div>
    );
}