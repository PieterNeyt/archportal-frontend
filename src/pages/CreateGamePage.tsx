import {CreateGameForm} from "@/components/game/addGameStudioForm.tsx";

export function CreateGamePage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row relative z-20">
            <div className="flex-col justify-center items-center p-8 lg:p-16 bg-black/5">
                <CreateGameForm/>
            </div>
        </div>
    );
}