<div aria-live="assertive" class="fixed z-40 inset-0 flex items-end px-2 py-3 pointer-events-none sm:p-3 sm:items-start">
    <template x-for="toast of $store.toast.toasts" :key="toast.id">
        <div x-show="$store.toast.visible.includes(toast)" x-transition:enter="transition ease-in duration-200"
            x-transition:enter-start="transform opacity-0 translate-y-2" x-transition:enter-end="transform opacity-100"
            x-transition:leave="transition ease-out duration-500"
            x-transition:leave-start="transform translate-x-0 opacity-100"
            x-transition:leave-end="transform translate-x-full opacity-0"
            class="max-w-sm w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform ease-out duration-300 transition">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <x-icons.success x-show="toast.type === 'success'" class="h-6 w-6 text-green-400" />
                        <x-icons.info x-show="toast.type === 'info'" class="h-6 w-6 text-blue-400" />
                        <x-icons.warning x-show="toast.type === 'warning'" class="h-6 w-6 text-orange-400" />
                        <x-icons.danger x-show="toast.type === 'danger'" class="h-6 w-6 text-red-400" />
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-gray-100" x-text="toast.title"></p>
                        <p class="mt-1 text-sm text-gray-400" x-text="toast.text"></p>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex">
                        <button type="button"
                            class="bg-gray-900 rounded-md inline-flex text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            @click="$store.toast.kill(toast.id)">
                            <span class="sr-only">Close</span>
                            <!-- Heroicon name: solid/x -->
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <span
                        :class="{
                            'bg-green-500': toast.type === 'success',
                            'bg-blue-500': toast.type === 'info',
                            'bg-orange-500': toast.type === 'warning',
                            'bg-red-500': toast.type === 'danger',
                        }"
                        class="animate-life absolute bottom-0 left-0 h-1 rounded-b-md"></span>
                </div>
            </div>
        </div>
    </template>
</div>
</div>
