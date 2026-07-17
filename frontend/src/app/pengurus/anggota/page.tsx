'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '@/layouts/app-layout';
import { useAuth } from '@/hooks/use-auth';
import { pengurusApi } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type OrganisasiOption = { id: number; name: string };

type MembershipRow = {
  id: number;
  user_id: number;
  organisasi_id: number;
  jabatan: string;
  status: 'pending' | 'aktif' | 'ditolak';
  bergabung_pada: string | null;
  created_at: string;
  name: string;
  email: string;
  nim?: string | null;
  jurusan?: string | null;
  angkatan?: string | null;
};

const breadcrumbs = [{ title: 'Anggota', href: '/pengurus/anggota' }];

export default function PengurusAnggotaPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [organisasis, setOrganisasis] = useState<OrganisasiOption[]>([]);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'aktif' | 'ditolak'>('pending');
  const [items, setItems] = useState<MembershipRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const prevPendingCount = useRef<number>(-1);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = { per_page: 12 };
    if (selectedOrgId) params.organisasi_id = selectedOrgId;
    if (statusFilter !== 'all') params.status = statusFilter;
    return params;
  }, [selectedOrgId, statusFilter]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (user?.role !== 'pengurus') {
      router.replace('/dashboard');
      return;
    }

    const fetchAnggota = (showLoading = false) => {
      if (showLoading) setLoading(true);
      pengurusApi.anggota
        .list(queryParams)
        .then((res) => {
          const payload = res.data as any;
          const orgs = (payload?.organisasis || []) as OrganisasiOption[];
          setOrganisasis(orgs);

          const selected = typeof payload?.selectedOrgId === 'number' ? (payload.selectedOrgId as number) : null;
          setSelectedOrgId((prev) => prev ?? selected ?? (orgs[0]?.id ?? null));

          const paginated = payload?.anggota as { data?: MembershipRow[] } | undefined;
          const list = Array.isArray(paginated?.data) ? paginated.data : [];
          
          const currentPending = list.filter((x) => x.status === 'pending').length;
          if (prevPendingCount.current !== -1 && currentPending > prevPendingCount.current) {
            showToast('🔔 Ada pendaftar baru!');
          }
          prevPendingCount.current = currentPending;

          setItems(list);
        })
        .finally(() => {
          if (showLoading) setLoading(false);
        });
    };

    fetchAnggota(true);

    // Short Polling: Tarik data otomatis setiap 3 detik
    const intervalId = setInterval(() => {
      fetchAnggota(false);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [authLoading, isAuthenticated, user, router, queryParams]);

  async function handleApprove(id: number) {
    if (busyId) return;
    try {
      setBusyId(id);
      await pengurusApi.anggota.approve(id);
      setItems((prev) => prev.map((x) => (x.id === id ? { ...x, status: 'aktif' } : x)));
    } finally {
      setBusyId(null);
    }
  }

  async function handleReject(id: number) {
    if (busyId) return;
    const ok = window.confirm('Tolak pendaftaran ini?');
    if (!ok) return;
    try {
      setBusyId(id);
      await pengurusApi.anggota.reject(id);
      setItems((prev) => prev.map((x) => (x.id === id ? { ...x, status: 'ditolak' } : x)));
    } finally {
      setBusyId(null);
    }
  }

  async function handleRemove(id: number) {
    if (busyId) return;
    const ok = window.confirm('Hapus anggota ini dari organisasi?');
    if (!ok) return;
    try {
      setBusyId(id);
      await pengurusApi.anggota.remove(id);
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
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Anggota & Pendaftar</h1>
            <p className="text-sm text-muted-foreground">Kelola pendaftar (pending) dan anggota aktif di organisasi kamu.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/pengurus/dashboard">Kembali</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 rounded-xl border bg-card p-4 shadow-sm md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Organisasi</label>
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={selectedOrgId ?? ''}
              onChange={(e) => setSelectedOrgId(Number(e.target.value))}
            >
              {organisasis.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Status</label>
            <select
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="pending">Pending</option>
              <option value="aktif">Aktif</option>
              <option value="ditolak">Ditolak</option>
              <option value="all">Semua</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <Card key={m.id} className="py-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex flex-col gap-1">
                  <span className="line-clamp-1">{m.name}</span>
                  <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{m.email}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-sm text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">NIM</span>
                    <span className="font-medium">{m.nim || '-'}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Status</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      m.status === 'aktif'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : m.status === 'pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  {m.status === 'pending' && (
                    <>
                      <Button size="sm" disabled={busyId === m.id} onClick={() => handleApprove(m.id)}>
                        {busyId === m.id ? '...' : 'Terima'}
                      </Button>
                      <Button size="sm" variant="outline" disabled={busyId === m.id} onClick={() => handleReject(m.id)}>
                        Tolak
                      </Button>
                    </>
                  )}
                  {m.status === 'aktif' && (
                    <Button size="sm" variant="destructive" disabled={busyId === m.id} onClick={() => handleRemove(m.id)}>
                      Keluarkan
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {items.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Tidak ada data untuk filter ini.
            </div>
          )}
        </div>
      </div>

    </AppLayout>
  );
}

