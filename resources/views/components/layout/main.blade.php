<main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
    <!-- Breadcrumb -->
    <x-layout.breadcrumb :breadcrumb="$markdown?->breadcrumb" />

    @if ($withHeader)
        <article>
            @if (!$markdown?->front_matter?->has_full_layout)
                <div>
                    <div>
                        <x-app-img class="h-32 w-full object-cover lg:h-48"
                                   :src="'content/code.webp'"
                                   asset />
                    </div>
                    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                            <div class="flex">
                                <x-app-img class="h-24 w-24 rounded-full bg-gray-800 ring-4 ring-gray-800 sm:h-32 sm:w-32"
                                           :src="'content/logo/' . $markdown?->category . '.svg'"
                                           asset />
                            </div>
                            <div
                                 class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                                <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                                    <h1 class="font-handlee truncate text-2xl font-bold text-gray-100">
                                        {{ $markdown?->front_matter?->title }}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                            <h1 class="font-handlee truncate text-2xl font-bold text-gray-100">
                                {{ $markdown?->front_matter?->title }}
                            </h1>
                        </div>
                        <div class="mt-3 text-sm italic">
                            Modified at
                            <time datetime="{{ $markdown?->date }}">{{ $markdown?->date }}</time>
                        </div>
                        <div class="mt-3 italic">
                            {{ $markdown?->front_matter?->description }}
                        </div>
                    </div>
                </div>
            @endif
            <div class="mt-6">
                {{ $slot }}
            </div>
        </article>
    @else
        {{ $slot }}
    @endif
</main>
