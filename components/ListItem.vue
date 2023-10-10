<template>
    <a v-for="(scorecard, i) in props.list"
       :class="['list-group-item list-group-item-action py-3 lh-tight', scorecard.course.displayName === props.active && 'ctive']"
       aria-current="false"
       @click="emit('handleFilter', scorecard)">
      <div class="flex w-100 align-items-center w-full flex-grow justify-content-between">
        <h1 class="flex flex-shrink-0" style="font-size: 18px; text-transform: uppercase; white-space: nowrap; font-weight: 600;">{{ scorecard.player.name }}
          <span :class="[
              'mx-2 badge capitalize', scorecard.isCompleted ? 'bg-success' : 'bg-danger']">{{ scorecard.isCompleted ? 'Complete' : 'Incomplete' }}</span>

        </h1>
        <ul>
          <li><b>Course: </b>{{ scorecard.course.displayName }}</li>
          <li><b>Date: </b>{{ new Date(scorecard.createdAt).toLocaleDateString('en-us', {weekday: "short", year: "numeric", month: "short", day: "numeric"}) }}</li>
        </ul>
      </div>
    </a>
</template>
<script setup>

const props = defineProps({ list: {type: Array, default: []}, active: {type: String, default: ''}})
const emit = defineEmits(['handleFilter'])


</script>
