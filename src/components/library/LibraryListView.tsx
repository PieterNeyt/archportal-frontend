import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Gamepad2, Play } from "lucide-react";
import { LibraryGame } from "@/model/library";

interface Props {
    libraryItem: LibraryGame;
    onPress: () => void;
    onPlay: () => void;
    isPending: boolean;
    imageFailed: boolean;
    setImageFailed: (val: boolean) => void;
    renderFavorite: React.ReactNode;
}

export function LibraryListView({ libraryItem, onPress, onPlay, isPending, imageFailed, setImageFailed, renderFavorite }: Props) {
    const { game } = libraryItem;

    return (
        <Card
            isPressable
            onPress={onPress}
            className="bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 transition-all duration-300 h-32 overflow-hidden"
        >
            <CardBody className="p-0 flex flex-row">
                <div className="w-48 h-full relative shrink-0">
                    <div className="absolute top-1 right-1 z-30">{renderFavorite}</div>
                    {imageFailed || !game.imageUrl ? (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                            <Gamepad2 size={32} className="text-white/40" />
                        </div>
                    ) : (
                        <Image alt={game.title} className="object-cover w-full h-full" src={game.imageUrl} onError={() => setImageFailed(true)} removeWrapper />
                    )}
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
                    <div>
                        <h3 className="text-xl font-bold text-white truncate">{game.title}</h3>
                        <p className="text-sm text-white/70 line-clamp-1">{game.description}</p>
                    </div>
                    <Button color="primary" size="sm" className="w-fit font-bold" startContent={<Play size={16} />} isLoading={isPending} onPress={onPlay}>
                        Play
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}