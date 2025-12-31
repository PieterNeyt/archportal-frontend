import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Heart} from "lucide-react";
import {LibraryGame} from "@/model/library";
import {useStartSinglePlayerGame} from "@/hooks/useLobbies.ts";
import {useAddToFavorites, useRemoveFromFavorites} from "@/hooks/useLibrary.ts";
import {LibraryGridView} from "./LibraryGridView";
import {LibraryListView} from "./LibraryListView";
import useToastEffect from "@/hooks/useToastEffect.ts";
import ImageMemo from "@/components/ImageMemo.tsx";

interface LibraryGameCardProps {
    libraryItem: LibraryGame;
    viewMode: 'grid' | 'list';
}

export function LibraryGameCard({libraryItem, viewMode}: LibraryGameCardProps) {
    const {game, favorite} = libraryItem;
    const navigate = useNavigate();
    const {isPending, startSinglePlayer} = useStartSinglePlayerGame();
    const {
        addToFavorites,
        isPending: isAdding,
        isError: isErrorAddFavorite,
        error: errorAddFavorites,
        isSuccess: isSuccessAddToFavorites
    } = useAddToFavorites();
    const {
        removeFromFavorites,
        isPending: isRemoving,
        isError: isErrorRemoveFromFavorites,
        error: errorRemoveFromFavorites,
        isSuccess: isSuccessRemoveFromFavorites
    } = useRemoveFromFavorites();

    const [imageFailed, setImageFailed] = useState(false);
    const onImageError = () => {
        setImageFailed(true);
    };
    const imageElement = useMemo(() => {
        const image = game.imageUrl;
        const title = game.title;
        return ImageMemo({image, title, imageFailed, onImageError});
    }, [game, imageFailed]);


    const handleCardClick = () => navigate(`/library/${game.id}`);

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            await removeFromFavorites(game.id);
        } else {
            await addToFavorites(game.id);
        }
    };

    useToastEffect(
        {
            isSuccess: isSuccessAddToFavorites,
            isError: isErrorAddFavorite,
            error: errorAddFavorites
        },
        "Added to Favorites",
        "Failed to add favorite"
    );

    useToastEffect(
        {
            isSuccess: isSuccessRemoveFromFavorites,
            isError: isErrorRemoveFromFavorites,
            error: errorRemoveFromFavorites
        },
        "Removed from Favorites",
        "Failed to remove favorite"
    );

    const handlePlayClick = async () => {
        const response = await startSinglePlayer(game.id);
        if (response?.launchUrl) {
            window.open(response.launchUrl, "_blank", "noopener,noreferrer");
        } else {
            alert("Error launching game.");
        }
    };

    const FavoriteHeart = (
        <div
            onClick={handleFavoriteClick}
            className={`p-2 cursor-pointer transition-transform hover:scale-125 active:scale-95 z-50 ${(isAdding || isRemoving) ? 'opacity-50 pointer-events-none' : ''}`}
        >
            <Heart size={34}
                   className={`transition-all duration-300 stroke-[2.5px] ${favorite ? "text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "text-gray-400 fill-gray-400"}`}/>
        </div>
    );

    const commonProps = {
        libraryItem,
        onPress: handleCardClick,
        onPlay: handlePlayClick,
        imageElement,
        isPending,
        renderFavorite: FavoriteHeart
    };

    return viewMode === 'grid'
        ? <LibraryGridView {...commonProps} />
        : <LibraryListView {...commonProps} />;
}