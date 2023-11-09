<template>
  <div>
    <textarea v-model="jsonData" placeholder="Paste your JSON array here"></textarea>
    <button @click="submitData">Submit</button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import Scorecards from "../Scorecards.vue";
const jsonData = ref(Scorecards)
function submitData() {
  console.log("jsonData", jsonData);
}

</script>
