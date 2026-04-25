import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
interface Org { id: number; name: string; }
const breadcrumbs = [{ title: 'Pengurus Dashboard', href: '/pengurus/dashboard' }, { title: 'Kegiatan', href: '/pengurus/kegiatan' }, { title: 'Buat', href: '#' }];

export default function KegiatanCreate({ organisasis }: { organisasis: Org[] }) {
    const { data, setData, post, processing, errors } = useForm({ organisasi_id: organisasis[0]?.id?.toString() || '', judul: '', deskripsi: '', tanggal_mulai: '', tanggal_selesai: '', lokasi: '', status: 'draft' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Kegiatan" />
            <div className="mx-auto max-w-3xl p-4 md:p-6">
                <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">Buat Kegiatan Baru</h1>
                <form onSubmit={(e) => {
 e.preventDefault(); post('/pengurus/kegiatan'); 
}} className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Organisasi *</label><select value={data.organisasi_id} onChange={(e) => setData('organisasi_id', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">{organisasis.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select>{errors.organisasi_id && <p className="mt-1 text-xs text-red-500">{errors.organisasi_id}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Judul *</label><input type="text" value={data.judul} onChange={(e) => setData('judul', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.judul && <p className="mt-1 text-xs text-red-500">{errors.judul}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tanggal Mulai *</label><input type="datetime-local" value={data.tanggal_mulai} onChange={(e) => setData('tanggal_mulai', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.tanggal_mulai && <p className="mt-1 text-xs text-red-500">{errors.tanggal_mulai}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Tanggal Selesai *</label><input type="datetime-local" value={data.tanggal_selesai} onChange={(e) => setData('tanggal_selesai', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.tanggal_selesai && <p className="mt-1 text-xs text-red-500">{errors.tanggal_selesai}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Lokasi *</label><input type="text" value={data.lokasi} onChange={(e) => setData('lokasi', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.lokasi && <p className="mt-1 text-xs text-red-500">{errors.lokasi}</p>}</div>
                        <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Status *</label><select value={data.status} onChange={(e) => setData('status', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"><option value="draft">Draft</option><option value="published">Published</option></select></div>
                    </div>
                    <div><label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Deskripsi *</label><textarea rows={5} value={data.deskripsi} onChange={(e) => setData('deskripsi', e.target.value)} className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />{errors.deskripsi && <p className="mt-1 text-xs text-red-500">{errors.deskripsi}</p>}</div>
                    <div className="flex items-center justify-end gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800"><Link href="/pengurus/kegiatan" className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300">Batal</Link><button type="submit" disabled={processing} className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan'}</button></div>
                </form>
            </div>
        </AppLayout>
    );
}
