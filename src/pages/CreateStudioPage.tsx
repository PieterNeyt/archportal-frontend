import {CreateGameStudioForm} from "@/components/gamestudio/addGameStudioForm.tsx";
import {Image} from "@heroui/image";

export function CreateGameStudioPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* LEFT SIDE */}
            <div className="md:w-1/2 flex flex-col justify-center items-start p-10 gap-6 bg-card/50 backdrop-blur-sm">
                <h1 className="text-4xl font-bold text-foreground">Create Your Own Studio</h1>
                <p className="text-lg text-muted-foreground">
                    Launch your dream game studio today. Fill out the form and start building amazing games with us!
                </p>
                <div className="w-full mt-4">
                    <Image
                        isBlurred
                        alt="Arch Linux Logo"
                        className="m-5"
                        src="/assets/ArchPortalLogo.png"
                        width={500}
                    />
                </div>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden md:block w-px bg-border"/>

            {/* RIGHT SIDE (FORM) */}
            <div className="md:w-1/2 flex justify-center items-center p-10 bg-card/50 backdrop-blur-sm">
                <CreateGameStudioForm/>
            </div>
        </div>
    );
}