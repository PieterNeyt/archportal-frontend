import {Gamepad2} from "lucide-react";
import {Image} from "@heroui/image";

interface ImageMemoProps {
    image: string | null;
    title: string;
    imageFailed: boolean;
    onImageError: () => void;
}

export default function ImageMemo({image, title, imageFailed, onImageError}: ImageMemoProps) {
    if (!image || imageFailed) {
        return (
            <div
                className="flex flex-col items-center justify-center h-[300px] bg-white/5 backdrop-blur-sm border-b border-white/10">
                <Gamepad2 size={64} className="text-white/40 mb-2"/>
                <p className="text-sm text-white/40">Image missing</p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-hidden border-b border-white/10">
            <Image
                alt={title}
                src={image}
                className="object-cover w-full h-full"
                onError={onImageError}
                isBlurred
                removeWrapper
            />
        </div>
    );
}