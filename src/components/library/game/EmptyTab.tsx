import {ReactNode} from "react";

interface emptyTabProps {
    icon: ReactNode;
    title: string;
    subtitle:string;
}

export function EmptyTab({icon, title, subtitle}: emptyTabProps) {
    return (
        <div className="text-center py-12">
            {icon}
            <p className="text-white/60 text-lg mb-2">{title}</p>
            <p className="text-white/40 text-sm">{subtitle}</p>
        </div>
    );
}