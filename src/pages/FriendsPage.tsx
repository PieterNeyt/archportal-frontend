import {Input} from "@heroui/input";
import {Search, UserPlus} from "lucide-react";
import {useState} from "react";
import {Button} from "@heroui/button";
import {useFriends} from "@/hooks/useFriends.ts";
import {Profile} from "@/model/profile.ts";
import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import FriendCard from "@/components/friend/FriendCard.tsx";

const testProfiles: Profile[] = [
    {firstName: "Bart", lastName: "Peeters", icon: "", gamerTag: "sub bitch"},
    {firstName: "Bart", lastName: "Peeters", icon: "https://badurl.com/nonexistent.png", gamerTag: "sub bitch"},
    {firstName: "Bart", lastName: "Peeters", icon: "icon bitch", gamerTag: "sub bitch"},
    {firstName: "Bart", lastName: "Peeters", icon: "icon bitch", gamerTag: "sub bitch"},
    {firstName: "Bart", lastName: "Peeters", icon: "icon bitch", gamerTag: "sub bitch"},
    {firstName: "Bart", lastName: "Peeters", icon: "icon bitch", gamerTag: "sub bitch"},
    {firstName: "Bart", lastName: "Peeters", icon: "icon bitch", gamerTag: "sub bitch"},
    {firstName: "Bart", lastName: "Peeters", icon: "icon bitch", gamerTag: "sub bitch"},
]

export default function FriendsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const {isLoading, isError, profiles} = useFriends();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <div className={"max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"}>
            <div className="flex items-center gap-4 mb-8">
                <Input
                    placeholder="Search for a friend..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startContent={<Search size={20} className="text-white/40"/>}
                    classNames={{
                        input: "bg-transparent text-white",
                        inputWrapper: "h-11 bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20"
                    }}
                />

                <Button
                    color={"primary"}
                    onPress={() => console.log("add friend")}
                    className={"h-10 flex-shrink-0 font-semibold"}
                    startContent={<UserPlus size={20}/>}
                >
                    Add a friend
                </Button>
            </div>
            <h2 className={"text-xl font-bold text-foreground mb-4"}>
                Your friends
            </h2>
            <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                {isLoading ? (
                    Array(10).fill(0).map((_, i) => (
                        <FriendSkeletonCard key={i}/>
                    ))
                ) : (testProfiles.map((profile, i) => (
                    <FriendCard key={i} {...profile}/>
                )))}
            </div>
        </div>
    );
}