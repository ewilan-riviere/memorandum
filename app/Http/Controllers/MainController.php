<?php

namespace App\Http\Controllers;

use App\Services\MarkdownNavigation;
use App\Services\MarkdownService;
use Cache;
use SEO;
use View;

class MainController extends Controller
{
    public function index(?string $params = '.index-article')
    {
        // Cache::flush();
        $params = str_replace('-article', '', $params);
        $navigation = MarkdownNavigation::get();
        $markdown = MarkdownService::create($params);

        View::share('navigation', $navigation);
        if (null === $markdown) {
            return view('views.pages.404', compact('markdown'));
        }

        if ('Memorandum' !== $markdown->front_matter?->title) {
            $title = "{$markdown->front_matter?->title}";
            if ($markdown->front_matter?->category) {
                $title .= " - {$markdown->front_matter->category}";
            }
            SEO::setTitle($title);
            Seo::setDescription($markdown->front_matter?->description);
        }

        return view('views.pages.index', compact('markdown'));
    }
}
