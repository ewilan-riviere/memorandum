<?php

namespace App\Services\CommonmarkExtensions\FilenameExtension;

use League\CommonMark\Environment\EnvironmentBuilderInterface;
use League\CommonMark\Extension\CommonMark\Node\Block\FencedCode;
use League\CommonMark\Extension\ExtensionInterface;

class FilenameExtension implements ExtensionInterface
{
    public function register(EnvironmentBuilderInterface $environment): void
    {
        $environment
            ->addRenderer(FencedCode::class, new FilenameRenderer(), 10)
        ;
    }
}
