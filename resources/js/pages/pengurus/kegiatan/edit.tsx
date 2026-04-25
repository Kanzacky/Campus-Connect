import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
interface Org { id: number; name: string; }
interface Kegiatan { id: number; organisasi_id: number; judul: string; deskripsi: string; tanggal_mulai: string; tanggal_selesai: string; lokasi: string; status: string; }
const breadcrumbs = [{ title: 'Pengurus Dashboard', href: '/pengurus/dashboard' }, { title: 'Kegiatan', href: '/pengurus/kegiatan' }, { title: 'Edit', href: '#' }];

export default function KegiatanEdit({ kegiatan, organisasis }: { kegiatan: Kegiatan; organisasis: Org[] }) {
    const fmt = (d: string) => d ? new Date(d).toISOString().slice(0, 16) : '';
    const { data, setData, put, processing, errors } = useForm({ organisasi_id: kegiatan.organisasi_id.toString(), judul: kegiatan.judul, deskripsi: kegiatan.deskripsi, tanggal_mulai: fmt(kegiatan.tanggal_mulai), tanggal_selesai: fmt(kegiatan.tanggal_selesai), lokasi: kegiatan.lokasi, status: kegiatan.status });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Kegiatan" />
            <div className="mx-auto max-w-3xl p-4 md:p-6">
                <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Edit Kegiatan</h1>
                <form onSubmit={(e) => {
 e.preventDefault(); put(`/pengurus/kegiatan/${kegiatan.id}`); 
}} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Organisasi</label><select value={data.organisasi_id} onChange={(e) => setData('organisasi_id', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">{organisasis.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Judul *</label><input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.judul && <p className="mt-1 text-xs text-red-500">{errors.judul}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tanggal Mulai *</label><input type="datetime-local" value={data.tanggal_mulai} onChange={(e) => setData('tanggal_mulai', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tanggal Selesai *</label><input type="datetime-local" value={data.tanggal_selesai} onChange={(e) => setData('tanggal_selesai', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Lokasi *</label><input type="text" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Status *</label><select value={data.status} onChange={(e) => setData('status', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"><option value="draft">Draft</option><option value="published">Published</option><option value="selesai">Selesai</option></select></div>
                    </div>
                    <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Deskripsi *</label><textarea rows={5} value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" /></div>
                    <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800"><Link href="/pengurus/kegiatan" className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300">Batal</Link><button type="submit" disabled={processing} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Perbarui'}</button></div>
                </form>
            </div>
        </AppLayout>
    );
}
