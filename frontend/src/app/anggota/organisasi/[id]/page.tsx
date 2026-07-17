'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '@/layouts/app-layout';
import { useAuth } from '@/hooks/use-auth';
import { anggotaApi } from '@/lib/api';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Organisasi } from '@/types';

type Member = {
  id: number;
  name: string;
  nim: string | null;
  jurusan: string | null;
  jabatan: string;
  bergabung_pada: string;
};

export default function AnggotaOrganisasiDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [organisasi, setOrganisasi] = useState<Organisasi | null>(null);
  const [membershipStatus, setMembershipStatus] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    anggotaApi.organisasi
      .show(Number(id))
      .then((res) => {
        const payload = res.data as any;
        setOrganisasi(payload?.organisasi);
        setMembershipStatus(payload?.membershipStatus);
        setMembers(payload?.members || []);
      })
      .catch(() => {
        router.replace('/anggota/organisasi');
      })
      .finally(() => setLoading(false));
  }, [authLoading, isAuthenticated, id, router]);

  if (authLoading || loading) {
    return (
      <AppLayout breadcrumbs={[{ title: 'Organisasi', href: '/anggota/organisasi' }]}>
        <div className="flex min-h-[50vh] items-center justify-center p-6">
          <Spinner className="h-8 w-8 text-zinc-400" />
        </div>
      </AppLayout>
    );
  }

  if (!organisasi) return null;

  const breadcrumbs = [
    { title: 'Organisasi', href: '/anggota/organisasi' },
    { title: organisasi.name, href: `/anggota/organisasi/${id}` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{organisasi.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{organisasi.category}</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/anggota/organisasi">Kembali</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Deskripsi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-300">
              {(organisasi as any).deskripsi || 'Tidak ada deskripsi.'}
            </p>
          </CardContent>
        </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Anggota</CardTitle>
            </CardHeader>
            <CardContent>
              {members.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b bg-zinc-50 text-xs font-semibold uppercase text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
                      <tr>
                        <th className="px-4 py-3">Nama</th>
                        <th className="px-4 py-3">NIM / Jurusan</th>
                        <th className="px-4 py-3">Jabatan</th>
                        <th className="px-4 py-3">Bergabung Sejak</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {members.map((member) => (
                        <tr key={member.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                          <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                            {member.name}
                          </td>
                          <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                            {member.nim || '-'} <br />
                            <span className="text-xs text-zinc-400">{member.jurusan}</span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={member.jabatan === 'Pengurus' ? 'default' : 'secondary'}>
                              {member.jabatan}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                            {member.bergabung_pada ? new Date(member.bergabung_pada).toLocaleDateString('id-ID') : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Belum ada anggota yang aktif.</p>
              )}
            </CardContent>
          </Card>
      </div>
    </AppLayout>
  );
}
