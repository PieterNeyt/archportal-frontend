interface GameInfoSectionProps {
    title: string;
    description: string;
}

export function GameInfoSection({
                                    title,
                                    description,
                                }: GameInfoSectionProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent pb-2">
                    {title}
                </h1>
                <p className="text-white/70 text-lg leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
