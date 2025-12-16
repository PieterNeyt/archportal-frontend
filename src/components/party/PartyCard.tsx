import {Card, CardBody, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {LogOut, Play, Settings, UserPlus, Users} from "lucide-react";
import {Divider} from "@heroui/react";

interface PartyCardProps {
    title: string;
    max: number;
    count: number;
}

export default function PartyCard({title, max, count}: PartyCardProps) {
    return (
        <Card className={"w-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"}>
            <CardHeader className={"flex justify-between items-center px-6 pt-6 pb-2"}>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Users size={20} className="text-primary"/>
                    </div>
                    <h2>
                        {title}
                    </h2>
                    <div className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10">
                        <span className="text-xs font-bold text-primary"> {count} / {max} </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        className="text-white/60 hover:text-white"
                    >
                        <Settings size={18}/>
                    </Button>
                    <Button
                        isIconOnly
                        variant="light"
                        radius="full"
                        size="sm"
                        color="danger"
                        className="hover:bg-danger/20"
                    >
                        <LogOut size={18}/>
                    </Button>
                </div>
            </CardHeader>
            <Divider className={"mx-6 bg-white/5"}/>
            <CardBody className={"flex flex-row items-center gap-3"}>
                <Button
                    variant={"bordered"}
                    className={"w-full border-white/10 text-white hover:bg-white/5 font-medium h-12"}
                    startContent={<UserPlus size={20}/>}
                >
                    Invite friends
                </Button>
                <Button
                    color={"success"}
                    variant={"shadow"}
                    className={"w-full font-bold text-lg h-12 shadow-primary/20"}
                    startContent={<Play size={20}/>}
                >
                    Start game
                </Button>
            </CardBody>
        </Card>
    )
}