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
        Schema::connection(config('database.default'))->create('mtr_email_template', function (Blueprint $table) {
            $table->bigIncrements('id'); 
            
            $table->string('template_name')->nullable(); // e.g., "September Newsletter" 
            $table->string('subject'); // email subject 
            $table->text('body'); // email body (HTML or text) 
            $table->string('sender_email')->nullable(); // sender of email 
            $table->json('cc')->nullable(); // cc of email

            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection(config('database.default'))->dropIfExists('mtr_email_template');
    }
};
