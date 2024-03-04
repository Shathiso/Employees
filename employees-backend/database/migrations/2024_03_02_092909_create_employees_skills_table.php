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
        Schema::create('employees_skills', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id')->index();
            $table->unsignedBigInteger('skill_id')->index();
            $table->timestamps();

            $table->foreign('employee_id')
            ->references('id')
            ->on('employees')
            ->onDelete('cascade');

            $table->foreign('skill_id')
            ->references('id')
            ->on('skills')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees_skills');
    }
};
