<?php

namespace App\View\Components\Layout;

use App\Services\Markdown\MarkdownItem;
use Illuminate\View\Component;

class Main extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public ?MarkdownItem $markdown,
        public bool $withHeader = true,
    ) {
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Closure|\Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.layout.main');
    }
}
