import {Menu, X} from "lucide-react";

interface HeaderProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export function SidebarHeader({isOpen, setIsOpen}: HeaderProps) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-border">
            {isOpen && (
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    ArchPortal
                </h2>
            )}
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="p-2 rounded-lg hover:bg-accent transition-all hover:scale-110 active:scale-95"
                aria-label="Toggle sidebar"
            >
                {isOpen ?
                    <X size={20} className="text-muted-foreground hover:text-foreground transition-colors"/> :
                    <Menu size={20} className="text-muted-foreground hover:text-foreground transition-colors"/>
                }
            </button>
        </div>
    );
}