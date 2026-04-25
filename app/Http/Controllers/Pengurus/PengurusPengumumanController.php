<?php

namespace App\Http\Controllers\Pengurus;

use App\Http\Controllers\Controller;
use App\Models\Organisasi;
use App\Models\Pengumuman;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengurusPengumumanController extends Controller
{
    private function getOrgIds(Request $request)
    {
        return $request->user()->organisasis()->wherePivot('status', 'aktif')->pluck('organisasis.id');
    }

    public function index(Request $request)
    {
        $orgIds = $this->getOrgIds($request);

        $query = Pengumuman::whereIn('organisasi_id', $orgIds)->with('organisasi:id,name');

        if ($request->filled('search')) {
            $query->where('judul', 'like', '%'.$request->search.'%');
        }

        $pengumumans = $query->latest()->paginate(10)->withQueryString();
        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        return Inertia::render('pengurus/pengumuman/index', [
            'pengumumans' => $pengumumans,
            'organisasis' => $organisasis,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(Request $request)
    {
        $orgIds = $this->getOrgIds($request);
        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        return Inertia::render('pengurus/pengumuman/create', [
            'organisasis' => $organisasis,
        ]);
    }

    public function store(Request $request)
    {
        $orgIds = $this->getOrgIds($request);

        $validated = $request->validate([
            'organisasi_id' => 'required|exists:organisasis,id|in:'.$orgIds->implode(','),
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'is_pinned' => 'boolean',
        ]);

        $validated['created_by'] = auth()->id();

        Pengumuman::create($validated);

        return redirect()->route('pengurus.pengumuman.index')
            ->with('success', 'Pengumuman berhasil dibuat.');
    }

    public function edit(Request $request, Pengumuman $pengumuman)
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($pengumuman->organisasi_id)) {
            abort(403);
        }

        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        return Inertia::render('pengurus/pengumuman/edit', [
            'pengumuman' => $pengumuman,
            'organisasis' => $organisasis,
        ]);
    }

    public function update(Request $request, Pengumuman $pengumuman)
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($pengumuman->organisasi_id)) {
            abort(403);
        }

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'is_pinned' => 'boolean',
        ]);

        $pengumuman->update($validated);

        return redirect()->route('pengurus.pengumuman.index')
            ->with('success', 'Pengumuman berhasil diperbarui.');
    }

    public function destroy(Request $request, Pengumuman $pengumuman)
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($pengumuman->organisasi_id)) {
            abort(403);
        }

        $pengumuman->delete();

        return redirect()->route('pengurus.pengumuman.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }
}
