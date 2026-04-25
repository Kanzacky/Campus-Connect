<?php

namespace App\Http\Controllers\Pengurus;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use App\Models\Organisasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengurusKegiatanController extends Controller
{
    private function getOrgIds(Request $request)
    {
        return $request->user()->organisasis()->wherePivot('status', 'aktif')->pluck('organisasis.id');
    }

    public function index(Request $request)
    {
        $orgIds = $this->getOrgIds($request);

        $query = Kegiatan::whereIn('organisasi_id', $orgIds)->with('organisasi:id,name');

        if ($request->filled('search')) {
            $query->where('judul', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $kegiatans = $query->latest()->paginate(10)->withQueryString();
        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        return Inertia::render('pengurus/kegiatan/index', [
            'kegiatans' => $kegiatans,
            'organisasis' => $organisasis,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(Request $request)
    {
        $orgIds = $this->getOrgIds($request);
        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        return Inertia::render('pengurus/kegiatan/create', [
            'organisasis' => $organisasis,
        ]);
    }

    public function store(Request $request)
    {
        $orgIds = $this->getOrgIds($request);

        $validated = $request->validate([
            'organisasi_id' => 'required|exists:organisasis,id|in:'.$orgIds->implode(','),
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'lokasi' => 'required|string|max:255',
            'status' => 'required|in:draft,published',
        ]);

        $validated['created_by'] = auth()->id();

        Kegiatan::create($validated);

        return redirect()->route('pengurus.kegiatan.index')
            ->with('success', 'Kegiatan berhasil dibuat.');
    }

    public function edit(Request $request, Kegiatan $kegiatan)
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($kegiatan->organisasi_id)) {
            abort(403);
        }

        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        return Inertia::render('pengurus/kegiatan/edit', [
            'kegiatan' => $kegiatan,
            'organisasis' => $organisasis,
        ]);
    }

    public function update(Request $request, Kegiatan $kegiatan)
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($kegiatan->organisasi_id)) {
            abort(403);
        }

        $validated = $request->validate([
            'organisasi_id' => 'required|exists:organisasis,id|in:'.$orgIds->implode(','),
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'lokasi' => 'required|string|max:255',
            'status' => 'required|in:draft,published,selesai',
        ]);

        $kegiatan->update($validated);

        return redirect()->route('pengurus.kegiatan.index')
            ->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy(Request $request, Kegiatan $kegiatan)
    {
        $orgIds = $this->getOrgIds($request);

        if (! $orgIds->contains($kegiatan->organisasi_id)) {
            abort(403);
        }

        $kegiatan->delete();

        return redirect()->route('pengurus.kegiatan.index')
            ->with('success', 'Kegiatan berhasil dihapus.');
    }
}
