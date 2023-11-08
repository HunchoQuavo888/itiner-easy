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
  <div class="md:w-1/2 px-8 md:px-10">
    <h2 class="font-bold text-2xl text-[#002D74]">Hello!</h2>
    <p class="text-xs mt-4 mb-4 text-[#002D74]">Start your journey with Itiner-easy, your one-stop travel companion.</p>

    <form @submit.prevent="register" class="flex flex-col gap-4">
      <div class="relative">
          <input v-model="name" @input="checkName" type="text" id="name" class="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-600 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label for="floating_outlined" required class="absolute text-md text-gray-400 dark:text-gray-900 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Name</label>
          <span  class="warning text-sm text-red-400">{{ nameWarning }}</span>
      </div>
      <div class="relative">
          <input v-model="email" @input="checkEmail" type="email" required id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label for="floating_outlined" class="absolute text-md text-gray-400 dark:text-gray-900 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
          <span class="warning text-sm text-red-400">{{ emailWarning }}</span>
      </div>
      <div class="relative">
          <input v-model="password" @input="checkPassword" type="password" required id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label for="floating_outlined" class="absolute text-md text-gray-400 dark:text-gray-900 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
          <span  class="warning text-sm text-red-400">{{ passwordWarning }}</span>
      </div>
      <div class="relative">
          <input v-model="confirm" @input="checkConfirm" type="password" required id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label for="floating_outlined" class="absolute text-md text-gray-400 dark:text-gray-900 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Confirm password</label>
          <span class="warning text-sm text-red-400">{{ ConfirmWarning }}</span>
      </div>
      <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" @click="register">Register</button>
    </form>
  </div>
 <!-- image -->
 <div class="md:block hidden w-1/2">
      <img class="vacationboy w-max" src="../../assets/Traveling-rafiki.png" alt="">
  </div>
</div>
</section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useRouter } from 'vue-router'; //import router
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot } from "firebase/firestore";
const db = getFirestore();
const name = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");
const nameWarning = ref("");
const emailWarning = ref("");
const passwordWarning = ref("");
const ConfirmWarning = ref("");
const isValid = reactive({ email: false, password: false, confirm: false });
const router = useRouter() // get reference to vue router

const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered!");
      setDoc(doc(db, "users", data.user.uid), {
        displayName: name.value,
        email: email.value,
        password: password.value,
        uid: data.user.uid,
        bio: "Bio",
        location: "Location",
        profilePic: "",
      });
      router.push('/feed') // redirect to feed
    })
    .catch((error) => {
      console.log(error.code);
      // alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      router.push("/feed");
    })
    .catch((error) => {
      //handle error
    });
}

const goBack = () => {
  router.push('/'); // Go back to the home page
}

const goToLogin = () => {
  router.push("/sign-in");
}

const checkPassword = () => {
  if (password.value.length < 8) {
    passwordWarning.value = 'Needs to be at least 8 characters';
    isValid.password = false;
  } else {
    passwordWarning.value = '';
    isValid.password = true;
  }
  checkConfirm();
};

const checkConfirm = () => {
  if (confirm.value !== password.value && password.value.length >= 8) {
    ConfirmWarning.value = 'Password does not match';
    isValid.confirm = false;
  } else {
    ConfirmWarning.value = '';
    isValid.confirm = true;
  }
};

const checkEmail = () => {
  if (email.value.length === 0 || !email.value.includes('@')) {
    emailWarning.value = 'Invalid email';
    isValid.email = false;
  } else {
    emailWarning.value = '';
    isValid.email = true;
  }
};

const checkName = () => {
  if (name.value.length === 0) {
    nameWarning.value = 'Please enter a name';
    isValid.name = false;
  } else {
    nameWarning.value = '';
    isValid.name = true;
  }
};



</script>

