<template>
  <ul role="list" class="divide-y divide-slate-800/50">
    <li v-for="(scorecard, i) in props.list"
        aria-current="false"
        @click="emit('handleFilter', scorecard)"
        :key="i" :class="[i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800', props.active === scorecard.dbId && 'bg-gray-700 font-bold ', 'hover:bg-slate-700 bg-opacity-50 cursor-pointer relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8']">
      <div :id="scorecard.dbId" class="min-w-0 w-full flex-grow flex-auto ">
        <div class="flex items-center gap-x-2">

          <div :class="['flex-none rounded-full p-1', props.active === scorecard.dbId ? 'animate-pulse text-green-400 bg-green-400/20': ' text-gray-400 bg-gray-100/20']">
            <div class="h-2 w-2 rounded-full bg-current" />
          </div>
          <h2 class="min-w-0 text-sm font-semibold leading-6 text-white">
            <a  class="flex">
              <span :class="['truncate text-xl font-semibold', props.active === scorecard.dbId && 'text-green-400']">{{ getPlayerFullName(scorecard.player.name) }} <span class="font-regular text-sm italic">({{scorecard.player.name}})</span></span>
              <div class="">
              <span class="text-gray-400 mx-2 text-xl">@</span>
              <span :class="['truncate font-light text-lg', props.active === scorecard.dbId && 'text-green-400']"> {{ scorecard.course.displayName }}</span>
              </div>
            </a>
          </h2>
        </div>
        <div class="mt-1.5 flex items-center gap-x-2.5 text-sm leading-5 text-gray-400">
          <span :class="['text-white ml-6 truncate ', props.active === scorecard.dbId && 'text-green-400']"> {{ new Date(scorecard.createdAt).toLocaleDateString('en-us', {weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"})  }}</span>

          <div class="tag">
                        <span v-if="scorecard.isCompleted" class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-800">
              <svg class="h-1.5 w-1.5 fill-green-400" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
              </svg>
          Completed Round
            </span>
            <span v-else class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-800">
              <svg class="h-1.5 w-1.5 fill-red-400" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
              </svg>
            Incomplete Round
            </span>

            <span class="hidden inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-800">
              <svg class="h-1.5 w-1.5 fill-red-400" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
              </svg>
              Missing League Payment
            </span>
             <span class="hidden inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-800">
              <svg class="h-1.5 w-1.5 fill-yellow-400" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
              </svg>
              Skins
            </span>
             <span class="hidden inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-800">
              <svg class="h-1.5 w-1.5 fill-blue-400" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
              </svg>
              Closest to the Pin
            </span>
            <span v-if="hasDuplicateProperty(scorecard.player.name) > 1" class="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-800">
              <svg class="h-1.5 w-1.5 fill-gray-400" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx="3" cy="3" r="3" />
              </svg>
            {{hasDuplicateProperty(scorecard.player.name)}} Matches
            </span>
          </div>

        </div>
      </div>


      <ChevronRightIcon :class="[props.active === scorecard.dbId ? 'text-green-400 bg-green-400/10': ' text-gray-400 bg-gray-400/10', 'h-5 w-5 flex-none text-gray-400']" aria-hidden="true" />
    </li>
  </ul>

</template>
<script setup lang="ts">
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import {ref} from "vue";
import playerData from "~/data/players.json"

const props = defineProps({ list: {type: Array, default: []}, active: {type: String, default: ''}})
const emit = defineEmits([ 'handleFilter'])
const players = ref([])

players.value = playerData.data.players

function hasDuplicateProperty(value) {
  const results = props.list.filter(item => item.player.name.toLowerCase().trim() === value.toLowerCase().trim())
  return results.length
}

function getPlayerFullName(username){
  const matchingPlayers  = players.value.filter(item => {
    return item.userName === username;
  })
  if(matchingPlayers.length > 0) {
    return matchingPlayers[0].realName
  }
  return username

}

</script>
