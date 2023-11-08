<template>
        <!-- back button -->
        <div class="back pl-4 pt-2 flex items-center w-screen sticky cursor-pointer" @click="goBack">
            <img class="w-4 cursor-pointer" src="../../assets/arrow.png" width="15px" alt="back" />
            <span class="text-[#024959] font-bold m-3 cursor-pointer">Back</span>
        </div>

    <!-- login -->
        <section class="bg-base-100 h-fit pt-6 pb-7 flex items-center justify-center">
    <!-- login container -->
    <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <!-- form -->
        <div class="md:w-1/2 px-8 md:px-16">
        <h2 class="font-bold text-2xl text-[#002D74]">Login</h2>
        <p class="text-xs mt-4 mb-4 text-[#002D74]">If you are already a member, easily log in</p>
        <form @submit.prevent="register" class="flex flex-col gap-4">
        <div class="relative">
            <input v-model="email" required type="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" required class="absolute text-md text-gray-400 dark:text-gray-900 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
        </div>
        <div class="relative">
            <input v-model="password" type="password" required id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="floating_outlined" class="absolute text-md text-gray-400 dark:text-gray-900 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
        </div>
        <div class="incorrectpw flex" v-if="errMsg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-exclamation-circle mr-2" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            <h4 class="text-sm text-red-400">{{errMsg}}</h4>
        </div>
        <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" @click="register">Login</button>
      </form>


      <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
        <p>Don't have an account?</p>
        <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"><router-link to="/sign-up" class="link" @click="goToRegister"><span class="text-gray-800">Sign up</span></router-link></button>
      </div>
    </div>

    <!-- image -->
    <div class="md:block hidden w-1/2">
        <img class="vacationboy w-max" src="../../assets/Traveling-rafiki.png" alt="">
    </div>
  </div>
</section>

</template>
  
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { useRoute, useRouter } from 'vue-router';
  
  const email = ref("");
  const password = ref("");
  const errMsg = ref("");
  const route = useRoute();
  const router = useRouter();
  
  const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        console.log("Successfully signed in!");
        if (route.query.redirect) {
          router.push(route.query.redirect);
        } else {
          router.push('/feed');
        }
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid Email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
      });
  };
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        console.log(result.user);
        if (route.query.redirect) {
          router.push(route.query.redirect);
        } else {
          router.push("/feed");
        }
      })
      .catch((error) => {
        // Handle error
      });
  }
  
  const goBack = () => {
    router.push('/'); // Go back to the previous page
  }
  
  const goToRegister = () => {
    router.push("/sign-up");
  }
  </script>
  

  