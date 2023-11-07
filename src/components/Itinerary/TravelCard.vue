<template>
    <div class="pr-5">
                        <div class="ml-8 max-w-sm max-h-xs rounded overflow-hidden border-l-4 border-dashed border-gray-700">
                          <!-- <img class="w-full h-20" src="../components/logo/itiner-easy.svg" alt="travel"> -->
                          <div class="px-6 py-4">
                            <div class="font-bold text-sm mb-2">{{ activity.name }}</div>
                            <p class="text-gray-700 font-bold">
                              {{ activity.time}} - {{activity.endtime}}
                            </p>                          
                            <p>                              
                              estimated: {{getMinutesDifference(activity.time, activity.endtime)}}
                            </p>
                          </div>
                            <button class="btn w-max self-center ml-5 mb-5" href="#" @click="displaydirectionsonmap(day.activities[day.activities.indexOf(activity) - 1].geometry.location, day.activities[day.activities.indexOf(activity) + 1].geometry.location)">The way there!</button>
                        </div>
                      </div>
</template>

<script>
export default{
    props:{
        activity: Object,
        displaydirectionsonmap: Function,
        day: Object,
        getMinutesDifference: Function,
    }
}

</script>