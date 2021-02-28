<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div class="bg-white">
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8">
      <div
        class="px-6 py-6 bg-indigo-700 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center"
      >
        <div class="xl:w-0 xl:flex-1">
          <h2
            class="text-2xl font-extrabold leading-8 tracking-tight text-white sm:text-3xl sm:leading-9"
          >
            Want products news and updates?
          </h2>
          <p
            id="newsletter-headline"
            class="max-w-3xl mt-3 text-lg leading-6 text-indigo-200"
          >
            Sign up for our newsletter to stay up to date.
          </p>
        </div>
        <div class="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
          <form class="sm:flex" aria-labelledby="newsletter-headline">
            <input
              aria-label="Email address"
              type="email"
              required
              class="w-full px-5 py-3 text-base leading-6 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md appearance-none focus:outline-none focus:placeholder-gray-400"
              placeholder="Enter your email"
            />
            <div
              class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0"
            >
              <button
                class="flex items-center justify-center w-full px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400"
              >
                Notify me
              </button>
            </div>
          </form>
          <p class="mt-3 text-sm leading-5 text-indigo-200">
            We care about the protection of your data. Read our
            <a href="#" class="font-medium text-white underline">
              Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Newsletter',
}
</script>
