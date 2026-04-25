import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Pengumuman { id: number; judul: string; konten: string; is_pinned: boolean; }
const breadcrumbs = [{ title: 'Admin Dashboard', href: '/admin' }, { title: 'Pengumuman', href: '/admin/pengumuman' }, { title: 'Edit', href: '#' }];

export default function PengumumanEdit({ pengumuman }: { pengumuman: Pengumuman }) {
    const { data, setData, put, processing, errors } = useForm({ judul: pengumuman.judul, konten: pengumuman.konten, is_pinned: pengumuman.is_pinned });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Pengumuman" />
            <div className="mx-auto max-w-3xl p-4 md:p-6">
                <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Edit Pengumuman</h1>
                <form onSubmit={(e) => {
 e.preventDefault(); put(`/admin/pengumuman/${pengumuman.id}`); 
}} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Judul *</label><input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.judul && <p className="mt-1 text-xs text-red-500">{errors.judul}</p>}</div>
                    <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Konten *</label><textarea rows={6} value={data.konten} onChange={(e) => setData('konten', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.konten && <p className="mt-1 text-xs text-red-500">{errors.konten}</p>}</div>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_pinned} onChange={(e) => setData('is_pinned', e.target.checked)} className="rounded border-zinc-300" /><span className="text-sm text-zinc-700 dark:text-zinc-300">Pin pengumuman ini</span></label>
                    <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                        <Link href="/admin/pengumuman" className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300">Batal</Link>
                        <button type="submit" disabled={processing} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Perbarui'}</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
