export function formatTimeAgo(dateInput: string | Date): string {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Minder dan 1 minuut
    if (diffInSeconds < 60) {
        return 'now';
    }

    // Minuten
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }

    // Uren
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }

    // Dagen
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}d`;
    }

    // Langer dan een week? Toon datum (dd/mm)
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
}