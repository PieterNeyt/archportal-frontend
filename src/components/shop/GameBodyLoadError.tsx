import {Button} from "@heroui/button";
import {useNavigate} from "react-router-dom";


export function GameBodyLoadError() {
    const navigate = useNavigate();

    return (   <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-4">
        <div className="text-center">
            <h2 className="text-2xl font-bold text-danger">Failed to load game</h2>
            <p className="text-default-500">Something went wrong while fetching the game data.</p>
        </div>
        <Button color="primary" variant="flat" onPress={() => navigate('/shop')}>
            Return to Shop
        </Button>
    </div>)
}