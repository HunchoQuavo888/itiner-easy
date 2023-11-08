<template>
<section class="relative h-96 flex flex-col items-center justify-center text-center text-white py-0 px-3">
    <div class="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <video class="min-w-full min-h-full absolute object-cover" src="../assets/landingheader/beach2.mp4" type="video/mp4" autoplay muted loop></video>
    </div>
    <div class="video-content absolute">
        <div class="grid grid-cols-3 gap-11">
            <div class="firstfigure">
                <div class="card w-36 md:w-48 bg-base-100 text-center shadow-xl">
                <div class="flex justify-center">
                    <div class="card-body flex">
                    <p class="text-5xl">{{ tweenedNumber1 }}</p>
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
                    <h2 class="text-5xl">{{tweenedNumber2}}</h2>
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
                    <h2 class="text-5xl">{{tweenedNumber3}}</h2>
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

<style scoped>
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
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export default {
    components: {
        Vue3Lottie,
    },
  setup() {
    const tweenedNumber1 = ref(0)
    const tweenedNumber2 = ref(0)
    const tweenedNumber3 = ref(0)

    let observer

onMounted(() => {
    const element = document.querySelector('.video-content')

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                gsap.to(tweenedNumber1, {
                    duration: 1,
                    value: 2400,
                    roundProps: 'value',
                    onUpdate: () => {
                        tweenedNumber1.value = Math.round(tweenedNumber1.value)
                    }
                })

                gsap.to(tweenedNumber2, {
                    duration: 1,
                    value: 1300,
                    roundProps: 'value',
                    onUpdate: () => {
                        tweenedNumber2.value = Math.round(tweenedNumber2.value)
                    }
                })

                gsap.to(tweenedNumber3, {
                    duration: 1,
                    value: 980,
                    roundProps: 'value',
                    onUpdate: () => {
                        tweenedNumber3.value = Math.round(tweenedNumber3.value)
                    }
                })
            }
        })
    })

    observer.observe(element)
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})


    return {
      tweenedNumber1,
      tweenedNumber2,
      tweenedNumber3,
      EndingJSON
    }
  }
}


</script>