<?php

namespace App\Services\Markdown;

use App\Services\MarkdownService;
use File;
use Illuminate\Support\Str;
use Spatie\YamlFrontMatter\YamlFrontMatter;
use SplFileInfo;

class MarkdownItem
{
    public const TRANSLATIONS = [
        'js' => 'JS',
        'css' => 'CSS',
        'mysql' => 'MySQL',
        'macos' => 'MacOS',
        'wsl' => 'WSL',
        'vps' => 'VPS',
        'nas' => 'NAS',
        'php' => 'PHP',
        'ts' => 'TS',
    ];

    public const CONFIG = [
        'APP_NAME' => 'app.name',
        'APP_URL' => 'app.url',
    ];

    public ?string $name = null;
    public ?string $content = null;

    /** @var string[] */
    public array $params = [];
    public ?string $params_inline = null;
    /** @var MarkdownBreadcrumb[] */
    public ?array $breadcrumb = [];

    public ?FrontMatter $front_matter = null;
    public ?string $slug = null;
    public ?string $icon = null;

    public ?string $markdown = null;
    public ?string $html = null;
    public ?bool $has_toc = false;

    /** @var string[] */
    public ?array $headings = [];
    public ?string $headings_inline = null;

    public function __construct(
        public ?string $path = null,
        public ?string $filename = null,
        public ?string $extension = null,
        public ?string $date = null,
        public ?string $category = 'default',
        public ?string $parent = null,
        public ?int $size = 0,
        public ?bool $is_dir = false,
        public ?int $depth = 0,
        public ?bool $is_draft = false,
    ) {
    }

    public static function create(string $path, ?int $depth = 0): MarkdownItem
    {
        $splFileInfo = new SplFileInfo($path);

        $markdown_item = new MarkdownItem();

        $markdown_item->path = $splFileInfo->getPathname();
        if (! $splFileInfo->isDir()) {
            $markdown_item->filename = pathinfo($path)['filename'];
        } else {
            $markdown_item->filename = $splFileInfo->getFilename();
        }
        $markdown_item->extension = $splFileInfo->getExtension();
        $date = File::lastModified($path);
        $date = gmdate('Y/m/d H:m', $date);
        $markdown_item->date = $date;
        $markdown_item->size = $splFileInfo->getSize();
        $markdown_item->is_dir = $splFileInfo->isDir();
        $markdown_item->depth = $depth;

        $markdown_item->name = $markdown_item->setName($markdown_item->filename);
        $markdown_item = $markdown_item->setParams();
        $markdown_item = $markdown_item->setFrontMatter();
        $markdown_item->slug = Str::slug($markdown_item->removeOrderNumber($markdown_item->name));

        if (! $markdown_item->is_dir) {
            $markdown_item->content = File::get($path);
            $markdown_item->replaceConfig();
            MarkdownConfig::create($markdown_item);
        }
        if (0 === $markdown_item->depth) {
            $markdown_item->icon = "category-{$markdown_item->slug}";
        }
        if (str_starts_with($splFileInfo->getFilename(), '.')) {
            $markdown_item->is_draft = true;
        }

        if (! empty($markdown_item->params_inline)) {
            $split = explode('/', $markdown_item->params_inline);
            foreach ($split as $value) {
                $name = str_replace('.md', '', $value);
                $breadcrumb_item = new MarkdownBreadcrumb($markdown_item->setName($name), $name, Str::slug($markdown_item->removeOrderNumber($name)));
                array_push($markdown_item->breadcrumb, $breadcrumb_item);
            }
        }
        if (sizeof($markdown_item->breadcrumb) >= 2) {
            $markdown_item->category = $markdown_item->breadcrumb[1]->slug;
        }
        if ('default' !== $markdown_item->category) {
            $markdown_item->front_matter->category = $markdown_item->setName($markdown_item->category);
        }
        $parent = explode(DIRECTORY_SEPARATOR, $markdown_item->path);
        array_pop($parent);
        $parent = $parent[sizeof($parent) - 1];
        if ('markdown' !== $parent) {
            $markdown_item->parent = $parent;
            $markdown_item->front_matter->parent = $markdown_item->setName($markdown_item->parent);
        }

        return $markdown_item;
    }

    /**
     * Set FrontMatter from YAML.
     */
    public static function extractFrontMatter(array $front_matter_yaml, ?string $alt = 'unknown', ?string $number = null): FrontMatter
    {
        $front_matter = new FrontMatter();
        if (array_key_exists('title', $front_matter_yaml)) {
            $front_matter->title = $front_matter_yaml['title'];
        }
        if (array_key_exists('description', $front_matter_yaml)) {
            $front_matter->description = $front_matter_yaml['description'];
        }
        if (array_key_exists('layout', $front_matter_yaml)) {
            $layout_type = $front_matter_yaml['layout'];
            $front_matter->has_full_layout = 'full' === $layout_type;
        }

        if (null !== $number) {
            $front_matter->title_ordered = "{$number}. {$front_matter->title}";
        } else {
            $front_matter->title_ordered = $front_matter->title;
        }
        if (! $front_matter->title) {
            $front_matter->title = $alt;
        }

        return $front_matter;
    }

    private function replaceConfig(): static
    {
        foreach (self::CONFIG as $dotenv_key => $config_key) {
            $this->markdown = str_replace($dotenv_key, config($config_key), $this->markdown);
        }

        return $this;
    }

    /**
     * Set FrontMatter from YAML.
     */
    private function setFrontMatter(): static
    {
        if (! $this->is_dir) {
            $content = File::get($this->path);
            $front_matter_yaml = YamlFrontMatter::parse($content);
            $this->markdown = $front_matter_yaml->body();
            $this->front_matter = MarkdownItem::extractFrontMatter($front_matter_yaml->matter(), $this->name, $this->getOrderNumber($this->filename));
        } else {
            $this->front_matter = new FrontMatter();
            $this->front_matter->title = $this->name;
            $this->front_matter->title_ordered = $this->name;
        }

        return $this;
    }

    /**
     * Set parameters for route from path.
     */
    private function setParams(): static
    {
        $path = $this->path;
        $path = str_replace('\\', '/', $path);
        if (! empty(MarkdownService::getMarkdownPathNormalize())) {
            $params = explode(MarkdownService::getMarkdownPathNormalize(), $path);
            if (! $this->is_dir) {
                if (array_key_exists(1, $params)) {
                    $params = explode('/', $params[1]);
                    $this->params = array_filter($params);
                } else {
                    $this->params = [$this->filename];
                }
            }
            array_pop($this->params);
            array_push($this->params, $this->filename);
            $this->params_inline = str_replace('.md', '', implode('/', $this->params));
        }

        return $this;
    }

    /**
     * Set name from filename.
     */
    private function setName(string $filename): string
    {
        foreach ([
            '.' => '. ',
            '-' => ' ',
        ] as $key => $value) {
            $filename = MarkdownItem::normalize($filename, $key, $value);
        }
        foreach (self::TRANSLATIONS as $original => $translation) {
            $reg = '/\b'.$original.'\b/i';
            $filename = preg_replace($reg, $translation, $filename);
        }
        $filename = MarkdownItem::removeOrderNumber($filename);

        return ucfirst(trim($filename));
    }

    /**
     * Remove some extra characters from string.
     */
    private function normalize(string $name, mixed $search, string $replace): string
    {
        if (str_contains($name, $search)) {
            $name = explode($search, $name);
            $name = array_map('ucfirst', $name);
            $name = implode($replace, $name);
        }

        return $name;
    }

    /**
     * Remove `#.` from beginning of string.
     */
    private function removeOrderNumber(string $string): string
    {
        if (str_contains($string, '.')) {
            $string = explode('.', $string);
            array_shift($string);

            return implode('.', $string);
        }

        return $string;
    }

    private function getOrderNumber(string $string): ?string
    {
        if (str_contains($string, '.')) {
            $string = explode('.', $string);

            return array_shift($string);
        }

        return null;
    }
}
