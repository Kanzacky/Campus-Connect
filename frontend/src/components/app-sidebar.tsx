import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import {
    BookOpen,
    Building2,
    Calendar,
    FolderGit2,
    LayoutGrid,
    Megaphone,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem, User } from '@/types';

function getNavItems(role: string): NavItem[] {
    switch (role) {
        case 'admin':
            return [
                { title: 'Dashboard', href: '/admin', icon: LayoutGrid },
                { title: 'Organisasi', href: '/admin/organisasi', icon: Building2 },
                { title: 'Users', href: '/admin/users', icon: Users },
                { title: 'Kegiatan', href: '/admin/kegiatan', icon: Calendar },
                { title: 'Pengumuman', href: '/admin/pengumuman', icon: Megaphone },
            ];
        case 'pengurus':
            return [
                { title: 'Dashboard', href: '/pengurus/dashboard', icon: LayoutGrid },
                { title: 'Anggota', href: '/pengurus/anggota', icon: Users },
                { title: 'Kegiatan', href: '/pengurus/kegiatan', icon: Calendar },
                { title: 'Pengumuman', href: '/pengurus/pengumuman', icon: Megaphone },
            ];
        case 'anggota':
            return [
                { title: 'Dashboard', href: '/anggota/dashboard', icon: LayoutGrid },
                { title: 'Organisasi', href: '/anggota/organisasi', icon: Building2 },
                { title: 'Kegiatan', href: '/anggota/kegiatan', icon: Calendar },
                { title: 'Pengumuman', href: '/anggota/pengumuman', icon: Megaphone },
            ];
        default:
            return [
                { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
            ];
    }
}

function getDashboardHref(role: string): string {
    switch (role) {
        case 'admin':
            return '/admin';
        case 'pengurus':
            return '/pengurus/dashboard';
        case 'anggota':
            return '/anggota/dashboard';
        default:
            return '/dashboard';
    }
}

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { user } = useAuth();
    const role = user?.role || 'anggota';
    const mainNavItems = getNavItems(role);
    const dashboardHref = getDashboardHref(role);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="hover:bg-transparent active:bg-transparent focus-visible:ring-0" asChild>
                            <Link href={dashboardHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
