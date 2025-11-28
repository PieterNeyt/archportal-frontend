import {useParams} from "react-router-dom";

export function GameStudioPage() {
    const studio = useParams();
    return <div>{studio.id}</div>
}