---
title: Relationships
description: Manage relationships on Laravel
---

# Relationships

{{ $frontmatter.description }}

## ManyToMany

```php
<?php

public function up()
{
  Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->string('title')->nullable();
    $table->string('production_url')->nullable();
    $table->string('recette_url')->nullable();
    $table->timestamps();
  });

  Schema::create('credentials', function (Blueprint $table) {
    $table->id();
    $table->string('login')->nullable();
    $table->string('password')->nullable();
    $table->timestamps();
  });

  Schema::create('credential_project', function (Blueprint $table) {
    $table->foreignId('credential_id');
    $table->foreign('credential_id')
      ->references('id')
      ->on('credentials');

    $table->foreignId('project_id');
    $table->foreign('pro_id')
      ->references('id')
      ->on('projects');
  });
}
```
