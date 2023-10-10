<template>
    <a v-for="(course, index) in props.courses"
       :class="['list-group-item list-group-item-action py-3 lh-tight', course.name === props.active && 'active']"
       aria-current="false"

       @click="emit('handleFilter', course.name)">
      <div class="d-flex w-100 align-items-center justify-content-between">
        <strong class="mb-1">{{ course.name }}</strong>
        <small>Week {{ course.week }}</small>
      </div>
      <div class="col-10 mb-1 small">Add some details and reminders for each entry. Dates, payment dues, prizes.</div>
    </a>
</template>
<script setup>

    const props = defineProps({ courses: {type: Array, default: []}, active: {type: String, default: ''}})
    const emit = defineEmits(['handleFilter'])


</script>
