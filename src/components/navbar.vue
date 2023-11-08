<template>
  <!-- <div class=" bg-[#5072A7] text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
        <div class="flex items-center cursor-pointer">
            <span class="text-blue-600 text-x1 mr-1">
                <router-link to="/"><img class="h-20 w-20" src="./logo/itiner-easy.svg"></router-link>
            </span>
        </div>
        <span @click="MenuOpen" class="absolute md:hidden right-6 top-5 cursor-pointer text-4xl">
            <i :class="['bi', opened ? 'bi-x' : 'bi-filter-left']"></i>
        </span>
        <div>
            <ul class="md:flex md:items-center md:px-0 px-3 md:pb-0 pb-10 md:static absolute bg-[#5072A7] md:w-auto w-full top-20 duration-75 ease-in"
            :class="[ opened ? 'menu-open' : 'menu-close']">
                <li class="md:mx-4 md:my-0 my-6 " v-for="link in Links">
                    <router-link :to=link.linkz ><a @click="MenuOpen" class="text-2xl hover:text-blue">{{ link.name }}</a></router-link>
                </li>
            </ul>
        </div>
    </div> -->
  <div class="navbar font-navbar bg-[#5072A7]">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn bg-[#5072A7] btn-ghost hover:bg-[#6699CC] lg:hidden" v-if="signedin">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul tabindex="0"
          class="menu menu-sm bg-[#5072A7] text-white dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
          <!-- signedin -->
          <li v-if="signedin" @click="gotohome">
            <router-link to="/feed"><a>HOME</a></router-link>
          </li>
          <li v-if="signedin">
            <router-link to="/itinerary"><a>ITINERARY</a></router-link>
          </li>
          <li v-if="signedin">
            <a>TOOLS</a>
            <ul class="p-2">
              <li>
                <router-link to="/translator"><a>TRANSLATOR</a></router-link>
              </li>
              <li>
                <router-link to="/converter"><a>CONVERTER</a></router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="flex items-center cursor-pointer">
        <div class=" mr-1" v-if="signedin" @click="gotohome">
          <router-link to="/feed"><img class="h-20 w-20 inline-flex" src="./logo/itiner-easy.svg">
            <h3 class="inline font-semibold">Itiner-easy</h3>
          </router-link>
        </div>
        <div class=" mr-1 z-10" v-if="!signedin" @click="gotohome">
          <router-link to="/"><img class="h-20 w-20 inline-flex" src="./logo/itiner-easy.svg">
            <h3 class="inline font-semibold">Itiner-easy</h3>
          </router-link>
        </div>
      </div>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu text-white hover:text-white text-m menu-horizontal px-1">
        <!-- signed in -->
        <li v-if="signedin" @click="gotohome">
          <router-link to="/feed"><a>HOME</a></router-link>
        </li>
        <li v-if="signedin">
          <router-link to="/itinerary"><a>ITINERARY</a></router-link>
        </li>
        <li style="z-index:2" tabindex="0" v-if="signedin">
          <details>
            <summary><a>TOOLS</a></summary>
            <ul class="p-2 bg-[#5072A7]">
              <li>
                <router-link to="/translator"><a>TRANSLATOR</a></router-link>
              </li>
              <li>
                <router-link to="/converter"><a>CONVERTER</a></router-link>
            </li>
          </ul>
        </details>
      </li>
      <li v-if="signedin">
        <input type="text" v-model="searchTerm" @input="searchUsers" placeholder="Search users..."/>
        <div v-if="matchingUsers.length > 0" class="auto-fill-suggestions">
          <ul>
          <li class="" v-for="user in matchingUsers" :key="user.uid">
            <div style="display: flex; align-items: center;">
              <router-link :to="`/profile/${user.uid}`" @click="clearSearch" style="margin-left: 10px;">
                <img class="w-7 h-7 rounded-full object-cover" :src="user.profilePic" v-if="user.profilePic">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" v-else>
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
              </router-link>
              
              <router-link :to="`/profile/${user.uid}`" @click="clearSearch" style="margin-left: 10px;">
                {{ user.displayName }}
              </router-link>
            </div>
          </li>
        </ul>
        </div>

      </li>
    </ul>
  </div>
  <!-- if signed in -->
  <div class="navbar-end" v-if="signedin">

      <div class="dropdown dropdown-bottom dropdown-end">
        <label tabindex="0" class="btn m-1  border-none hover:bg-[#6699CC] bg-[#5072A7]">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle"
            viewBox="0 0 16 16" v-if="!user.profilePic">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>

          <img class="w-10 h-10 rounded-full object-cover" :src="user.profilePic" v-else>
        </label>
        <ul tabindex="0" class="dropdown-content mt-6 bg-[#5072A7] z-[1] menu p-2 shadow rounded-box w-52">
          <li><router-link to="/profile"><a>Profile</a></router-link></li>
          <li><button @click="handleSignOut"><a>Sign out</a></button></li>
        </ul>
      </div>
    </div>

    <!-- if signed out -->
    <div class="navbar-end z-10" v-if="!signedin">
      <!-- sign in -->
      <router-link to="/sign-in">
        <button class="btn btn-primary shadow-sm z-10">
          <a>Sign in</a>
        </button>
      </router-link>

      <!-- sign up -->
      <router-link to="/sign-up">
        <button class="btn btn-primary shadow-sm z-10 ml-3">
          <a>Sign up</a>
        </button>
      </router-link>
    </div>
  </div>
</template>


<script>


import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot, getDoc, where
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from '../router/index.js';


export default {
  data() {
    return {
      signedin: null,
      user: {

      },
      searchQuery: "",
      matchingUsers: [],
      searchTerm: '',
    };
  },
  mounted() {
    this.db = getFirestore();
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.signedin = true;
        const userDocRef = doc(this.db, "users", user.uid);
        getDoc(userDocRef).then((userDoc) => {
          if (userDoc.exists()) {
            this.user = userDoc.data();
          }
        });
      } else {
        this.signedin = false;
        console.log('User is signed out');
      }
    });
  },
  methods: {
    gotohome() {
      this.$router.push('/feed');
      setTimeout(function () {
        window.location.reload();
      }, 500);
    },

    clearSearch() {
    this.searchTerm = '';
    this.matchingUsers = [];
  },

    handleSignOut() {
      // Call the `signOut` function from within the component
      signOut(this.auth).then(() => {
        // You may need to import `router` and use it here
        router.push("/");
      });
    },

    async searchUsers() {
  if (this.searchTerm.trim() === '') {
    // searchTerm is empty or contains only whitespace, return early
    this.matchingUsers = [];
    return;
  }
  try {
    const db = getFirestore();
    const usersCollection = collection(this.db, "users");

    // Convert the search query to lowercase for a case-insensitive search
    const searchQuery = this.searchTerm.toLowerCase();

    const querySnapshot = await getDocs(usersCollection);
    const matchingUsers = [];

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      // Perform case-insensitive comparison
      if (userData.displayName.toLowerCase().includes(searchQuery)) {
        matchingUsers.push(userData);
      }
    });

    this.matchingUsers = matchingUsers;
    console.log("Matching users:", matchingUsers);
  } catch (error) {
    console.error("Error searching for users:", error);
  }
}

  },
};


</script>

<style>a {
  color: white;
}</style>