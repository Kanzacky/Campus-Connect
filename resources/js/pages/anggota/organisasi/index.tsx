import { Head, router, usePage } from '@inertiajs/react';
import { Search, Users, LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Organisasi { id: number; name: string; category: string; ketua: string; visi: string; anggota_aktif_count: number; }
interface Props { organisasis: { data: Organisasi[]; links: Array<{ url: string | null; label: string; active: boolean }> }; categories: string[]; userMemberships: Record<number, string>; filters: { search?: string; category?: string }; flash: { success?: string; error?: string }; }

const breadcrumbs = [{ title: 'Dashboard', href: '/anggota/dashboard' }, { title: 'Organisasi', href: '/anggota/organisasi' }];

export default function OrganisasiIndex() {
    const { organisasis, categories, userMemberships, filters, flash } = usePage().props as unknown as Props;
    const [search, setSearch] = useState(filters.search || '');

    function getMembershipStatus(orgId: number): string | undefined {
        return userMemberships[orgId];
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jelajahi Organisasi" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Jelajahi Organisasi</h1>
                {flash?.success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">{flash.success}</div>}
                {flash?.error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">{flash.error}</div>}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <form onSubmit={(e) => {
 e.preventDefault(); router.get('/anggota/organisasi', { search, category: filters.category }, { preserveState: true }); 
}} className="flex flex-1 gap-2">
                        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" /><input type="text" placeholder="Cari organisasi..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <button type="submit" className="rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">Cari</button>
                    </form>
                    <select value={filters.category || ''} onChange={(e) => router.get('/anggota/organisasi', { ...filters, category: e.target.value }, { preserveState: true })} className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                        <option value="">Semua Kategori</option>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {organisasis.data.map((org) => {
                        const status = getMembershipStatus(org.id);

                        return (
                            <div key={org.id} className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{org.name}</h3>
                                    <p className="mt-0.5 text-xs text-zinc-500">{org.category}</p>
                                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Ketua: {org.ketua}</p>
                                    <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{org.visi}</p>
                                </div>
                                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                                    <span className="inline-flex items-center gap-1 text-xs text-zinc-500"><Users className="h-3.5 w-3.5" /> {org.anggota_aktif_count} anggota</span>
                                    {!status && (
                                        <button onClick={() => router.post(`/anggota/organisasi/${org.id}/join`)} className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">
                                            <LogIn className="h-3.5 w-3.5" /> Gabung
                                        </button>
                                    )}
                                    {status === 'pending' && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Menunggu</span>}
                                    {status === 'aktif' && (
                                        <button onClick={() => {
 if (confirm('Keluar dari organisasi ini?')) {
router.delete(`/anggota/organisasi/${org.id}/leave`);
} 
}} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
                                            <LogOut className="h-3.5 w-3.5" /> Keluar
                                        </button>
                                    )}
                                    {status === 'ditolak' && <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">Ditolak</span>}
                                </div>
                            </div>
                        );
                    })}
                    {organisasis.data.length === 0 && <div className="col-span-full py-12 text-center text-zinc-400">Tidak ada organisasi ditemukan</div>}
                </div>
            </div>
        </AppLayout>
    );
}
