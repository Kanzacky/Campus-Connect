<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaKegiatanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $orgIds = $user->organisasis()->wherePivot('status', 'aktif')->pluck('organisasis.id');

        $query = Kegiatan::whereIn('organisasi_id', $orgIds)
            ->where('status', 'published')
            ->with('organisasi:id,name');

        if ($request->filled('search')) {
            $query->where('judul', 'like', '%'.$request->search.'%');
        }

        $kegiatans = $query->orderBy('tanggal_mulai', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('anggota/kegiatan/index', [
            'kegiatans' => $kegiatans,
            'filters' => $request->only(['search']),
        ]);
    }
}
