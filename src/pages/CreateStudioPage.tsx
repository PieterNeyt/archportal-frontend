import {CreateGameStudioForm} from "@/components/gamestudio/addGameStudioForm.tsx";
import {Image} from "@heroui/image";

export function CreateGameStudioPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* LEFT SIDE */}
            <div className="md:w-1/2 flex flex-col justify-center items-start p-10 gap-6 bg-gray-50 dark:bg-gray-900">
                <h1 className="text-4xl font-bold">Create Your Own Studio</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300">
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
            <div className="hidden md:block w-px bg-gray-300 dark:bg-gray-700"/>

            {/* RIGHT SIDE (FORM) */}
            <div className="md:w-1/2 flex justify-center items-center p-10 bg-white dark:bg-gray-800">
                <CreateGameStudioForm/>
            </div>
        </div>
    );
}
