<script setup>

import Navbar from "./components/navbar.vue"
import Footer from "./components/footer.vue"

import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import router from './router/index.js';

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    }
    else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  })
};

</script>

<!-- <template>
 <div class="navbar h-5 bg-blue-400 rounded-none">
  <div class="place-content-evenly flex-nowrap">
    <a class="btn btn-lg btn-ghost normal-case text-xl"><img class="h-20 w-20" src="./components/logo/itiner-easy.svg"></a>
    <ul class="menu menu-horizontal px-1">
      <router-link to="/">
        <button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Home</button>
      </router-link>
      <router-link to="/itinerary">
        <button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Itinerary</button>
      </router-link> 
      <li>
        <details>
          <summary class="pt-2 font-sans text-gray-900 text-xl font-semibold hover:text-white">
            TOOLS
          </summary>
          <ul class="p-2 bg-blue-600 ">
            <router-link to="/translator"><li><a class="text-gray-900 text-lg hover:text-white">Translator</a></li></router-link> 
            <router-link to="/converter"><li><a class="text-gray-900 text-lg hover:text-white ">Converter</a></li></router-link> 
          </ul>
        </details>
      </li>
      <router-link to="/feed"><button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Feed</button></router-link> 
      <router-link to="/billbuddy"><button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">BillBuddy</button></router-link>
      <router-link to="/sign-up"><button class="btn bg-inherit text-gray-900 text-xl hover:text-white hover:bg-inherit">Sign Up</button></router-link>
      <router-link to="/sign-in"><button class="mr-2 blue btn bg-inherit text-white text-xl hover:text-blue-500 hover:bg-inherit">Sign In</button></router-link>
      <router-link to="/profile"><button class="blue btn bg-inherit text-white text-xl hover:text-blue-500 hover:bg-inherit">Profile</button></router-link>
      

    </ul>
  </div>
</div>

<router-view />

</template> -->

<template>
  <div>
    <Navbar/>
  </div>

  <div>
    <router-view v-slot="{ Component }">
      <Transition name="page-opacity" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>

 



  
 
  
  <div>
    <Footer></Footer>
  </div>

</template>

<style>
.page-opacity-enter-active,
.page-opacity-leave-active{
  transition: 600ms ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to{
  opacity:0;
}

</style>
