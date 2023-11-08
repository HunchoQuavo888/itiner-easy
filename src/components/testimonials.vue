<template>
    <div class="w-full md:w-1/2 max-w-3xl mx-auto text-center">
      <!-- Testimonial image -->
      <div class="relative h-32">
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-indigo-500/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
            <div class="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
  
              <template :key="index" v-for="(testimonial, index) in testimonials">
                <TransitionRoot
                  :show="active === index"
                  class="absolute inset-0 h-full -z-10"
                  enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                  enterFrom="opacity-0 -rotate-[60deg]"
                  enterTo="opacity-100 rotate-0"
                  leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                  leaveFrom="opacity-100 rotate-0"
                  leaveTo="opacity-0 rotate-[60deg]"
                >
                  <img class="relative top-11 left-1/2 -translate-x-1/2 rounded-full" :src="testimonial.img" width="70" height="70" :alt="testimonial.name" />
                </TransitionRoot>
              </template>
  
          </div>
        </div>
      </div>
      <!-- Text -->
      <div class="mb-9 transition-all duration-150 delay-300 ease-in-out">
        <div class="relative flex flex-col" ref="testimonialsRef">
  
          <template :key="index" v-for="(testimonial, index) in testimonials">
            <TransitionRoot
              :show="active === index"
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 -translate-x-4"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-out duration-300 delay-300 absolute"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-4"
              @before-enter="heightFix()"
            >
              <div class="text-2xl font-bold text-slate-900 before:content-['\201C'] after:content-['\201D']">{{ testimonial.quote }}</div>
            </TransitionRoot>          
          </template>
  
        </div>
      </div>
      <!-- Buttons -->
      <div class="flex flex-wrap justify-center -m-1.5">
        <template :key="index" v-for="(testimonial, index) in testimonials">
          <button
            class="inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150"
            :class="active === index ? 'bg-indigo-500 text-white shadow-indigo-950/10 font-bold' : 'bg-white hover:bg-indigo-100 text-slate-900 font-bold'"
            @click="active = index; stopAutorotate();"
          >
            <span>{{ testimonial.name }}</span> <span :class="active === index ? 'text-indigo-200' : 'text-slate-300'">&nbsp-&nbsp</span> <span>{{ testimonial.role }}</span>
          </button>
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { TransitionRoot } from '@headlessui/vue'

  import TestimonialImg01 from '../assets/testimonials/luffy.jpeg'
  import TestimonialImg02 from '../assets/testimonials/zoro.jpeg'
  import TestimonialImg03 from '../assets/testimonials/nami.jpeg'

  const testimonialsRef = ref(null)
  const active = ref(0)
  const autorotate = ref(true)
  const autorotateTiming = ref(7000)
  let interval
  
  const props = defineProps({
    testimonials: Array
  })
  
  const testimonials =[
  {
    img: TestimonialImg01,
    quote: "Food and places to visit are all in one place. I don't have to worry about where to go anymore!",
    name: 'Monkey D. Luffy ',
    role: ' Captain'
  },
  {
    img: TestimonialImg02,
    quote: "This product will guide you like a true swordsman's intuition. Worthy of the King of Pirates himself!",
    name: 'Roronoa Zoro ',
    role: ' Swordsman'
  },
  {
    img: TestimonialImg03,
    quote: "I have been using this product for a few weeks now and I am blown away by the results. I never have to think about where to go in Wano again!",
    name: 'Nami ',
    role: ' Navigator'
  }
]
  
  const heightFix = () => {  
    setTimeout(() => {
      if (testimonialsRef.value && testimonialsRef.value.parentElement) {
        testimonialsRef.value.parentElement.style.height = testimonialsRef.value.clientHeight + 'px'
      }
    }, 1)
  }
  
  const stopAutorotate = () => {
    autorotate.value = false
    clearInterval(interval)
  }
  
  onMounted(() => {      
    if (!autorotate.value) return
    interval = setInterval(() => {
      active.value = active.value + 1 === testimonials.length ? 0 : active.value + 1
    }, autorotateTiming.value)
  })
  
  onUnmounted(() => clearInterval(interval))
  </script>
  
  <script>
export default {
  name: 'testimonials',
  // Other Vue component options if needed
}
</script>
  