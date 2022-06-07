<?php

namespace App\Http\Controllers;

use App\Services\MarkdownNavigation;
use App\Services\MarkdownService;
use Artisan;
use Cache;
use SEO;
use View;

class MainController extends Controller
{
    public function index(?string $params = '.index')
    {
        $navigation = Cache::get('navigation');
        if (null === $navigation) {
            $navigation = MarkdownNavigation::create(base_path(MarkdownService::getMarkdownPath()));
            Cache::add('navigation', $navigation);
        }
        $markdown = MarkdownService::create($params);
        if (null === $markdown) {
            return redirect()->route('page');
        }

        if ('Memorandum' !== $markdown->front_matter?->title) {
            $title = "{$markdown->front_matter?->title}";
            if ($markdown->front_matter?->category) {
                $title .= " - {$markdown->front_matter->category}";
            }
            SEO::setTitle($title);
            Seo::setDescription($markdown->front_matter?->description);
        }
        View::share('navigation', $navigation);

        return view('views.pages.index', compact('markdown', 'navigation'));
    }

    public function refresh()
    {
        Artisan::call('memorandum');
    }
}
