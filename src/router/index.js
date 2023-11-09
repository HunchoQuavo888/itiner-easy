import { async } from "@firebase/util";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/404NotFound.vue";
import ItineraryDetails from '../components/ItineraryDetails.vue';
import ProfilePage from '../components/ProfileView.vue';
import CommunityTrips from '../components/PublicItinerary.vue';

const router = createRouter({
    history : createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/home/Home.vue"),meta: {requiresAuth: false}},
        { path: "/sign-up", component: () => import("../views/register/SignUp.vue"),meta: {requiresAuth: false}},
        { path: "/sign-in", component: () => import("../views/login/SignIn.vue"),meta: {requiresAuth: false}},
        { path: "/feed", component: () => import("../views/Feed.vue"),meta:{requiresAuth:true}},
        //go to converter or translator
        {path: "/translator", component: () => import("../views/Translator.vue"),meta: {requiresAuth: true}},
        {path: "/converter", component: () => import("../views/Converter.vue"),meta: {requiresAuth: true}},
        {path: "/tools" , component: () => import("../views/Toolpage.vue"),meta: {requiresAuth: true}},

        //gotobillbuddy.vue
        {path: "/billbuddy", component: () => import("../views/BillBuddy.vue"),meta: {requiresAuth: true}},
        {path: "/itinerary", component: () => import("../views/itinerary.vue"),meta: {requiresAuth: true}},
        {path: "/profile", component: () => import("../views/Profile.vue"),meta: {requiresAuth: true}},
        {path: "/add-trip", component: () => import("../views/addtrip.vue"),meta: {requiresAuth: true}},
        {path: "/tools", component: () => import ("../views/Toolpage.vue"),meta: {requiresAuth: true}},
        {path:"/billbuddytest", component: () => import ("../views/billbuddydraft2.vue"),meta: {requiresAuth: true}},
        {path:"/faq", component: () => import ("../views/FAQ.vue"),meta: {requiresAuth: true}},
        {path:"/contactus", component:()=> import("../views/contactus.vue"),meta: {requiresAuth: true}},
        { path: '/:catchAll(.*)', component: NotFound, },
        {path: "/itinerary/:tripID", name: 'itinerary-details', component: ItineraryDetails ,meta: {requiresAuth: true}},
        {path: "/profile/:userId", name: 'profile-page', component: ProfilePage ,meta: {requiresAuth: true}},
        {path: "/communitytrips/:tripID", name: 'community-trip', component: CommunityTrips ,meta: {requiresAuth: true}},

    ],
});

const getCurrentUser = () => {
    return new Promise ((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};
router.beforeEach(async (to, from, next) => {
    const user = await getCurrentUser();
    console.log('User:', user); // Log the user object
  
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (user) {
        // User is logged in, redirect to /feed if navigating to /
        if (to.path === '/') {
          console.log('Redirecting to /feed');
          next('/feed');
        } else {
          console.log('Allowed navigation');
          next();
        }
      } else {
        // User is not logged in, redirect to /
        console.log('Redirecting to /');
        next('/');
      }
    } else {
      // Route does not require authentication, proceed
      console.log('Allowed navigation (no authentication required)');
      next();
    }
  });

  

export default router;