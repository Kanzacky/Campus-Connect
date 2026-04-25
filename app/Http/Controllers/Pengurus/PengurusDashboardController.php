<?php

namespace App\Http\Controllers\Pengurus;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\Organisasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengurusDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Organisasi yang dikelola pengurus ini
        $organisasis = $user->organisasis()
            ->wherePivot('status', 'aktif')
            ->withCount(['anggotaAktif', 'pendaftar', 'kegiatans', 'pengumumans'])
            ->get();

        $orgIds = $organisasis->pluck('id');

        // Kegiatan mendatang
        $kegiatanMendatang = Kegiatan::whereIn('organisasi_id', $orgIds)
            ->where('tanggal_mulai', '>=', now())
            ->where('status', 'published')
            ->with('organisasi:id,name')
            ->orderBy('tanggal_mulai')
            ->take(5)
            ->get();

        // Pendaftar terbaru
        $pendaftarBaru = collect();
        foreach ($organisasis as $org) {
            $pending = $org->pendaftar()
                ->select('users.id', 'users.name', 'users.email', 'users.nim')
                ->latest('anggota_organisasi.created_at')
                ->take(5)
                ->get()
                ->map(fn ($u) => [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'nim' => $u->nim,
                    'organisasi' => $org->name,
                    'organisasi_id' => $org->id,
                ]);
            $pendaftarBaru = $pendaftarBaru->merge($pending);
        }

        return Inertia::render('pengurus/dashboard', [
            'organisasis' => $organisasis,
            'kegiatanMendatang' => $kegiatanMendatang,
            'pendaftarBaru' => $pendaftarBaru->take(10)->values(),
        ]);
    }
}
