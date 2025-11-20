import {useState} from "react";
import {IconSettings, IconUserBolt,} from "@tabler/icons-react";

import {Sidebar, SidebarBody, SidebarLink} from "@/components/ui/sidebar.tsx";
import {ThemeSwitch} from "@/components/theme-switch.tsx";

export function SideBar() {
    const [open, setOpen] = useState(true);

    const links = [
        {
            label: "Pws werk",
            href: "/HETWERKT",
            icon: (
                <IconUserBolt
                    className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200 transition-transform duration-200 hover:-translate-y-1"/>
            ),
        },
        {
            label: "i pray on god",
            href: "LETSGOOOOO",
            icon: (
                <IconSettings
                    className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200 transition-transform duration-200 hover:-translate-y-1"/>
            ),
        },
    ];

    return (
        <div onClick={(event) => {
            event.stopPropagation();
            setOpen(!open);
        }
        } className="cursor-pointer fixed top-0 left-0 h-full z-50">
            <Sidebar open={open} animate={!open}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link}/>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4 flex justify-center">
                        <ThemeSwitch/>
                    </div>

                    <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <img
                                        alt="Avatar"
                                        className="h-7 w-7 shrink-0 rounded-full"
                                        height={50}
                                        src="https://assets.aceternity.com/manu.png"
                                        width={50}
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}
