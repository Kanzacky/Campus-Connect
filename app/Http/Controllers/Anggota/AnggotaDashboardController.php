<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Organisasi yang diikuti
        $organisasiSaya = $user->organisasis()
            ->wherePivot('status', 'aktif')
            ->withCount('anggotaAktif')
            ->get();

        $orgIds = $organisasiSaya->pluck('id');

        // Kegiatan mendatang dari organisasi yang diikuti
        $kegiatanMendatang = Kegiatan::whereIn('organisasi_id', $orgIds)
            ->where('tanggal_mulai', '>=', now())
            ->where('status', 'published')
            ->with('organisasi:id,name')
            ->orderBy('tanggal_mulai')
            ->take(5)
            ->get();

        // Pengumuman terbaru (global + dari organisasi yang diikuti)
        $pengumumanTerbaru = Pengumuman::where(function ($q) use ($orgIds) {
            $q->whereNull('organisasi_id')
                ->orWhereIn('organisasi_id', $orgIds);
        })
            ->with('organisasi:id,name')
            ->latest()
            ->take(5)
            ->get();

        // Pending applications
        $pendingOrgs = $user->organisasis()
            ->wherePivot('status', 'pending')
            ->get(['organisasis.id', 'organisasis.name']);

        return Inertia::render('anggota/dashboard', [
            'organisasiSaya' => $organisasiSaya,
            'kegiatanMendatang' => $kegiatanMendatang,
            'pengumumanTerbaru' => $pengumumanTerbaru,
            'pendingOrgs' => $pendingOrgs,
        ]);
    }
}
