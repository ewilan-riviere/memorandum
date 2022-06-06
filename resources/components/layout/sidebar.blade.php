<div x-show="$store.sidebar.opened" class="relative z-40 lg:hidden transition-opacity ease-linear duration-300"
    role="dialog" aria-modal="true">
    <!--
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div x-show="$store.sidebar.opened" :class="$store.sidebar.openedBackdrop ? 'opacity-100' : 'opacity-0'"
        class="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300"></div>

    <div x-show="$store.sidebar.opened" class="fixed inset-0 flex z-40">
        <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
        <div x-show="$store.sidebar.opened" x-show="$store.sidebar.opened"
            :class="$store.sidebar.openedSidebar ? 'translate-x-0' : '-translate-x-full'"
            class="relative bg-gray-800 flex-1 flex flex-col max-w-xs w-full focus:outline-none transition ease-in-out duration-300 transform"
            @click.outside="$store.sidebar.close()">
            <!--
          Close button, show/hide based on off-canvas menu state.

          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
            <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button"
                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="$store.sidebar.close()">
                    <span class="sr-only">Close sidebar</span>
                    <!-- Heroicon name: outline/x -->
                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <x-layout.navigation :navigation="$navigation" />
        </div>

        <div class="flex-shrink-0 w-14" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
        </div>
    </div>
</div>
