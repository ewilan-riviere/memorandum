<script setup lang="ts">
// const router = useRouter()
// router.options.routes.forEach(route => {
//   console.log(route);
// })
</script>

<template>
  <div>
    <div class="bg-gradient-to-r from-primary-300 to-primary-500 py-16 px-8">
      <div class="max-w-7xl mx-auto">
        <app-tabs>
          <template name="config">
            <div class="tab-title">
              <i class="ri-settings-3-fill" aria-hidden="true"></i>
              Config
            </div>
          </template>
          <app-tab title-slot="config">
            <h3>This is a config tab</h3>
          </app-tab>
          <app-tab title="Tab 2">
            <h3>This is Tab 2</h3>
          </app-tab>
        </app-tabs>
        <!-- <app-tabs>
          <app-tab name="Books" :selected="true">
            <div>A lot of books.</div>
          </app-tab>
          <app-tab name="Authors">
            <div>Amazing authors.</div>
          </app-tab>
          <app-tab name="Series">
            <div>So much books into series.</div>
          </app-tab>
        </app-tabs> -->
      </div>
    </div>
    <RouterLink to="/about"> about </RouterLink>
    <router-link to="/content/development/frameworks/flutter/os-versions">
      os
    </router-link>
  </div>
</template>
