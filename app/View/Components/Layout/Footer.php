<?php

namespace App\View\Components\Layout;

use Illuminate\View\Component;

class Footer extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Closure|\Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        $start_year = '2022';
        $current_year = date('Y');
        $licence_year = $start_year;

        if ($start_year !== $current_year) {
            $licence_year = "{$start_year} - {$current_year}";
        }

        return view('components.layout.footer', compact('licence_year'));
    }
}
