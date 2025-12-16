import {Gamepad2, Users} from "lucide-react";
import {Button} from "@heroui/button";

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
            <Button
                color={"primary"}
                type={"button"}
                size={"lg"}
                className={"w-full"}
                startContent={<Users className={"size-5"}/>}
                onPress={() => console.log("create party")}
            >
                Create a party
            </Button>
        </div>
    );
}