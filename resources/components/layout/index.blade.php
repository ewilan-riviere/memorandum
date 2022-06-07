<x-app>
    <div class="h-full flex">
        <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
        <x-layout.sidebar />

        <!-- Static sidebar for desktop -->
        <x-layout.sidebar-static />
        <div class="flex flex-col min-w-0 flex-1 overflow-hidden">
            <div class="lg:hidden">
                <div class="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-1.5">
                    <a href="/">
                        <img class="h-8 w-auto" src="{{ asset('favicon-white.svg') }}" alt="Memorandum">
                    </a>
                    <div>
                        <button type="button"
                            class="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                            @click="$store.sidebar.toggle()">
                            <span class="sr-only">Open sidebar</span>
                            <!-- Heroicon name: outline/menu -->
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex-1 relative z-0 flex overflow-hidden">
                <x-layout.main :markdown="$markdown">
                    {{ $slot }}
                </x-layout.main>
            </div>
        </div>
    </div>
</x-app>
