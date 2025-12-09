import {Game} from "@/model/game.ts";
import {AlertCircle, Pencil} from "lucide-react";
import {Button} from "@heroui/button";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {GameInfoCard} from "@/components/gamestudio/GameInfoCar.tsx";

interface GamesListProps {
    games?: Game[];
}

export function GamesList({games}: GamesListProps) {

    const handleEditGame = (gameId: string) => {
        console.log("Edit game:", gameId);
    };
    return (
        <> {games && games.length > 0 ? (
            games.map((game) => (
                <div
                    key={game.id}
                    className={`${GLASS_CARD_STYLES} p-3 flex items-center gap-4 hover:border-white/30 hover:bg-white/5 transition-all duration-300 group`}
                >

                    <GameInfoCard game={game}/>

                    {/* Edit Button */}
                    <div className="flex items-center pr-2">
                        <Button
                            isIconOnly={false}
                            variant="flat"
                            color="default"
                            size="sm"
                            className="bg-white/5 hover:bg-white/10 text-white/80"
                            onPress={() => handleEditGame(game.id)}
                            startContent={<Pencil size={16} />}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            ))
        ) : (
            <div className={`${GLASS_CARD_STYLES} p-12 flex flex-col items-center justify-center text-white/40 gap-3`}>
                <AlertCircle size={32} />
                <p>This studio hasn't published any games yet.</p>
            </div>
        )
        }
        </>)
}