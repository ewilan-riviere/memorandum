<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Str;

class AppImg extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(
        public ?string $default = '',
        public ?string $media = '',
        public ?bool $asset = false,
        public ?string $token = null,
    ) {
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Closure|\Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        $this->token = Str::random();

        return view('components.app-img');
    }
}
