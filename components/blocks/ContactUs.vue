<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div class="relative bg-gray-800">
    <div
      class="h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2"
    >
      <img
        class="object-cover w-full h-full"
        src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6875F5&sat=-100&blend-mode=multiply"
        alt="Support team"
      />
    </div>
    <div
      class="relative max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8 lg:py-16"
    >
      <div class="md:ml-auto md:w-1/2 md:pl-10">
        <div
          class="text-base font-semibold leading-6 tracking-wider text-gray-300 uppercase"
        >
          Award winning support
        </div>
        <h2
          class="mt-2 text-3xl font-extrabold leading-9 tracking-tight text-white sm:text-4xl sm:leading-10"
        >
          We’re here to help
        </h2>
        <p class="mt-3 text-lg leading-7 text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas
          tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim
          et fermentum, augue. Aliquet amet volutpat quisque ut interdum
          tincidunt duis.
        </p>
        <div class="mt-8">
          <div class="inline-flex rounded-md shadow">
            <a
              href="#"
              class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-gray-900 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-600 focus:outline-none focus:shadow-outline"
            >
              Visit the help center
              <icon
                name="external-link"
                :size="15"
                class="ml-2 text-gray-400"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
}
</script>
