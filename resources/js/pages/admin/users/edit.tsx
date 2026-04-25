import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface User { id: number; name: string; email: string; role: string; nim: string; jurusan: string; angkatan: string; no_hp: string; }
const breadcrumbs = [{ title: 'Admin Dashboard', href: '/admin' }, { title: 'Users', href: '/admin/users' }, { title: 'Edit', href: '#' }];

export default function UsersEdit({ editUser }: { editUser: User }) {
    const { data, setData, put, processing, errors } = useForm({ name: editUser.name, email: editUser.email, role: editUser.role, nim: editUser.nim || '', jurusan: editUser.jurusan || '', angkatan: editUser.angkatan || '', no_hp: editUser.no_hp || '', password: '', password_confirmation: '' });

    function handleSubmit(e: React.FormEvent) {
 e.preventDefault(); put(`/admin/users/${editUser.id}`); 
}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${editUser.name}`} />
            <div className="mx-auto max-w-3xl p-4 md:p-6">
                <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Edit User</h1>
                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nama *</label><input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email *</label><input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Role *</label><select value={data.role} onChange={(e) => setData('role', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"><option value="anggota">Anggota</option><option value="pengurus">Pengurus</option><option value="admin">Admin</option></select></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">NIM</label><input type="text" value={data.nim} onChange={(e) => setData('nim', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Jurusan</label><input type="text" value={data.jurusan} onChange={(e) => setData('jurusan', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Angkatan</label><input type="text" value={data.angkatan} onChange={(e) => setData('angkatan', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                    </div>
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20"><p className="text-sm text-amber-700 dark:text-amber-400">Kosongkan password jika tidak ingin mengubah.</p></div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password Baru</label><input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Konfirmasi Password</label><input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                    </div>
                    <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                        <Link href="/admin/users" className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300">Batal</Link>
                        <button type="submit" disabled={processing} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Perbarui'}</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
