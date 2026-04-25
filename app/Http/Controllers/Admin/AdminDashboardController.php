<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\Organisasi;
use App\Models\Pengumuman;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $totalAdmin = User::where('role', 'admin')->count();
        $totalPengurus = User::where('role', 'pengurus')->count();
        $totalAnggota = User::where('role', 'anggota')->count();
        $totalOrganisasi = Organisasi::count();
        $organisasiAktif = Organisasi::where('status', 'aktif')->count();
        $totalKegiatan = Kegiatan::count();
        $kegiatanBulanIni = Kegiatan::whereMonth('tanggal_mulai', now()->month)
            ->whereYear('tanggal_mulai', now()->year)
            ->count();
        $totalPengumuman = Pengumuman::count();
        $pendaftarBaru = User::where('created_at', '>=', now()->subDays(7))->count();

        // Recent activity
        $recentUsers = User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']);
        $recentKegiatan = Kegiatan::with('organisasi:id,name')
            ->latest()
            ->take(5)
            ->get(['id', 'judul', 'organisasi_id', 'status', 'tanggal_mulai', 'created_at']);

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalAdmin' => $totalAdmin,
                'totalPengurus' => $totalPengurus,
                'totalAnggota' => $totalAnggota,
                'totalOrganisasi' => $totalOrganisasi,
                'organisasiAktif' => $organisasiAktif,
                'totalKegiatan' => $totalKegiatan,
                'kegiatanBulanIni' => $kegiatanBulanIni,
                'totalPengumuman' => $totalPengumuman,
                'pendaftarBaru' => $pendaftarBaru,
            ],
            'recentUsers' => $recentUsers,
            'recentKegiatan' => $recentKegiatan,
        ]);
    }
}
