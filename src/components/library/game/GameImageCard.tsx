import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Gamepad2 } from "lucide-react";
import { useState } from "react";

interface GameImageCardProps {
    title: string;
    imageUrl?: string;
}

export function GameImageCard({ title, imageUrl }: GameImageCardProps) {    const [failed, setFailed] = useState(false);

    return (
        <Card className="bg-black/30 backdrop-blur-xl border border-white/10 overflow-hidden">
            <CardBody className="p-0">
                <div className="aspect-video relative overflow-hidden">
                    {failed || !imageUrl ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
                            <Gamepad2 size={96} className="text-white/40 mb-4" />
                            <p className="text-white/40">No Image</p>
                        </div>
                    ) : (
                        <Image
                            alt={title}
                            className="object-cover w-full h-full"
                            src={imageUrl}
                            onError={() => setFailed(true)}
                            removeWrapper
                        />
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
