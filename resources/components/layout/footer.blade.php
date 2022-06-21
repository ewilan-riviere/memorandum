<footer class="main-container pt-12 pb-8 px-6">
    <div class="md:flex md:items-center md:justify-between">
        <div class="flex justify-center space-x-6 md:order-2">
            <a href="https://github.com/ewilan-riviere/memorandum" target="_blank" rel="noopener noreferrer"
                class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">GitHub</span>
                <x-icons.github class="w-6 h-6" />
            </a>
        </div>
        <div class="mt-8 md:mt-0 md:order-1">
            <p class="text-center text-base text-gray-400 md:flex md:items-center">
                <x-icons.cc class="w-6 h-6 mr-1" />
                {{ $licence_year }}<span class="mx-1">·</span><a href="https://github.com/ewilan-riviere"
                    target="_blank" rel="noopener noreferrer" class="internal-link">Ewilan Rivière</a><span
                    class="mr-1">.</span><a
                    href="https://github.com/ewilan-riviere/memorandum/blob/master/LICENSE" target="_blank"
                    rel="noopener noreferrer" class="internal-link">MIT License</a>.
            </p>
        </div>
    </div>
</footer>
