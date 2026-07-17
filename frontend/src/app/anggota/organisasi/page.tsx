'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '@/layouts/app-layout';
import { useAuth } from '@/hooks/use-auth';
import { anggotaApi } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Organisasi, PaginatedResponse } from '@/types';

const breadcrumbs = [{ title: 'Organisasi', href: '/anggota/organisasi' }];

export default function AnggotaOrganisasiPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [items, setItems] = useState<Organisasi[]>([]);
  const [memberships, setMemberships] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const prevStatus = useRef<Record<number, string>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const fetchOrganisasi = useCallback(() => {
    anggotaApi.organisasi
      .list({ per_page: 50 })
      .then((res) => {
        const payload = res.data as any;
        const paginated = payload?.organisasis as PaginatedResponse<Organisasi> | undefined;
        const list = Array.isArray(paginated?.data) ? paginated.data : [];
        setItems(list);
        
        const currentStatus = payload?.userMemberships || {};
        if (Object.keys(prevStatus.current).length > 0) {
          for (const orgId in currentStatus) {
            if (prevStatus.current[orgId] === 'pending' && currentStatus[orgId] === 'aktif') {
              showToast('🎉 Selamat! Anda telah diterima di organisasi.');
            } else if (prevStatus.current[orgId] === 'pending' && currentStatus[orgId] === 'ditolak') {
              showToast('❌ Maaf, pendaftaran Anda ditolak.');
            }
          }
        }
        prevStatus.current = currentStatus;
        setMemberships(currentStatus);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    fetchOrganisasi();

    // Short Polling: Tarik data otomatis setiap 3 detik
    const intervalId = setInterval(() => {
      fetchOrganisasi();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [authLoading, isAuthenticated, router, fetchOrganisasi]);

  const handleJoin = async (id: number) => {
    try {
      setActionLoading(id);
      await anggotaApi.organisasi.join(id);
      fetchOrganisasi();
    } catch (error: any) {
      console.error(error);
      alert(error?.data?.message || 'Gagal mendaftar organisasi');
    } finally {
      setActionLoading(null);
    }
  };

  const handleLeave = async (id: number) => {
    if (!window.confirm('Yakin ingin keluar / membatalkan pendaftaran dari organisasi ini?')) return;
    try {
      setActionLoading(id);
      await anggotaApi.organisasi.leave(id);
      fetchOrganisasi();
    } catch (error: any) {
      console.error(error);
      alert(error?.data?.message || 'Gagal keluar dari organisasi');
    } finally {
      setActionLoading(null);
    }
  };

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
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Organisasi & UKM</h1>
          <Link href="/anggota/dashboard" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
            Kembali ke dashboard
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((org) => {
            const status = memberships[org.id];
            
            return (
              <Card key={org.id} className="py-0 flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2">{org.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-6 flex-grow">
                  <div className="text-sm text-zinc-600 dark:text-zinc-300">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Kategori</span>
                      <span className="font-medium">{org.category}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 flex flex-col gap-2">
                  <Button asChild variant="ghost" className="w-full text-indigo-600 dark:text-indigo-400">
                    <Link href={`/anggota/organisasi/${org.id}`}>Lihat Detail</Link>
                  </Button>
                  {status === 'aktif' ? (
                    <Button 
                      variant="destructive" 
                      className="w-full" 
                      onClick={() => handleLeave(org.id)}
                      disabled={actionLoading === org.id}
                    >
                      {actionLoading === org.id ? <Spinner className="mr-2 h-4 w-4" /> : null}
                      Keluar dari Organisasi
                    </Button>
                  ) : status === 'pending' ? (
                    <Button 
                      variant="outline" 
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20" 
                      onClick={() => handleLeave(org.id)}
                      disabled={actionLoading === org.id}
                    >
                      {actionLoading === org.id ? <Spinner className="mr-2 h-4 w-4" /> : null}
                      Batalkan Pendaftaran
                    </Button>
                  ) : status === 'ditolak' ? (
                    <Button 
                      variant="outline" 
                      className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:border-indigo-900/50 dark:hover:bg-indigo-900/20"
                      onClick={() => handleJoin(org.id)}
                      disabled={actionLoading === org.id}
                    >
                      {actionLoading === org.id ? <Spinner className="mr-2 h-4 w-4" /> : null}
                      Daftar Ulang
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleJoin(org.id)}
                      disabled={actionLoading === org.id}
                    >
                      {actionLoading === org.id ? <Spinner className="mr-2 h-4 w-4" /> : null}
                      Daftar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}

          {items.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Belum ada data organisasi.
            </div>
          )}
        </div>
      </div>

    </AppLayout>
  );
}

