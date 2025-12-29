import {Star} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {ProfileGameCard} from "@/components/profile/ProfileGameCard.tsx";
import {LibraryGame} from "@/model/library.ts";

export interface ProfileFavoriteGamesProps {
    games: LibraryGame[];
}

export function ProfileFavoriteGames({games}: ProfileFavoriteGamesProps) {

    return <>
        <div className="flex items-center gap-3">
            <Star className="text-primary" size={24}/>
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Favorite Games</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {games.map((game, i) => (
                <div key={i}
                     className={`${GLASS_CARD_STYLES} p-4 flex items-center justify-between group hover:border-primary/30 transition-all border-white/5`}>
                    <ProfileGameCard game={game.game}/>
                </div>
            ))}
        </div>
    </>
}