import {Coins, Gamepad2, Library, LucideIcon, MessageSquare, ShoppingCart, User, Users} from "lucide-react";

interface MenuItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

export const menuSections: MenuSection[] = [
    {
        title: 'Store',
        items: [
            {icon: ShoppingCart, label: 'Shop', href: '/shop'},
            {icon: Coins, label: 'Points', href: '#points'},
        ]
    },
    {
        title: 'My Profile',
        items: [
            {icon: User, label: 'Profile', href: '#profile'},
            {icon: Library, label: 'Library', href: '/library'},
        ]
    },
    {
        title: 'Social',
        items: [
            {icon: Users, label: 'Friends', href: '#friends'},
            {icon: MessageSquare, label: 'Chats', href: '#chats'},
            {icon: Gamepad2, label: 'Lobbys', href: '#lobbys'},
        ]
    },
    {
        title: 'GameStudio',
        items: [
            {icon: Gamepad2, label: 'Create Game', href: '/create/game'},
        ]
    }
];