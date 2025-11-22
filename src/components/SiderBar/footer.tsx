interface FooterProps {
    isOpen: boolean;
}


export function SidebarFooter({isOpen}: FooterProps) {
    return (

        <div className="p-4 border-t border-border">
            <div
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer">
                <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-sm font-bold text-primary-foreground">67</span>
                </div>
                {isOpen && (
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-foreground group-hover:text-primary transition-colors">
                            Hugo Dor
                        </p>
                        <p className="text-xs text-muted-foreground truncate">Online</p>
                    </div>
                )}
            </div>
        </div>

    );
}