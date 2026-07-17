'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '@/layouts/app-layout';
import { useAuth } from '@/hooks/use-auth';
import { adminApi } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PaginatedResponse, Pengumuman } from '@/types';

const breadcrumbs = [{ title: 'Pengumuman', href: '/admin/pengumuman' }];

export default function AdminPengumumanPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [items, setItems] = useState<Pengumuman[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const prevFirstId = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const fetchPengumuman = () => {
    adminApi.pengumuman
      .list({ per_page: 50 })
      .then((res) => {
        const payload = res.data as any;
        const paginated = payload?.pengumumans as PaginatedResponse<Pengumuman> | undefined;
        const list = Array.isArray(paginated?.data) ? paginated.data : [];
        
        const firstId = list.length > 0 ? list[0].id : null;
        if (prevFirstId.current !== null && firstId !== null && firstId !== prevFirstId.current) {
          showToast('📢 Pengumuman Baru: ' + list[0].judul);
        }
        prevFirstId.current = firstId;

        setItems(list);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (user?.role !== 'admin') {
      router.replace('/dashboard');
      return;
    }

    fetchPengumuman();

    // Short Polling: Tarik data otomatis setiap 3 detik
    const intervalId = setInterval(() => {
      fetchPengumuman();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [authLoading, isAuthenticated, user, router]);

  async function handleDelete(id: number) {
    if (busyId) return;
    const ok = window.confirm('Hapus pengumuman ini?');
    if (!ok) return;
    try {
      setBusyId(id);
      await adminApi.pengumuman.destroy(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } finally {
      setBusyId(null);
    }
  }

  if (authLoading || loading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="flex min-h-[50vh] items-center justify-center p-6">
          <Spinner className="h-8 w-8 text-zinc-400" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Pengumuman</h1>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/admin/pengumuman/create">Tambah Pengumuman</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin">Kembali</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Card key={p.id} className="py-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start justify-between gap-3">
                  <span className="line-clamp-2">{p.judul}</span>
                  {p.is_pinned ? <Badge variant="secondary">Pinned</Badge> : <Badge variant="outline">Normal</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Organisasi</span>
                    <span className="font-medium">{p.organisasi?.name || 'Global'}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Tanggal</span>
                    <span className="font-medium">{new Date(p.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                  <p className="mt-3 line-clamp-3 text-xs text-zinc-500 dark:text-zinc-400">{p.konten}</p>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/pengumuman/${p.id}/edit`}>Edit</Link>
                  </Button>
                  <Button size="sm" variant="destructive" disabled={busyId === p.id} onClick={() => handleDelete(p.id)}>
                    {busyId === p.id ? 'Menghapus…' : 'Hapus'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {items.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Belum ada data pengumuman.
            </div>
          )}
        </div>
      </div>

    </AppLayout>
  );
}

