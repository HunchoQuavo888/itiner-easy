import { createApp } from 'vue';
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';
import './style.css';
import App from './App.vue';
import router from "./router";
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all"


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Formkit
import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import { createMultiStepPlugin } from '@formkit/addons'
import '@formkit/themes/genesis'
import '@formkit/addons/css/multistep'

//Formkit Pro

import '@formkit/pro/genesis'
import { createProPlugin, inputs } from '@formkit/pro'
const proplugin = createProPlugin('fk-344144602', inputs)

//import lottie
import Vue3Lottie from 'vue3-lottie'
import { MotionPlugin } from '@vueuse/motion'



// TODO: Add SDKs for Firebase products that you want to use
//popupwindow
// import Buefy from 'buefy';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWqyaqlZm5M3eaTVxCQsy-o2iw-qmxOdY",
  authDomain: "itiner-easy.firebaseapp.com",
  projectId: "itiner-easy",
  storageBucket: "itiner-easy.appspot.com",
  messagingSenderId: "396066188905",
  appId: "1:396066188905:web:ba749c0e78930a57c77cf8",
  measurementId: "G-SZVP36N6L4"
};
export function initMap(coords) {
  const mapDiv = document.getElementById("map");
  const mapOptions = {
    center: coords,
    zoom: 8,
  };
  const map = new google.maps.Map(mapDiv, mapOptions);
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)
const analytics = getAnalytics(firebaseApp);

const app = createApp(App)
  .use(formKitPlugin, defaultConfig({
    plugins: 
    [createMultiStepPlugin(),proplugin]
}));

gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin); 


app.use(BootstrapIconsPlugin);
app.use(router);
app.use(Vue3Lottie);
app.use(MotionPlugin)

app.mount('#app');





