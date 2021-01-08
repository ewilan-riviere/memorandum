<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <!-- This component requires Tailwind CSS >= 1.5.1 and @tailwindcss/ui >= 0.4.0 -->
  <div class="relative py-16 overflow-hidden bg-white">
    <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
      <div class="relative h-full mx-auto text-lg max-w-prose">
        <svg
          class="absolute transform translate-x-32 top-12 left-full"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
          />
        </svg>
        <svg
          class="absolute transform -translate-x-32 -translate-y-1/2 top-1/2 right-full"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="f210dbf6-a58d-4871-961e-36d5016a0f49"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
          />
        </svg>
        <svg
          class="absolute transform translate-x-32 bottom-12 left-full"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
        >
          <defs>
            <pattern
              id="d3eb07ae-5182-43e6-857d-35c643af9034"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="384"
            fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
          />
        </svg>
      </div>
    </div>
    <div class="relative px-4 sm:px-6 lg:px-8">
      <div class="mx-auto mb-6 text-lg max-w-prose">
        <p
          class="text-base font-semibold leading-6 tracking-wide text-center text-indigo-600 uppercase"
        >
          Introducing
        </p>
        <h1
          class="mt-2 mb-8 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl sm:leading-10 font-quicksand"
        >
          {{ content.title }}
        </h1>
        <div class="font-quicksand">
          {{ content.title }}
        </div>
        <p class="text-xl leading-8 text-gray-500">
          {{ content.description }}
        </p>
      </div>
      <div class="mx-auto prose prose-lg text-gray-500">
        <nuxt-content :document="content" />
      </div>
      <div class="hidden mx-auto prose prose-lg text-gray-500">
        <p>
          Faucibus commodo massa rhoncus, volutpat.
          <strong>Dignissim</strong> sed <strong>eget risus enim</strong>.
          Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent
          donec est. Odio penatibus risus viverra tellus varius sit neque erat
          velit. Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
          risus enim. <a href="#">Mattis mauris semper</a> sed amet vitae sed
          turpis id.
        </p>
        <ul>
          <li>Quis elit egestas venenatis mattis dignissim.</li>
          <li>Cras cras lobortis vitae vivamus ultricies facilisis tempus.</li>
          <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
        </ul>
        <p>
          Quis semper vulputate aliquam venenatis egestas sagittis quisque orci.
          Donec commodo sit viverra aliquam porttitor ultrices gravida eu.
          Tincidunt leo, elementum mattis elementum ut nisl, justo, amet,
          mattis. Nunc purus, diam commodo tincidunt turpis. Amet, duis sed elit
          interdum dignissim.
        </p>
        <h2>From beginner to expert in 30 days</h2>
        <p>
          Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
          in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
          mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
          tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
          Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
          diam.
        </p>
        <blockquote>
          <p>
            Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum
            urna sed consectetur neque tristique pellentesque. Blandit amet, sed
            aenean erat arcu morbi.
          </p>
        </blockquote>
        <p>
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p>
        <figure>
          <img
            class="w-full rounded-lg"
            src="https://source.unsplash.com/random"
            alt=""
            width="1310"
            height="873"
          />
          <figcaption>
            Sagittis scelerisque nulla cursus in enim consectetur quam.
          </figcaption>
        </figure>
        <h3>Everything you need to get up and running</h3>
        <p>
          Purus morbi dignissim senectus mattis <a href="#">adipiscing</a>.
          Amet, massa quam varius orci dapibus volutpat cras. In amet eu
          ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut
          viverra ridiculus non molestie. Gravida quis fringilla amet eget dui
          tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat
          ac. Cras fermentum convallis quam.
        </p>
        <p>
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="postcss"></style>
