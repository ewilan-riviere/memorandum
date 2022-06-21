<?php

namespace App\View\Components;

use App\Services\Markdown\MarkdownItem;
use App\Services\MarkdownService;
use Illuminate\View\Component;

class Content extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public MarkdownItem $markdown,
        public ?string $edit_link = null,
    ) {
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Closure|\Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        $resource_path = MarkdownService::getMarkdownPathNormalize();
        $file_path = $this->markdown->params_inline;

        $this->edit_link = config('app.repository_url').config('app.repository_suffix_url')."/{$resource_path}{$file_path}.md";

        return view('components.content');
    }
}
