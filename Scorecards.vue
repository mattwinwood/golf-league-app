<template>
  <main class="row">


    <div class="col-3 bg-gray-400">
      <a class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
         href="/">
        <span class="fs-5 fw-semibold">League Schedule</span>
      </a>
      <div class="list-group list-group-flush border-bottom scrollarea">
      <CourseItem :active="activeCourse" :courses="courses" @handleFilter="(id) => filterByCourse(id)"/>
        </div>
    </div>

    <div class="col-3">
      <div class="flex flex-grow">
        <a class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
           href="/">
          <span class="fs-5 fw-semibold">Scorecards</span>
        </a>
      </div>
      <div class="list-group list-group-flush border-bottom scrollarea">
        <ListItem :list="results" :active="activeCourse" @handleFilter="(card) => getScorecard(card)"/>
      </div>
    </div>

    <div class="col-3">
      <div class="flex flex-grow">
        <a class="d-flex mx-3 align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
           href="/">
          <span class="fs-5 fw-semibold">Details</span>
        </a>
        <div class="flex flex-row">
        <button v-if="csvData" class="w-auto mx-3 px-3 justify-end my-4 btn btn-outline-secondary"
                @click="clearRequests">Clear Selection
        </button>

        <button class="w-auto px-3 mx-3 justify-end my-4 btn btn-outline-primary"
                role="button"
                @click="generateReport">Generate CSV
        </button>
          </div>

      </div>

      <textarea v-if="csvData" rows="10" cols="50">{{ csvData }}</textarea>
      <div v-for="(item, i) in [...new Map(scorecard.map(v => [v.id, v])).values()]">
        <div v-for="(record, i) in item.records">
          <table class="table-bordered m-4 flex flex-grow w-full">
            <tbody>
            <tr>
              <td class="whitespace-nowrap text-nowrap p-1"
                  style="font-weight: bold;">{{ record.players[0].name }}:
              </td>

              <template v-for="(hole, index)  in record.holes">
              <td
                v-if="index < 9"
                  class="p-1">
                <span class="p-2">{{ Object.entries(hole).filter(([key]) => key.includes('score'))[0][1] }}</span>
              </td>
              </template>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import courseData from '/data/courses.json'
import playerData from '/data/players.json'
import {data} from '/data/scorecards.json'
import CourseItem from "./components/CourseItem.vue";
import ListItem from "./components/ListItem.vue";
import csvHelpers from './helpers/csvHelper.js'

import ScorecardComponent from "./components/ScorecardComponent.vue";
import GolfScorecard from "./helpers/GolfScorecard.ts"
const scorecards = ref([])
const scorecard = ref([])
const players = ref([])
const courses = ref([])
const results = ref([])
const activeCourse = ref('')
const csvData = ref('');

scorecards.value = data.node.scorecards.items
results.value = data.node.scorecards.items
players.value = playerData.data.players
courses.value = courseData.data.courses


const filterByCourse = (courseName) => {
  activeCourse.value = courseName
  if (courseName === "All") {
    results.value = data.node.scorecards.items
    return
  }
  results.value = scorecards.value.filter((scorecard) => scorecard.course.displayName.toLowerCase() === activeCourse.value.toLowerCase())
  getAllScorecards()
}

function filterByName(name) {
  if (name === "All") {
    results.value = data.node.scorecards.items
    return
  }
  let one = scorecards.value.filter((scorecard) => scorecard.player.name.toLowerCase() === name.toLowerCase())
  let two = one.filter((scorecard) => scorecard.isCompleted === true)
  results.value = two
}

async function getScorecardOld(record) {
  clearRequests()
  let requestScorecard = await $fetch('https://api.trackmanrange.com/api/scorecards/' + record.dbId.substring(0, record.dbId.indexOf(':'))).catch((error) => error.data)
  scorecard.value.push(requestScorecard)
}

const getAllScorecardsOld = () => {
  const alert = confirm("Are you sure you want to request " + results.value.length.toString() || 'ZERO' + " record(s)?");
  if (alert === true) {
    scorecard.value = []
    results.value.forEach((scorecard) => {
      getScorecard(scorecard)
    })
  }
}

async function getScorecard(record) {
  clearRequests();  // Assuming you have the clearRequests method defined elsewhere
  let requestScorecard = await $fetch('https://api.trackmanrange.com/api/scorecards/' + record.dbId.substring(0, record.dbId.indexOf(':')))
    .catch((error) => error.data);
  scorecard.value.push(requestScorecard);
}

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
  }
};




function generateReport() {
  // Display CSV on the page
  csvData.value = csvHelpers.generateCsv(scorecard);
}


function clearRequests() {
  scorecard.value = []
  csvData.value = ''
}


function mapRecord(record) {

}

function mapHole(hole) {

}

function mapScorecards(scorecards) {

}

function mapScorecard(scorecard) {

}

// <ul>
//   <li>holeNumber: {{ hole.holeNumber }}</li>
//   <li>replayIdx: {{ hole.replayIdx }}</li>
//   <li>hcpStrokes: {{ hole.hcpStrokes }}</li>
//   <li>grossScore: {{ hole.grossScore }}</li>
//   <li>netScore: {{ hole.netScore }}</li>
//   <li>score: {{ hole.score }}</li>
//   <li>mulligans: {{ hole.mulligans }}</li>
//   <li>gimmes: {{ hole.gimmes }}</li>
//   <li>putts: {{ hole.putts }}</li>
//   <li>fairwayHit: {{ hole.fairwayHit }}</li>
//   <li>played: {{ hole.played }}</li>
// </ul>
//
</script>
