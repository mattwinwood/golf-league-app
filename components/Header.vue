<template>
  <div class="">
    <h1 v-if="router.currentRoute.value.name === 'players'"
        class="text-xl flex content-end items-end font-semibold leading-7 text-indigo-400">
              <span class="flex inline-flex  gap-2 font-light text-3xl">
                <span class="self-end"> All Players </span>
              </span>
    </h1>
    <h1 v-else class="text-2xl flex content-end items-end font-semibold leading-7 text-white">
      <svg class="inline-flex mr-1 w-7 mb-0.5 items-end content-end" height="32"
           viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="19.5" cy="19.5" fill="currentColor" r="1.5"/>
        <path
            d="M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73c0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z"
            fill="currentColor"/>
      </svg>
      <span class="flex inline-flex  gap-2 font-light text-3xl">
        <span class="self-end">
          {{ props.activeCourse !== 'All' ? '' + props.activeCourse : 'All Scorecards' }}
      </span> </span>
      <span
          class="text-base items-end content-end self-end flex mb-0.5 italic text-gray-500 ml-2">
        {{ props.filteredResults.length }} results
      </span>
    </h1>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();

const props = defineProps({
  activeCourse: {type: String, default: false},
  filteredResults: {type: Array, default: false},
});

</script>
