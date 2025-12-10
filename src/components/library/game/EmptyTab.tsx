// Hulpcomponent voor de 'lege' tab-inhoud (blijft hier voor de leesbaarheid)
export function EmptyTab({
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