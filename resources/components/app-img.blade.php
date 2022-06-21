@php
$class = $attributes?->get('class');
$src = $attributes?->get('src');
@endphp

<div id="{{ $token }}" x-data="imageLozad" x-init="initiliaze('{{ $src }}', '{{ $token }}')" class="{{ $class }} relative">
    <div x-show="!display" class="absolute h-full w-full bg-gray-50 dark:bg-gray-800 {{ $class }}" x-transition>
    </div>
    @if ($asset)
        <img x-ref="media" src="{{ asset($src) }}" alt="" class="{{ $class }}" loading="lazy">
    @else
        <img x-ref="media" src="{{ $src }}" alt="" class="{{ $class }}" loading="lazy">
    @endif
</div>
