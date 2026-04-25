import { Head, usePage, Link } from '@inertiajs/react';
import { Pin } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Pengumuman { id: number; judul: string; konten: string; is_pinned: boolean; created_at: string; organisasi?: { name: string }; creator?: { name: string }; }
interface Props { pengumumans: { data: Pengumuman[]; links: Array<{ url: string | null; label: string; active: boolean }> }; }
const breadcrumbs = [{ title: 'Dashboard', href: '/anggota/dashboard' }, { title: 'Pengumuman', href: '/anggota/pengumuman' }];

export default function PengumumanIndex() {
    const { pengumumans } = usePage().props as unknown as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengumuman" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Pengumuman</h1>
                <div className="space-y-4">
                    {pengumumans.data.map((p) => (
                        <div key={p.id} className={`rounded-xl border bg-white p-6 shadow-sm dark:bg-zinc-900 ${p.is_pinned ? 'border-amber-200 dark:border-amber-800' : 'border-zinc-200 dark:border-zinc-800'}`}>
                            <div className="flex items-center gap-2">
                                {p.is_pinned && <Pin className="h-4 w-4 text-amber-500" />}
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{p.judul}</h3>
                            </div>
                            <p className="mt-1 text-xs text-zinc-500">{p.organisasi?.name || 'Pengumuman Global'} · {p.creator?.name} · {new Date(p.created_at).toLocaleDateString('id-ID')}</p>
                            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-line">{p.konten}</p>
                        </div>
                    ))}
                    {pengumumans.data.length === 0 && <div className="py-12 text-center text-zinc-400">Belum ada pengumuman</div>}
                </div>
                <div className="flex justify-center gap-1">{pengumumans.links.map((l, i) => <Link key={i} href={l.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm ${l.active ? 'bg-indigo-600 text-white' : l.url ? 'text-zinc-600 hover:bg-zinc-100' : 'text-zinc-300'}`} dangerouslySetInnerHTML={{ __html: l.label }} preserveState />)}</div>
            </div>
        </AppLayout>
    );
}
