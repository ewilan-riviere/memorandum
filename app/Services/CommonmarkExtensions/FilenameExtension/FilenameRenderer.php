<?php

namespace App\Services\CommonmarkExtensions\FilenameExtension;

use League\CommonMark\Extension\CommonMark\Node\Block\FencedCode;
use League\CommonMark\Extension\CommonMark\Renderer\Block\FencedCodeRenderer as BaseFencedCodeRenderer;
use League\CommonMark\Node\Node;
use League\CommonMark\Renderer\ChildNodeRendererInterface;
use League\CommonMark\Renderer\NodeRendererInterface;
use League\CommonMark\Util\HtmlElement;

class FilenameRenderer implements NodeRendererInterface
{
    protected BaseFencedCodeRenderer $baseRenderer;

    public function __construct()
    {
        $this->baseRenderer = new BaseFencedCodeRenderer();
    }

    public function render(
        Node $node,
        ChildNodeRendererInterface $childRenderer
    ): string {
        /** @var FencedCode $fencedCode */
        $fencedCode = $node;
        /** @var HtmlElement $preBlock */
        $preBlock = $this->baseRenderer->render($fencedCode, $childRenderer);
        $preBlock->setAttribute('data-filename', $this->getInfos($fencedCode));

        return $preBlock;
    }

    protected function getInfos(FencedCode $block): ?string
    {
        $infoWords = implode(' ', $block->getInfoWords());

        if (! empty($infoWords)) {
            preg_match_all('^\\[(.*?)\\]^', $infoWords, $filename, PREG_PATTERN_ORDER);

            if (array_key_exists(1, $filename)) {
                if (array_key_exists(0, $filename[1])) {
                    return $filename[1][0];
                }
            }
        }

        return $infoWords;
    }
}
