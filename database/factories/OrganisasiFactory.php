<?php

namespace Database\Factories;

use App\Models\Organisasi;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrganisasiFactory extends Factory
{
    protected $model = Organisasi::class;

    public function definition(): array
    {
        $categories = [
            'Seni dan Kebudayaan',
            'Olahraga dan Bela Diri',
            'Penalaran, Kewirausahaan, dan Khusus',
            'Organisasi Tingkat Universitas/Fakultas',
            'Organisasi Tingkat Fakultas',
            'Organisasi Tingkat Prodi (HMPS)',
            'Kerohanian',
        ];

        return [
            'name' => 'UKM '.fake()->unique()->words(2, true),
            'category' => fake()->randomElement($categories),
            'ketua' => fake()->name(),
            'visi' => fake()->sentence(10),
            'misi' => fake()->sentence(15),
            'deskripsi' => fake()->paragraph(),
            'logo' => null,
            'kontak' => fake()->phoneNumber(),
            'status' => fake()->randomElement(['aktif', 'nonaktif']),
        ];
    }

    /**
     * Organisasi yang aktif.
     */
    public function aktif(): static
    {
        return $this->state(fn () => ['status' => 'aktif']);
    }

    /**
     * Organisasi yang nonaktif.
     */
    public function nonaktif(): static
    {
        return $this->state(fn () => ['status' => 'nonaktif']);
    }
}
