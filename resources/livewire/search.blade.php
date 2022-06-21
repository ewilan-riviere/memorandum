<div x-data="search">
    {{-- fake search input --}}
    <div class="max-w-lg w-full lg:max-w-xs">
        <label for="search" class="sr-only">Search</label>
        <div class="relative">
            <div class="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <!-- Heroicon name: solid/search -->
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <button class="relative w-full group" @click="toggle()" wire:click="clear">
                <input
                    class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm group-hover:bg-gray-600 transition-colors duration-75"
                    placeholder="Search" />
                <span class="inset-0 absolute z-10 cursor-text"></span>
            </button>
        </div>
    </div>
    {{-- search modal --}}
    <div x-ref="results" class="relative z-10" role="dialog" aria-modal="true">
        <div x-show="opened" :class="openedBackdrop ? 'opacity-100' : 'opacity-0'"
            class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity ease-out duration-300"></div>

        <div x-show="opened" class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <div x-show="opened" :class="openModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
                class="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all ease-out duration-30"
                @click.outside="close()">
                <div class="relative">
                    <!-- Heroicon name: outline/search -->
                    <svg class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input x-ref="inputSearch" type="text"
                        class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Search..." wire:model.debounce.500ms="search">
                </div>

                <div wire:loading wire:target="search" class="w-full py-6">
                    <div>
                        <x-loading class="w-6 h-6 mx-auto" />
                    </div>
                </div>

                @if (sizeof($hits) === 0)
                    <!-- Empty state, show/hide based on command palette state. -->
                    <div wire:loading.class="hidden" wire:target="search"
                        class="py-14 px-6 text-center sm:px-14">
                        <!-- Heroicon name: outline/folder -->
                        <svg class="mx-auto h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <p class="mt-4 text-sm text-gray-200">We couldn't find any projects with that term. Please try
                            again.</p>
                    </div>
                @else
                    <!-- Default state, show/hide based on command palette state. -->
                    <ul wire:loading.class="hidden"
                        class="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto">
                        @foreach ($hits as $hit)
                            <!-- Active: "bg-gray-100" -->
                            <a href="{{ route('page', ['params' => $hit->params_inline]) }}"
                                class="group flex select-none rounded-md p-2 m-1 hover:bg-gray-700" id="option-1"
                                role="option" tabindex="-1">
                                <div class="flex h-10 w-10 flex-none items-center justify-center">
                                    <!-- Active: "text-white", Not Active: "text-gray-500" -->
                                    <x-app-img src="{{ $hit->image }}" alt="" class="h-6 w-6 flex-none" />
                                </div>
                                <div class="ml-4 flex-auto">
                                    <p class="text-sm font-medium text-gray-100">{{ $hit->title }}</p>
                                    <!-- Active: "text-gray-900", Not Active: "text-gray-700" -->
                                    @if ($hit->parent)
                                        <p class="text-sm font-medium text-gray-300">
                                            <span>{{ $hit->parent }}</span>
                                            @if ($hit->parent !== $hit->category)
                                                <span>in {{ $hit->category }}</span>
                                            @endif
                                        </p>
                                    @endif
                                    <!-- Active: "text-gray-700", Not Active: "text-gray-500" -->
                                    <p class="text-sm text-gray-400">{{ $hit->description }}</p>
                                </div>
                            </a>
                        @endforeach
                    </ul>
                @endif
            </div>
        </div>
    </div>


</div>
