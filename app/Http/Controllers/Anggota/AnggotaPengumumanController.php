<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaPengumumanController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $orgIds = $user->organisasis()->wherePivot('status', 'aktif')->pluck('organisasis.id');

        // Global + organisasi yang diikuti
        $query = Pengumuman::where(function ($q) use ($orgIds) {
            $q->whereNull('organisasi_id')
                ->orWhereIn('organisasi_id', $orgIds);
        })->with(['organisasi:id,name', 'creator:id,name']);

        if ($request->filled('search')) {
            $query->where('judul', 'like', '%'.$request->search.'%');
        }

        $pengumumans = $query->orderByDesc('is_pinned')->latest()->paginate(10)->withQueryString();

        return Inertia::render('anggota/pengumuman/index', [
            'pengumumans' => $pengumumans,
            'filters' => $request->only(['search']),
        ]);
    }
}
