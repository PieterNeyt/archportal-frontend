import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Trash2 } from "lucide-react";
import { Image } from "@heroui/image";
import { Game } from "@/model/game";

interface CartItemProps {
    game: Game;
    onRemove: (id: string) => void;
}

export function CartItem({ game, onRemove }: CartItemProps) {
    return (
        <Card className="p-3 bg-white/5 border border-white/5 group hover:bg-white/10 transition-all shadow-none">
            <div className="flex gap-4">
                <Image
                    src={game.imageUrl}
                    className="w-16 h-16 object-cover rounded-lg shadow-lg border border-white/10"
                    removeWrapper
                />
                <div className="flex-1 flex flex-col justify-between py-0.5">
                    <h4 className="font-bold text-sm text-white/90 line-clamp-1">{game.title}</h4>
                    <div className="flex justify-between items-end">
                        <p className="font-bold text-primary text-base">€{game.price.toFixed(2)}</p>
                        <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="flat"
                            onPress={() => onRemove(game.id)}
                            className="bg-danger/10 hover:bg-danger/20"
                        >
                            <Trash2 size={14} />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
