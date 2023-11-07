<template>
    <div class="lg:ml-20 lg:mr-20 md:ml-7 md:mr-7 sm:ml-24 sm:mr-24 mt-5">
        <div class="bg-base-100 grid grid-cols-1 h-fit md:grid-cols-3 gap-2 md:gap-7">
            <div class="col rounded-xl bg-white drop-shadow-md">
                <Vue3Lottie :animationData="PlanningJSON" :height="300" :width="auto" />
                <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 mt-3 text-center">ITINERARY PLANNER</h3>
                <p class="text-center mx-10 mb-7"><h4>Trouble finding where to go and what to eat? Let our itinerary generator help you!</h4></p>
                </div>
            </div>
            <div class="col rounded-xl bg-white drop-shadow-md">
                <Vue3Lottie :animationData="MoneyJSON" :height="300" :width="auto" />
                <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 mt-3 text-center">BILLBUDDY</h3>
                <p class="text-center mx-10 mb-7"><h4>Having difficulty remembering and splitting expenses with your friends? Let Billbuddy help you!</h4></p>
                </div>
            </div>

            <div class="col rounded-xl bg-white drop-shadow-md">
                <Vue3Lottie :animationData="ToolsJSON" :height="300" :width="auto" />
                <div class=" d-flex flex-column col-sm-12">
                <h3 class="mb-3 mt-3 text-center">TOOLS</h3>
                <p class="text-center mx-10 mb-7"><h4>Finding it a hassle to switch apps just to make use of the translator and currency convertor? Let our integrated tools save you the hassle!</h4></p>
                </div>
            </div>
    </div>
    </div>
    
</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import LottieJSON from '../../assets/lottie/Lottie.json'
import MoneyJSON from '../../assets/lottie/money.json'
import PlanningJSON from '../../assets/lottie/planning.json'
import ToolsJSON from '../../assets/lottie/tools.json'
import EndingJSON from '../../assets/lottie/ending.json'

export default {
  components: {
    Vue3Lottie,},
    data() {
    return {
      LottieJSON,
      MoneyJSON,
      PlanningJSON,
      ToolsJSON,
      EndingJSON,
    }
  },};
</script>