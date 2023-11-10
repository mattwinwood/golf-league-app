<template>
  <TransitionRoot :show="showModal" as="template">
    <Dialog as="div" class="relative z-50" @close="showModal = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center  text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="p-0 relative w-[800px] transform overflow-hidden rounded-lg bg-gray-50 pb-2 text-left shadow-xl transition-all">
              <div class="flex flex-col px-4 bg-gray-100 border-b border-gray-200 pb-4 w-full py-3 mb-4">
                <h1 class="text-2xl font-semibold">Course: {{ activeCourse }}</h1>
                <div class="-mt-1 text-lg">Player: {{ getRealName() }}</div>
                <div v-if="props.activeCourse.toLowerCase() !== 'all'"
                     class="font-regular flex text-sm text-base gap-3 flex text-white">
              <span class="text-black">
                <span class="font-semibold text-green-600">{{ numberOfPlayersWithScorecards }}</span> of
                <span class="text-blue-600 font-semibold">{{ totalNumberOfPlayers }} League Players</span> have completed {{
                  props.activeCourse
                }} while
                <span class="font-semibold text-orange-600">{{ numberOfPlayersMissingScorecards }}</span> players remain.
              </span>
                </div>
              </div>

              <div class="hidden flex w-2/3 flex-row gap-3 justify-center items-center p-1 pb-2 mx-auto">
                <div class="text-xl flex font-light flex-shrink italic  self-center pr-8">"{{ randomQuote }}"</div>
              </div>

              <div class="w-full p-4 pb-0">
                <textarea v-if="props.csvData" ref="csvContent"
                          class="h-[400px] font-mono border border-1 border-gray-400 p-4 pb-1 w-full">{{ props.csvData }}</textarea>

              </div>
              <div class="p-4 pt-0 mt-0 sm:mt-6 gap-2 flex flex-row ">
                <button
                    class="flex  w-2/12 justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="button"
                    @click="showModal = false">Close
                </button>
                <button
                    class="flex w-2/12 justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="button"
                    @click="copy()">{{ copyButtonText }}
                </button>
                <button
                    class="flex w-4/12 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="button"
                    @click="save()">{{ downloadButtonText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from '@headlessui/vue'
import playerData from "../data/players.json"
import quotes from "../helpers/quotes";
import saveCsv from "../helpers/saveCsv";
import copyCsv from "../helpers/copyCsv";
import playerHelper from "../helpers/playerHelper";

const props = defineProps(
    {
      csvData: {
        type: String,
        default: ''
      },
      filteredResults: {type: Array, default: false},
      activeCourse: {type: String, default: false},
      activeRecord: {type: Array, default: false},
      modelValue: {type: Boolean, default: false},

    })

const emit = defineEmits(["update:modelValue"]);

const players = ref([])
const csvContent = ref('')
const randomQuote = ref('');
const copyButtonText = ref('Copy');
const downloadButtonText = ref('Download CSV');

const playersWithScorecards = ref([])
const playersMissingScorecards = ref([])
players.value = playerData.data.players

players.value = playerData.data.players

const numberOfPlayersWithScorecards = computed(() => {
  return playersWithScorecards.value.length;
});
const numberOfPlayersMissingScorecards = computed(() => {
  return playersMissingScorecards.value.length;
});
const totalNumberOfPlayers = computed(() => {
  return players.value.length;
});

function matchPlayersWithScorecards() {
  const playerNamesWithScorecards = new Set(props.filteredResults.map((scorecard) =>
      scorecard.player.name.toUpperCase()
  ));

  playersWithScorecards.value = players.value.filter((player) =>
      playerNamesWithScorecards.has(player.userName.toUpperCase())
  );

  playersMissingScorecards.value = players.value.filter((player) =>
      !playerNamesWithScorecards.has(player.userName.toUpperCase())
  );
}

const copy = () => {
  copyCsv.copy(csvContent)
  copyButtonText.value = 'Copied Text!'
  setTimeout(() => {
    copyButtonText.value = 'Copy'

  }, 800)
}


const showModal = computed({
  get() {
    if (props.modelValue) {
      randomQuote.value = quotes.generateRandomQuote()
      matchPlayersWithScorecards()
    }
    return props.modelValue;
  },
  set(value) {
    /**
     * Emmitted when modelValue changes.
     */
    window.scrollTo(0, 0);
    emit("update:modelValue", value);
  }
});
const getRealName = () => {
  const userName = props.activeRecord[0].player.name
  const playerRecord = playerHelper.getPlayerRecord(userName)
  if (playerRecord && playerRecord.realName) {
    return `${playerRecord.realName} (${userName})`
  } else {
    return userName
  }
}
const save = () => {
  saveCsv.save(csvContent, props.activeCourse)
  downloadButtonText.value = 'CSV Downloaded!'
  setTimeout(() => {
    downloadButtonText.value = 'Download CSV'
  }, 800)

}
</script>

