import { useState } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Gamepad2, Play } from "lucide-react";
import { LibraryGame } from "@/model/library";
import {useStartSinglePlayerGame} from "@/hooks/useLobbies.ts";
import {SinglePlayerLaunchResponse} from "@/model/SinglePlayerLaunchResponse.ts";

interface LibraryGameCardProps {
    game: LibraryGame;
    viewMode: 'grid' | 'list';
}

export function LibraryGameCard({ game, viewMode }: LibraryGameCardProps) {
    const [imageFailed, setImageFailed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const {isPending, isError, startSinglePlayer} = useStartSinglePlayerGame();

    if (viewMode === 'list') {
        return (
            <Card
                className="bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 h-32 group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CardBody className="p-0 flex flex-row overflow-hidden">
                    <div className="w-48 h-full relative overflow-hidden">
                        {(imageFailed || !game.imageUrl) ? (
                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                <Gamepad2 size={48} className="text-white/40" />
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
                        {isHovered && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300">
                                <Play className="text-white" size={48} />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-white">{game.title}</h3>
                            <p className="text-sm text-white/70 line-clamp-2">{game.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                color="primary"
                                startContent={<Play size={18} />}
                                className="font-semibold"
                                as="a"
                                href={game.gameUrl}
                                target="_blank"
                            >
                                Play
                            </Button>
                            <Button
                                variant="bordered"
                                className="border-white/20 text-white/80"
                            >
                                Details
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
    const handleStartGame = async () => {
        const response: SinglePlayerLaunchResponse = await startSinglePlayer(game.id)
        if (!isError) {
            window.open(response.launchUrl, "_blank", "noopener,noreferrer");
            return;
        }
        return alert("Er is een fout opgetreden bij het starten van het spel.");

    }

    return (
        <Card
            className="bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardBody className="p-0 overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                    {(imageFailed || !game.imageUrl) ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
                            <Gamepad2 size={48} className="text-white/40 mb-2" />
                            <p className="text-sm text-white/40">No Image</p>
                        </div>
                    ) : (
                        <Image
                            alt={game.title}
                            className="object-cover w-full h-full"
                            src={game.imageUrl}
                            onError={() => setImageFailed(true)}
                            isBlurred
                            removeWrapper
                        />
                    )}
                    {isHovered && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300">
                            <Play className="text-white" size={64} />
                        </div>
                    )}
                </div>
            </CardBody>
            <CardFooter className="flex-col items-start p-4 gap-3">
                <div className="w-full">
                    <h4 className="font-bold text-lg truncate w-full mb-1 text-white">{game.title}</h4>
                    <p className="text-sm text-white/70 line-clamp-2">{game.description}</p>
                </div>
                <Button
                    color="primary"
                    startContent={<Play size={18}/>}
                    className="w-full"
                    isLoading={isPending}
                    onPress={handleStartGame}
                    target="_blank"
                >
                    Play
                </Button>
            </CardFooter>
        </Card>
    );
}