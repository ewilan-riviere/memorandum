<?php

namespace App\Services\Markdown;

class FrontMatter
{
    public function __construct(
        public ?string $title = null,
        public ?string $category = null,
        public ?string $parent = null,
        public ?string $title_ordered = null,
        public ?string $description = null,
        public ?bool $has_full_layout = false,
    ) {
    }
}
