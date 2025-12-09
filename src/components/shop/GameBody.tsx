import {Game} from "@/model/game.ts";
import {Chip} from "@heroui/chip";
import {Gamepad2} from "lucide-react";
import {Divider} from "@heroui/divider";

interface GameBodyProps {
    game: Game;
}

export function GameBody({game}: GameBodyProps) {
    return (<>
            <div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Chip
                        startContent={<Gamepad2 size={14}/>}
                        variant="flat"
                        color="secondary"
                        className="uppercase font-bold text-xs tracking-wider"
                    >
                        {game.genre}
                    </Chip>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
                    {game.title}
                </h1>

                <p className="text-3xl font-bold text-primary">
                    €{game.price.toFixed(2)}
                </p>
            </div>
            <Divider className="my-4 bg-white/10"/>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white/90">About this game</h3>
                <p className="text-default-400 leading-relaxed text-lg">
                    {game.description || "No description provided for this title."}
                </p>
            </div>
        </>
)
}