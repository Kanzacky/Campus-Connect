<?php

namespace Database\Seeders;

use App\Models\Organisasi;
use Illuminate\Database\Seeder;

class TambahOrganisasiBaruSeeder extends Seeder
{
    /**
     * Tambahkan organisasi dari file Organisasi_dan_UKM_UNIPMA.docx yang belum ada di database.
     */
    public function run(): void
    {
        $organisasis = [
            // ==================== Organisasi Tingkat Fakultas ====================
            [
                'category' => 'Organisasi Tingkat Fakultas',
                'name' => 'HMF FKIP',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa fakultas keguruan dan ilmu pendidikan yang aktif, aspiratif, dan berprestasi.',
                'misi' => "Mewadahi aspirasi mahasiswa FKIP.\nMeningkatkan kualitas akademik dan non-akademik mahasiswa.\nMembangun solidaritas dan kekeluargaan antar mahasiswa FKIP.",
            ],
            [
                'category' => 'Organisasi Tingkat Fakultas',
                'name' => 'HMF FEB (BIMA FEB)',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa fakultas ekonomi dan bisnis yang profesional, inovatif, dan berjiwa wirausaha.',
                'misi' => "Mengembangkan potensi akademik dan kewirausahaan mahasiswa FEB.\nMenjalin kerja sama dengan berbagai pihak.\nMeningkatkan peran aktif mahasiswa dalam kegiatan kampus.",
            ],
            [
                'category' => 'Organisasi Tingkat Fakultas',
                'name' => 'HMF FIKS',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa fakultas ilmu kesehatan dan sains yang unggul, kritis, dan berdedikasi.',
                'misi' => "Meningkatkan kualitas keilmuan mahasiswa FIKS.\nMenyelenggarakan kegiatan yang mendukung pengembangan kompetensi.\nMenjalin hubungan harmonis antar mahasiswa dan dosen.",
            ],
            [
                'category' => 'Organisasi Tingkat Fakultas',
                'name' => 'HMF Teknik',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa fakultas teknik yang kompeten, inovatif, dan berdaya saing tinggi.',
                'misi' => "Mengembangkan kemampuan teknis dan soft skill mahasiswa.\nMenyelenggarakan kegiatan ilmiah dan teknologi.\nMempererat hubungan antar mahasiswa fakultas teknik.",
            ],
            [
                'category' => 'Organisasi Tingkat Fakultas',
                'name' => 'HMF Hukum',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa fakultas hukum yang kritis, berintegritas, dan berkeadilan.',
                'misi' => "Meningkatkan pemahaman hukum dan advokasi mahasiswa.\nMenyelenggarakan kegiatan diskusi dan kajian hukum.\nMembina karakter mahasiswa hukum yang profesional.",
            ],

            // ==================== Organisasi Tingkat Prodi (HMPS) ====================
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'HIMABIKO',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa bimbingan konseling yang profesional dan peduli terhadap sesama.',
                'misi' => "Mengembangkan kompetensi konseling mahasiswa.\nMenyelenggarakan kegiatan pengembangan diri.\nMembangun jaringan kerja sama dengan lembaga konseling.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'HIMADIGSAR',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa pendidikan guru sekolah dasar yang kreatif, inovatif, dan berdedikasi.',
                'misi' => "Meningkatkan kompetensi calon guru sekolah dasar.\nMenyelenggarakan kegiatan pengabdian dan pengajaran.\nMembangun semangat kependidikan di kalangan mahasiswa.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'HIMAPAUD',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa pendidikan anak usia dini yang kompeten dan berkarakter.',
                'misi' => "Mengembangkan kreativitas dalam pendidikan anak usia dini.\nMenyelenggarakan kegiatan edukatif dan pengabdian masyarakat.\nMempererat solidaritas antar mahasiswa PAUD.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'HIMAKO',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa akuntansi yang profesional, berintegritas, dan berdaya saing.',
                'misi' => "Mengembangkan kompetensi akuntansi dan keuangan.\nMenyelenggarakan seminar dan pelatihan profesi.\nMendorong prestasi akademik dan non-akademik mahasiswa.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'HIMADIRA',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa manajemen yang unggul, inovatif, dan berjiwa kepemimpinan.',
                'misi' => "Mengembangkan kemampuan manajerial dan kepemimpinan.\nMenyelenggarakan kegiatan kewirausahaan dan seminar bisnis.\nMempererat hubungan antar mahasiswa manajemen.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'CIVICS',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa PPKn yang kritis, demokratis, dan berjiwa nasionalisme.',
                'misi' => "Meningkatkan pemahaman tentang kewarganegaraan dan demokrasi.\nMenyelenggarakan kegiatan diskusi dan kajian kebangsaan.\nMembina karakter mahasiswa yang cinta tanah air.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'LINGUA',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa pendidikan bahasa yang komunikatif, kreatif, dan berwawasan global.',
                'misi' => "Mengembangkan kemampuan bahasa dan sastra mahasiswa.\nMenyelenggarakan kegiatan kebahasaan dan lomba literasi.\nMembangun budaya literasi di lingkungan kampus.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'EDSA',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa pendidikan bahasa Inggris yang kompeten dan berdaya saing global.',
                'misi' => "Meningkatkan kemampuan bahasa Inggris mahasiswa.\nMenyelenggarakan kegiatan English Day dan debat bahasa Inggris.\nMembangun jaringan dengan komunitas bahasa Inggris.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'HIMADIKA',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa pendidikan matematika yang unggul, kritis, dan inovatif.',
                'misi' => "Mengembangkan kemampuan matematika dan pengajaran.\nMenyelenggarakan olimpiade dan kompetisi matematika.\nMeningkatkan minat mahasiswa terhadap matematika.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'KOMFI',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa pendidikan fisika yang ilmiah, inovatif, dan berkarakter.',
                'misi' => "Mengembangkan kemampuan fisika dan riset mahasiswa.\nMenyelenggarakan kegiatan laboratorium dan eksperimen.\nMendorong prestasi di bidang sains dan teknologi.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'AMPIBI',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa pendidikan biologi yang peduli lingkungan dan berjiwa ilmiah.',
                'misi' => "Mengembangkan kemampuan biologi dan konservasi.\nMenyelenggarakan kegiatan penelitian dan pengabdian.\nMembangun kesadaran lingkungan di kalangan mahasiswa.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'KOMET',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa teknik yang kompeten, kreatif, dan siap bersaing di dunia industri.',
                'misi' => "Mengembangkan kemampuan teknis dan praktis mahasiswa.\nMenyelenggarakan workshop dan pelatihan teknologi.\nMembangun relasi dengan dunia industri dan profesional.",
            ],
            [
                'category' => 'Organisasi Tingkat Prodi (HMPS)',
                'name' => 'DEPTICS',
                'ketua' => '-',
                'visi' => 'Menjadi himpunan mahasiswa teknik informatika yang unggul di bidang teknologi informasi dan komunikasi.',
                'misi' => "Mengembangkan kemampuan programming dan IT mahasiswa.\nMenyelenggarakan hackathon, seminar, dan pelatihan IT.\nMembangun komunitas developer yang solid dan produktif.",
            ],

            // ==================== UKM Olahraga (yang belum ada) ====================
            [
                'category' => 'Olahraga dan Bela Diri',
                'name' => 'UKM Basket',
                'ketua' => '-',
                'visi' => 'Menjadi UKM bola basket yang sportif, kompetitif, dan berprestasi di tingkat regional maupun nasional.',
                'misi' => "Melatih teknik dasar dan lanjutan bola basket.\nMembina kekompakan dan sportivitas tim.\nMengikuti turnamen basket antar kampus.",
            ],
            [
                'category' => 'Olahraga dan Bela Diri',
                'name' => 'UKM Wall Climbing',
                'ketua' => '-',
                'visi' => 'Menjadi UKM panjat dinding yang tangguh, bermental kuat, dan berprestasi.',
                'misi' => "Melatih teknik panjat dinding secara rutin dan aman.\nMembentuk mental dan fisik yang kuat pada anggota.\nMengikuti kompetisi wall climbing di berbagai tingkat.",
            ],

            // ==================== UKM Kerohanian (yang belum ada) ====================
            [
                'category' => 'Kerohanian',
                'name' => 'UKKI At-Tarbiyah',
                'ketua' => '-',
                'visi' => 'Menjadi unit kerohanian Islam kampus yang membina mahasiswa berakhlak mulia dan beriman kuat.',
                'misi' => "Mengadakan kajian Islam dan kegiatan keagamaan rutin.\nMeningkatkan pemahaman dan pengamalan ajaran Islam.\nMembina ukhuwah Islamiyah di lingkungan kampus.",
            ],
            [
                'category' => 'Kerohanian',
                'name' => 'UKM Imanuel',
                'ketua' => '-',
                'visi' => 'Menjadi wadah pembinaan kerohanian Kristen yang mendukung pertumbuhan iman dan karakter mahasiswa.',
                'misi' => "Mengadakan persekutuan doa dan ibadah rutin.\nMembina kerohanian dan karakter Kristiani mahasiswa.\nMenjalin persaudaraan antar mahasiswa Kristen di kampus.",
            ],
        ];

        foreach ($organisasis as $org) {
            // Hanya tambahkan jika belum ada
            if (! Organisasi::where('name', $org['name'])->exists()) {
                Organisasi::create($org);
            }
        }
    }
}
