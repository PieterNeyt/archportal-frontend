import {Gamepad2} from "lucide-react";
import CreatePartyModal from "@/components/party/CreatePartyModal.tsx";

export default function CreatePartyCard() {
    return (
        <div
            className="flex flex-col items-center justify-center space-y-6 w-full p-8 rounded-2xl
                           border border-white/10 shadow-2xl bg-black/40"
        >
            <Gamepad2 size={64} className={"text-primary"}/>
            <h2 className={"text-3xl font-bold mb-2"}>
                No active party
            </h2>
            <p className={"text-medium text-muted-foreground text-center mb-6"}>
                Create a party to play with your friends
            </p>
            <CreatePartyModal/>
        </div>
    );
}