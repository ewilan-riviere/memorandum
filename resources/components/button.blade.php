@if ($button)
    <button {{ $attributes->merge(['class' => '']) }}>
        {{ $slot }}
    </button>
@else
    <a href="{{ $route }}" target="{{ $external ? '_blank' : '' }}"
        rel="{{ $external ? 'noopener noreferrer' : '' }}" {{ $attributes->merge(['class' => 'block']) }}>
        {{ $slot }}
    </a>
@endif
