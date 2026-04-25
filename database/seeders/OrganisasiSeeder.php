<?php

namespace Database\Seeders;

use App\Models\Organisasi;
use Illuminate\Database\Seeder;

class OrganisasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organisasis = [
            // Seni dan Kebudayaan
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'UKM Seni',
                'ketua' => 'Raka Pradana',
                'visi' => 'Menjadi wadah utama pengembangan kreativitas seni mahasiswa yang inovatif dan berbudaya.',
                'misi' => "Mengembangkan berbagai bentuk seni rupa dan pertunjukan.\nMendorong mahasiswa aktif berkarya dan berkolaborasi.\nMenyelenggarakan kegiatan seni yang edukatif dan inspiratif.",
            ],
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'UKM Tari',
                'ketua' => 'Salsabila Kirana',
                'visi' => 'Menjadi pusat pelestarian dan pengembangan tari tradisional serta modern di lingkungan kampus.',
                'misi' => "Melatih kemampuan tari tradisional dan dance modern.\nMenjaga kelestarian budaya melalui pertunjukan tari.\nMeningkatkan kreativitas dan disiplin anggota.",
            ],
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'UKM Musik',
                'ketua' => 'Dimas Arya',
                'visi' => 'Menjadi wadah pengembangan minat dan bakat musik mahasiswa yang unggul dan produktif.',
                'misi' => "Mengasah kemampuan bermusik anggota secara rutin.\nMembentuk komunitas musik yang solid dan kreatif.\nMengadakan pertunjukan dan kolaborasi musik.",
            ],
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'Cendekia Laras Swara',
                'ketua' => 'Naufal Hidayat',
                'visi' => 'Menjadi pelopor pelestarian dan pengembangan seni musik tradisional Jawa di kalangan mahasiswa.',
                'misi' => "Mempelajari dan memainkan gamelan secara berkelanjutan.\nMelestarikan nilai-nilai budaya Jawa.\nMengikuti kegiatan seni tradisi di tingkat kampus maupun luar kampus.",
            ],
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'UKM Seni Reog',
                'ketua' => 'Aulia Putri',
                'visi' => 'Menjadi garda depan pelestarian kesenian Reog sebagai warisan budaya daerah.',
                'misi' => "Melatih seni dan teknik pertunjukan Reog.\nMemperkenalkan Reog kepada generasi muda.\nMengikuti pementasan dan festival budaya.",
            ],
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'UKM Seni Dongkrek',
                'ketua' => 'Bayu Saputra',
                'visi' => 'Menjadi wadah pelestarian kesenian khas Madiun yang kreatif dan berkelanjutan.',
                'misi' => "Mempelajari dan mengembangkan seni Dongkrek.\nMengangkat nilai sejarah dan budaya lokal.\nMenampilkan Dongkrek dalam berbagai kegiatan budaya.",
            ],
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'Teater Bissik',
                'ketua' => 'Rizky Mahendra',
                'visi' => 'Menjadi ruang ekspresi seni peran yang kritis, kreatif, dan berkarakter.',
                'misi' => "Melatih kemampuan akting, olah tubuh, dan vokal.\nMeningkatkan apresiasi terhadap seni teater.\nMenghasilkan pementasan yang bermutu dan bermakna.",
            ],
            [
                'category' => 'Seni dan Kebudayaan',
                'name' => 'Paduan Suara',
                'ketua' => 'Anisa Septianti',
                'visi' => 'Menjadi paduan suara mahasiswa yang harmonis, profesional, dan berprestasi.',
                'misi' => "Melatih teknik vokal dan kekompakan tim.\nMengembangkan kemampuan musikal anggota.\nMewakili kampus dalam lomba dan pertunjukan vokal.",
            ],
            // Olahraga dan Bela Diri
            [
                'category' => 'Olahraga dan Bela Diri',
                'name' => 'UKM Futsal',
                'ketua' => 'Fajar Nugroho',
                'visi' => 'Menjadi UKM futsal yang sportif, kompetitif, dan berprestasi.',
                'misi' => "Meningkatkan kemampuan teknik dan strategi bermain.\nMenumbuhkan jiwa sportivitas dan kerja sama.\nMengikuti turnamen internal maupun eksternal.",
            ],
            [
                'category' => 'Olahraga dan Bela Diri',
                'name' => 'Badminton',
                'ketua' => 'Nabila Ramadhani',
                'visi' => 'Menjadi wadah pembinaan atlet bulu tangkis mahasiswa yang unggul dan disiplin.',
                'misi' => "Melatih teknik dasar dan lanjutan badminton.\nMembina mental kompetitif yang sehat.\nMengembangkan prestasi di berbagai kejuaraan.",
            ],
            [
                'category' => 'Olahraga dan Bela Diri',
                'name' => 'Volley Ball',
                'ketua' => 'Aditya Pratama',
                'visi' => 'Menjadi UKM bola voli yang solid, aktif, dan berprestasi.',
                'misi' => "Melatih keterampilan individu dan tim.\nMembangun semangat kebersamaan dan sportivitas.\nBerpartisipasi dalam kompetisi voli antar kampus.",
            ],
            [
                'category' => 'Olahraga dan Bela Diri',
                'name' => 'Pencak Silat',
                'ketua' => 'Putri Amelia',
                'visi' => 'Menjadi UKM bela diri yang berprestasi, berkarakter, dan menjunjung tinggi budaya bangsa.',
                'misi' => "Melatih teknik pencak silat secara rutin dan terarah.\nMenanamkan disiplin, tanggung jawab, dan hormat.\nMengembangkan prestasi di bidang seni dan olahraga bela diri.",
            ],
            [
                'category' => 'Olahraga dan Bela Diri',
                'name' => 'INKAI',
                'ketua' => 'Farhan Alfarizi',
                'visi' => 'Menjadi wadah pembinaan karate yang unggul, tangguh, dan berprestasi.',
                'misi' => "Melatih teknik karate secara konsisten.\nMembentuk mental kuat, disiplin, dan percaya diri.\nMengikuti kejuaraan karate secara aktif.",
            ],
            // Penalaran, Kewirausahaan, dan Khusus
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'Kelompok Ilmiah Mahasiswa (KIM)',
                'ketua' => 'Clara Azzahra',
                'visi' => 'Menjadi pusat pengembangan riset, karya ilmiah, dan inovasi mahasiswa yang unggul.',
                'misi' => "Mendorong budaya meneliti dan menulis ilmiah.\nMembimbing anggota dalam penyusunan karya ilmiah.\nMengikuti lomba dan seminar ilmiah.",
            ],
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'UKM Kewirausahaan Cendekia',
                'ketua' => 'Rendy Kurniawan',
                'visi' => 'Menjadi wadah pembentukan mahasiswa yang kreatif, mandiri, dan berjiwa entrepreneur.',
                'misi' => "Melatih keterampilan usaha dan manajemen bisnis.\nMendorong lahirnya ide usaha inovatif.\nMengembangkan produk dan kegiatan wirausaha mahasiswa.",
            ],
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'UKM Kependudukan Cendekia',
                'ketua' => 'Vina Maharani',
                'visi' => 'Menjadi pusat edukasi kependudukan yang informatif, kritis, dan bermanfaat bagi masyarakat.',
                'misi' => "Memberikan pemahaman isu-isu kependudukan.\nMengadakan kegiatan sosialisasi dan diskusi.\nMeningkatkan kepedulian mahasiswa terhadap persoalan sosial.",
            ],
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'Pramuka',
                'ketua' => 'Yoga Wicaksono',
                'visi' => 'Menjadi gerakan pramuka racana yang disiplin, mandiri, dan berjiwa pengabdian.',
                'misi' => "Menanamkan nilai kepemimpinan dan kemandirian.\nMelaksanakan kegiatan kepramukaan yang aktif dan mendidik.\nMengembangkan solidaritas dan kepedulian sosial.",
            ],
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'Resimen Mahasiswa (Menwa)',
                'ketua' => 'Tegar Haryanto',
                'visi' => 'Menjadi wadah pembinaan bela negara yang disiplin, tangguh, dan bertanggung jawab.',
                'misi' => "Menanamkan semangat nasionalisme dan cinta tanah air.\nMelatih kedisiplinan, ketahanan mental, dan kepemimpinan.\nMengikuti pendidikan serta kegiatan bela negara.",
            ],
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'Koperasi Mahasiswa (Kopma)',
                'ketua' => 'Intan Permata',
                'visi' => 'Menjadi koperasi mahasiswa yang sehat, mandiri, dan berorientasi pada kesejahteraan anggota.',
                'misi' => "Mengelola usaha koperasi secara profesional.\nMenumbuhkan jiwa ekonomi kerakyatan di kalangan mahasiswa.\nMemberikan manfaat nyata bagi anggota dan lingkungan kampus.",
            ],
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'Pers Mahasiswa (Persedukasi)',
                'ketua' => 'Hafiz Maulana',
                'visi' => 'Menjadi media mahasiswa yang kritis, informatif, dan berintegritas.',
                'misi' => "Mengembangkan kemampuan jurnalistik dan kepenulisan.\nMenyampaikan informasi kampus secara akurat dan berimbang.\nMenerbitkan karya pers yang edukatif dan inspiratif.",
            ],
            [
                'category' => 'Penalaran, Kewirausahaan, dan Khusus',
                'name' => 'UKM Shoutul Murobby',
                'ketua' => 'Laila Nurazizah',
                'visi' => 'Menjadi wadah pembinaan keagamaan mahasiswa yang berakhlak mulia dan religius.',
                'misi' => "Mengadakan kajian dan kegiatan keagamaan rutin.\nMeningkatkan pemahaman dan pengamalan ajaran agama.\nMembina ukhuwah dan kepedulian antaranggota.",
            ],
            // Organisasi Tingkat Universitas/Fakultas
            [
                'category' => 'Organisasi Tingkat Universitas/Fakultas',
                'name' => 'BEM (Badan Eksekutif Mahasiswa)',
                'ketua' => 'Muhammad Rafli Akbar',
                'visi' => 'Menjadi organisasi eksekutif mahasiswa yang aspiratif, inovatif, dan berintegritas dalam mewadahi kepentingan mahasiswa.',
                'misi' => "Menyalurkan aspirasi mahasiswa secara efektif dan bertanggung jawab.\nMenyelenggarakan program kerja yang bermanfaat bagi mahasiswa.\nMembangun sinergi dengan seluruh organisasi mahasiswa.\nMengembangkan potensi mahasiswa di bidang akademik dan non-akademik.",
            ],
            [
                'category' => 'Organisasi Tingkat Universitas/Fakultas',
                'name' => 'DPM (Dewan Perwakilan Mahasiswa)',
                'ketua' => 'Citra Ayuningtyas',
                'visi' => 'Menjadi lembaga legislatif mahasiswa yang demokratis, transparan, dan berintegritas.',
                'misi' => "Mengawasi kinerja BEM dan organisasi mahasiswa lainnya.\nMenampung dan menyalurkan aspirasi mahasiswa.\nMenyusun dan menetapkan peraturan organisasi mahasiswa.\nMenjaga keseimbangan sistem organisasi kemahasiswaan.",
            ],
            [
                'category' => 'Organisasi Tingkat Universitas/Fakultas',
                'name' => 'Himpunan Mahasiswa Jurusan (HMJ)',
                'ketua' => 'Ahmad Fikri Ramadhan',
                'visi' => 'Menjadi organisasi mahasiswa jurusan yang aktif, profesional, dan berdaya saing tinggi.',
                'misi' => "Mengembangkan potensi akademik dan keterampilan mahasiswa sesuai bidangnya.\nMempererat hubungan antar mahasiswa dalam satu jurusan.\nMenyelenggarakan kegiatan yang mendukung keilmuan dan kreativitas.\nMeningkatkan kualitas mahasiswa melalui program kerja yang terarah.",
            ],
            [
                'category' => 'Organisasi Tingkat Universitas/Fakultas',
                'name' => 'Himadiksi (Himpunan Mahasiswa Bidikmisi/KIP-K)',
                'ketua' => 'Nurul Aisyah Putri',
                'visi' => 'Menjadi wadah pengembangan mahasiswa penerima beasiswa yang unggul, mandiri, dan berkontribusi bagi masyarakat.',
                'misi' => "Meningkatkan prestasi akademik dan non-akademik anggota.\nMenumbuhkan rasa solidaritas dan kepedulian sosial.\nMengembangkan soft skill dan kepemimpinan mahasiswa.\nBerkontribusi dalam kegiatan sosial dan pengabdian masyarakat.",
            ],
        ];

        foreach ($organisasis as $org) {
            Organisasi::create($org);
        }
    }
}
