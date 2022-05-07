<script setup lang="ts">
import { useContentStore } from '@/src/stores/content';
import {
  SearchIcon,
  FilterIcon,
} from '@heroicons/vue/solid'

const directory = {
  A: [
    {
      id: 1,
      name: 'Leslie Abbott',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      name: 'Hector Adams',
      role: 'VP, Marketing',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      name: 'Blake Alexander',
      role: 'Account Coordinator',
      imageUrl:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 4,
      name: 'Fabricio Andrews',
      role: 'Senior Art Director',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  B: [
    {
      id: 5,
      name: 'Angela Beaver',
      role: 'Chief Strategy Officer',
      imageUrl:
        'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      name: 'Yvette Blanchard',
      role: 'Studio Artist',
      imageUrl:
        'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      name: 'Lawrence Brooks',
      role: 'Content Specialist',
      imageUrl:
        'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  C: [
    {
      id: 8,
      name: 'Jeffrey Clark',
      role: 'Senior Art Director',
      imageUrl:
        'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 9,
      name: 'Kathryn Cooper',
      role: 'Associate Creative Director',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  E: [
    {
      id: 10,
      name: 'Alicia Edwards',
      role: 'Junior Copywriter',
      imageUrl:
        'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 11,
      name: 'Benjamin Emerson',
      role: 'Director, Print Operations',
      imageUrl:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 12,
      name: 'Jillian Erics',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 13,
      name: 'Chelsea Evans',
      role: 'Human Resources Manager',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  G: [
    {
      id: 14,
      name: 'Michael Gillard',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 15,
      name: 'Dries Giuessepe',
      role: 'Manager, Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  M: [
    {
      id: 16,
      name: 'Jenny Harrison',
      role: 'Studio Artist',
      imageUrl:
        'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 17,
      name: 'Lindsay Hatley',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 18,
      name: 'Anna Hill',
      role: 'Partner, Creative',
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  S: [
    {
      id: 19,
      name: 'Courtney Samuels',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 20,
      name: 'Tom Simpson',
      role: 'Director, Product Development',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  T: [
    {
      id: 21,
      name: 'Floyd Thompson',
      role: 'Principal Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 22,
      name: 'Leonard Timmons',
      role: 'Senior Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 23,
      name: 'Whitney Trudeau',
      role: 'Copywriter',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  W: [
    {
      id: 24,
      name: 'Kristin Watson',
      role: 'VP, Human Resources',
      imageUrl:
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 25,
      name: 'Emily Wilson',
      role: 'VP, User Experience',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  Y: [
    {
      id: 26,
      name: 'Emma Young',
      role: 'Senior Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
}

const store = useContentStore()

const domain = computed(() => store.domain)
const subject = computed(() => store.subject)
</script>

<template>
  <aside class="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-700">
    <div class="px-6 pt-6 pb-4">
      <h2 class="text-lg font-medium text-gray-100">Directory</h2>
      <p class="mt-1 text-sm text-gray-400">
        Search directory of 3,018 employees
      </p>
      <form class="mt-6 flex space-x-4" action="#">
        <div class="flex-1 min-w-0">
          <label for="search" class="sr-only">Search</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input type="search" name="search" id="search"
              class="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search" />
          </div>
        </div>
        <button type="submit"
          class="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
          <FilterIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span class="sr-only">Search</span>
        </button>
      </form>
    </div>
    <!-- Directory list -->
    <nav class="flex-1 min-h-0 overflow-y-auto scrollbar-thin" aria-label="Directory">
      <!-- <div v-for="letter in Object.keys(directory)" :key="letter" class="relative">
        <div
          class="z-10 sticky top-0 border-t border-b border-gray-700 bg-gray-800 px-6 py-1 text-sm font-medium text-gray-400">
          <h3>{{ letter }}</h3>
        </div>
        <ul role="list" class="relative z-0 divide-y divide-gray-700">
          <li v-for="person in directory[letter]" :key="person.id">
            <div
              class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-75 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="person.imageUrl" alt="" />
              </div>
              <div class="flex-1 min-w-0">
                <a href="#" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true" />
                  <p class="text-sm font-medium text-gray-100">
                    {{ person.name }}
                  </p>
                  <p class="text-sm text-gray-400 truncate">
                    {{ person.role }}
                  </p>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div> -->
      <ul v-if="!subject.files?.length" role="list" class="relative z-0 divide-y divide-gray-700">
        <li v-for="subject in domain.subjects" :key="subject.slug">
          <button
            class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-75 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 w-full text-left"
            @click="store.setSubject(subject)">
            <div class="flex-shrink-0">
              <app-img class="h-8 w-8" :src="`/content/logo/${subject.slug}.webp`" alt="" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-100 capitalize">
                  {{ subject.label }}
                </p>
                <p class="text-sm text-gray-400 truncate">
                  <!-- {{ person.role }} -->
                </p>
              </div>
            </div>
          </button>
          <!-- <div
            class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-75 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
            {{ subject.slug }}
            <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" :src="person.imageUrl" alt="" />
              </div>
            <div class="flex-1 min-w-0">
              <router-link :to="subject.route" class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-100">
                  {{ subject.title }}
                </p>
                <p class="text-sm text-gray-400 truncate">
                  {{ person.role }}
                </p>
              </router-link>
            </div>
          </div> -->
        </li>
      </ul>
      <ul role="list" class="relative z-0 divide-y divide-gray-700">
        <li v-for="file in subject.files" :key="file.slug">
          <router-link :to="file.route"
            class="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-700 transition-colors duration-75 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 w-full text-left">
            <div class="flex-shrink-0">
              <app-img class="h-8 w-8" :src="`/content/logo/${subject.slug}.webp`" alt="" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <p class="text-sm font-medium text-gray-100 capitalize">
                  {{ file.title }}
                </p>
                <p class="text-sm text-gray-400 truncate">
                  <!-- {{ person.role }} -->
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
