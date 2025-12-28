import {CreateGameStudioForm} from "@/components/gamestudio/AddGameStudioForm.tsx";
import {Image} from "@heroui/image";

export function CreateGameStudioPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row relative z-20">
            {/* LEFT SIDE */}
            <div
                className="md:w-1/2 flex flex-col justify-center items-start p-12 lg:p-16 gap-8 bg-black/10">
                <div className="space-y-6 max-w-xl">
                    <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent leading-tight">
                        Create Your Own Studio
                    </h1>
                    <p className="text-lg lg:text-xl text-white/70 leading-relaxed">
                        Launch your dream game studio today. Fill out the form and start building amazing games with us!
                    </p>
                </div>
                <Image
                    isBlurred
                    alt="Arch Portal Logo"
                    className="drop-shadow-2xl"
                    src="/assets/ArchPortalLogo.png"
                    width={300}
                />
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"/>

            {/* RIGHT SIDE  */}
            <div className="md:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-black/5">
                <CreateGameStudioForm/>
            </div>
        </div>
    );
}