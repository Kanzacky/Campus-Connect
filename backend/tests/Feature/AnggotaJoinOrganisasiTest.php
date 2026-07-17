<?php

use App\Models\Organisasi;
use App\Models\User;
use Illuminate\Support\Facades\DB;

it('allows anggota to join organisasi', function () {
    // 1. Persiapan Data (Arrange)
    $user = User::factory()->create(['role' => 'anggota']);
    $organisasi = Organisasi::factory()->create(['status' => 'aktif']);

    // 2. Eksekusi API (Act)
    $response = $this->actingAs($user)
        ->postJson("/api/anggota/organisasi/{$organisasi->id}/join");

    // 3. Validasi (Assert)
    $response->assertStatus(201)
        ->assertJson([
            'success' => true,
            'message' => 'Pendaftaran berhasil! Menunggu persetujuan pengurus.',
        ]);

    // Validasi langsung ke struktur internal database (White-box testing)
    $this->assertDatabaseHas('anggota_organisasi', [
        'user_id' => $user->id,
        'organisasi_id' => $organisasi->id,
        'status' => 'pending',
    ]);
});

it('prevents anggota from joining the same organisasi twice', function () {
    // 1. Persiapan Data
    $user = User::factory()->create(['role' => 'anggota']);
    $organisasi = Organisasi::factory()->create(['status' => 'aktif']);

    // Kondisi: user sudah pernah mendaftar
    DB::table('anggota_organisasi')->insert([
        'user_id' => $user->id,
        'organisasi_id' => $organisasi->id,
        'jabatan' => 'Anggota',
        'status' => 'pending',
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    // 2. Eksekusi API
    $response = $this->actingAs($user)
        ->postJson("/api/anggota/organisasi/{$organisasi->id}/join");

    // 3. Validasi IF-ELSE (Assert blok kode if ($exists) dieksekusi)
    $response->assertStatus(422)
        ->assertJson([
            'success' => false,
            'message' => 'Anda sudah terdaftar di organisasi ini.',
        ]);
});
