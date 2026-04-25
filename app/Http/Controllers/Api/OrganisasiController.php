<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrganisasiResource;
use App\Models\Organisasi;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrganisasiController extends Controller
{
    /**
     * Menampilkan daftar semua Organisasi/UKM.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Organisasi::where('status', 'aktif')->withCount('anggotaAktif');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return OrganisasiResource::collection(
            $query->latest()->paginate($request->input('per_page', 15))
        );
    }

    /**
     * Menampilkan detail spesifik satu UKM berdasarkan ID.
     */
    public function show(Organisasi $organisasi): OrganisasiResource
    {
        $organisasi->loadCount('anggotaAktif')
            ->load(['kegiatans' => fn ($q) => $q->where('status', 'published')->latest()->take(5)]);

        return new OrganisasiResource($organisasi);
    }
}
