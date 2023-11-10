<template>
  <!-- SIDEBAR: DESKTOP -->
  <div class="fixed inset-y-0 z-50 flex w-72 flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black-10 px-6 ring-1 ring-white/5">
      <div class="flex h-16 shrink-0 items-center">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
        <div class="p-2 text-xl text-white">BirdieBook</div>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <a @click="item.current = item.name; router.push(item.href)" :class="[router.currentRoute.value.href === item.href ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </li>
          <li v-if="router.currentRoute.value.name === 'index'">
            <ul role="list" class="-mx-2 space-y-1">
              <div class="text-xs font-semibold leading-6 text-gray-400">Courses</div>
              <li v-for="item in props.courses" :key="item.name" @click="emit('handleFilter', item.name)">
                <div  :class="[item.name === props.activeCourse ? 'bg-indigo-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'cursor-pointer group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                  <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                  {{ item.name }}
                </div>
              </li>
            </ul>
          </li>
          <li class="-mx-6 mt-auto text-white" @mouseenter="footerActive = true" @mouseleave="footerActive = false">
            <a href="mailto:mattwinwood@gmail.com?subject=Golf League App Support" target="_blank" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
              <img :class="[footerActive && ' animate-spin',  'duration-800 h-8 w-8 rounded-full bg-gray-800']" src="@/assets/mwbrand.png" alt="Matt Winwood" />
              <div class="flex flex-col">
                <span  class="text-xs" aria-hidden="true">Designed with Passion, Engineered to Perfection.</span>
                <span  aria-hidden="true"></span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref} from "vue";
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot, } from '@headlessui/vue'
import { ChartBarSquareIcon, Cog6ToothIcon, FolderIcon, GlobeAltIcon, ServerIcon, SignalIcon, XMarkIcon, } from '@heroicons/vue/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const router = useRouter();
const footerActive = ref(false)


const navigation = [
  { name: 'Scorecards', href: '/', icon: ServerIcon, current: true },
  { name: 'Players', href: '/players', icon: FolderIcon, current: false }
]
    const props = defineProps({ courses: {type: Array, default: []}, activeCourse: {type: String, default: ''}})
    const emit = defineEmits(['handleFilter'])


</script>
