import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {ShoppingCart, Trash2, X, Gamepad2} from "lucide-react";
import {Cart} from "@/model/shop";
import {Image} from "@heroui/image";

interface ShoppingCartProps {
    cart?: Cart;
    isOpen: boolean;
    onClose: () => void;
    onRemoveItem: (gameId: string) => void;
    onCheckout: () => void;
    isCheckingOut: boolean;
}

export function ShoppingCartComponent({
                                          cart,
                                          isOpen,
                                          onClose,
                                          onRemoveItem,
                                          onCheckout,
                                          isCheckingOut
                                      }: ShoppingCartProps) {
    if (!isOpen) return null;

    const itemCount = cart?.items?.length ?? 0;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end pointer-events-none">
            <div
                className={`pointer-events-auto w-full max-w-md h-full bg-background shadow-2xl transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <Card className="h-full rounded-none flex flex-col">
                    <CardHeader className="flex justify-between items-center border-b p-4">
                        <div className="flex items-center gap-2">
                            <ShoppingCart size={24}/>
                            <h3 className="text-xl font-bold">
                                Winkelwagen ({itemCount})
                            </h3>
                        </div>
                        <Button
                            isIconOnly
                            variant="light"
                            onPress={onClose}
                        >
                            <X size={24}/>
                        </Button>
                    </CardHeader>

                    <CardBody className="flex-1 overflow-y-auto p-4">
                        {!cart || !cart.items || cart.items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-default-500">
                                <ShoppingCart size={64} className="mb-4"/>
                                <p>Je winkelwagen is leeg</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.items.map((game) => (
                                    <Card key={game.id} className="p-3">
                                        <div className="flex gap-3">
                                            {game.imageUrl ? (
                                                <Image
                                                    src={game.imageUrl}
                                                    alt={game.title}
                                                    className="w-20 h-20 object-cover rounded"
                                                    removeWrapper
                                                />
                                            ) : (
                                                <div
                                                    className="w-20 h-20 flex items-center justify-center bg-default-100 rounded">
                                                    <Gamepad2 size={32} className="text-default-500"/>
                                                </div>
                                            )}

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-semibold line-clamp-1">
                                                        {game.title}
                                                    </h4>
                                                    <p className="text-sm text-default-500">
                                                        €{game.price.toFixed(2)}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <p className="font-bold">
                                                        €{game.price.toFixed(2)}
                                                    </p>

                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        color="danger"
                                                        variant="light"
                                                        onPress={() => onRemoveItem(game.id)}
                                                    >
                                                        <Trash2 size={16}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardBody>

                    {cart && cart.items && cart.items.length > 0 && (
                        <CardFooter className="border-t p-4 flex flex-col gap-4">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-lg font-semibold">Totaal:</span>
                                <span className="text-2xl font-bold">
                                    €{(cart.totalPrice || 0).toFixed(2)}
                                </span>
                            </div>

                            <Button
                                color="primary"
                                size="lg"
                                className="w-full"
                                onPress={onCheckout}
                                isLoading={isCheckingOut}
                            >
                                Afrekenen
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </div>

            {/* backdrop */}
            <div
                className="fixed inset-0 bg-black/50 -z-10 pointer-events-auto"
                onClick={onClose}
            />
        </div>
    );
}
