import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';

interface User { id: number; name: string; email: string; role: string; nim: string; jurusan: string; angkatan: string; created_at: string; }
interface Props { users: { data: User[]; links: Array<{ url: string | null; label: string; active: boolean }> }; filters: { search?: string; role?: string }; flash: { success?: string; error?: string }; }

const breadcrumbs = [{ title: 'Admin Dashboard', href: '/admin' }, { title: 'Users', href: '/admin/users' }];

export default function UsersIndex() {
    const { users, filters, flash } = usePage().props as unknown as Props;
    const [search, setSearch] = useState(filters.search || '');

    function handleSearch(e: React.FormEvent) {
 e.preventDefault(); router.get('/admin/users', { search, role: filters.role }, { preserveState: true }); 
}
    function handleDelete(id: number, name: string) {
 if (confirm(`Yakin ingin menghapus "${name}"?`)) {
 router.delete(`/admin/users/${id}`); 
} 
}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kelola Users" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Kelola Users</h1>
                    <Link href="/admin/users/create" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"><Plus className="h-4 w-4" /> Tambah User</Link>
                </div>
                {flash?.success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">{flash.success}</div>}
                {flash?.error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">{flash.error}</div>}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" /><input type="text" placeholder="Cari nama, email, NIM..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <button type="submit" className="rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">Cari</button>
                    </form>
                    <select value={filters.role || ''} onChange={(e) => router.get('/admin/users', { ...filters, role: e.target.value }, { preserveState: true })} className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                        <option value="">Semua Role</option>
                        <option value="admin">Admin</option>
                        <option value="pengurus">Pengurus</option>
                        <option value="anggota">Anggota</option>
                    </select>
                </div>
                <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <table className="w-full text-sm">
                        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                            <tr>
                                <th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Nama</th>
                                <th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">NIM</th>
                                <th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Jurusan</th>
                                <th className="px-6 py-3.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Role</th>
                                <th className="px-6 py-3.5 text-right font-medium text-zinc-500 dark:text-zinc-400">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                                    <td className="px-6 py-4"><div><p className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p><p className="text-xs text-zinc-500">{user.email}</p></div></td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{user.nim || '-'}</td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{user.jurusan || '-'}</td>
                                    <td className="px-6 py-4"><span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${user.role === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : user.role === 'pengurus' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{user.role}</span></td>
                                    <td className="px-6 py-4 text-right"><div className="flex items-center justify-end gap-2"><Link href={`/admin/users/${user.id}/edit`} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-indigo-600 dark:hover:bg-zinc-800"><Pencil className="h-4 w-4" /></Link><button onClick={() => handleDelete(user.id, user.name)} className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"><Trash2 className="h-4 w-4" /></button></div></td>
                                </tr>
                            ))}
                            {users.data.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-zinc-400">Tidak ada data</td></tr>}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-center gap-1 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
                        {users.links.map((link, i) => <Link key={i} href={link.url || '#'} className={`rounded-lg px-3 py-1.5 text-sm ${link.active ? 'bg-indigo-600 text-white' : link.url ? 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400' : 'cursor-not-allowed text-zinc-300'}`} dangerouslySetInnerHTML={{ __html: link.label }} preserveState />)}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
