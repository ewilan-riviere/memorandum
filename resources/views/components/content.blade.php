@isset($markdown)
    <div x-data="markdown"
         id="markdown"
         class="mx-auto flex max-w-6xl flex-col items-start px-6 pb-6 lg:grid lg:grid-cols-3 lg:gap-6">
        <main @class([
            'max-w-full',
            'col-span-3 order-2' => $markdown->front_matter?->has_full_layout,
            'lg:col-span-2 order-2 lg:order-1 mt-6' => !$markdown->front_matter
                ?->has_full_layout,
        ])>
            <div x-ref="proseDocument"
                 class="prose lg:prose-lg prose-invert prose-primary max-w-full">
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
                    <nav id="toc"
                         class="section-nav mt-1"></nav>
                </div>
                <button @click="scrollToTop()"
                        class="mt-2 ml-auto hidden w-10 rounded-md bg-gray-800 p-1 hover:bg-gray-700 lg:block">
                    <x-icons.arrow class="mx-auto h-6 w-6 -rotate-90" />
                </button>
            @endif
        </aside>
    </div>
    <div class="mx-auto mt-6 max-w-6xl px-6 pb-6">
        <div class="border-t-2 border-gray-600 pt-5">
            <a href="{{ $edit_link }}"
               target="_blank"
               rel="noopener noreferrer"
               class="flex w-max items-center rounded-md p-2 text-sm text-gray-400 hover:bg-gray-800 hover:text-gray-300">
                @svg('edit', 'w-6 h-6')
                <span class="ml-1">Edit this page</span>
            </a>
        </div>
    </div>
@endisset
