<?php

namespace Database\Factories;

use App\Models\Organisasi;
use App\Models\Pengumuman;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PengumumanFactory extends Factory
{
    protected $model = Pengumuman::class;

    public function definition(): array
    {
        return [
            'organisasi_id' => Organisasi::factory(),
            'judul' => fake()->sentence(5),
            'konten' => fake()->paragraphs(2, true),
            'is_pinned' => fake()->boolean(20),
            'created_by' => User::factory(),
        ];
    }

    public function global(): static
    {
        return $this->state(fn () => ['organisasi_id' => null]);
    }

    public function pinned(): static
    {
        return $this->state(fn () => ['is_pinned' => true]);
    }
}
