<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organisasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrganisasiController extends Controller
{
    public function index(Request $request)
    {
        $query = Organisasi::withCount('anggotaAktif');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $organisasis = $query->latest()->paginate(10)->withQueryString();
        $categories = Organisasi::distinct()->pluck('category');

        return Inertia::render('admin/organisasi/index', [
            'organisasis' => $organisasis,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'status']),
        ]);
    }

    public function create()
    {
        $categories = Organisasi::distinct()->pluck('category');

        return Inertia::render('admin/organisasi/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'ketua' => 'required|string|max:255',
            'visi' => 'required|string',
            'misi' => 'required|string',
            'deskripsi' => 'nullable|string',
            'kontak' => 'nullable|string|max:255',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        Organisasi::create($validated);

        return redirect()->route('admin.organisasi.index')
            ->with('success', 'Organisasi berhasil ditambahkan.');
    }

    public function edit(Organisasi $organisasi)
    {
        $categories = Organisasi::distinct()->pluck('category');

        return Inertia::render('admin/organisasi/edit', [
            'organisasi' => $organisasi,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Organisasi $organisasi)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'ketua' => 'required|string|max:255',
            'visi' => 'required|string',
            'misi' => 'required|string',
            'deskripsi' => 'nullable|string',
            'kontak' => 'nullable|string|max:255',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $organisasi->update($validated);

        return redirect()->route('admin.organisasi.index')
            ->with('success', 'Organisasi berhasil diperbarui.');
    }

    public function destroy(Organisasi $organisasi)
    {
        $organisasi->delete();

        return redirect()->route('admin.organisasi.index')
            ->with('success', 'Organisasi berhasil dihapus.');
    }
}
