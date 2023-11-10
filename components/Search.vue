<template>
  <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
    <label class="sr-only" for="search-field">Search</label>
    <div class="relative w-full">
      <MagnifyingGlassIcon aria-hidden="true"
                           class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"/>
      <input id="search-field" v-model="showModal"
             class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-transparent focus:ring-0 sm:text-sm z-1"
             placeholder="Search..."/>
    </div>
  </div>

</template>
<script setup>
import {MagnifyingGlassIcon} from '@heroicons/vue/20/solid'

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {type: String, default: false},
});
const showModal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});


</script>
