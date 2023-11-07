<template>

<section class="bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-20 lg:py-23">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="theillustration col justify-center">
                <!-- <img
                class="image w-80 h-auto" 
                src="../components/headerimages/persontravelling.svg">-->
                <Vue3Lottie :animationData="LottieJSON" :height="300" :width="300" />
            </div>
            <div class="firstheading">
                <h1 class="mb-4 text-4xl font-extrabold inline-flex text-white md:text-5xl lg:text-6xl">Hello {{ user.displayName }},</h1>
                <h2 class="text-white">How can we help you plan your next trip?</h2>
            </div>
        </div>
    </div>
</section>

</template>

<script>
import { Vue3Lottie } from 'vue3-lottie'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, where, query, getDocs, } from "firebase/firestore";
import LottieJSON from '../assets/lottie/Lottie.json'

export default {
  components: {
    Vue3Lottie,
  },
  data() {
    return {
      LottieJSON,
      user: {}, // Initialize the user property
    }
  },
  created() {
    const auth = getAuth();
    const db = getFirestore();
    this.db = db;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User is signed in', user.uid + " " + user.email);

        // Get the user's ID
        const userId = user.uid;

        // Query Firestore to fetch user information
        const db = getFirestore();
        const usersCollection = collection(db, "users"); // Adjust the Firestore collection name as per your data structure
        const userQuery = query(usersCollection, where("uid", "==", userId));

        try {
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              console.log("User data from Firestore:", userData);

              // Update the user data property with fetched data
              this.user = userData;
            });
          } else {
            console.log("User document not found in Firestore.");
          }
        } catch (error) {
          console.error("Error querying user information from Firestore: ", error);
        }
      } else {
        console.log('User is signed out');
      }
    }
    );
  },
}
</script>
