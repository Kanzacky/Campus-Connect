import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Kegiatan { id: number; judul: string; status: string; tanggal_mulai: string; lokasi: string; organisasi?: { name: string }; }
interface Props { kegiatans: { data: Kegiatan[]; links: Array<{ url: string | null; label: string; active: boolean }> }; filters: { search?: string; status?: string }; flash: { success?: string }; }
const breadcrumbs = [{ title: 'Pengurus Dashboard', href: '/pengurus/dashboard' }, { title: 'Kegiatan', href: '/pengurus/kegiatan' }];
const statusColors: Record<string, string> = { draft: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300', published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', selesai: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };

export default function KegiatanIndex() {
    const { kegiatans, flash } = usePage().props as unknown as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Kegiatan" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Kelola Kegiatan</h1>
                    <Link href="/pengurus/kegiatan/create" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"><Plus className="h-4 w-4" /> Buat Kegiatan</Link>
                </div>
                {flash?.success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">{flash.success}</div>}
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <table className="w-full text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50"><tr><th className="px-6 py-3.5 text-left font-medium text-zinc-500">Judul</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500">Organisasi</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500">Tanggal</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500">Status</th><th className="px-6 py-3.5 text-right font-medium text-zinc-500">Aksi</th></tr></thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {kegiatans.data.map((k) => (
                                <tr key={k.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">{k.judul}</td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{k.organisasi?.name}</td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</td>
                                    <td className="px-6 py-4"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[k.status]}`}>{k.status}</span></td>
                                    <td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/pengurus/kegiatan/${k.id}/edit`} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-indigo-600 dark:hover:bg-zinc-800"><Pencil className="h-4 w-4" /></Link><button onClick={() => {
 if (confirm('Yakin?')) {
router.delete(`/pengurus/kegiatan/${k.id}`);
} 
}} className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></td>
                                </tr>
                            ))}
                            {kegiatans.data.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-zinc-400">Belum ada kegiatan</td></tr>}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-center gap-1 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">{kegiatans.links.map((l, i) => <Link key={i} href={l.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm ${l.active ? 'bg-indigo-600 text-white' : l.url ? 'text-zinc-600 hover:bg-zinc-100' : 'cursor-not-allowed text-zinc-300'}`} dangerouslySetInnerHTML={{ __html: l.label }} preserveState />)}</div>
                </div>
            </div>
        </AppLayout>
    );
}
