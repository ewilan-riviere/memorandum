<div x-data="{
    content: @entangle($attributes->wire('model')),
    ...editor()
}" x-init="() => init($refs.editor)" wire:ignore
    {{ $attributes->whereDoesntStartWith('wire:model') }}>
    <div x-ref="editor"></div>
</div>
{{-- <div x-data="{ content: @entangle($attributes->wire('model')), ...editor }" wire:ignore {{ $attributes->whereDoesntStartWith('wire:model') }}>
    <div x-ref="editor"></div>
</div> --}}
