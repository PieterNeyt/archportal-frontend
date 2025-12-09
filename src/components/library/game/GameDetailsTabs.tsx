import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Gamepad2, Trophy, Zap } from "lucide-react";
import React from "react";

export function GameDetailsTabs() {
    return (
        <Card className="bg-black/30 backdrop-blur-xl border border-white/10">
            <CardBody className="p-6">
                <Tabs
                    aria-label="Game details tabs"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/10",
                        cursor: "w-full bg-purple-500",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-white text-white/60"
                    }}
                >
                    <Tab
                        key="achievements"
                        title={<Title icon={<Trophy size={18} />} label="Achievements" />}
                    >
                        <EmptyTab
                            icon={<Trophy size={48} className="text-white/40 mx-auto mb-4" />}
                            title="Achievements coming soon"
                            subtitle="Track your in-game accomplishments and milestones"
                        />
                    </Tab>

                    <Tab
                        key="lobbies"
                        title={<Title icon={<Gamepad2 size={18} />} label="Lobbies" />}
                    >
                        <EmptyTab
                            icon={<Gamepad2 size={48} className="text-white/40 mx-auto mb-4" />}
                            title="Lobby comming soon"
                            subtitle="Play multiplayer games with friends and other players"
                        />
                    </Tab>

                    <Tab
                        key="posts"
                        title={<Title icon={<Zap size={18} />} label="Developer Posts" />}
                    >
                        <EmptyTab
                            icon={<Zap size={48} className="text-white/40 mx-auto mb-4" />}
                            title="Developer Posts coming soon"
                            subtitle="Stay updated with the latest news and updates from the game developers"
                        />
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    );
}

function Title({ icon, label }: { icon: React.ReactNode; label: string }) {
    return <div className="flex items-center gap-2">{icon}<span>{label}</span></div>;
}

function EmptyTab({
                      icon,
                      title,
                      subtitle,
                  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="text-center py-12">
            {icon}
            <p className="text-white/60 text-lg mb-2">{title}</p>
            <p className="text-white/40 text-sm">{subtitle}</p>
        </div>
    );
}
