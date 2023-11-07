<template>

    <div class="bg-gradient-to-b from-neutral-400 to-blue-200 w-full">
        <!--insert empty space-->
        <div class="h-24"></div>
    </div>
    

    <landingheader></landingheader>

    <underlinedthing></underlinedthing>

    <ouroffers></ouroffers>


        
    <div class="flex items-center mt-20 mb-20 justify-center bg--base-100">
        <div class="col-lg-12">
            <h2 class="mb-3 text-4xl text-center">What our Travelers have to say</h2>
            <testimonials></testimonials>
        </div>
    </div>

    <landingvideo></landingvideo>
    <div class="flex items-center h-screen justify-center bg-base-100">
        <div class="col-lg-12 items-center justify-center py-96">
            <div class="my-10">
                <Vue3Lottie :animationData="EndingJSON" :height="500" :width="1500" />
            </div>
            <h2 class="mb-5 text-center">Ready to Supercharge Your Travel Planning?</h2>
            <div class="flex items-center justify-center">
                <router-link to="/sign-up"><button class="inline-flex items-center h-12 px-6 text-lg text-white transition-colors duration-150 bg-blue-400 rounded-full focus:shadow-outline hover:bg-blue-500 ">
                    <svg class="w-4 h-4 mr-3 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    <span>Lets Go!</span></button></router-link>
            </div>
            
        </div>
    </div>
</template>

<script>


import landingheader from '../home/landingheader.vue'
import ouroffers from '../home/ouroffers.vue'
import underlinedthing from '../home/underlinedthing.vue'
import { Vue3Lottie } from 'vue3-lottie'
import testimonials from '../../components/testimonials.vue'
import LottieJSON from '../../assets/lottie/Lottie.json'
import MoneyJSON from '../../assets/lottie/money.json'
import PlanningJSON from '../../assets/lottie/planning.json'
import ToolsJSON from '../../assets/lottie/tools.json'
import EndingJSON from '../../assets/lottie/ending.json'
import landingvideo from '../../components/landingvideoheader.vue'

export default {
  components: {
    Vue3Lottie,
    testimonials,
    landingheader,
    underlinedthing,
    ouroffers,
    landingvideo,
  },
  data() {
    return {
      LottieJSON,
      MoneyJSON,
      PlanningJSON,
      ToolsJSON,
      EndingJSON,
    }
  },
}
</script>

<style scoped>
</style>