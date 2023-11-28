<template>
  >

  <div class="bg-black">
    <Navigation :active-course="activeCourse" :courses="courses" @handleFilter="(course) => filterByCourse(course)"/>

    <!-- MAIN CONTENT AREA -->
    <div class="pl-72">
      <!-- HEADER -->
      <div
          class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
        <Search v-model="filterValue"/>

      </div>

      <!--  RECORD LIST   -->
      <main :class="[scorecard && 'lg:pr-[0px]']">
        <header
            class="flex items-start justify-start border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 flex-row">
          <div class="flex-col">
            <Header :active-course="activeCourse" :filtered-results="filteredResults"/>


          </div>
          <!-- Sort dropdown -->

          <Menu as="div" class="self-center justify-end align-middle flex flex-grow relative flex gap-4">
          <span
              class="flex items-center gap-2 inline-flex mx-2 border rounded bg-indigo-700 border-indigo-900 p-1 px-4 cursor-pointer text-base leading-6 text-white"
              @click="generateReport()">
              <svg class="w-5" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg"><path
                  d="M19 19H8q-.825 0-1.413-.588T6 17V3q0-.825.588-1.413T8 1h7l6 6v10q0 .825-.588 1.413T19 19ZM14 8V3H8v14h11V8h-5ZM4 23q-.825 0-1.413-.588T2 21V7h2v14h11v2H4ZM8 3v5v-5v14V3Z"
                  fill="currentColor"/></svg>
            Create Full Report
          </span>

            <MenuButton class="flex items-center gap-x-1 text-base font-medium leading-6 text-white">
              Sort by
              <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-500"/>
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <span
                      :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']"
                      @click="handleSort(1)">Name Ascending</span>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div
                      :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']"
                      @click="handleSort(2)">
                    Name Descending
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div
                      :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']"
                      @click="handleSort(3)">
                    Oldest First
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div
                      :class="[active ? 'bg-gray-200' : '', 'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900']"
                      @click="handleSort(4)">
                    Most Recent
                  </div>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </header>

        <div v-if="isLoading" class="text-3xl text-white justify-center align-middle w-full h-full">
          Loading...
        </div>

        <div v-else>
          <div v-if="router.currentRoute.value.name === 'players'" class="text-white">
            <PlayerItem :list="players" @handleFilter="(scorecard) => getScorecardById(scorecard.dbId)"/>
          </div>
          <div v-if="router.currentRoute.value.name === 'index' && activeCourse.toLowerCase() !== 'll' && !isLoading"
               class="">
            <ListItem :active="activeRecord" :list="filteredResults" @handleFilter="(card) => getScorecards(card)"/>
          </div>
          <div v-if="router.currentRoute.value.name === 'upload'">
            <p class="text-3xl text-white" @click="submitData()">submitIt()
            </p>
            <textarea v-model="updatedJsonData" class="w-2/3 flex flex-grow h-screen"
                      placeholder="Paste your JSON array here"/>
            <button @click="submitData">Submit</button>
          </div>
          <div v-else
               class="text-sm italic font-serif mx-auto text-slate-400 leading-4 tracking-wider items-center pt-64 w-1/2 justify-center align-middle">
            <span>"Please select a golf course to view records."</span>
          </div>
        </div>
      </main>

      <!-- RECORD DETAIL -->
      <aside v-if="scorecard"
             class="hidden bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-[600px] lg:overflow-y-auto lg:border-l lg:border-white/5">
        <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h2 class="text-base font-semibold leading-7 text-white">{{}}</h2>
          <span class="isolate inline-flex rounded-md shadow-sm justify-center mx-auto">
          <div v-if="activeRecord"
               class="cursor-pointer flex inline-flex items-center gap-x-1.5  text-xs font-semibold leading-6 border-1 border-indigo-400 border px-3 py-0 border-r-0 text-indigo-400"
               @click="generateReportBySelected()">
            <svg class="text-xs w-6 mt-0.5 flex" height="32" viewBox="0 0 256 256" width="32"
                 xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M208 88h-56V32Z" opacity=".2"/><path
                d="M48 180c0 11 7.18 20 16 20a14.24 14.24 0 0 0 10.22-4.66a8 8 0 0 1 11.56 11.06A30.06 30.06 0 0 1 64 216c-17.65 0-32-16.15-32-36s14.35-36 32-36a30.06 30.06 0 0 1 21.78 9.6a8 8 0 0 1-11.56 11.06A14.24 14.24 0 0 0 64 160c-8.82 0-16 9-16 20Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84c-1.25-.81-1.23-1-1.12-1.9a4.57 4.57 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.83-.56a8 8 0 0 0 4.14-15.48c-2.12-.55-21-5.22-32.84 2.76a20.58 20.58 0 0 0-9 14.95c-2 15.88 13.65 20.41 23 23.11c12.06 3.49 13.12 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.14 3.93c-4.6 3.06-15.17 1.56-19.55.36a8 8 0 0 0-4.31 15.44a61.34 61.34 0 0 0 15.19 2c5.82 0 12.3-1 17.49-4.46a20.82 20.82 0 0 0 9.19-15.23c2.19-17.31-14.32-22.14-24.21-25Zm83.09-26.84a8 8 0 0 0-10.23 4.84L188 184.21l-12.47-34.9a8 8 0 0 0-15.07 5.38l20 56a8 8 0 0 0 15.07 0l20-56a8 8 0 0 0-4.84-10.22ZM216 88v24a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88Zm-27.31-8L160 51.31V80Z"/></g></svg>
            <span class="flex">Generate CSV for Selection</span>
          </div>
          <div v-if="activeCourse"
               class="cursor-pointer flex inline-flex items-center gap-x-1.5  text-xs font-semibold leading-6 border-1 border-indigo-400 border px-3 py-0 text-indigo-400"
               @click="generateReport()">
            <svg class="text-xs w-6 mt-0.5 flex" height="32" viewBox="0 0 256 256" width="32"
                 xmlns="http://www.w3.org/2000/svg"><g fill="currentColor"><path d="M208 88h-56V32Z" opacity=".2"/><path
                d="M48 180c0 11 7.18 20 16 20a14.24 14.24 0 0 0 10.22-4.66a8 8 0 0 1 11.56 11.06A30.06 30.06 0 0 1 64 216c-17.65 0-32-16.15-32-36s14.35-36 32-36a30.06 30.06 0 0 1 21.78 9.6a8 8 0 0 1-11.56 11.06A14.24 14.24 0 0 0 64 160c-8.82 0-16 9-16 20Zm79.6-8.69c-4-1.16-8.14-2.35-10.45-3.84c-1.25-.81-1.23-1-1.12-1.9a4.57 4.57 0 0 1 2-3.67c4.6-3.12 15.34-1.73 19.83-.56a8 8 0 0 0 4.14-15.48c-2.12-.55-21-5.22-32.84 2.76a20.58 20.58 0 0 0-9 14.95c-2 15.88 13.65 20.41 23 23.11c12.06 3.49 13.12 4.92 12.78 7.59c-.31 2.41-1.26 3.34-2.14 3.93c-4.6 3.06-15.17 1.56-19.55.36a8 8 0 0 0-4.31 15.44a61.34 61.34 0 0 0 15.19 2c5.82 0 12.3-1 17.49-4.46a20.82 20.82 0 0 0 9.19-15.23c2.19-17.31-14.32-22.14-24.21-25Zm83.09-26.84a8 8 0 0 0-10.23 4.84L188 184.21l-12.47-34.9a8 8 0 0 0-15.07 5.38l20 56a8 8 0 0 0 15.07 0l20-56a8 8 0 0 0-4.84-10.22ZM216 88v24a8 8 0 0 1-16 0V96h-48a8 8 0 0 1-8-8V40H56v72a8 8 0 0 1-16 0V40a16 16 0 0 1 16-16h96a8 8 0 0 1 5.66 2.34l56 56A8 8 0 0 1 216 88Zm-27.31-8L160 51.31V80Z"/></g></svg>
            <span class="flex">Generate CSV for Course</span>
          </div>
          </span>

        </header>
      </aside>
    </div>


    <!-- MODAL  -->
    <Modal v-model="showModal"
           :filtered-results="filteredResults"
           :activeCourse="activeCourse"
           :activeRecord="filteredResults.filter((scorecard) => scorecard.dbId === activeRecord)" :csvData="csvData"/>
  </div>


</template>

<script setup>
import {ref} from 'vue'
import {Menu, MenuButton, MenuItem, MenuItems,} from '@headlessui/vue'
import {ChevronUpDownIcon} from '@heroicons/vue/20/solid'
import ListItem from "../components/ListItem.vue";
import PlayerItem from "../components/PlayerItem.vue";
import courseData from '/data/courses.json'
import {data} from '/data/scorecards.json'
import csvHelpers from '/helpers/csvHelper.js'
import playerData from '/data/players.json'
import Navigation from "../components/Navigation";
import Search from "../components/Search";
import Header from "../components/Header";

const router = useRouter();
const route = useRoute();


// DISPLAY LOGIC
const jsonData = ref('')
const updatedJsonData = ref('')
const showModal = ref(false)
const filteredResults = ref([])
const filterValue = ref('')
const isLoading = ref(false)
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


// INITIALIZE DATA
jsonData.value = JSON.stringify(data.node.scorecards)
results.value = data.node.scorecards.items
scorecards.value = data.node.scorecards.items
filteredResults.value = data.node.scorecards.items
players.value = playerData.data.players
courses.value = courseData.data.courses

// REQUEST
const filterScorecards = () => {
  scorecard.value = [];
  filteredResults.value = results.value;
  filterValue.value = '';
  isLoading.value = false;
};

async function getScorecards(record) {
  clearRequests();  // Assuming you have the clearRequests method defined elsewhere
  setActiveRecordId(record.dbId)
  let requestScorecard = await $fetch('https://api.trackmanrange.com/api/scorecards/' + record.dbId.substring(0, record.dbId.indexOf(':')))
      .catch((error) => error.data);

  scorecard.value.push(requestScorecard);
  const data = csvHelpers.extractPlayerScores(scorecard)
  generateReportBySelected();
  adjustedScorecard.value.push(data);
}

async function getScorecardById(dbId) {
  isLoading.value = true
  clearRequests();  // Assuming you have the clearRequests method defined elsewhere
  setActiveRecordId(dbId)
  let requestScorecard = await $fetch('https://api.trackmanrange.com/api/scorecards/' + dbId.substring(0, dbId.indexOf(':')))
      .catch((error) => error.data);

  scorecard.value.push(requestScorecard);
  const data = csvHelpers.extractPlayerScores(scorecard)
  initializeReport();
  adjustedScorecard.value.push(data);
  isLoading.value = false;
  showModal.value = true
}


// REQUEST: Used to reset the workflow back to step 1 (course selection)
function clearRequests() {
  scorecard.value = []
  scorecardsByCourse.value = []
  csvData.value = ''
}


// HANDLER: Only creates a report for the selected record item
function initializeReport() {
  if (csvData.value) {
    csvData.value = ''
  }
  csvData.value = csvHelpers.generateCsv(scorecard);
}

function generateReportBySelected() {
  if (csvData.value) {
    csvData.value = ''
  }
  csvData.value = csvHelpers.generateCsv(scorecard);
  showModal.value = true;
}

// HANDLER: Generates a full report for the selected course
function generateReport() {
  if (csvData.value) {
    csvData.value = ''
  }

  const alert = confirm("Are you sure you want to request " + results.value.length.toString() + " record(s)?");
  if (alert) {
    if (results.value.length > 150) {
      confirm("You cannot request over 200 records at a time. Call Matt.");
    } else {
      results.value.forEach((scorecard) => {
        getScorecardById(scorecard.dbId);
      })
    }
  }
}

// FILTER:
const filterByCourse = (courseName) => {
  isLoading.value = true;
  if (courseName === "All") {
    results.value = scorecards.value
    activeCourse.value = 'All'
    return
  }
  results.value = scorecards.value.filter((item) => {
    return item.course.displayName.toLowerCase() === courseName.toLowerCase()
  })
  activeCourse.value = courseName;
  router.replace({name: 'index', query: {...route.query, activeCourse: activeCourse.value}})

  filterScorecards()
}

const setActiveRecordId = (dbId) => {
  activeRecord.value = dbId
}

// SEARCH:
watch(
    () => filterValue.value,
    async (val) => {
      filteredResults.value = results.value.filter(item => {
        if (item.player && item.player.name) {
          return item.player.name.toLowerCase().includes(val)
        } else if (item.player && item.player[0]) {
          return item.player[0].name.toLowerCase().includes(val)
        }
      })
    }
);

// SORTING:
function handleSort(value) {
  isLoading.value = true
  const sortedMyListings = JSON.parse(JSON.stringify(filteredResults.value));
  const sortable = [];
  for (const item in sortedMyListings) {
    sortable.push(sortedMyListings[item]);
  }
  filteredResults.value = sortByType(sortable, value)
  isLoading.value = false
}


// SORTING:
function sortByType(sortable, value) {
  // Name
  if (value === 1) {
    sortable.sort(function (a, b) {
      if (a.player.name.toLowerCase().trim() < b.player.name.toLowerCase().trim()) {
        return -1;
      }
      if (a.player.name.toLowerCase().trim() > b.player.name.toLowerCase().trim()) {
        return 1;
      }
      return 0;
    });
  } else if (value === 2) {
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
  else if (value === 3) {
    sortable.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }
  //Default
  else {
    sortable.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  return sortable
}

async function submitData() {
  const updated = updatedJsonData.value
  const {body} = await $fetch('/api/update', {
    method: 'post',
    body: {updated}
  })
}
</script>
