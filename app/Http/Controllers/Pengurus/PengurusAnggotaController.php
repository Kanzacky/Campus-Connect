<?php

namespace App\Http\Controllers\Pengurus;

use App\Http\Controllers\Controller;
use App\Models\Organisasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PengurusAnggotaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $orgIds = $user->organisasis()->wherePivot('status', 'aktif')->pluck('organisasis.id');

        $organisasis = Organisasi::whereIn('id', $orgIds)->get(['id', 'name']);

        // Filter by organisasi
        $selectedOrgId = $request->input('organisasi_id', $orgIds->first());

        $query = DB::table('anggota_organisasi')
            ->join('users', 'anggota_organisasi.user_id', '=', 'users.id')
            ->where('anggota_organisasi.organisasi_id', $selectedOrgId)
            ->select(
                'anggota_organisasi.id',
                'anggota_organisasi.user_id',
                'anggota_organisasi.organisasi_id',
                'anggota_organisasi.jabatan',
                'anggota_organisasi.status',
                'anggota_organisasi.bergabung_pada',
                'anggota_organisasi.created_at',
                'users.name',
                'users.email',
                'users.nim',
                'users.jurusan',
                'users.angkatan'
            );

        if ($request->filled('status')) {
            $query->where('anggota_organisasi.status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('users.name', 'like', "%{$search}%")
                    ->orWhere('users.nim', 'like', "%{$search}%");
            });
        }

        $anggota = $query->orderByDesc('anggota_organisasi.created_at')->paginate(10)->withQueryString();

        return Inertia::render('pengurus/anggota/index', [
            'anggota' => $anggota,
            'organisasis' => $organisasis,
            'selectedOrgId' => (int) $selectedOrgId,
            'filters' => $request->only(['search', 'status', 'organisasi_id']),
        ]);
    }

    public function approve(Request $request, $id)
    {
        $membership = DB::table('anggota_organisasi')->where('id', $id)->first();

        if (! $membership) {
            return back()->with('error', 'Data tidak ditemukan.');
        }

        // Verify pengurus manages this org
        $user = $request->user();
        $manages = $user->organisasis()->wherePivot('status', 'aktif')->where('organisasis.id', $membership->organisasi_id)->exists();

        if (! $manages) {
            return back()->with('error', 'Anda tidak memiliki akses.');
        }

        DB::table('anggota_organisasi')->where('id', $id)->update([
            'status' => 'aktif',
            'bergabung_pada' => now()->toDateString(),
            'updated_at' => now(),
        ]);

        return back()->with('success', 'Anggota berhasil disetujui.');
    }

    public function reject(Request $request, $id)
    {
        $membership = DB::table('anggota_organisasi')->where('id', $id)->first();

        if (! $membership) {
            return back()->with('error', 'Data tidak ditemukan.');
        }

        $user = $request->user();
        $manages = $user->organisasis()->wherePivot('status', 'aktif')->where('organisasis.id', $membership->organisasi_id)->exists();

        if (! $manages) {
            return back()->with('error', 'Anda tidak memiliki akses.');
        }

        DB::table('anggota_organisasi')->where('id', $id)->update([
            'status' => 'ditolak',
            'updated_at' => now(),
        ]);

        return back()->with('success', 'Pendaftaran ditolak.');
    }

    public function remove(Request $request, $id)
    {
        $membership = DB::table('anggota_organisasi')->where('id', $id)->first();

        if (! $membership) {
            return back()->with('error', 'Data tidak ditemukan.');
        }

        $user = $request->user();
        $manages = $user->organisasis()->wherePivot('status', 'aktif')->where('organisasis.id', $membership->organisasi_id)->exists();

        if (! $manages) {
            return back()->with('error', 'Anda tidak memiliki akses.');
        }

        DB::table('anggota_organisasi')->where('id', $id)->delete();

        return back()->with('success', 'Anggota berhasil dihapus.');
    }
}
