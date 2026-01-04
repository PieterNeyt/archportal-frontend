export function formatTimeAgo(dateInput: string | Date): string {
    const date = new Date(dateInput);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Minder dan 1 minuut: "just now" is gebruikelijker dan "now ago"
    if (diffInSeconds < 60) {
        return 'just now';
    }

    // Minuten
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    }

    // Uren
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }

    // Dagen
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays}d ago`;
    }

    // Langer dan een week? Toon datum (dd/mm) zonder "ago"
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
}