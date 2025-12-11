import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Gamepad2 } from "lucide-react";
import { useState } from "react";

interface GameImageCardProps {
    title: string;
    imageUrl?: string;
}

export function GameImageCard({ title, imageUrl }: GameImageCardProps) {
    const [failed, setFailed] = useState(false);

    return (
        <Card className="bg-black/30 backdrop-blur-xl border border-white/10 overflow-hidden w-full h-full">
            <CardBody className="p-0 overflow-hidden h-full">
                <div className="relative w-full h-full min-h-[250px] lg:min-h-0 overflow-hidden">
                    {failed || !imageUrl ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-white/5 absolute inset-0">
                            <Gamepad2 size={96} className="text-white/40 mb-4" />
                            <p className="text-white/40">No Image</p>
                        </div>
                    ) : (
                        <Image
                            alt={title}
                            radius="none"
                            width="100%"
                            removeWrapper
                            className="z-0 w-full h-full object-cover absolute inset-0"
                            src={imageUrl}
                            onError={() => setFailed(true)}
                        />
                    )}
                </div>
            </CardBody>
        </Card>
    );
}