import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Gamepad2, Play, Heart } from "lucide-react";
import { LibraryGame } from "@/model/library";
import { useStartSinglePlayerGame } from "@/hooks/useLobbies.ts";
import { SinglePlayerLaunchResponse } from "@/model/singlePlayerLaunchResponse.ts";

interface LibraryGameCardProps {
    libraryItem: LibraryGame;
    viewMode: 'grid' | 'list';
}

export function LibraryGameCard({ libraryItem, viewMode }: LibraryGameCardProps) {
    const { game, favorite } = libraryItem;
    const navigate = useNavigate();
    const [imageFailed, setImageFailed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { isPending, isError, startSinglePlayer } = useStartSinglePlayerGame();

    const handleCardClick = () => {
        navigate(`/library/${game.id}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("I love this game");
    };

    const handlePlayClick = async () => {
        const response: SinglePlayerLaunchResponse = await startSinglePlayer(game.id);
        if (!isError && response?.launchUrl) {
            window.open(response.launchUrl, "_blank", "noopener,noreferrer");
            return;
        }
        return alert("There was an error launching the game.");
    };

    const FavoriteHeart = () => {

        return (
            <div
                onClick={handleFavoriteClick}
                className="p-2 cursor-pointer transition-transform duration-200 hover:scale-125 active:scale-95 z-50"
            >
                <Heart
                    size={34}
                    className={`transition-all duration-300 stroke-[2.5px] ${
                        favorite
                            ? "text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                            : "text-gray-400 fill-gray-400" 
                    }`}
                />
            </div>
        );
    };

    if (viewMode === 'list') {
        return (
            <Card
                isPressable
                onPress={handleCardClick}
                className="bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 transition-all duration-300 h-32 overflow-hidden"
            >
                <CardBody className="p-0 flex flex-row">
                    <div className="w-48 h-full relative shrink-0">
                        <div className="absolute top-1 right-1 z-30">
                            <FavoriteHeart />
                        </div>
                        {(imageFailed || !game.imageUrl) ? (
                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                <Gamepad2 size={32} className="text-white/40" />
                            </div>
                        ) : (
                            <Image
                                alt={game.title}
                                className="object-cover w-full h-full"
                                src={game.imageUrl}
                                onError={() => setImageFailed(true)}
                                removeWrapper
                            />
                        )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white">{game.title}</h3>
                            <p className="text-sm text-white/70 line-clamp-1">{game.description}</p>
                        </div>
                        <Button
                            color="primary"
                            size="sm"
                            className="w-fit font-bold"
                            startContent={<Play size={16} />}
                            isLoading={isPending}
                            onPress={handlePlayClick}
                        >
                            Play
                        </Button>
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card
            isPressable
            onPress={handleCardClick}
            className="bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 transition-all duration-300 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardBody className="p-0 overflow-hidden relative">
                <div className="absolute top-2 right-2 z-30">
                    <FavoriteHeart />
                </div>

                <div className="h-48 relative overflow-hidden">
                    {(imageFailed || !game.imageUrl) ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
                            <Gamepad2 size={48} className="text-white/40" />
                        </div>
                    ) : (
                        <Image
                            alt={game.title}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            src={game.imageUrl}
                            onError={() => setImageFailed(true)}
                            removeWrapper
                        />
                    )}

                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="bg-primary p-3 rounded-full shadow-lg shadow-primary/40">
                            <Play size={32} className="text-white fill-white" />
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex-col items-start p-4 gap-3">
                <div className="w-full">
                    <h4 className="font-bold text-lg truncate text-white">{game.title}</h4>
                    <p className="text-xs text-white/50 line-clamp-2 min-h-[32px]">{game.description}</p>
                </div>
                <Button
                    color="primary"
                    startContent={<Play size={18} />}
                    className="w-full font-bold shadow-lg shadow-primary/20"
                    isLoading={isPending}
                    onPress={handlePlayClick}
                >
                    Play
                </Button>
            </CardFooter>
        </Card>
    );
}