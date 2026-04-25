<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminKegiatanController extends Controller
{
    public function index(Request $request)
    {
        $query = Kegiatan::with(['organisasi:id,name', 'creator:id,name']);

        if ($request->filled('search')) {
            $query->where('judul', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $kegiatans = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('admin/kegiatan/index', [
            'kegiatans' => $kegiatans,
            'filters' => $request->only(['search', 'status']),
        ]);
    }
}
