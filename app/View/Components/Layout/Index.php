<?php

namespace App\View\Components\Layout;

use App\Services\Markdown\MarkdownItem;
use App\Services\MarkdownNavigation;
use Illuminate\View\Component;

class Index extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public MarkdownNavigation $navigation,
        public MarkdownItem $markdown,
    ) {
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Closure|\Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.layout.index');
    }
}
