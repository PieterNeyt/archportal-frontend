import {
    Avatar,
    Button,
    Divider,
    Spinner
} from "@heroui/react";
import {
    Gamepad2,
    Star,
    Users,
    Trophy,
    Edit2,
    Clock,
    Layout,
    Calendar,
    ChevronRight
} from "lucide-react";
import { useAllProfile } from "@/hooks/useProfile.ts";
import { GLASS_CARD_STYLES } from "@/styles/customClasses.ts";

export default function ModernProfilePage() {
    const { isLoading } = useAllProfile();

    const dummyProfile = {
        gamerTag: "Nexus_Warrior",
        firstName: "Alex",
        lastName: "Rivers",
        icon: "https://i.pravatar.cc/150?u=nexus",
        games: [
            { gameId: "val-001", isFavorite: true, title: "Valorant", hours: 420 },
            { gameId: "cs2-002", isFavorite: true, title: "Counter-Strike 2", hours: 1250 },
            { gameId: "er-003", isFavorite: true, title: "Elden Ring", hours: 180 },
            { gameId: "mc-004", isFavorite: false, title: "Minecraft", hours: 3400 },
            { gameId: "w3-005", isFavorite: false, title: "The Witcher 3", hours: 95 },
            { gameId: "cp-006", isFavorite: false, title: "Cyberpunk 2077", hours: 62 },
            { gameId: "rd-007", isFavorite: false, title: "Red Dead Redemption 2", hours: 110 },
            { gameId: "ow-008", isFavorite: false, title: "Overwatch 2", hours: 890 },
        ]
    };

    const dummyFriends = [
        { id: 1, name: "GamerPro99", status: "In-game: CS2", icon: "https://i.pravatar.cc/150?u=1" },
        { id: 2, name: "ShadowStriker", status: "Online", icon: "https://i.pravatar.cc/150?u=2" },
        { id: 3, name: "CyberPunk_x", status: "Snoozing", icon: "https://i.pravatar.cc/150?u=3" },
    ];

    const dummyAchievements = [
        { id: 1, title: "First Blood", time: "2 hours ago", icon: <Trophy className="text-yellow-500" size={16} /> },
        { id: 2, title: "Master Strategist", time: "Yesterday", icon: <Trophy className="text-slate-300" size={16} /> },
        { id: 3, title: "Speedrunner", time: "3 days ago", icon: <Trophy className="text-orange-500" size={16} /> },
        { id: 4, title: "Legendary Status", time: "1 week ago", icon: <Trophy className="text-primary" size={16} /> },
    ];

    if (isLoading) return (
        <div className="h-screen flex justify-center items-center">
            <Spinner color="primary" size="lg" label="Loading Profile..." />
        </div>
    );

    const favoriteGames = dummyProfile.games.filter(g => g.isFavorite);
    const mainFavorite = favoriteGames[0];
    const secondaryFavorites = favoriteGames.slice(1);

    return (
        <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8 animate-appearance-in">

            {/* --- HEADER SECTION --- */}
            <section className={`${GLASS_CARD_STYLES} p-6 sm:p-8 relative overflow-hidden group border-white/10`}>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-between">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <Avatar
                            src={dummyProfile.icon}
                            className="w-32 h-32 md:w-40 md:h-40 border-4 border-white/10 shadow-2xl"
                            isBordered
                            color="primary"
                        />
                        <div className="text-center md:text-left flex flex-col justify-center">
                            <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                                {dummyProfile.gamerTag}
                            </h1>
                            <p className="text-white/60 font-medium mb-4 italic">
                                {dummyProfile.firstName} {dummyProfile.lastName}
                            </p>
                            <Button
                                size="sm"
                                variant="flat"
                                startContent={<Edit2 size={14} />}
                                className="bg-white/10 hover:bg-white/20 text-white rounded-full w-fit mx-auto md:mx-0"
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6 border-l border-white/10 pl-8 min-w-[200px]">
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-1">
                                <Clock size={14} />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Total Playtime</span>
                            </div>
                            <p className="text-3xl font-black text-white leading-none">6,439<span className="text-sm font-normal text-white/40 ml-1 font-mono uppercase">hrs</span></p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-primary mb-1">
                                <Calendar size={14} />
                                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Last Played</span>
                            </div>
                            <p className="text-lg font-semibold text-white/80">2 hours ago</p>
                            <p className="text-[10px] text-white/30 italic uppercase">Counter-Strike 2</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: Games */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Favorite Showcase */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Star className="text-primary" size={24} />
                            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Favorite Games</h2>
                        </div>

                        {mainFavorite && (
                            <div className={`${GLASS_CARD_STYLES} overflow-hidden group/card relative border-white/10`}>
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full border border-primary/30">
                                        MOST PLAYED
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-72 aspect-video overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500"
                                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center p-6 flex-1">
                                        <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">{mainFavorite.title}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <Divider orientation="vertical" className="h-10 bg-white/10" />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase font-bold">Hours Played</span>
                                                <span className="text-2xl font-mono font-black text-primary">{mainFavorite.hours}h</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {secondaryFavorites.map((game, i) => (
                                <div key={i} className={`${GLASS_CARD_STYLES} p-4 flex items-center justify-between group hover:border-primary/30 transition-all border-white/5`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                                            <img src={`https://picsum.photos/seed/${game.gameId}/100/100`} className="w-full h-full object-cover opacity-80" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight truncate w-32">{game.title}</p>
                                            <p className="text-[10px] text-white/40 font-mono uppercase">{game.hours} hours</p>
                                        </div>
                                    </div>
                                    <Button isIconOnly size="sm" variant="light" className="text-white/20 group-hover:text-white">
                                        <ChevronRight size={18} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* All Games List (The Modern Library) */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Layout className="text-primary/60" size={20} />
                            <h2 className="text-lg font-bold text-white/80 uppercase tracking-tighter">My Library</h2>
                            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-white/40 font-mono">
                                {dummyProfile.games.length} Games
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {dummyProfile.games.map((game, i) => (
                                <div
                                    key={i}
                                    className={`${GLASS_CARD_STYLES} group relative overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-300 cursor-pointer border-white/5`}
                                >
                                    {/* Game Image */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                                        <img
                                            src={`https://picsum.photos/seed/${game.gameId}/400/250`}
                                            alt="Cover"
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="p-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40">
                                                <Gamepad2 size={20} className="text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Game Info */}
                                    <div className="p-3 bg-white/[0.02] backdrop-blur-sm border-t border-white/5">
                                        <h4 className="text-[11px] font-black text-white truncate uppercase tracking-tight group-hover:text-primary transition-colors">
                                            {game.title}
                                        </h4>
                                        <div className="flex items-center justify-between mt-1.5">
                                            <div className="flex items-center gap-1.5 text-white/40">
                                                <Clock size={10} className="text-primary/60" />
                                                <span className="text-[9px] font-mono font-bold uppercase">
                                                    {game.hours}h played
                                                </span>
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-white/20" />
                                            <p className="text-[9px] text-white/30 font-mono uppercase">
                                                ID: {game.gameId.slice(0, 3)}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Bottom highlight bar */}
                                    <div className="absolute bottom-0 left-0 h-[2px] bg-primary/40 w-0 group-hover:w-full transition-all duration-500" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN: Social & Stats */}
                <div className="lg:col-span-4 space-y-8">

                    {/* Friends */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-3 text-white">
                                <Users size={18} className="text-primary" />
                                <h3 className="font-bold uppercase tracking-widest text-xs">Friends Online</h3>
                            </div>
                        </div>
                        <div className={`${GLASS_CARD_STYLES} p-4 space-y-3 border-white/5`}>
                            {dummyFriends.map(friend => (
                                <div key={friend.id} className="flex items-center gap-3 group cursor-pointer p-1 rounded-lg hover:bg-white/5 transition-colors">
                                    <Avatar size="sm" src={friend.icon} className="border border-white/10" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-white/90 group-hover:text-primary transition-colors">{friend.name}</p>
                                        <p className="text-[10px] text-white/40 truncate font-medium uppercase tracking-tighter">{friend.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Achievements */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-white px-1">
                            <Trophy size={18} className="text-primary" />
                            <h3 className="font-bold uppercase tracking-widest text-xs">Recent Milestones</h3>
                        </div>
                        <div className={`${GLASS_CARD_STYLES} p-4 space-y-4 border-white/5`}>
                            {dummyAchievements.map((ach) => (
                                <div key={ach.id} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                                        {ach.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-white tracking-tight">{ach.title}</p>
                                        <p className="text-[9px] text-white/40 font-mono uppercase italic mt-0.5">Unlocked {ach.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}