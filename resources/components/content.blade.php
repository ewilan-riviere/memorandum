@isset($markdown)
    <div x-data="markdown" id="markdown"
        class="flex flex-col lg:grid lg:grid-cols-3 lg:gap-6 px-6 items-start pb-6 max-w-6xl mx-auto">
        <main @class([
            'max-w-full',
            'col-span-3 order-2' => $markdown->front_matter?->has_full_layout,
            'lg:col-span-2 order-2 lg:order-1' => !$markdown->front_matter
                ?->has_full_layout,
        ])>
            <div x-ref="proseDocument" class="prose lg:prose-lg prose-invert prose-primary mt-6 prose-img:px-20 max-w-full">
                {!! $markdown->html !!}
            </div>
        </main>
        <aside @class([
            'lg:text-lg flex flex-col justify-between',
            'col-span-3 order-1' => $markdown->front_matter?->has_full_layout,
            'lg:col-span-1 lg:sticky order-1 lg:order-2 top-5' => !$markdown->front_matter?->has_full_layout,
        ])>
            @if ($markdown->has_toc)
                <div>
                    <div class="text-gray-400">On this page</div>
                    <nav id="toc" class="mt-1 section-nav"></nav>
                </div>
                <button @click="scrollToTop()"
                    class="hidden lg:block bg-gray-800 hover:bg-gray-700 p-1 rounded-md mt-2 w-10 ml-auto">
                    <x-icons.arrow class="w-6 h-6 -rotate-90 mx-auto" />
                </button>
            @endif
        </aside>
    </div>
    <div class="max-w-6xl mx-auto px-6 pb-6 mt-6">
        <div class="border-t-2 border-gray-600 pt-5">
            <a href="{{ $edit_link }}" target="_blank" rel="noopener noreferrer"
                class="flex items-center hover:bg-gray-800 w-max p-2 rounded-md">
                @svg('edit', 'w-8 h-8')
                <span class="ml-1">Edit this page</span>
            </a>
        </div>
    </div>
@endisset
