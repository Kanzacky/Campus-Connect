<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrganisasiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Route publik (tanpa auth) dan route yang diproteksi auth:sanctum.
|
*/

// ==================== PUBLIC ROUTES ====================
Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::get('/organisasi', [OrganisasiController::class, 'index'])->name('api.organisasi.index');
Route::get('/organisasi/{organisasi}', [OrganisasiController::class, 'show'])->name('api.organisasi.show');

// ==================== PROTECTED ROUTES ====================
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me'])->name('api.me');
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
});
