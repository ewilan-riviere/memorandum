<?php

namespace App\Services;

use App\Services\Markdown\NavigationItem;
use Cache;
use DirectoryIterator;
use IteratorIterator;

class MarkdownNavigation
{
    /** @var NavigationItem[] */
    public array $toc = [];

    public function __construct(
        public ?string $path = null,
    ) {
    }

    public static function get()
    {
        $navigation = Cache::get('navigation');
        if (null === $navigation) {
            $navigation = MarkdownNavigation::create(base_path(MarkdownService::getMarkdownPath()));
            Cache::add('navigation', $navigation);
        }

        return $navigation;
    }

    /**
     * Ceate a new `MarkdownNavigation` from `$path`.
     */
    public static function create(string $path): MarkdownNavigation
    {
        $service = new MarkdownNavigation($path);
        $service->toc = $service->parse();
        $service->sort($service->toc);

        return $service;
    }

    /**
     * Parse `$path` to generate a `NavigationItem[]`.
     *
     * @return NavigationItem[]
     */
    private function parse(?string $path = null, int $depth = 0)
    {
        if (! $path) {
            $path = $this->path;
        }
        $iterator = new IteratorIterator(new DirectoryIterator($path));

        $r = [];
        /** @var DirectoryIterator $dirIterator */
        foreach ($iterator as $dirIterator) {
            if ($dirIterator->isDot()) {
                continue;
            }

            // we need to do this for both folders and files
            if ('md' === $dirIterator->getExtension() || $dirIterator->isDir()) {
                $nav_item = NavigationItem::create($dirIterator, $depth);

                // is we have a directory, try and get its children
                if ($dirIterator->isDir()) {
                    // !!! I recommend to do an echo $splFileInfo->getPathname() here
                    // to see the order in which recursion works !!!
                    $nodes = $this->parse($dirIterator->getPathname(), $depth + 1);

                    // only add the nodes if we have some
                    if (! empty($nodes)) {
                        $nav_item->nodes = $nodes;
                        $this->sort($nav_item->nodes);
                    }
                }
                // add the info to the array. No need for a counter :)
                $r[] = $nav_item;
            }
        }

        // the return is important to be able to build the multi dimensional array
        return $r;
    }

    private function sort(array &$nodes)
    {
        usort($nodes, fn (NavigationItem $a, NavigationItem $b) => $a->markdown_item->filename <=> $b->markdown_item->filename);
    }
}
