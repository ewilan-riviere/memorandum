<?php

namespace App\Services;

use App\Services\Markdown\MarkdownItem;
use File;

class MarkdownService
{
    public static function create(string $filename): ?MarkdownItem
    {
        $path = base_path(self::getMarkdownPath());
        $file_path = "{$path}{$filename}.md";

        if (File::exists($file_path)) {
            return MarkdownItem::create($file_path);
        }

        return null;
    }

    public static function getMarkdownPath(): string
    {
        $directory_separator = DIRECTORY_SEPARATOR;

        return "resources{$directory_separator}markdown{$directory_separator}";
    }

    public static function getMarkdownPathNormalize(): string
    {
        return 'resources/markdown/';
    }
}
