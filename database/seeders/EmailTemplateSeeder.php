<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class EmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $totalData = 2;

        foreach (range(1, $totalData) as $index) {
            DB::table('mtr_email_template')->insert([
                'template_name'   => $faker->words(2, true), // e.g., "Batch Alpha"
                'subject'      => $faker->sentence(6), // short subject
                'body'         => $faker->paragraph,   // some email body
                'sender_email' => $faker->unique()->safeEmail,
                'cc'           => implode(',', $faker->unique()->randomElements(
                                        [$faker->safeEmail, $faker->safeEmail, $faker->safeEmail],
                                        $faker->numberBetween(1, 3)
                                )),
                'created_at'   => now(),
                'updated_at'   => now(),
            ]);
        }
    }
}
