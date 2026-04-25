import { Head, router, usePage, Link } from '@inertiajs/react';
import { CheckCircle, XCircle, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Anggota { id: number; user_id: number; name: string; email: string; nim: string; jurusan: string; angkatan: string; jabatan: string; status: string; bergabung_pada: string; }
interface Org { id: number; name: string; }
interface Props { anggota: { data: Anggota[]; links: Array<{ url: string | null; label: string; active: boolean }> }; organisasis: Org[]; selectedOrgId: number; filters: { search?: string; status?: string }; flash: { success?: string; error?: string }; }

const breadcrumbs = [{ title: 'Pengurus Dashboard', href: '/pengurus/dashboard' }, { title: 'Anggota', href: '/pengurus/anggota' }];
const statusColors: Record<string, string> = { aktif: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', ditolak: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };

export default function AnggotaIndex() {
    const { anggota, organisasis, selectedOrgId, filters, flash } = usePage().props as unknown as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Anggota" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Kelola Anggota</h1>
                {flash?.success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">{flash.success}</div>}
                {flash?.error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">{flash.error}</div>}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <select value={selectedOrgId} onChange={(e) => router.get('/pengurus/anggota', { organisasi_id: e.target.value }, { preserveState: true })} className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                        {organisasis.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                    </select>
                    <select value={filters.status || ''} onChange={(e) => router.get('/pengurus/anggota', { ...filters, organisasi_id: selectedOrgId, status: e.target.value }, { preserveState: true })} className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                        <option value="">Semua Status</option><option value="aktif">Aktif</option><option value="pending">Pending</option><option value="ditolak">Ditolak</option>
                    </select>
                </div>
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <table className="w-full text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50"><tr><th className="px-6 py-3.5 text-left font-medium text-zinc-500">Nama</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500">NIM</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500">Jabatan</th><th className="px-6 py-3.5 text-left font-medium text-zinc-500">Status</th><th className="px-6 py-3.5 text-right font-medium text-zinc-500">Aksi</th></tr></thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {anggota.data.map((a) => (
                                <tr key={a.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                                    <td className="px-6 py-4"><div><p className="font-medium text-zinc-900 dark:text-zinc-100">{a.name}</p><p className="text-xs text-zinc-500">{a.email}</p></div></td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{a.nim || '-'}</td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{a.jabatan}</td>
                                    <td className="px-6 py-4"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[a.status]}`}>{a.status}</span></td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {a.status === 'pending' && <>
                                                <button onClick={() => router.put(`/pengurus/anggota/${a.id}/approve`)} className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" title="Setujui"><CheckCircle className="h-4 w-4" /></button>
                                                <button onClick={() => router.put(`/pengurus/anggota/${a.id}/reject`)} className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" title="Tolak"><XCircle className="h-4 w-4" /></button>
                                            </>}
                                            {a.status === 'aktif' && <button onClick={() => {
 if (confirm('Hapus anggota ini?')) {
router.delete(`/pengurus/anggota/${a.id}/remove`);
} 
}} className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {anggota.data.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-zinc-400">Tidak ada data anggota</td></tr>}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-center gap-1 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">{anggota.links.map((l, i) => <Link key={i} href={l.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm ${l.active ? 'bg-indigo-600 text-white' : l.url ? 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400' : 'cursor-not-allowed text-zinc-300'}`} dangerouslySetInnerHTML={{ __html: l.label }} preserveState />)}</div>
                </div>
            </div>
        </AppLayout>
    );
}
