<template>
    console.log(activity);
    <div v-if="activity.formatted_address !== 'Travel'" class="pr-5 snap-start snap-always">
                        <div class="mx-auto card flex min-w-full max-w-md overflow-auto shadow-lg bg-indigo-200 justify-center">
                          <img class="w-52 h-32 self-center rounded-md" :src="activity.photo" alt="image of attraction">

                            <div class="px-2 py-2 border-l-4 my-4 border-gray-400">
                              <h3 class="text-black text-left">{{ activity.name }}</h3>
                                <div>
                                <div class="text-base text-left">
                                  {{ activity.time }} - {{ activity.endtime }}
                                  <p class="text-gray-600">Suggested duration:</p> 
                                  <p class="text-gray-600">{{ calculateDuration(activity.time, activity.endtime) }} hours</p>
                                </div>
                                <p class="text-gray-500 text-base text-left">
                                  {{ activity.formatted_address}}
                                </p>
                              </div>
                            </div>
                          <div>
                            <textarea class="mb-2 rounded border-none" placeholder="Add notes here" type="text" v-model="activity.remarks"/>
                            
                          </div>
                          <div class="flex flex-col px-6 pt-4 pb-2 items-center">
                              <button class="btn mb-2 w-2/3" href="#" @click="showLocation(activity)">Show on Map</button>
                              <div class="tooltip tooltip-info" data-tip="see below!">
                                <button class="btn w-2/3" href="#" @click="geteateriesnearby(activity)">Where to eat?</button>
                              </div>
                              
                          </div>
                        </div>
                      </div>
</template>

<script>
export default {
    props: {
        activity: Object,
        showLocation: Function,
        geteateriesnearby: Function,
        calculateDuration: Function,
    },
    mounted() {
    console.log(this.activity);
  }
}

</script>