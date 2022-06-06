<div class="fixed z-50 right-2 top-2 space-y-2">
    <template x-for="toast of $store.toast.toasts" :key="toast.id">
        <div x-show="$store.toast.visible.includes(toast)" x-transition:enter="transition ease-in duration-200"
            x-transition:enter-start="transform opacity-0 translate-y-2" x-transition:enter-end="transform opacity-100"
            x-transition:leave="transition ease-out duration-500"
            x-transition:leave-start="transform translate-x-0 opacity-100"
            x-transition:leave-end="transform translate-x-full opacity-0">
            <div @click="$store.toast.kill(toast.id)"
                :class="{
                    'bg-green-200': toast.type === 'success',
                    'bg-blue-200': toast.type === 'info',
                    'bg-orange-200': toast.type === 'warning',
                    'bg-red-200': toast.type === 'danger',
                }"
                class="rounded-md p-4 min-w-[15rem] max-w-xl relative">
                <div class="flex">
                    <div :class="{
                        'text-green-400': toast.type === 'success',
                        'text-blue-400': toast.type === 'info',
                        'text-orange-400': toast.type === 'warning',
                        'text-red-400': toast.type === 'danger',
                    }"
                        class="flex-shrink-0">
                        <x-icons.success x-show="toast.type === 'success'" class="h-5 w-5" />
                        <x-icons.info x-show="toast.type === 'info'" class="h-5 w-5" />
                        <x-icons.warning x-show="toast.type === 'warning'" class="h-5 w-5" />
                        <x-icons.danger x-show="toast.type === 'danger'" class="h-5 w-5" />
                    </div>
                    <div class="ml-3">
                        <h3 :class="{
                            'text-green-800': toast.type === 'success',
                            'text-blue-800': toast.type === 'info',
                            'text-orange-800': toast.type === 'warning',
                            'text-red-800': toast.type === 'danger',
                        }"
                            class="text-sm font-medium" x-text="toast.title"></h3>
                        <div :class="{
                            'text-green-700': toast.type === 'success',
                            'text-blue-700': toast.type === 'info',
                            'text-orange-700': toast.type === 'warning',
                            'text-red-700': toast.type === 'danger',
                        }"
                            class="mt-2 text-sm" x-text="toast.text"></div>
                    </div>
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
    </template>
</div>
