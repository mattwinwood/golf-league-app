<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root bg-gray-900">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-700">
            <thead>
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-3">Skins</th>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-3">Name</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">User Name</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Flight</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Handicap</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">Notes</th>
            </tr>
            </thead>
            <tbody class="">
            <tr v-for="(player, i) in props.list" :key="player.userName" class="even:bg-gray-800">
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ player.skins ? "Paid" : ""}}</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-3">{{ player.realName}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ player.userName}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ player.flight}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ player.handicap}}</td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{{ player.notes}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const props = defineProps({ list: {type: Array, default: []}})
const emit = defineEmits([ 'handleFilter'])


</script>
