<?php

use App\Models\User;

test('dashboard redirects admin to admin dashboard', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->get('/dashboard');

    $response->assertRedirect(route('admin.dashboard'));
});

test('dashboard redirects pengurus to pengurus dashboard', function () {
    $pengurus = User::factory()->create(['role' => 'pengurus']);

    $response = $this->actingAs($pengurus)->get('/dashboard');

    $response->assertRedirect(route('pengurus.dashboard'));
});

test('dashboard redirects anggota to anggota dashboard', function () {
    $anggota = User::factory()->create(['role' => 'anggota']);

    $response = $this->actingAs($anggota)->get('/dashboard');

    $response->assertRedirect(route('anggota.dashboard'));
});

test('role middleware blocks unauthorized access', function () {
    $anggota = User::factory()->create(['role' => 'anggota']);

    $this->actingAs($anggota)->get('/admin')->assertStatus(403);
    $this->actingAs($anggota)->get('/pengurus/dashboard')->assertStatus(403);
});

test('admin dashboard shows statistics', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $response = $this->actingAs($admin)->get('/admin');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('admin/dashboard')
        ->has('stats')
        ->has('recentUsers')
        ->has('recentKegiatan')
    );
});
