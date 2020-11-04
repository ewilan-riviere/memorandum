<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <section class="bg-gray-50">
    <div class="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="relative">
        <img src="/images/fallout/hacker-zone.jpg" alt="" class="rounded-md" />
        <blockquote class="mt-8">
          <div
            class="max-w-3xl mx-auto text-2xl font-medium leading-9 text-center text-gray-900"
          >
            <p>Code... Code never changes.</p>
          </div>
          <footer class="mt-4">
            <div class="flex ml-auto w-max-content">
              <div class="">
                <img
                  class="w-10 h-10 mx-auto rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div
                class="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center"
              >
                <div class="text-base font-medium leading-6 text-gray-900">
                  Judith Black
                </div>

                <svg
                  class="hidden w-5 h-5 mx-1 text-indigo-600 md:block"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M11 0h3L9 20H6l5-20z" />
                </svg>

                <div class="text-base font-medium leading-6 text-gray-500">
                  CEO, Workcation
                </div>
              </div>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Fallout',
}
</script>
