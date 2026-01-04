import React, {useState} from "react";
import {Card, CardBody, CardFooter} from "@heroui/card";
import {Play} from "lucide-react";
import {LibraryGame} from "@/model/library";

interface Props {
    libraryItem: LibraryGame;
    onPress: () => void;
    imageElement: React.JSX.Element;
    renderFavorite: React.ReactNode;
}

export function LibraryGridView({libraryItem, onPress, imageElement, renderFavorite}: Props) {
    const {game} = libraryItem;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            isPressable
            onPress={onPress}
            className="bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 transition-all duration-300 group h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardBody className="p-0 overflow-hidden relative">
                <div className="absolute top-2 right-2 z-30">{renderFavorite}</div>
                <div className="h-48 relative overflow-hidden">
                    {imageElement}
                    <div
                        className={`absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="bg-primary p-3 rounded-full shadow-lg shadow-primary/40">
                            <Play size={32} className="text-white fill-white"/>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="flex-col items-start p-4 gap-3">
                <div className="w-full">
                    <h4 className="font-bold text-lg truncate text-white">{game.title}</h4>
                    <p className="text-xs text-white/50 line-clamp-2 min-h-[32px]">{game.description}</p>
                </div>
            </CardFooter>
        </Card>
    );
}