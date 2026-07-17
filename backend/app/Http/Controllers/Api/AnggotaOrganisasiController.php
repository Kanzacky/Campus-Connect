<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrganisasiResource;
use App\Models\Organisasi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnggotaOrganisasiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Organisasi::where('status', 'aktif')->withCount('anggotaAktif');

        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $organisasis = $query->latest()->paginate($request->input('per_page', 12));
        $categories = Organisasi::where('status', 'aktif')->distinct()->pluck('category');

        $userMemberships = DB::table('anggota_organisasi')
            ->where('user_id', auth()->id())
            ->pluck('status', 'organisasi_id');

        return response()->json([
            'success' => true,
            'data' => [
                'organisasis' => $organisasis,
                'categories' => $categories,
                'userMemberships' => $userMemberships,
                'filters' => $request->only(['search', 'category']),
            ],
        ]);
    }

    public function show($id): JsonResponse
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

        $members = DB::table('anggota_organisasi')
            ->join('users', 'anggota_organisasi.user_id', '=', 'users.id')
            ->where('anggota_organisasi.organisasi_id', $id)
            ->where('anggota_organisasi.status', 'aktif')
            ->select('users.id', 'users.name', 'users.nim', 'users.jurusan', 'anggota_organisasi.jabatan', 'anggota_organisasi.bergabung_pada')
            ->orderBy('anggota_organisasi.bergabung_pada')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'organisasi' => new OrganisasiResource($organisasi),
                'membershipStatus' => $membershipStatus,
                'members' => $members,
            ],
        ]);
    }

    public function join(Request $request, $id): JsonResponse
    {
        $organisasi = Organisasi::where('status', 'aktif')->findOrFail($id);

        $existing = DB::table('anggota_organisasi')
            ->where('user_id', auth()->id())
            ->where('organisasi_id', $id)
            ->first();

        if ($existing) {
            if ($existing->status === 'ditolak') {
                DB::table('anggota_organisasi')
                    ->where('user_id', auth()->id())
                    ->where('organisasi_id', $id)
                    ->update([
                        'status' => 'pending',
                        'updated_at' => now(),
                    ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Pendaftaran ulang berhasil! Menunggu persetujuan pengurus.',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Anda sudah terdaftar di organisasi ini.',
            ], 422);
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

        return response()->json([
            'success' => true,
            'message' => 'Pendaftaran berhasil! Menunggu persetujuan pengurus.',
        ], 201);
    }

    public function leave($id): JsonResponse
    {
        DB::table('anggota_organisasi')
            ->where('user_id', auth()->id())
            ->where('organisasi_id', $id)
            ->delete();

        return response()->json([
            'success' => true,
            'message' => 'Anda telah keluar dari organisasi.',
        ]);
    }
}
