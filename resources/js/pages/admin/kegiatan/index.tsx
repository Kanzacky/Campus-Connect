import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

interface Kegiatan { id: number; judul: string; status: string; tanggal_mulai: string; tanggal_selesai: string; lokasi: string; organisasi?: { id: number; name: string }; creator?: { id: number; name: string }; }
interface Props { kegiatans: { data: Kegiatan[]; links: Array<{ url: string | null; label: string; active: boolean }> }; filters: { search?: string; status?: string }; }

const breadcrumbs = [{ title: 'Admin Dashboard', href: '/admin' }, { title: 'Kegiatan', href: '/admin/kegiatan' }];
const statusColors: Record<string, string> = { draft: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300', published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', selesai: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };

export default function KegiatanIndex() {
    const { kegiatans, filters } = usePage().props as unknown as Props;
    const [search, setSearch] = useState(filters.search || '');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Semua Kegiatan" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Semua Kegiatan</h1>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <form onSubmit={(e) => {
 e.preventDefault(); router.get('/admin/kegiatan', { search, status: filters.status }, { preserveState: true }); 
}} className="flex flex-1 gap-2">
                        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" /><input type="text" placeholder="Cari kegiatan..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <button type="submit" className="rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">Cari</button>
                    </form>
                    <select value={filters.status || ''} onChange={(e) => router.get('/admin/kegiatan', { ...filters, status: e.target.value }, { preserveState: true })} className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                        <option value="">Semua Status</option><option value="draft">Draft</option><option value="published">Published</option><option value="selesai">Selesai</option>
                    </select>
                </div>
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <table className="w-full text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50"><tr><th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Judul</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Organisasi</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Tanggal</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Lokasi</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Status</th></tr></thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {kegiatans.data.map((k) => (
                                <tr key={k.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">{k.judul}</td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{k.organisasi?.name}</td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{k.lokasi}</td>
                                    <td className="px-6 py-4"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[k.status]}`}>{k.status}</span></td>
                                </tr>
                            ))}
                            {kegiatans.data.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-zinc-400">Belum ada kegiatan</td></tr>}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-center gap-1 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">{kegiatans.links.map((l, i) => <Link key={i} href={l.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm ${l.active ? 'bg-indigo-600 text-white' : l.url ? 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400' : 'cursor-not-allowed text-zinc-300'}`} dangerouslySetInnerHTML={{ __html: l.label }} preserveState />)}</div>
                </div>
            </div>
        </AppLayout>
    );
}
