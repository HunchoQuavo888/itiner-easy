<template>
    <div>
    <!-- profile -->
    <div class="p-16">
    <div class="p-8 bg-white shadow mt-24">
      <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
          <div>
            <p class="font-bold text-gray-700 text-xl">{{ tripsCount }}</p>
            <p class="text-gray-400">Trips</p>
          </div>
          <div>
               <p class="font-bold text-gray-700 text-xl">{{ user.followers.length }}</p>
            <p class="text-gray-400">Followers</p>
          </div>
              <div>
               <p class="font-bold text-gray-700 text-xl">{{ user.following.length }}</p>
            <p class="text-gray-400">Following</p>
          </div>
        </div>
        <div class="relative">
          <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor" v-if="!user.profilePic">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <img class="w-48 h-48 rounded-full object-cover" :src="user.profilePic" v-else>
          </div>
        </div>
    
        <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button
            @click="toggleFollow(user.uid)"
            class="btn btn-outline text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
            >
            {{ isCurrentUserFollowing ? 'Unfollow' : 'Follow' }}
            </button>

        </div>
      </div>
    
      <!-- user name and country -->
      <div class="mt-20 text-center border-b pb-12">
        <h1 class="text-4xl font-medium text-gray-700">{{user.displayName}}</h1>
        <p class="font-light text-gray-600 mt-3">{{user.location}}</p>
      </div>
    
      <div class="mt-12 flex flex-col justify-center">
        <p class="text-gray-600 text-center font-light lg:px-16">{{user.bio}}</p>
      </div>
    
    </div>
    </div>
    </div>
    
    
    
    </template>
    
    <script>
    import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
    import { getFirestore, doc, getDoc, collection, where, query, getDocs, updateDoc, setDoc, getCountFromServer, count, arrayRemove, arrayUnion} from "firebase/firestore";
    import { useRoute, useRouter } from 'vue-router';
    import {getStorage, ref, uploadBytes, getDownloadURL,} from "firebase/storage"; 
    
    export default {
      name: "Profile",
      data() {
        return {
          user: {
            displayName: "",
            location: "Country",
            bio: "Bio",
            following: [],
            followers: [],
          },
          currentUser: {
            displayName: "",
            location: "Country",
            bio: "Bio",
            following: [],
            followers: [],
          },
          selectedImage: null,
          trips: [],
          tripsCount: 0,
          forceUpdate: 0,

        };
      },
      computed: {
        isCurrentUserFollowing() {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            return currentUser && this.user.followers.includes(currentUser.uid);
        }
        },

      methods: {
        logout() {
          console.log("Logging out");
          const auth = getAuth();
          signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Signed out");
            const router = useRouter();
            router.push("/sign-in"); // Redirect to the sign-in page
          }).catch((error) => {
            // An error happened.
            console.log("Error signing out", error);
          });
        },
    
        

        async fetchUserInformation(userId) {
            const db = getFirestore();
            const userRef = doc(db, "users", userId);

            try {
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log("User data from Firestore:", userData);
                this.user = userData;
                } else {
                console.log("User document not found in Firestore.");
                }
            } catch (error) {
                console.error("Error querying user information from Firestore: ", error);
            }
        },
    
        async fetchTrips() {
        const db = getFirestore();
        const router = useRoute();
        const userId = router.params.userId; // Replace this with the actual user ID
        const q = query(collection(db, `users/${userId}/trips`));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs.map((doc) => doc.data()));
        this.tripsCount = querySnapshot.size;
      },



    async toggleFollow(userId) {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            // Check if the current user is authenticated
            return;
        }

        const db = getFirestore();
        const userRef = doc(db, 'users', userId);
        const currentUserRef = doc(db, 'users', currentUser.uid);
        console.log(this.user.followers.includes(currentUser.uid));

        if (this.user.followers.includes(currentUser.uid)) {
            // If the current user is already following, unfollow them
            await updateDoc(userRef, {
            followers: arrayRemove(currentUser.uid),
            });

            await updateDoc(currentUserRef, {
            following: arrayRemove(userId),
            });
            
        } else {
            // If the current user is not following, follow them
            await updateDoc(userRef, {
            followers: arrayUnion(currentUser.uid),
            });

            await updateDoc(currentUserRef, {
            following: arrayUnion(userId),
            });
        }

        // Fetch the updated user information
        this.fetchUserInformation(userId);
        }

      },
      created() {
      const auth = getAuth();
      const db = getFirestore();
      this.db = db;


        const router = useRoute(); // Access the router
        const userId = router.params.userId; // Get userId from route parameters

        if (userId) {
        this.fetchUserInformation(userId); // Fetch user information using userId
    }
    

    },
    mounted() {
      this.fetchTrips();
    },
    };
    </script>