import {Loader} from "lucide-react"; // Star toegevoegd voor de icon
import {ProfileGameCard} from "@/components/profile/ProfileGameCard.tsx";
import {useProfileGames} from "@/hooks/useProfile.ts";
import {SectionType, Visibility} from "@/model/profileSyncDto.ts"; // SectionType toegevoegd
import {VisibilityBadge} from "./VisibilityBadge.tsx"; // Zorg dat het pad klopt

interface ProfileGamesProps {
    profileId: string;
    gameVisibility: Visibility;
    favoriteGameVisibility: Visibility;
    isOwner: boolean;
}

export function ProfileGames({profileId, gameVisibility, favoriteGameVisibility, isOwner}: ProfileGamesProps) {
    const {isLoading, isError, games} = useProfileGames(profileId);

    const filteredItems = games?.filter(item => {
        if (!item || !item.game) return false;
        return (item.game.title || "").toLowerCase();
    }) || [];

    const favoriteGames = filteredItems.filter(item => item.favorite);
    const otherGames = filteredItems.filter(item => !item.favorite);

    if (isLoading) return <Loader/>;
    if (isError) return <div>Error</div>;

    return (
        <div className="space-y-16">
            {/* FAVORITES - 3x groter effect door grid-cols-1 */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Featured Favorites</h2>
                    {isOwner && (
                        <VisibilityBadge section={{type: SectionType.FAVORIETES, visibility: favoriteGameVisibility}}
                                         size="md"/>
                    )
                    }
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteGames.map((game, i) => (
                        <ProfileGameCard key={i} game={game.game}/>
                    ))}
                </div>
            </section>

            {/* LIBRARY - Compacte weergave */}
            <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h2 className="text-lg font-bold text-white/60 uppercase tracking-tighter">Full Library</h2>
                    {isOwner && ( <VisibilityBadge section={{type: SectionType.GAMES, visibility: gameVisibility}}
                                                   size="sm"/>)}
                </div>

                {/* Veel meer kolommen = veel kleinere kaarten */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {otherGames.map((game, i) => (
                        <ProfileGameCard key={i} game={game.game}/>
                    ))}
                </div>
            </section>
        </div>
    );
}