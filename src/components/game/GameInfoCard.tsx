import {Game} from "@/model/game.ts";
import {Edit, Image as ImageIcon, Link as LinkIcon, Tag, Users} from "lucide-react";
import {Button} from "@heroui/button";

export interface GameInfoCardProps {
    game: Game;
    onEdit: () => void;
}

export function GameInfoCard({game, onEdit}: GameInfoCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(price);
    };

    return (
        <>
            <div className="w-full md:w-1/3 flex-shrink-0">
                <div
                    className="aspect-[3/4] rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg relative flex items-center justify-center group">
                    {game.imageUrl ? (
                        <img
                            src={game.imageUrl}
                            alt={game.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="text-white/20 flex flex-col items-center gap-2">
                            <ImageIcon size={48}/>
                            <span className="text-sm">No Image Found</span>
                        </div>
                    )}
                    <div
                        className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                        <Tag size={12} className="text-primary"/>
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">
                            {game.genre}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                            {game.title}
                        </h1>
                        <p className="text-white/40 font-mono text-xs">ID: {game.id}</p>
                    </div>

                    <Button
                        color="primary"
                        variant="flat"
                        startContent={<Edit size={18}/>}
                        className="font-medium shrink-0"
                        onPress={() => onEdit()}
                    >
                        Edit Game
                    </Button>
                </div>

                <div className="my-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent"/>

                <div className="space-y-6 flex-grow">
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Description</h3>
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
                            {game.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Max Lobby Size</h3>
                            <div className="flex items-center gap-2 text-white/90">
                                <Users size={18} className="text-primary"/>
                                <span className="font-medium">
                                    {game.maxlobbysize ? `${game.maxlobbysize} Players` : "Not specified"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Game URL</h3>
                            <div className="flex items-center gap-2">
                                {game.gameUrl ? (
                                    <a
                                        href={game.gameUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-primary hover:text-primary-400 transition-colors group/link truncate"
                                    >
                                        <LinkIcon size={18}/>
                                        <span className="truncate underline decoration-primary/30 group-hover/link:decoration-primary">
                                            {game.gameUrl}
                                        </span>
                                    </a>
                                ) : (
                                    <span className="text-white/30 italic text-sm">No URL provided</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Price</h3>
                        <div className="flex items-center gap-2 text-2xl font-bold text-white">
                            {formatPrice(game.price)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}