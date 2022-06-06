<main class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
    <!-- Breadcrumb -->
    <x-layout.breadcrumb :breadcrumb="$markdown->breadcrumb" />

    <article>
        <!-- Profile header -->
        <div>
            <div>
                <x-app-img class="h-32 w-full object-cover lg:h-48" :src="'content/code.webp'" asset />
            </div>
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div class="flex">
                        <x-app-img class="h-24 w-24 rounded-full ring-4 ring-gray-800 sm:h-32 sm:w-32 bg-gray-800"
                            :src="'content/logo/' . $markdown?->category . '.svg'" asset />
                    </div>
                    <div class="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div class="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                            <h1 class="text-2xl font-bold text-gray-100 truncate font-handlee">
                                {{ $markdown->front_matter?->title }}
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                    <h1 class="text-2xl font-bold text-gray-100 truncate font-handlee">
                        {{ $markdown->front_matter?->title }}
                    </h1>
                </div>
                <div class="mt-3 italic text-sm">
                    Modified at
                    <time datetime="{{ $markdown->date }}">{{ $markdown->date }}</time>
                </div>
                <div class="mt-3 italic">
                    {{ $markdown->front_matter?->description }}
                </div>
            </div>
        </div>
        <div class="mt-6">
            {{ $slot }}
        </div>
    </article>
</main>
