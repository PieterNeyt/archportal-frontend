import {Loader, Ghost} from "lucide-react";
import {ProfileGameCard} from "@/components/profile/ProfileGameCard.tsx";
import {useProfileGames} from "@/hooks/useProfile.ts";
import {SectionType, Visibility} from "@/model/profileSyncDto.ts";
import {VisibilityBadge} from "./VisibilityBadge.tsx";

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
        return !!item.game.title;
    }) || [];

    const favoriteGames = filteredItems.filter(item => item.favorite);
    const otherGames = filteredItems.filter(item => !item.favorite);

    if (isLoading) return <div className="flex justify-center py-10"><Loader className="animate-spin text-white/20" /></div>;
    if (isError) return <div className="text-red-500">Error loading games</div>;

    if (filteredItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                <Ghost className="w-12 h-12 text-white/10 mb-4" />
                <p className="text-white/40 font-medium text-lg">No games available</p>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {favoriteGames.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Featured Favorites</h2>
                        {isOwner && (
                            <VisibilityBadge section={{type: SectionType.FAVORITES, visibility: favoriteGameVisibility}}
                                             size="md"/>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favoriteGames.map((game, i) => (
                            <ProfileGameCard key={i} game={game.game}/>
                        ))}
                    </div>
                </section>
            )}

            {otherGames.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-lg font-bold text-white/60 uppercase tracking-tighter">Full Library</h2>
                        {isOwner && (
                            <VisibilityBadge section={{type: SectionType.GAMES, visibility: gameVisibility}}
                                             size="sm"/>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {otherGames.map((game, i) => (
                            <ProfileGameCard key={i} game={game.game}/>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}