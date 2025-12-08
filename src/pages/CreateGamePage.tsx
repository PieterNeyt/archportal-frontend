import {CreateGameForm} from "@/components/game/AddGameForm.tsx";

export function CreateGamePage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row relative z-20">
            <div className="flex flex-col justify-center items-center p-4 lg:p-16 bg-black/5 w-full">
                <CreateGameForm/>
            </div>
        </div>
    );
}