<template>
    <summary class="collapse-title text-xl font-medium">
                    <h1 class="mb-1">Day {{ index + 1 }}</h1>
                    <h3 class="text-gray-500 mb-2">🗓️ {{ day.date }}</h3>
                  
                  <!-- Weather reminder -->
                    <div class="rounded-lg bg-blue-200 p-3 shadow-sm min-w-fit">
                      <div>
                        <div class="text-md">
                          <p class="font-bold">Weather forecast: </p>  
                          <span class="">{{ day.weather }}</span>
                          <span class="" v-if="day.weather.includes('Sunny', 'sunny')"> ☀️</span>
                          <span v-if="day.weather.includes('hazy')"> 💨</span>
                          <span v-if="day.weather.includes('rain')"> 🌧️</span>
                        </div>  
                        <div class="alert bg-inherit border-none">
                          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                          <span class="text-sm" v-if="day.weather.includes('Sunny','sunny')">Apply sunscreen!!</span>
                          <span class="text-sm" v-if="day.weather.includes('hazy')">Wear a mask!!</span>
                          <span class="text-sm" v-if="day.weather.includes('rain')">Pack an umbrella!! ☂️</span>
                        </div>
                      </div>
                    </div>
                  <!-- </div> -->
                  
                  </summary>
    
</template>

<script>
export default {
    props: {
        day : Object,
        index: Number
    }
}
</script>