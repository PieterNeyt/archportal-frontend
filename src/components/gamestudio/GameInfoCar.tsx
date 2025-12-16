import {Game} from "@/model/game.ts";
import {Gamepad2} from "lucide-react";
import {useState} from "react";

export interface GameInfoCardProps {
    game: Game;
}

export function GameInfoCard({game}: GameInfoCardProps) {
    const [imageFailed, setImageFailed] = useState(false);
    return (<>
        <div
            className="h-16 w-24 sm:h-20 sm:w-32 flex-shrink-0 rounded-xl overflow-hidden bg-black/50 border border-white/5 relative">
            {!game.imageUrl || imageFailed ? (
                <div className="h-full w-full flex items-center justify-center text-white/20">
                    <Gamepad2 size={24}/>
                </div>
            ) : (
                <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => setImageFailed(true)}
                />
            )}
        </div>

        {/* Game Details */}
        <div className="flex-grow min-w-0">
            <h3 className="text-lg font-bold text-white truncate">
                {game.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
                <span
                    className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                    {game.genre}
                </span>
            </div>
        </div>
    </>)
}