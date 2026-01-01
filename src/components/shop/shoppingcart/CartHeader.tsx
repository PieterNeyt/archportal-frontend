import { CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { ShoppingCart, X } from "lucide-react";

interface CartHeaderProps {
    cartCount: number;
    onClose: () => void;
}

export function CartHeader({ cartCount, onClose }: CartHeaderProps) {
    return (
        <CardHeader className="flex justify-between items-center border-b border-white/10 p-5 bg-white/5">
            <div className="flex items-center gap-3 text-white">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <ShoppingCart size={22} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Shoppingcart ({cartCount})</h3>
            </div>
            <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                className="text-white/50 hover:text-white hover:bg-white/10"
            >
                <X size={22} />
            </Button>
        </CardHeader>
    );
}
