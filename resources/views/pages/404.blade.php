<x-layout :markdown="$markdown" :withHeader="false">
    <div class="min-h-full flex flex-col lg:relative">
        <div class="flex-grow flex flex-col">
            <main class="flex-grow flex flex-col">
                <div class="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
                    <div class="flex-shrink-0 my-auto py-16 sm:py-32">
                        <p class="text-sm font-semibold text-indigo-500 uppercase tracking-wide">404 error</p>
                        <h1 class="mt-2 text-4xl font-handlee text-gray-100 tracking-tight sm:text-5xl">Page not found
                        </h1>
                        <div class="mt-2 text-base text-gray-400">
                            <p>Alert! We couldn’t find the page you’re looking for.</p>
                            <p>
                                Contingency code is launch.
                            </p>
                        </div>
                        <div class="mt-6">
                            <a href="/" class="text-base font-medium text-indigo-500 hover:text-indigo-400">Go back
                                home<span aria-hidden="true"> &rarr;</span></a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img class="absolute inset-0 h-full w-full object-cover" src="{{ asset('404.webp') }}" alt="">
        </div>
    </div>
</x-layout>
