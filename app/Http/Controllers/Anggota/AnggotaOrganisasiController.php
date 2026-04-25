<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Models\Organisasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnggotaOrganisasiController extends Controller
{
    public function index(Request $request)
    {
        $query = Organisasi::where('status', 'aktif')->withCount('anggotaAktif');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $organisasis = $query->latest()->paginate(12)->withQueryString();
        $categories = Organisasi::where('status', 'aktif')->distinct()->pluck('category');

        // User's membership status for each org
        $userMemberships = DB::table('anggota_organisasi')
            ->where('user_id', auth()->id())
            ->pluck('status', 'organisasi_id');

        return Inertia::render('anggota/organisasi/index', [
            'organisasis' => $organisasis,
            'categories' => $categories,
            'userMemberships' => $userMemberships,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function show($id)
    {
        $organisasi = Organisasi::where('status', 'aktif')
            ->withCount('anggotaAktif')
            ->with(['kegiatans' => function ($q) {
                $q->where('status', 'published')->latest()->take(5);
            }])
            ->findOrFail($id);

        $membershipStatus = DB::table('anggota_organisasi')
            ->where('user_id', auth()->id())
            ->where('organisasi_id', $id)
            ->value('status');

        return Inertia::render('anggota/organisasi/show', [
            'organisasi' => $organisasi,
            'membershipStatus' => $membershipStatus,
        ]);
    }

    public function join(Request $request, $id)
    {
        $organisasi = Organisasi::where('status', 'aktif')->findOrFail($id);

        $exists = DB::table('anggota_organisasi')
            ->where('user_id', auth()->id())
            ->where('organisasi_id', $id)
            ->exists();

        if ($exists) {
            return back()->with('error', 'Anda sudah terdaftar di organisasi ini.');
        }

        DB::table('anggota_organisasi')->insert([
            'user_id' => auth()->id(),
            'organisasi_id' => $id,
            'jabatan' => 'Anggota',
            'status' => 'pending',
            'bergabung_pada' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return back()->with('success', 'Pendaftaran berhasil! Menunggu persetujuan pengurus.');
    }

    public function leave($id)
    {
        DB::table('anggota_organisasi')
            ->where('user_id', auth()->id())
            ->where('organisasi_id', $id)
            ->delete();

        return back()->with('success', 'Anda telah keluar dari organisasi.');
    }
}
