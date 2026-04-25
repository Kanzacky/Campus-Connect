import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Pin } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
interface Pengumuman { id: number; judul: string; konten: string; is_pinned: boolean; created_at: string; organisasi?: { name: string }; }
interface Props { pengumumans: { data: Pengumuman[]; links: Array<{ url: string | null; label: string; active: boolean }> }; filters: { search?: string }; flash: { success?: string }; }
const breadcrumbs = [{ title: 'Pengurus Dashboard', href: '/pengurus/dashboard' }, { title: 'Pengumuman', href: '/pengurus/pengumuman' }];
export default function PengumumanIndex() {
    const { pengumumans, flash } = usePage().props as unknown as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}><Head title="Kelola Pengumuman" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Kelola Pengumuman</h1><Link href="/pengurus/pengumuman/create" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"><Plus className="h-4 w-4" /> Buat Pengumuman</Link></div>
                {flash?.success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">{flash.success}</div>}
                <div className="space-y-4">
                    {pengumumans.data.map((p) => (
                        <div key={p.id} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="flex items-start justify-between"><div className="flex-1"><div className="flex items-center gap-2">{p.is_pinned && <Pin className="h-4 w-4 text-amber-500" />}<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{p.judul}</h3></div><p className="mt-1 text-xs text-zinc-500">{p.organisasi?.name} · {new Date(p.created_at).toLocaleDateString('id-ID')}</p><p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{p.konten}</p></div>
                            <div className="flex gap-1"><Link href={`/pengurus/pengumuman/${p.id}/edit`} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-indigo-600 dark:hover:bg-zinc-800"><Pencil className="h-4 w-4" /></Link><button onClick={() => {
 if (confirm('Yakin?')) {
router.delete(`/pengurus/pengumuman/${p.id}`);
} 
}} className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></div>
                        </div>
                    ))}
                    {pengumumans.data.length === 0 && <div className="py-12 text-center text-zinc-400">Belum ada pengumuman</div>}
                </div>
            </div>
        </AppLayout>
    );
}
