import {Input} from "@heroui/input";
import {Search, UserPlus, Users} from "lucide-react";
import {useState} from "react";
import {useFriends} from "@/hooks/useFriends.ts";
import AddFriendModal from "@/components/friend/AddFriendModal.tsx";
import {Button, ButtonGroup} from "@heroui/button";
import FriendsTab from "@/components/friend/FriendsTab.tsx";
import RequestsTab from "@/components/friend/RequestsTab.tsx";

type tab = "friends" | "requests"

export default function FriendsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<tab>("friends");
    const {isLoading, isError, profiles} = useFriends();

    const filteredProfiles = profiles?.filter(profile =>
        profile.gamerTag.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <div className={"max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6"}>
            <header className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-3"}>
                    <Users size={28} className={"text-primary"}/>
                    <h2 className={"text-3xl font-bold tsext-foreground"}>
                        Friends
                    </h2>
                </div>
                <AddFriendModal/>
            </header>
            <div className={"flex justify-start"}>
                <ButtonGroup size={"md"} className={"shadow-lg"}>
                    <Button
                        startContent={<Users size={20}/>}
                        variant={activeTab === "friends" ? "solid" : "bordered"}
                        color={activeTab === "friends" ? "primary" : "default"}
                        onPress={() => setActiveTab("friends")}
                        className={"font-semibold"}
                    >
                        All friends
                    </Button>
                    <Button
                        startContent={<UserPlus size={20}/>}
                        variant={activeTab === "requests" ? "solid" : "bordered"}
                        color={activeTab === "requests" ? "primary" : "default"}
                        onPress={() => setActiveTab("requests")}
                        className={"font-semibold"}
                    >
                        Requests
                    </Button>
                </ButtonGroup>
            </div>
            <div className="flex items-center">
                <Input
                    placeholder="Search for a user..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search size={20} className="text-white/40"/>}
                    classNames={{
                        input: "bg-transparent text-white",
                        inputWrapper: "h-11 bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20"
                    }}
                />
            </div>

            {activeTab === "friends" && (
                <FriendsTab isError={isError} isLoading={isLoading} filteredProfiles={filteredProfiles}/>
            )}

            {activeTab === "requests" && (
                <RequestsTab searchQuery={searchQuery}/>
            )}

        </div>
    );
}