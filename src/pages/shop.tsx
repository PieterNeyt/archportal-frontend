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
        <div>
            <div>
                {games?.map((game, index) => (
                    <GameCard key={index} title={game.name} description={game.description} image={game.image}/>
                ))}
            </div>
        </div>
    );
}