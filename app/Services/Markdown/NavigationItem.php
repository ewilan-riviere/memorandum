<?php

namespace App\Services\Markdown;

use DirectoryIterator;

class NavigationItem
{
    /** @var NavigationItem[] */
    public array $nodes = [];

    public function __construct(
        public ?MarkdownItem $markdown_item = null
    ) {
    }

    public static function create(DirectoryIterator $dirIterator, int $depth): NavigationItem
    {
        $nav_item = new NavigationItem();
        $nav_item->markdown_item = MarkdownItem::create($dirIterator->getPathname(), $depth);

        return $nav_item;
    }
}
