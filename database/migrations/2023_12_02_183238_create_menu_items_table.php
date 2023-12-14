<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('menu_items', function (Blueprint $table) {
      $table->string('title');
      $table->string('description');
      $table->float('price');
      $table->boolean('vegetarian');
      $table->boolean('vegan');
      $table->boolean('glutenfree');
      $table->boolean('active');
      $table->id();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('menu_items');
  }
};
