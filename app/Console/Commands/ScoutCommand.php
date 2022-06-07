<?php

namespace App\Console\Commands;

use App\Models\ContentDocument;
use App\Services\Markdown\FrontMatter;
use App\Services\Markdown\MarkdownItem;
use App\Services\Markdown\NavigationItem;
use App\Services\MarkdownNavigation;
use App\Services\MarkdownService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ScoutCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scout:fresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manage models to search engine with Laravel Scout.';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->alert('Scout Fresh');
        $this->warn($this->description);

        Artisan::call('migrate:fresh', [
            '--force' => true,
        ]);

        $navigation = MarkdownNavigation::create(base_path(MarkdownService::getMarkdownPath()));
        $this->setModels($navigation->toc);

        $item = new ContentDocument();
        $index_name = $item->searchableAs();

        $models = [
            'ContentDocument' => $index_name,
        ];
        $path = 'App\\\\Models\\\\';

        foreach ($models as $key => $value) {
            Artisan::call('scout:flush "'.$path.$key.'"', [], $this->getOutput());
            Artisan::call('scout:delete-index "'.$value.'"', [], $this->getOutput());
        }
        foreach ($models as $key => $value) {
            Artisan::call('scout:import "'.$path.$key.'"', [], $this->getOutput());
        }

        return 0;
    }

    public function clear()
    {
        Artisan::call('cache:clear', [], $this->getOutput());
        Artisan::call('route:clear', [], $this->getOutput());
        Artisan::call('config:cache', [], $this->getOutput());
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
        if (! $markdown_item->is_draft && ! $markdown_item->is_dir) {
            ContentDocument::create([
                'title' => $front_matter?->title,
                'path' => $markdown_item->path,
                'params_inline' => $markdown_item->params_inline,
                'category' => $front_matter?->category,
                'parent' => $front_matter?->parent,
                'description' => $front_matter?->description,
                'headings' => $markdown_item?->headings_inline,
                'image' => config('app.url').'/content/logo/'.$markdown_item?->category.'.svg',
                'content' => $markdown_item?->markdown,
            ]);
        }
    }
}
