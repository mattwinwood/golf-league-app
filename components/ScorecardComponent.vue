<template>
  <div class="scorecard">
    <h2>Scorecard</h2>
    <button @click="getAllScorecards">Fetch Scorecards</button>
    <div v-for="record in scorecard" :key="record.lastHoleFinishedAt">
      <!-- ... Rest of your scorecard rendering ... -->
    </div>
    <button @click="generateCsv">Generate CSV</button>
    <textarea v-if="csvData" rows="10" cols="50">{{ csvData }}</textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {data} from '../data/scorecards.json'



export default defineComponent({
                                 name: 'ScorecardComponent',

                                 setup() {
                                   const scorecard = ref([]);
                                   const csvData = ref<string | null>(null);
                                   const scorecardData = data.node.scorecards.items

                                   async function getScorecard(record) {
                                     clearRequests();  // Assuming you have the clearRequests method defined elsewhere
                                     let requestScorecard = await $fetch('https://api.trackmanrange.com/api/scorecards/' + record.dbId.substring(0, record.dbId.indexOf(':')))
                                       .catch((error) => error.data);
                                     scorecard.value.push(requestScorecard);
                                   }

                                   const getAllScorecards = () => {
                                     const alertResponse = confirm("Are you sure you want to request scorecards?");
                                     if (alertResponse) {
                                       scorecard.value = [];
                                       scorecardData.value.forEach((record) => {  // Assuming you have results.value available
                                         getScorecard(record);
                                       });
                                     }
                                   };

                                   function generateCsv() {
                                     let csvContent = "Team Number, Team Color, Score, Hole Number, Gross Score\n";
                                     for (const record of scorecard.value) {
                                       for (const hole of record.holes) {
                                         csvContent += `${record.team.teamNumber}, ${record.team.color}, ${record.score}, ${hole.holeNumber}, ${hole.grossScore}\n`;
                                       }
                                     }
                                     csvData.value = csvContent;
                                   }

                                   return {
                                     scorecard,
                                     csvData,
                                     getAllScorecards,
                                     generateCsv
                                   };
                                 }
                               });
</script>
