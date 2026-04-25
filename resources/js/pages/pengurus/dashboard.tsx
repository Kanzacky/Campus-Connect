import { Head, usePage } from '@inertiajs/react';
import { Building2, Calendar, Clock, UserPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Organisasi { id: number; name: string; category: string; anggota_aktif_count: number; pendaftar_count: number; kegiatans_count: number; pengumumans_count: number; }
interface Kegiatan { id: number; judul: string; tanggal_mulai: string; organisasi?: { name: string }; }
interface Pendaftar { id: number; name: string; email: string; nim: string; organisasi: string; }
interface Props { organisasis: Organisasi[]; kegiatanMendatang: Kegiatan[]; pendaftarBaru: Pendaftar[]; }

const breadcrumbs = [{ title: 'Pengurus Dashboard', href: '/pengurus/dashboard' }];

export default function PengurusDashboard() {
    const { organisasis, kegiatanMendatang, pendaftarBaru } = usePage().props as unknown as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengurus Dashboard" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Dashboard Pengurus</h1>

                {/* Organisasi Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {organisasis.map((org) => (
                        <div key={org.id} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-indigo-100 p-2.5 dark:bg-indigo-900/30"><Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /></div>
                                <div><h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{org.name}</h3><p className="text-xs text-zinc-500">{org.category}</p></div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                <div><p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{org.anggota_aktif_count}</p><p className="text-xs text-zinc-500">Anggota</p></div>
                                <div><p className="text-lg font-bold text-amber-600 dark:text-amber-400">{org.pendaftar_count}</p><p className="text-xs text-zinc-500">Pendaftar</p></div>
                                <div><p className="text-lg font-bold text-blue-600 dark:text-blue-400">{org.kegiatans_count}</p><p className="text-xs text-zinc-500">Kegiatan</p></div>
                            </div>
                        </div>
                    ))}
                    {organisasis.length === 0 && <div className="col-span-full rounded-xl border border-zinc-200 bg-white p-12 text-center text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">Anda belum terdaftar sebagai pengurus di organisasi manapun.</div>}
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Kegiatan Mendatang */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100"><Calendar className="h-5 w-5 text-indigo-500" /> Kegiatan Mendatang</h3>
                        <div className="space-y-3">
                            {kegiatanMendatang.map((k) => (
                                <div key={k.id} className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
                                    <Clock className="h-4 w-4 text-zinc-400" />
                                    <div><p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{k.judul}</p><p className="text-xs text-zinc-500">{k.organisasi?.name} · {new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</p></div>
                                </div>
                            ))}
                            {kegiatanMendatang.length === 0 && <p className="text-sm text-zinc-400">Tidak ada kegiatan mendatang</p>}
                        </div>
                    </div>

                    {/* Pendaftar Baru */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100"><UserPlus className="h-5 w-5 text-amber-500" /> Pendaftar Baru</h3>
                        <div className="space-y-3">
                            {pendaftarBaru.map((p, i) => (
                                <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
                                    <div><p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{p.name}</p><p className="text-xs text-zinc-500">{p.nim} · {p.organisasi}</p></div>
                                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Pending</span>
                                </div>
                            ))}
                            {pendaftarBaru.length === 0 && <p className="text-sm text-zinc-400">Tidak ada pendaftar baru</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
