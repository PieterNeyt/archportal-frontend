import {Game} from "@/model/game.ts";
import {AlertCircle} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {GameInfoCard} from "@/components/gamestudio/GameInfoCar.tsx";
import {useNavigate} from "react-router-dom";

interface GamesListProps {
    games?: Game[];
}

export function GamesList({ games }: GamesListProps) {
    const navigate = useNavigate();

    const handleCardClick = (gameId: string) => {
        navigate(`/gamestudio/game/${gameId}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price);
    };

    return (
        <div className="flex flex-col gap-3">
            {games && games.length > 0 ? (
                games.map((game) => (
                    <div
                        key={game.id}
                        onClick={() => handleCardClick(game.id)}
                        className={`${GLASS_CARD_STYLES} p-3 flex items-center gap-4 hover:bg-white/5 hover:border-white/30 transition-all duration-300 group cursor-pointer active:scale-[0.99]`}
                    >
                        {/* Game Info (Image + Title + Genre) */}
                        <GameInfoCard game={game} />

                        {/* Price (Right aligned) */}
                        <div className="ml-auto pr-4 text-white font-semibold tracking-wide whitespace-nowrap">
                            {formatPrice(game.price)}
                        </div>
                    </div>
                ))
            ) : (
                <div className={`${GLASS_CARD_STYLES} p-12 flex flex-col items-center justify-center text-white/40 gap-3`}>
                    <AlertCircle size={32} />
                    <p>This studio hasn't published any games yet.</p>
                </div>
            )}
        </div>
    );
}