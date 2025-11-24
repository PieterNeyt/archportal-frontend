interface DropdownButtonProps {
    text: string;
    onClick: () => void;
}

export default function DropdownButton({text, onClick}: DropdownButtonProps) {
    return (<button
        className="px-4 py-2 text-sm text-foreground hover:bg-primary/10 text-left"
        onClick={onClick}
    >
        {text}
    </button>);
}