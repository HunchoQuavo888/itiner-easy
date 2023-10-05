<script setup>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

axios.get("https://api.openweathermap.org/data/2.5/weather?lat=51.4875167&lon=-0.1687007&appid=d40eeed1ce429cb61d6829da2c3b6102")
.then(resp => {
  console.log(resp.data.weather[0]);
}); 
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
