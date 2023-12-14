<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::insert([
          ['name' => 'Starter'],
          ['name' => 'Side'],
          ['name' => 'Main'],
          ['name' => 'Dessert'],
          ['name' => 'Drink'],
          ['name' => 'Special']
        ]);
    }
}
