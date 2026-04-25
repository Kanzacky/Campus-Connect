import { Head, usePage, Link } from '@inertiajs/react';
import { Calendar, MapPin } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Kegiatan { id: number; judul: string; deskripsi: string; tanggal_mulai: string; tanggal_selesai: string; lokasi: string; organisasi?: { name: string }; }
interface Props { kegiatans: { data: Kegiatan[]; links: Array<{ url: string | null; label: string; active: boolean }> }; }
const breadcrumbs = [{ title: 'Dashboard', href: '/anggota/dashboard' }, { title: 'Kegiatan', href: '/anggota/kegiatan' }];

export default function KegiatanIndex() {
    const { kegiatans } = usePage().props as unknown as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kegiatan" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Kegiatan Organisasi Saya</h1>
                <div className="space-y-4">
                    {kegiatans.data.map((k) => (
                        <div key={k.id} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{k.judul}</h3>
                            <p className="mt-1 text-xs text-zinc-500">{k.organisasi?.name}</p>
                            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{k.deskripsi}</p>
                            <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-500">
                                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</span>
                                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {k.lokasi}</span>
                            </div>
                        </div>
                    ))}
                    {kegiatans.data.length === 0 && <div className="py-12 text-center text-zinc-400">Belum ada kegiatan</div>}
                </div>
                <div className="flex justify-center gap-1">{kegiatans.links.map((l, i) => <Link key={i} href={l.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm ${l.active ? 'bg-indigo-600 text-white' : l.url ? 'text-zinc-600 hover:bg-zinc-100' : 'text-zinc-300'}`} dangerouslySetInnerHTML={{ __html: l.label }} preserveState />)}</div>
            </div>
        </AppLayout>
    );
}
