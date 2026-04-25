import { Head, usePage } from '@inertiajs/react';
import { Users, Building2, Calendar, UserPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Stats {
    totalUsers: number;
    totalAdmin: number;
    totalPengurus: number;
    totalAnggota: number;
    totalOrganisasi: number;
    organisasiAktif: number;
    totalKegiatan: number;
    kegiatanBulanIni: number;
    totalPengumuman: number;
    pendaftarBaru: number;
}

interface RecentUser {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface RecentKegiatan {
    id: number;
    judul: string;
    status: string;
    tanggal_mulai: string;
    organisasi?: { id: number; name: string };
}

interface Props {
    stats: Stats;
    recentUsers: RecentUser[];
    recentKegiatan: RecentKegiatan[];
}

const breadcrumbs = [{ title: 'Admin Dashboard', href: '/admin' }];

function StatCard({ title, value, icon: Icon, color, subtitle }: {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    subtitle?: string;
}) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>
                    <p className={`mt-2 text-3xl font-bold ${color}`}>{value.toLocaleString('id-ID')}</p>
                    {subtitle && (
                        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{subtitle}</p>
                    )}
                </div>
                <div className={`rounded-lg p-3 ${color.replace('text-', 'bg-').replace('600', '100').replace('400', '900/20')}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        draft: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
        published: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        selesai: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        pengurus: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        anggota: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status] || styles.draft}`}>
            {status}
        </span>
    );
}

export default function AdminDashboard() {
    const { stats, recentUsers, recentKegiatan } = usePage<{ stats: Stats; recentUsers: RecentUser[]; recentKegiatan: RecentKegiatan[] }>().props as Props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total Pengguna" value={stats.totalUsers} icon={Users} color="text-indigo-600 dark:text-indigo-400" subtitle={`${stats.totalAdmin} Admin · ${stats.totalPengurus} Pengurus · ${stats.totalAnggota} Anggota`} />
                    <StatCard title="Total Organisasi" value={stats.totalOrganisasi} icon={Building2} color="text-emerald-600 dark:text-emerald-400" subtitle={`${stats.organisasiAktif} aktif`} />
                    <StatCard title="Total Kegiatan" value={stats.totalKegiatan} icon={Calendar} color="text-amber-600 dark:text-amber-400" subtitle={`${stats.kegiatanBulanIni} bulan ini`} />
                    <StatCard title="Pendaftar Baru" value={stats.pendaftarBaru} icon={UserPlus} color="text-rose-600 dark:text-rose-400" subtitle="7 hari terakhir" />
                </div>

                {/* Tables Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Users */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">User Terbaru</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                        <th className="pb-3 text-left font-medium text-zinc-500 dark:text-zinc-400">Nama</th>
                                        <th className="pb-3 text-left font-medium text-zinc-500 dark:text-zinc-400">Role</th>
                                        <th className="pb-3 text-left font-medium text-zinc-500 dark:text-zinc-400">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers.map((user) => (
                                        <tr key={user.id} className="border-b border-zinc-100 dark:border-zinc-800">
                                            <td className="py-3">
                                                <div>
                                                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
                                                    <p className="text-xs text-zinc-500">{user.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-3"><StatusBadge status={user.role} /></td>
                                            <td className="py-3 text-zinc-500 dark:text-zinc-400">{new Date(user.created_at).toLocaleDateString('id-ID')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Kegiatan */}
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Kegiatan Terbaru</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                                        <th className="pb-3 text-left font-medium text-zinc-500 dark:text-zinc-400">Judul</th>
                                        <th className="pb-3 text-left font-medium text-zinc-500 dark:text-zinc-400">Status</th>
                                        <th className="pb-3 text-left font-medium text-zinc-500 dark:text-zinc-400">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentKegiatan.map((k) => (
                                        <tr key={k.id} className="border-b border-zinc-100 dark:border-zinc-800">
                                            <td className="py-3">
                                                <div>
                                                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{k.judul}</p>
                                                    <p className="text-xs text-zinc-500">{k.organisasi?.name}</p>
                                                </div>
                                            </td>
                                            <td className="py-3"><StatusBadge status={k.status} /></td>
                                            <td className="py-3 text-zinc-500 dark:text-zinc-400">{new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</td>
                                        </tr>
                                    ))}
                                    {recentKegiatan.length === 0 && (
                                        <tr><td colSpan={3} className="py-6 text-center text-zinc-400">Belum ada kegiatan</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
