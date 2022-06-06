<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ScoutCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scout:fresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Manage models to search engine with Laravel Scout.';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->alert('Scout Fresh');
        $this->warn($this->description);

        $app = config('app.name');
        $models = [
            'ContentDocument' => "{$app}_content_document",
        ];
        $path = 'App\\\\Models\\\\';

        foreach ($models as $key => $value) {
            Artisan::call('scout:flush "'.$path.$key.'"', [], $this->getOutput());
            Artisan::call('scout:delete-index "'.$value.'"', [], $this->getOutput());
        }
        foreach ($models as $key => $value) {
            Artisan::call('scout:import "'.$path.$key.'"', [], $this->getOutput());
        }

        return 0;
    }

    public function clear()
    {
        Artisan::call('cache:clear', [], $this->getOutput());
        Artisan::call('route:clear', [], $this->getOutput());
        Artisan::call('config:cache', [], $this->getOutput());
    }
}
