import {Layout, Loader} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {ProfileGameCard} from "@/components/profile/ProfileGameCard.tsx";
import {ProfileFavoriteGames} from "@/components/profile/ProfileFavoriteGames.tsx";
import {useProfileGames} from "@/hooks/useProfile.ts";

interface ProfileGamesProps {
    profileId: string;
}

export function ProfileGames({profileId}: ProfileGamesProps) {
    const { isLoading, isError, games } = useProfileGames(profileId);

    const filteredItems = games?.filter(item => {
        if (!item || !item.game) return false;
        const title = item.game.title || "";

        return title.toLowerCase();
    }) || [];

    const favoriteGames = filteredItems.filter(item => item.favorite);
    const otherGames = filteredItems.filter(item => !item.favorite);

    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <div>Error</div>;
    }

    return (<>
        <section className="space-y-4">
            <ProfileFavoriteGames games={favoriteGames}/>
        </section>
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <Layout className="text-primary/60" size={20}/>
                <h2 className="text-lg font-bold text-white/80 uppercase tracking-tighter">My Library</h2>
                <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-white/40 font-mono">
                    {games?.length} Games
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {otherGames.map((game, i) => (
                    <div
                        key={i}
                        className={`${GLASS_CARD_STYLES} group relative overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-300 cursor-pointer border-white/5`}
                    >
                        <ProfileGameCard game={game.game} />
                        <div
                            className="absolute bottom-0 left-0 h-[2px] bg-primary/40 w-0 group-hover:w-full transition-all duration-500"/>
                    </div>
                ))}
            </div>
        </section>
    </>)
}