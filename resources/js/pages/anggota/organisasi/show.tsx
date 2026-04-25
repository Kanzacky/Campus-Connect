import { Head, router, usePage } from '@inertiajs/react';
import { Users, Calendar, MapPin, LogIn, LogOut } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Kegiatan { id: number; judul: string; tanggal_mulai: string; lokasi: string; }
interface Organisasi { id: number; name: string; category: string; ketua: string; visi: string; misi: string; deskripsi: string; kontak: string; anggota_aktif_count: number; kegiatans: Kegiatan[]; }
interface Props { organisasi: Organisasi; membershipStatus: string | null; flash: { success?: string; error?: string }; }

export default function OrganisasiShow() {
    const { organisasi, membershipStatus, flash } = usePage().props as unknown as Props;
    const breadcrumbs = [{ title: 'Dashboard', href: '/anggota/dashboard' }, { title: 'Organisasi', href: '/anggota/organisasi' }, { title: organisasi.name, href: '#' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={organisasi.name} />
            <div className="mx-auto max-w-4xl p-4 md:p-6">
                {flash?.success && <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">{flash.success}</div>}
                <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="border-b border-zinc-200 p-6 dark:border-zinc-800">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{organisasi.name}</h1>
                                <p className="mt-1 text-sm text-zinc-500">{organisasi.category}</p>
                                <div className="mt-3 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {organisasi.anggota_aktif_count} anggota</span>
                                    <span>Ketua: {organisasi.ketua}</span>
                                    {organisasi.kontak && <span>Kontak: {organisasi.kontak}</span>}
                                </div>
                            </div>
                            <div>
                                {!membershipStatus && <button onClick={() => router.post(`/anggota/organisasi/${organisasi.id}/join`)} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"><LogIn className="h-4 w-4" /> Gabung</button>}
                                {membershipStatus === 'pending' && <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">Menunggu Persetujuan</span>}
                                {membershipStatus === 'aktif' && <button onClick={() => {
 if (confirm('Keluar?')) {
router.delete(`/anggota/organisasi/${organisasi.id}/leave`);
} 
}} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"><LogOut className="h-4 w-4" /> Keluar</button>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6 p-6">
                        <div><h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Visi</h2><p className="text-sm text-zinc-600 dark:text-zinc-400">{organisasi.visi}</p></div>
                        <div><h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Misi</h2><div className="space-y-1">{organisasi.misi.split('\n').map((m, i) => <p key={i} className="text-sm text-zinc-600 dark:text-zinc-400">• {m}</p>)}</div></div>
                        {organisasi.deskripsi && <div><h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Deskripsi</h2><p className="text-sm text-zinc-600 dark:text-zinc-400">{organisasi.deskripsi}</p></div>}
                        {organisasi.kegiatans.length > 0 && (
                            <div>
                                <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Kegiatan Mendatang</h2>
                                <div className="space-y-2">
                                    {organisasi.kegiatans.map((k) => (
                                        <div key={k.id} className="flex items-center gap-4 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
                                            <div className="flex-1"><p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{k.judul}</p><div className="mt-1 flex gap-3 text-xs text-zinc-500"><span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</span><span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {k.lokasi}</span></div></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
