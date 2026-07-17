'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '@/layouts/app-layout';
import { useAuth } from '@/hooks/use-auth';
import { adminApi } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Kegiatan, PaginatedResponse } from '@/types';

const breadcrumbs = [{ title: 'Kegiatan', href: '/admin/kegiatan' }];

export default function AdminKegiatanPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [items, setItems] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(true);

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

    const fetchKegiatan = () => {
      adminApi.kegiatan
        .list({ per_page: 50 })
        .then((res) => {
          const payload = res.data as any;
          const paginated = payload?.kegiatans as PaginatedResponse<Kegiatan> | undefined;
          const list = Array.isArray(paginated?.data) ? paginated.data : [];
          setItems(list);
        })
        .finally(() => setLoading(false));
    };

    fetchKegiatan();

    const intervalId = setInterval(() => {
      fetchKegiatan();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [authLoading, isAuthenticated, user, router]);

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
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Kegiatan</h1>
          <Link href="/admin" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
            Kembali ke dashboard
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((k) => (
            <Card key={k.id} className="py-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start justify-between gap-3">
                  <span className="line-clamp-2">{k.judul}</span>
                  <Badge variant={k.status === 'published' ? 'secondary' : k.status === 'selesai' ? 'outline' : 'default'} className="capitalize">
                    {k.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Organisasi</span>
                    <span className="font-medium">{k.organisasi?.name || '-'}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Mulai</span>
                    <span className="font-medium">{new Date(k.tanggal_mulai).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {items.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Belum ada data kegiatan.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

