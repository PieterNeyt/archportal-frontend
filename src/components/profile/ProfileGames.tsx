import {Loader, Ghost, ShieldCheck} from "lucide-react";
import {ProfileGameCard} from "@/components/profile/ProfileGameCard.tsx";
import {useProfileGames} from "@/hooks/useProfile.ts";
import {SectionType, Visibility} from "@/model/profileSyncDto.ts";
import {VisibilityBadge} from "./VisibilityBadge.tsx";

interface ProfileGamesProps {
    profileId: string;
    gameVisibility: Visibility;
    favoriteGameVisibility: Visibility;
    isOwner: boolean;
    isFriend: boolean;
}

export function ProfileGames({profileId, gameVisibility, favoriteGameVisibility, isOwner, isFriend}: ProfileGamesProps) {
    const {isLoading, isError, games} = useProfileGames(profileId);

    const canSeeFavorites =
        isOwner ||
        favoriteGameVisibility === Visibility.PUBLIC ||
        (favoriteGameVisibility === Visibility.FRIENDS && isFriend);

    const canSeeLibrary =
        isOwner ||
        gameVisibility === Visibility.PUBLIC ||
        (gameVisibility === Visibility.FRIENDS && isFriend);

    const filteredItems = games?.filter(item => {
        if (!item || !item.game) return false;
        return !!item.game.title;
    }) || [];

    const favoriteGames = filteredItems.filter(item => item.favorite);
    const otherGames = filteredItems.filter(item => !item.favorite);

    if (isLoading) return <div className="flex justify-center py-10"><Loader className="animate-spin text-white/20" /></div>;
    if (isError) return <div className="text-red-500 text-center py-10">Error loading games</div>;

    if (!canSeeFavorites && !canSeeLibrary) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                <ShieldCheck className="w-12 h-12 text-white/10 mb-4" />
                <p className="text-white/40 font-medium text-lg uppercase tracking-widest text-center px-4">
                    This user's game library is private
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {canSeeFavorites && favoriteGames.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Featured Favorites</h2>
                        {isOwner && (
                            <VisibilityBadge
                                section={{type: SectionType.FAVORITES, visibility: favoriteGameVisibility}}
                                size="md"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favoriteGames.map((game, i) => (
                            <ProfileGameCard key={game.game.id || i} game={game.game}/>
                        ))}
                    </div>
                </section>
            )}

            {canSeeLibrary && otherGames.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-lg font-bold text-white/60 uppercase tracking-tighter">Full Library</h2>
                        {isOwner && (
                            <VisibilityBadge
                                section={{type: SectionType.GAMES, visibility: gameVisibility}}
                                size="sm"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {otherGames.map((game, i) => (
                            <ProfileGameCard key={game.game.id || i} game={game.game}/>
                        ))}
                    </div>
                </section>
            )}

            {(canSeeFavorites || canSeeLibrary) && filteredItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                    <Ghost className="w-12 h-12 text-white/10 mb-4" />
                    <p className="text-white/40 font-medium text-lg">No games found</p>
                </div>
            )}
        </div>
    );
}