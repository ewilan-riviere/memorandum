<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Str;

class ContentDocument extends Model
{
    use HasFactory;
    use Searchable;

    protected $fillable = [
        'title',
        'path',
        'category',
        'description',
        'headings',
        'image',
        'content',
    ];

    public function searchableAs()
    {
        return Str::slug(config('app.name').'_content_document', '_');
    }

    public function toSearchableArray()
    {
        return [
            'title' => $this->title,
            'category' => $this->category,
            'description' => $this->description,
            'headings' => $this->headings,
            'image' => $this->image,
        ];
    }
}
