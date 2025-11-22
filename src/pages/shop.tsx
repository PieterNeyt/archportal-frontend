import {useGames} from "@/hooks/useGames.ts";
import {CircularProgress} from "@heroui/progress";
import {Alert} from "@heroui/alert";
import {GameCard} from "@/components/shop/GameCard.tsx";

export function ShopPage() {
    const {isError, isLoading, games} = useGames();

    if (isLoading) {
        return <CircularProgress aria-label={"Loading..."}/>;
    }

    if (isError) {
        return <Alert color={"warning"} title={"Error!"}/>
    }

    return (
        <div className={"p-4 sm:p-8"}>
            <h2 className={"text-3xl font-bold mb-6"}>Game shop</h2>
            <div className={"grid gap-6 justify-items-center"}
                 style={{
                     gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
                 }}>
                {games?.map((game, index) => (
                    <GameCard key={index} title={game.title} description={game.description} image={game.imageUrl}/>
                ))}
            </div>
        </div>
    );
}