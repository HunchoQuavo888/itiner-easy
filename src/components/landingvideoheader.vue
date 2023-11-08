<template>
<section class="relative h-96 flex flex-col items-center justify-center text-center text-white py-0 px-3">
    <div class="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video class="min-w-full min-h-full absolute object-cover" src="../assets/landingheader/beach.mp4" type="video/mp4" autoplay muted loop></video>
    </div>
    <div class="video-content absolute">
        <div class="grid grid-cols-3 gap-11">
            <div class="firstfigure">
                <div class="card w-36 md:w-48 bg-base-100 text-center shadow-xl">
                <div class="flex justify-center">
                    <div class="card-body flex">
                    <h2 class="text-5xl ">2.4k</h2>
                    <hr>
                    <p class="font-normal italic">users worldwide</p>
                </div>
                </div>
                </div>
            </div>
            <div class="secondfigure">
                <div class="card w-36 md:w-48 bg-base-100 text-center shadow-xl">
                <div class="flex justify-center">
                    <div class="card-body flex">
                    <h2 class="text-5xl">1.3k</h2>
                    <hr>
                    <p class="font-normal italic">trips planned</p>
                </div>
                </div>
                </div>
            </div>
            <div class="thirdfigure">
                <div class="card w-36 md:w-48 bg-base-100 text-center shadow-xl">
                <div class="flex justify-center">
                    <div class="card-body flex">
                    <h2 class="text-5xl">983</h2>
                    <hr>
                    <p class="font-normal italic">expenses split</p>
                </div>
                </div>
                </div>
            </div>
        </div>
        
    
    </div>
</section>
</template>

<style>
.video-docker video {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.video-docker::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.video-content {
  z-index: 2;
}
</style>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import EndingJSON from '../assets/lottie/ending.json'

export default { 
    components: {
    Vue3Lottie,},
    data() {
    return {
    EndingJSON}}};
</script>