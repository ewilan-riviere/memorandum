<div class="flex-1 flex flex-col pt-5 overflow-y-auto">
    <a href="/" class="flex items-center flex-shrink-0 px-4">
        <img class="h-8 w-auto" src="{{ asset('memorandum-text.svg') }}" alt="Workflow">
    </a>
    <nav class="mt-5 flex-1" aria-label="Sidebar">
        <div class="px-2 space-y-1">
            @each('components.toc-item', $navigation->toc, 'toc_item')
        </div>
    </nav>
    <div class="flex-shrink-0 flex border-t border-gray-700 p-2">
        <a href="https://github.com/ewilan-riviere/memorandum" target="_blank" rel="noopener noreferrer"
            class="flex-shrink-0 w-full hover:bg-gray-700 transition-colors duration-75 block p-2 rounded-md">
            <div class="flex items-center">
                <div>
                    <span class="sr-only">GitHub</span>
                    <x-icons.github class="inline-block h-6 w-6 rounded-full" />
                </div>
                <div class="ml-3 text-sm w-full">
                    <p class="text-center">
                        Ewilan Rivière
                    </p>
                    <p class="text-center">
                        MIT License · {{ $licence_year }}
                    </p>
                </div>
            </div>
        </a>
    </div>
</div>
