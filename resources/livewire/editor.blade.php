{{-- <div class="p-4">
    @push('styles')
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    @endpush

    This is your input:
    <div class="px-2 py-4 rounded bg-white text-gray-800">
        {{ $content }}
    </div>
    <div class="mt-2 bg-white text-gray-800" wire:ignore>
        <div class="h-64" x-data="quill" x-ref="quillEditor"
            x-on:quill-input.debounce.2000ms="content" wire:model.lazy="content">
            {!! $content !!}
        </div>
    </div>
</div> --}}
<div>
    <div>
        <h2>Editor</h2>
        <div class="border border-primary-100 h-10">
            <x-editor wire:model="content" />
        </div>
    </div>
    <div>
        <h2>Preview</h2>
        <p>{{ $content }}</p>
    </div>
</div>
