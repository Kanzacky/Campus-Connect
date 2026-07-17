import { useEffect, useState, useRef } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { useAppearance } from '@/hooks/use-appearance';
import { pengurusApi, anggotaApi, adminApi } from '@/lib/api';
import { Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { user, isAuthenticated } = useAuth();
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [notification, setNotification] = useState<string | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const prevPendingCount = useRef<number>(-1);
    const prevStatus = useRef<Record<number, string>>({});
    const prevPengumumanId = useRef<number | null>(null);
    const prevKegiatanId = useRef<number | null>(null);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        const checkNotifications = async () => {
            try {
                if (user.role === 'pengurus') {
                    const res = await pengurusApi.anggota.list({ status: 'pending', per_page: 1 });
                    const payload = res.data as any;
                    const totalPending = payload?.anggota?.total || 0;
                    if (prevPendingCount.current !== -1 && totalPending > prevPendingCount.current) {
                        setNotification('Ada pendaftar baru yang menunggu persetujuan!');
                        setUnreadCount(prev => prev + 1);
                        setTimeout(() => setNotification(null), 7000);
                    }
                    prevPendingCount.current = totalPending;
                }
                
                if (user.role === 'anggota') {
                    const res = await anggotaApi.organisasi.list({ per_page: 1 });
                    const payload = res.data as any;
                    const currentStatus = payload?.userMemberships || {};
                    if (Object.keys(prevStatus.current).length > 0) {
                        for (const orgId in currentStatus) {
                            if (prevStatus.current[orgId] === 'pending' && currentStatus[orgId] === 'aktif') {
                                setNotification('Selamat! Anda telah diterima di organisasi.');
                                setUnreadCount(prev => prev + 1);
                                setTimeout(() => setNotification(null), 7000);
                            } else if (prevStatus.current[orgId] === 'pending' && currentStatus[orgId] === 'ditolak') {
                                setNotification('Maaf, pendaftaran Anda ditolak.');
                                setUnreadCount(prev => prev + 1);
                                setTimeout(() => setNotification(null), 7000);
                            }
                        }
                    }
                    prevStatus.current = currentStatus;
                }

                let pengumumanRes;
                if (user.role === 'admin') pengumumanRes = await adminApi.pengumuman.list({ per_page: 10 });
                else if (user.role === 'pengurus') pengumumanRes = await pengurusApi.pengumuman.list({ per_page: 10 });
                else if (user.role === 'anggota') pengumumanRes = await anggotaApi.pengumuman.list({ per_page: 10 });

                if (pengumumanRes) {
                    const list = (pengumumanRes.data as any)?.pengumumans?.data || [];
                    if (list.length > 0) {
                        const maxId = Math.max(...list.map((item: any) => item.id));
                        if (prevPengumumanId.current !== null && maxId > prevPengumumanId.current) {
                            const newItem = list.find((item: any) => item.id === maxId);
                            setNotification('Pengumuman Baru: ' + (newItem?.judul || ''));
                            setUnreadCount(prev => prev + 1);
                            setTimeout(() => setNotification(null), 7000);
                        }
                        prevPengumumanId.current = Math.max(prevPengumumanId.current || 0, maxId);
                    }
                }

                let kegiatanRes;
                if (user.role === 'admin') kegiatanRes = await adminApi.kegiatan.list({ per_page: 10 });
                else if (user.role === 'pengurus') kegiatanRes = await pengurusApi.kegiatan.list({ per_page: 10 });
                else if (user.role === 'anggota') kegiatanRes = await anggotaApi.kegiatan.list({ per_page: 10 });

                if (kegiatanRes) {
                    const list = (kegiatanRes.data as any)?.kegiatans?.data || [];
                    if (list.length > 0) {
                        const maxId = Math.max(...list.map((item: any) => item.id));
                        if (prevKegiatanId.current !== null && maxId > prevKegiatanId.current) {
                            const newItem = list.find((item: any) => item.id === maxId);
                            setNotification('Kegiatan Baru: ' + newItem?.judul);
                            setUnreadCount(prev => prev + 1);
                            setTimeout(() => setNotification(null), 7000);
                        }
                        prevKegiatanId.current = Math.max(prevKegiatanId.current || 0, maxId);
                    }
                }
            } catch (error) {
                // ignore
            }
        };

        checkNotifications();
        const intervalId = setInterval(checkNotifications, 3000);
        return () => clearInterval(intervalId);
    }, [isAuthenticated, user]);

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/60 bg-background/70 px-4 md:px-6 backdrop-blur transition-[width,height] ease-linear supports-[backdrop-filter]:bg-background/60 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
                <SidebarTrigger className="-ml-1 shrink-0" />
                <div className="truncate hidden sm:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
            <div className="flex items-center gap-2">
                {notification && (
                    <div className="flex shrink items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-semibold text-indigo-700 shadow-sm dark:bg-indigo-900/30 dark:text-indigo-400 animate-in slide-in-from-top-4 fade-in max-w-[60vw] md:max-w-md">
                        <Bell className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
                        <span className="truncate">{notification}</span>
                    </div>
                )}
                
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setUnreadCount(0)} 
                    className={`rounded-full h-8 w-8 relative ${unreadCount > 0 ? 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-500 dark:hover:text-yellow-400' : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'}`}
                >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>

                <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hidden sm:inline-flex">
                    {resolvedAppearance === 'dark' ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </header>
    );
}
