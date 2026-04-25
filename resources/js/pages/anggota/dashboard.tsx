import { Head, usePage } from '@inertiajs/react';
import { Building2, Calendar, Megaphone, Clock, Users } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Organisasi { id: number; name: string; category: string; anggota_aktif_count: number; pivot: { jabatan: string }; }
interface Kegiatan { id: number; judul: string; tanggal_mulai: string; organisasi?: { name: string }; }
interface Pengumuman { id: number; judul: string; konten: string; is_pinned: boolean; created_at: string; organisasi?: { name: string }; }
interface PendingOrg { id: number; name: string; }
interface Props { organisasiSaya: Organisasi[]; kegiatanMendatang: Kegiatan[]; pengumumanTerbaru: Pengumuman[]; pendingOrgs: PendingOrg[]; }

const breadcrumbs = [{ title: 'Dashboard', href: '/anggota/dashboard' }];

export default function AnggotaDashboard() {
    const { organisasiSaya, kegiatanMendatang, pengumumanTerbaru, pendingOrgs } = usePage().props as unknown as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Anggota" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard Saya</h1>

                {/* Pending Notifications */}
                {pendingOrgs.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
                        <p className="text-sm font-medium text-amber-700 dark:text-amber-400">⏳ Menunggu persetujuan dari: {pendingOrgs.map(o => o.name).join(', ')}</p>
                    </div>
                )}

                {/* Organisasi Saya */}
                <div>
                    <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100"><Building2 className="h-5 w-5 text-indigo-500" /> Organisasi Saya</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {organisasiSaya.map((org) => (
                            <div key={org.id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{org.name}</h3>
                                <p className="text-xs text-zinc-500">{org.category}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 text-xs text-zinc-500"><Users className="h-3 w-3" /> {org.anggota_aktif_count} anggota</span>
                                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{org.pivot?.jabatan || 'Anggota'}</span>
                                </div>
                            </div>
                        ))}
                        {organisasiSaya.length === 0 && <div className="col-span-full rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-400 dark:border-zinc-700">Belum bergabung di organisasi manapun. <a href="/anggota/organisasi" className="text-indigo-600 hover:underline dark:text-indigo-400">Jelajahi organisasi →</a></div>}
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Kegiatan Mendatang */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100"><Calendar className="h-5 w-5 text-emerald-500" /> Kegiatan Mendatang</h3>
                        <div className="space-y-3">
                            {kegiatanMendatang.map((k) => (
                                <div key={k.id} className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
                                    <Clock className="h-4 w-4 shrink-0 text-zinc-400" />
                                    <div><p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{k.judul}</p><p className="text-xs text-zinc-500">{k.organisasi?.name} · {new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</p></div>
                                </div>
                            ))}
                            {kegiatanMendatang.length === 0 && <p className="text-sm text-zinc-400">Tidak ada kegiatan mendatang</p>}
                        </div>
                    </div>

                    {/* Pengumuman Terbaru */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100"><Megaphone className="h-5 w-5 text-amber-500" /> Pengumuman Terbaru</h3>
                        <div className="space-y-3">
                            {pengumumanTerbaru.map((p) => (
                                <div key={p.id} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{p.judul}</p>
                                    <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{p.konten}</p>
                                    <p className="mt-1 text-xs text-zinc-400">{p.organisasi?.name || 'Global'} · {new Date(p.created_at).toLocaleDateString('id-ID')}</p>
                                </div>
                            ))}
                            {pengumumanTerbaru.length === 0 && <p className="text-sm text-zinc-400">Tidak ada pengumuman</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
