<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminKegiatanController;
use App\Http\Controllers\Admin\AdminOrganisasiController;
use App\Http\Controllers\Admin\AdminPengumumanController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Anggota\AnggotaDashboardController;
use App\Http\Controllers\Anggota\AnggotaKegiatanController;
use App\Http\Controllers\Anggota\AnggotaOrganisasiController;
use App\Http\Controllers\Anggota\AnggotaPengumumanController;
use App\Http\Controllers\Pengurus\PengurusAnggotaController;
use App\Http\Controllers\Pengurus\PengurusDashboardController;
use App\Http\Controllers\Pengurus\PengurusKegiatanController;
use App\Http\Controllers\Pengurus\PengurusPengumumanController;
use App\Models\Organisasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $ormawa = Organisasi::where('category', 'Organisasi Tingkat Universitas/Fakultas')->take(3)->get();
    $ukm = Organisasi::where('category', '!=', 'Organisasi Tingkat Universitas/Fakultas')->take(3)->get();

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'organisasis' => $ormawa->concat($ukm),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        $role = $request->user()->role;

        return match ($role) {
            'admin' => redirect()->route('admin.dashboard'),
            'pengurus' => redirect()->route('pengurus.dashboard'),
            default => redirect()->route('anggota.dashboard'),
        };
    })->name('dashboard');
});

// ==================== ADMIN ROUTES ====================
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // CRUD Organisasi
    Route::resource('organisasi', AdminOrganisasiController::class);

    // CRUD Users
    Route::resource('users', AdminUserController::class);

    // Kegiatan (read-only overview)
    Route::get('kegiatan', [AdminKegiatanController::class, 'index'])->name('kegiatan.index');

    // CRUD Pengumuman
    Route::resource('pengumuman', AdminPengumumanController::class);
});

// ==================== PENGURUS ROUTES ====================
Route::middleware(['auth', 'verified', 'role:pengurus'])->prefix('pengurus')->name('pengurus.')->group(function () {
    Route::get('/dashboard', [PengurusDashboardController::class, 'index'])->name('dashboard');

    // Kelola Anggota
    Route::get('anggota', [PengurusAnggotaController::class, 'index'])->name('anggota.index');
    Route::put('anggota/{id}/approve', [PengurusAnggotaController::class, 'approve'])->name('anggota.approve');
    Route::put('anggota/{id}/reject', [PengurusAnggotaController::class, 'reject'])->name('anggota.reject');
    Route::delete('anggota/{id}/remove', [PengurusAnggotaController::class, 'remove'])->name('anggota.remove');

    // CRUD Kegiatan
    Route::resource('kegiatan', PengurusKegiatanController::class);

    // CRUD Pengumuman
    Route::resource('pengumuman', PengurusPengumumanController::class);
});

// ==================== ANGGOTA ROUTES ====================
Route::middleware(['auth', 'verified', 'role:anggota'])->prefix('anggota')->name('anggota.')->group(function () {
    Route::get('/dashboard', [AnggotaDashboardController::class, 'index'])->name('dashboard');

    // Browse & Gabung Organisasi
    Route::get('organisasi', [AnggotaOrganisasiController::class, 'index'])->name('organisasi.index');
    Route::get('organisasi/{id}', [AnggotaOrganisasiController::class, 'show'])->name('organisasi.show');
    Route::post('organisasi/{id}/join', [AnggotaOrganisasiController::class, 'join'])->name('organisasi.join');
    Route::delete('organisasi/{id}/leave', [AnggotaOrganisasiController::class, 'leave'])->name('organisasi.leave');

    // Kegiatan
    Route::get('kegiatan', [AnggotaKegiatanController::class, 'index'])->name('kegiatan.index');

    // Pengumuman
    Route::get('pengumuman', [AnggotaPengumumanController::class, 'index'])->name('pengumuman.index');
});

require __DIR__.'/settings.php';
