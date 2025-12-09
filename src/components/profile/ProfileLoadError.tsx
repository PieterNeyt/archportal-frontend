import {Card} from "@heroui/react";
import {BLURRY_BACKGROUND} from "@/styles/customClasses.ts";


export function ProfileLoadError() {
    return (
        <div className="min-h-screen flex items-center justify-center text-danger">
            <Card className={`${BLURRY_BACKGROUND} border-danger/30`}>
                <h2 className="text-xl font-bold text-danger">Something went wrong</h2>
                <p className="text-white/70">Unable to load profile data.</p>
            </Card>
        </div>
    );
}