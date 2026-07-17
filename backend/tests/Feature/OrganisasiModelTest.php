<?php

use App\Models\Organisasi;
use App\Models\User;

it('dapat mengambil daftar anggota yang statusnya aktif', function () {
    // 1. Arrange: Siapkan data organisasi
    $organisasi = Organisasi::factory()->create();

    // Siapkan 3 user
    $userAktif1 = User::factory()->create();
    $userAktif2 = User::factory()->create();
    $userPending = User::factory()->create();

    // Relasikan (Manipulasi database internal)
    $organisasi->anggota()->attach($userAktif1->id, ['status' => 'aktif']);
    $organisasi->anggota()->attach($userAktif2->id, ['status' => 'aktif']);
    $organisasi->anggota()->attach($userPending->id, ['status' => 'pending']);

    // 2. Act: Panggil method internal model (White-box testing dari struktur Model)
    $anggotaAktif = $organisasi->anggotaAktif()->get();

    // 3. Assert: Menggunakan sintaks bawaan PEST (expect)
    
    // Ekspektasi jumlahnya harus persis 2 (karena 1 pending harus diabaikan)
    expect($anggotaAktif)
        ->toHaveCount(2)
        ->and($anggotaAktif->pluck('id')->toArray())
        ->toContain($userAktif1->id, $userAktif2->id)
        ->not->toContain($userPending->id);
});

it('memiliki atribut nama dan deskripsi', function () {
    $organisasi = Organisasi::factory()->create([
        'name' => 'BEM UNIPMA',
        'deskripsi' => 'Badan Eksekutif Mahasiswa'
    ]);

    expect($organisasi->name)->toBe('BEM UNIPMA');
    expect($organisasi->deskripsi)->toBeString()->not->toBeEmpty();
});
