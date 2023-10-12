<!--
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-900">
    <body class="h-full">
    ```
  -->

  <div class="bg-black">
    <!-- SIDEBAR: MOBILE -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 xl:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a :href="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <div class="text-xs font-semibold leading-6 text-gray-400">Courses</div>
                        <li v-for="item in courses" :key="item.name">
                          <div @click="filterByCourse(item.name)" :class="[item.name === activeCourse ? 'cursor-pointer bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ item.name }}
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li class="-mx-6 mt-auto">
                      <a href="mailto:mattwinwood@gmail.com?subject=Golf League App Support" target="_blank" class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
                        <img class="h-8 w-8 rounded-full bg-gray-800" src="@/assets/mwbrand.png" alt="" />
                        <span  aria-hidden="true">Matt Winwood</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- SIDEBAR: DESKTOP -->
    <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
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
                  <a :href="item.href" :class="[item.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <div class="text-xs font-semibold leading-6 text-gray-400">Courses</div>
                <li v-for="item in courses" :key="item.name">
                  <div @click="filterByCourse(item.name)" :class="[item.name === activeCourse ? 'cursor-pointer bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
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

    <!-- MAIN CONTENT AREA -->
    <div class="xl:pl-72">

      {{results.length }}
     <!-- HEADER -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-white xl:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-5 w-5" aria-hidden="true" />
        </button>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative w-full">
              <MagnifyingGlassIcon class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500" aria-hidden="true" />
              <input v-model="filterValue"  id="search-field" class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-transparent focus:ring-0 sm:text-sm z-1" placeholder="Search..."/>
            </div>
        </div>
      </div>

      <!--  RECORD LIST   -->
      <main :class="[scorecard && 'lg:pr-[600px]']">
        <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 class="text-base font-semibold leading-7 text-white">{{activeCourse !== 'All' ? 'Scorecards for ' + activeCourse : 'All Scorecards'}}
            <span class="inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-sm font-medium ml-2 text-gray-200 ring-1 ring-inset ring-indigo-400/20"> {{filteredResults && filteredResults.length}} Results</span>
                                                                  </h1>


          <!-- Sort dropdown -->
          <Menu as="div" class="relative">
            <MenuButton class="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
              Sort by
              <ChevronUpDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <span @click="handleSort(1)" :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']">Name Ascending</span>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div @click="handleSort(2)" :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']">Name Descending</div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div @click="handleSort(3)" :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']">Oldest First</div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div @click="handleSort(4)" :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']">Most Recent</div>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </header>

       <div v-if="activeCourse.toLowerCase() !== 'all'">
        <ListItem :list="filteredResults" :active="activeRecord"  @handleFilter="(card) => getScorecard(card)"/>
       </div>
        <div v-else class="text-sm italic font-serif mx-auto text-slate-400 leading-4 tracking-wider items-center pt-64 w-1/2 justify-center align-middle">
          <span>"Please select a golf course to view records."</span>
        </div>
      </main>

      <!-- RECORD DETAIL -->
      <aside v-if="scorecard" class="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-[600px] lg:overflow-y-auto lg:border-l lg:border-white/5">
        <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h2 class="text-base font-semibold leading-7 text-white">{{}}</h2>
          <span class="isolate inline-flex rounded-md shadow-sm justify-center mx-auto">
          <div v-if="activeRecord" @click="generateReportBySelected()" class="cursor-pointer flex inline-flex items-center gap-x-1.5  text-xs font-semibold leading-6 border-1 border-indigo-400 border px-3 py-0 border-r-0 text-indigo-400">
            <svg class="text-xs w-6 mt-0.5 flex" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="currentColor"><path d="M208 88h-56V32Z" opacity=".2"/><path d="M48 180c0 11 7.18 20 16 20a14.24 14.24 0 0 0 10.22-4.66a8 8 0 0 1 11.56 11.06A30.06 30.06 0 0 1 64 216c-17.65 0-32-16.15-32-36s14.35-36 32-36a30.06 30.06 0 0 1 21.78 9.6a8 8 0 0 1-11.56 11.06A14.24 14.24 0 0 0 64 160c-8.82 0-16 9-16 20Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84c-1.25-.81-1.23-1-1.12-1.9a4.57 4.57 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.83-.56a8 8 0 0 0 4.14-15.48c-2.12-.55-21-5.22-32.84 2.76a20.58 20.58 0 0 0-9 14.95c-2 15.88 13.65 20.41 23 23.11c12.06 3.49 13.12 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.14 3.93c-4.6 3.06-15.17 1.56-19.55.36a8 8 0 0 0-4.31 15.44a61.34 61.34 0 0 0 15.19 2c5.82 0 12.3-1 17.49-4.46a20.82 20.82 0 0 0 9.19-15.23c2.19-17.31-14.32-22.14-24.21-25Zm83.09-26.84a8 8 0 0 0-10.23 4.84L188 184.21l-12.47-34.9a8 8 0 0 0-15.07 5.38l20 56a8 8 0 0 0 15.07 0l20-56a8 8 0 0 0-4.84-10.22ZM216 88v24a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88Zm-27.31-8L160 51.31V80Z"/></g></svg>
            <span class="flex">Generate CSV for Selection</span>
          </div>
          <div v-if="activeCourse" @click="generateReport()" class="cursor-pointer flex inline-flex items-center gap-x-1.5  text-xs font-semibold leading-6 border-1 border-indigo-400 border px-3 py-0 text-indigo-400">
            <svg class="text-xs w-6 mt-0.5 flex" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g fill="currentColor"><path d="M208 88h-56V32Z" opacity=".2"/><path d="M48 180c0 11 7.18 20 16 20a14.24 14.24 0 0 0 10.22-4.66a8 8 0 0 1 11.56 11.06A30.06 30.06 0 0 1 64 216c-17.65 0-32-16.15-32-36s14.35-36 32-36a30.06 30.06 0 0 1 21.78 9.6a8 8 0 0 1-11.56 11.06A14.24 14.24 0 0 0 64 160c-8.82 0-16 9-16 20Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84c-1.25-.81-1.23-1-1.12-1.9a4.57 4.57 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.83-.56a8 8 0 0 0 4.14-15.48c-2.12-.55-21-5.22-32.84 2.76a20.58 20.58 0 0 0-9 14.95c-2 15.88 13.65 20.41 23 23.11c12.06 3.49 13.12 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.14 3.93c-4.6 3.06-15.17 1.56-19.55.36a8 8 0 0 0-4.31 15.44a61.34 61.34 0 0 0 15.19 2c5.82 0 12.3-1 17.49-4.46a20.82 20.82 0 0 0 9.19-15.23c2.19-17.31-14.32-22.14-24.21-25Zm83.09-26.84a8 8 0 0 0-10.23 4.84L188 184.21l-12.47-34.9a8 8 0 0 0-15.07 5.38l20 56a8 8 0 0 0 15.07 0l20-56a8 8 0 0 0-4.84-10.22ZM216 88v24a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88Zm-27.31-8L160 51.31V80Z"/></g></svg>
            <span class="flex">Generate CSV for Course</span>
          </div>
          </span>

        </header>

        <!--   DETAIL CONTENT     -->
        <ul role="list" class="divide-y divide-white/5 text-white border-white">
          <template v-for="(item, i) in [...new Map(scorecard.map(v => [v.id, v])).values()]">
            <template v-for="(record, i) in item.records">
              <table class="min-w-full divide-y divide-gray-300 m-4 flex flex-grow w-full border-white">
                <tbody>
                <tr>
                  <td class="whitespace-nowrap font-semibold text-nowrap p-1 truncate w-[150px] line-clamp-1"
                     >{{ record.players[0].name }}
                  </td>

                  <template v-for="(hole, index) in adjustScorecard(record.holes)">
                    <td
                      v-if="index < 9"
                      class="p-1 border border-1">
                      <span class="p-2">{{hole}}</span>

                    </td>
                  </template>
                </tr>
                </tbody>
              </table>
            </template>
          </template>
          <span v-if="scorecard" class="text-xs text-indigo-500 p-5 italic">*Scores are automatically adjusted</span>

        </ul>
      </aside>
    </div>


    <!-- MODAL  -->
    <Modal v-model="showModal" :csvData="csvData"/>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot, } from '@headlessui/vue'
import { ChartBarSquareIcon, Cog6ToothIcon, FolderIcon, GlobeAltIcon, ServerIcon, SignalIcon, XMarkIcon, } from '@heroicons/vue/24/outline'
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import ListItem from "../components/ListItem.vue";
import Scorecards from "../Scorecards.vue";
import courseData from '/data/courses.json'
import playerData from '/data/players.json'
import {data} from '/data/scorecards.json'
import csvHelpers from '/helpers/csvHelper.js'

// DISPLAY LOGIC
const footerActive = ref(false)
const sidebarOpen = ref(false)
const showModal = ref(false)
const filteredResults = ref([])
const filterValue = ref('')

// API DATA
const scorecards = ref([])
const scorecard = ref([])
const adjustedScorecard = ref([])
const scorecardsByCourse = ref([])

// LOCAL DATA
const activeRecord = ref('')
const activeCourse = ref('All')
const courses = ref([])
const results = ref([])
const csvData = ref('');

const players = ref([])
const navigation = [
  { name: 'Scorecards', href: '/', icon: ServerIcon, current: true },
  { name: 'Players', href: '/players', icon: FolderIcon, current: false }
]


// INITIALIZE DATA
results.value = data.node.scorecards.items
scorecards.value = data.node.scorecards.items
filteredResults.value = data.node.scorecards.items
players.value = playerData.data.players
courses.value = courseData.data.courses

// REQUESTS
async function getScorecardsByCourse(record) {
  return await $fetch('https://api.trackmanrange.com/api/scorecards/' + record.dbId.substring(0, record.dbId.indexOf(':')))
    .catch((error) => error.data);
}
// REQUEST
async function getScorecard(record) {
  clearRequests();  // Assuming you have the clearRequests method defined elsewhere
  setActiveRecordId(record.id)
  let requestScorecard = await $fetch('https://api.trackmanrange.com/api/scorecards/' + record.dbId.substring(0, record.dbId.indexOf(':')))
    .catch((error) => error.data);

  scorecard.value.push(requestScorecard);
  const data = csvHelpers.extractPlayerScores(scorecard)
  adjustedScorecard.value.push(data);
}

// REQUEST
const getAllScorecards = () => {
  const alert = confirm("Are you sure you want to request " + results.value.length.toString() + " record(s)?");
  if (alert) {
    if(results.value.length > 100) {
      confirm("You cannot request over 100 records at a time. Call Matt.");
      return
    }
    scorecard.value = [];
    results.value.forEach((record) => {  // Assuming you have results.value available
      getScorecard(record);
    });
    filteredResults.value = results.value;
    filterValue.value = '';
  }
};

// REQUEST: Used to reset the workflow back to step 1 (course selection)
function clearRequests() {
  scorecard.value = []
  scorecardsByCourse.value = []
  csvData.value = ''
}

// REQUEST: Used in the Record Detail to make sure we're not displaying the raw response values
function adjustScorecard(holes) {
  const holeScores = []
  for (let i = 1; i <= 9; i++) {
    const hole = holes.find(h => h.holeNumber === i);
    if (hole) {
      const adjustedScore = csvHelpers.adjustScore(hole.holeNumber, hole.grossScore);
      holeScores.push(adjustedScore);
    }
  }
  return holeScores

}

// HANDLER: Only creates a report for the selected record item
function generateReportBySelected() {
  if(csvData.value){
    csvData.value = ''
  }
  csvData.value = csvHelpers.generateCsv(scorecard);
  showModal.value = true;
}
// HANDLER: Generates a full report for the selected course
function generateReport() {
  if(csvData.value){
    csvData.value = ''
  }
  results.value.forEach((record) =>
    {
      getScorecardsByCourse(record).then((resp) => {
        const response = JSON.parse(JSON.stringify(resp))
        scorecardsByCourse.value.push(response);
      }).finally(() => {
           csvData.value = csvHelpers.generateCsv(scorecardsByCourse);
         })
    })
  showModal.value = true;
}

// DISPLAY LOGIC
const filterByCourse = (courseName) => {
  if (courseName === "All") {
    results.value = scorecards.value
    activeCourse.value = 'All'
    return
  }
  results.value = scorecards.value.filter((item) => {
    return item.course.displayName.toLowerCase() === courseName.toLowerCase()
  })
  activeCourse.value = courseName;
  getAllScorecards()
}

const setActiveRecordId = (id) => {
  activeRecord.value = id
}
// DISPLAY LOGIC: Filters the data based on the input field value
watch(
  () => filterValue.value,
  async (val) => {
    filteredResults.value = results.value.filter(item => {
      if(item.player && item.player.name) {
        return item.player.name.toLowerCase().includes(val)
      }
      else if(item.player && item.player[0]) {
        return item.player[0].name.toLowerCase().includes(val)
      }
    })
  }
);
// DISPLAY LOGIC:
function handleSort(value) {
  const sortedMyListings = JSON.parse(JSON.stringify(filteredResults.value));
  const sortable = [];
  for (const item in sortedMyListings) {
    sortable.push(sortedMyListings[item]);
  }
  filteredResults.value= sortByType(sortable, value)
}


// DISPLAY LOGIC: Asc, Desc, Oldest, Newest
function sortByType(sortable, value){
  // Name
  if(value === 1) {
    sortable.sort(function (a, b) {
      if (a.player.name.toLowerCase().trim() < b.player.name.toLowerCase().trim()) {
        return -1;
      }
      if (a.player.name.toLowerCase().trim() > b.player.name.toLowerCase().trim()) {
        return 1;
      }
      return 0;
    });
  }
  else if(value === 2) {
    sortable.sort(function (a, b) {
      if (a.player.name.toLowerCase().trim() < b.player.name.toLowerCase().trim()) {
        return 1;
      }
      if (a.player.name.toLowerCase().trim() > b.player.name.toLowerCase().trim()) {
        return -1;
      }
      return 0;
    });
  }
  // Date
  else if(value === 3) {
    sortable.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
  //Default
  else{
    sortable.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  return sortable
}

</script>
