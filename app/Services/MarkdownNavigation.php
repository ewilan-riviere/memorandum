<?php

namespace App\Services;

use App\Models\ContentDocument;
use App\Services\Markdown\FrontMatter;
use App\Services\Markdown\MarkdownItem;
use App\Services\Markdown\NavigationItem;
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

    /**
     * Ceate a new `MarkdownNavigation` from `$path`.
     */
    public static function create(string $path): MarkdownNavigation
    {
        $service = new MarkdownNavigation($path);
        $service->toc = $service->parse();
        $service->sort($service->toc);
        $service->setModels($service->toc);

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

    /**
     * @param NavigationItem[] $navigation_toc
     */
    private function setModels(array $navigation_toc)
    {
        foreach ($navigation_toc as $navigation) {
            if ($navigation->markdown_item && ! $navigation->markdown_item->is_dir) {
                $this->setModel($navigation->markdown_item->front_matter, $navigation->markdown_item);
            }
            if (sizeof($navigation->nodes) > 0) {
                foreach ($navigation->nodes as $node_navigation) {
                    $this->setModel($node_navigation->markdown_item->front_matter, $node_navigation->markdown_item);
                    $this->setModels($node_navigation->nodes);
                }
            }
        }
    }

    private function setModel(?FrontMatter $front_matter = null, ?MarkdownItem $markdown_item = null)
    {
        if (! $markdown_item->is_draft) {
            ContentDocument::create([
                'title' => $front_matter?->title,
                'path' => $markdown_item->path,
                'category' => $front_matter?->category,
                'description' => $front_matter?->description,
                'headings' => $markdown_item?->headings_inline,
                'image' => config('app.url').'/content/logo/'.$markdown_item?->category.'.svg',
                'content' => $markdown_item?->markdown,
            ]);
        }
    }

    private function sort(array &$nodes)
    {
        usort($nodes, fn (NavigationItem $a, NavigationItem $b) => $a->markdown_item->filename <=> $b->markdown_item->filename);
    }
}
