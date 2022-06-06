<?php

namespace App\Services\Markdown;

class MarkdownBreadcrumb
{
    public function __construct(
        public ?string $title = null,
        public ?string $link = null,
        public ?string $slug = null
    ) {
    }
}
