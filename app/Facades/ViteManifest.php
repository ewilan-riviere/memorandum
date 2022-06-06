<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class ViteManifest extends Facade
{
    /**
     * Get the registered name of the component.
     */
    protected static function getFacadeAccessor(): string
    {
        return 'laravel-vite-manifest';
    }
}
