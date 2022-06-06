<?php

namespace App\Http\Controllers;

use App\Models\ContentDocument;
use App\Services\MarkdownNavigation;
use App\Services\MarkdownService;
use Artisan;
use Cache;
use SEO;

class MainController extends Controller
{
    public function index(?string $params = '.index')
    {
        // Cache::flush();
        $navigation = Cache::get('navigation');
        if (null === $navigation) {
            Artisan::call('migrate:fresh');
            ContentDocument::removeAllFromSearch();
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

        return view('views.pages.index', compact('markdown', 'navigation'));
    }
}
