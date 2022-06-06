<!-- Current: "bg-gray-200 text-gray-100", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-100" -->
<div x-data="tocItem" x-init="state(`{{ $toc_item->markdown_item->slug }}`)" class="relative">
    @if (!$toc_item->markdown_item->is_draft)
        <x-button x-bind:class="{ 'bg-gray-700': collapsed }"
            class="w-full text-gray-300 hover:bg-gray-700 hover:text-gray-100 group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md mb-1"
            :button="$toc_item->markdown_item->is_dir" :route="route('page', ['params' => $toc_item->markdown_item->params_inline])" @click="toggle()">
            <div class="flex items-center">
                @if ($toc_item->markdown_item->depth === 0 && $toc_item->markdown_item->is_dir)
                    @svg($toc_item->markdown_item?->icon, 'text-gray-500 group-hover:text-gray-400 mr-2 flex-shrink-0 h-6 w-6')
                @elseif($toc_item->markdown_item->depth === 1)
                    <x-app-img class="w-5 h-5 mr-2" :src="'content/logo/' . $toc_item->markdown_item?->slug . '.svg'" asset />
                @endif
                <span class="mr-1">{{ $toc_item->markdown_item?->front_matter?->title_ordered }}</span>
            </div>
            @if (sizeof($toc_item->nodes) > 0)
                <span class="transition-transform duration-75" :class="collapsed ? 'rotate-90' : ''">
                    <x-icons.arrow class="w-4 h-4" />
                </span>
            @endif
        </x-button>
        <div x-show="collapsed" x-transition class="pl-4 ml-2 border-l-2 border-primary-500">
            @each('components.toc-item', $toc_item->nodes, 'toc_item')
        </div>
    @endif
</div>
