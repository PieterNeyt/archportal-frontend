import {Card, CardBody} from "@heroui/card";
import {LibraryGame} from "@/model/library";
import React from "react";

interface Props {
    libraryItem: LibraryGame;
    onPress: () => void;
    imageElement: React.JSX.Element;
    renderFavorite: React.ReactNode;
}

export function LibraryListView({libraryItem, onPress, imageElement, renderFavorite}: Props) {
    const {game} = libraryItem;

    return (
        <Card
            isPressable
            onPress={onPress}
            className="bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:bg-black/50 transition-all duration-300 h-32 overflow-hidden"
        >
            <CardBody className="p-0 flex flex-row">
                <div className="w-48 h-full relative shrink-0">
                    <div className="absolute top-1 right-1 z-30">{renderFavorite}</div>
                    {imageElement}
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between overflow-hidden">
                    <div>
                        <h3 className="text-xl font-bold text-white truncate">{game.title}</h3>
                        <p className="text-sm text-white/70 line-clamp-1">{game.description}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}