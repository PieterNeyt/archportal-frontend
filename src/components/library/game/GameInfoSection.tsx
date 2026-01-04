import { Button } from "@heroui/button";
import { Play } from "lucide-react";

interface GameInfoSectionProps {
    title: string;
    description: string;
    isPending: boolean;
    onStart: () => void;
}

export function GameInfoSection({title, description, isPending, onStart}: GameInfoSectionProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent pb-2">
                    {title}
                </h1>
                <p className="text-white/70 text-lg leading-relaxed">{description}</p>
            </div>

            <Button
                color="primary"
                size="lg"
                startContent={<Play size={20} />}
                className="font-semibold"
                isLoading={isPending}
                onPress={onStart}
            >
                Play Now
            </Button>
        </div>
    );
}
