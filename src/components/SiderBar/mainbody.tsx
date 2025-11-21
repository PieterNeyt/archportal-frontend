import {menuSections} from "@/config/menuItemsList.ts";

interface MainBodyProps {
    isOpen: boolean;
}

export function SidebarMainBody({isOpen}: MainBodyProps) {
    return (
        <nav className="flex-1 p-4 overflow-y-auto">
            {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={sectionIndex > 0 ? 'mt-6' : ''}>
                    {isOpen && (
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                            {section.title}
                        </h3>
                    )}
                    {!isOpen && sectionIndex > 0 && (
                        <div className="h-px bg-border my-3 mx-2"></div>
                    )}
                    <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => {
                            const Icon = item.icon;
                            return (
                                <li key={itemIndex}>
                                    <a
                                        href={item.href}
                                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                                        className="flex items-center gap-3 p-3 rounded-lg transition-all group relative overflow-hidden hover:scale-105 active:scale-95"
                                    >
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <Icon size={20}
                                              className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors relative z-10"/>
                                        {isOpen && (
                                            <span
                                                className="font-medium text-foreground group-hover:text-primary transition-colors relative z-10">
                                                {item.label}
                                            </span>
                                        )}
                                        {!isOpen && (
                                            <div
                                                className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-border z-50">
                                                {item.label}
                                            </div>
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    );
}