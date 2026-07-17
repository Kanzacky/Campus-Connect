<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PengumumanResource;
use App\Models\Organisasi;
use App\Models\Pengumuman;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PengurusPengumumanController extends Controller
{
    private function getOrgIds(Request $request)
    {
        return $request->user()->organisasis()->wherePivot('status', 'aktif')->pluck('organisasis.id');
    }

    public function index(Request $request): JsonResponse
    {
        $orgIds = $this->getOrgIds($request);

        $query = Pengumuman::where(function ($q) use ($orgIds) {
            $q->whereNull('organisasi_id')
                ->orWhereIn('organisasi_id', $orgIds);
        })->with('organisasi:id,name');

        if ($request->filled('search')) {
            $query->where('judul', 'like', '%'.$request->search.'%');
        }

        $pengumumans = $query->latest()->paginate($request->input('per_page', 10));
        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        return response()->json([
            'success' => true,
            'data' => [
                'pengumumans' => $pengumumans,
                'organisasis' => $organisasis,
                'filters' => $request->only(['search']),
            ],
        ]);
    }

    public function show(Pengumuman $pengumuman, Request $request): JsonResponse
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($pengumuman->organisasi_id)) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        return response()->json([
            'success' => true,
            'data' => new PengumumanResource($pengumuman->load('organisasi:id,name')),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $orgIds = $this->getOrgIds($request);

        $validated = $request->validate([
            'organisasi_id' => 'required|exists:organisasis,id|in:'.$orgIds->implode(','),
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'is_pinned' => 'boolean',
        ]);

        $validated['created_by'] = auth()->id();

        $pengumuman = Pengumuman::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pengumuman berhasil dibuat.',
            'data' => new PengumumanResource($pengumuman->load('organisasi:id,name')),
        ], 201);
    }

    public function update(Request $request, Pengumuman $pengumuman): JsonResponse
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($pengumuman->organisasi_id)) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'is_pinned' => 'boolean',
        ]);

        $pengumuman->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Pengumuman berhasil diperbarui.',
            'data' => new PengumumanResource($pengumuman->fresh()->load('organisasi:id,name')),
        ]);
    }

    public function destroy(Request $request, Pengumuman $pengumuman): JsonResponse
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($pengumuman->organisasi_id)) {
            return response()->json(['success' => false, 'message' => 'Forbidden.'], 403);
        }

        $pengumuman->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pengumuman berhasil dihapus.',
        ]);
    }
}
