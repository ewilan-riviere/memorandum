<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('content_documents', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('path')->nullable();
            $table->string('category')->nullable();
            $table->string('description')->nullable();
            $table->text('headings')->nullable();
            $table->string('image')->nullable();
            $table->text('content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('content_documents');
    }
};
