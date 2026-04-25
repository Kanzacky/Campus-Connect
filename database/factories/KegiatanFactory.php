<?php

namespace Database\Factories;

use App\Models\Kegiatan;
use App\Models\Organisasi;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class KegiatanFactory extends Factory
{
    protected $model = Kegiatan::class;

    public function definition(): array
    {
        $start = fake()->dateTimeBetween('+1 week', '+3 months');
        $end = (clone $start)->modify('+'.rand(2, 8).' hours');

        return [
            'organisasi_id' => Organisasi::factory(),
            'judul' => fake()->sentence(4),
            'deskripsi' => fake()->paragraph(3),
            'tanggal_mulai' => $start,
            'tanggal_selesai' => $end,
            'lokasi' => fake()->address(),
            'status' => fake()->randomElement(['draft', 'published', 'selesai']),
            'created_by' => User::factory(),
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => ['status' => 'published']);
    }

    public function draft(): static
    {
        return $this->state(fn () => ['status' => 'draft']);
    }
}
