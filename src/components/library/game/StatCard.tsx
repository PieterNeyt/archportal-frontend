import React from "react";

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
}

export function StatCard({ icon, label, value }: StatCardProps) {
    return (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <span className="text-white/60 text-sm">{label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    );
}