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
        { path: "/feed", component: () => import("../views/Feed.vue"),
        meta:{
            requiresAuth:true
        }},
        //go to converter or translator
        {path: "/translator", component: () => import("../views/Translator.vue")},
        {path: "/converter", component: () => import("../views/Converter.vue")},
        {path: "/tools" , component: () => import("../views/Toolpage.vue")},

        //gotobillbuddy.vue
        {path: "/billbuddy", component: () => import("../views/BillBuddy.vue")},
        {path: "/itinerary", component: () => import("../views/itinerary.vue"),meta: {requiresAuth: true}},
        {path: "/profile", component: () => import("../views/Profile.vue")},
        {path: "/add-trip", component: () => import("../views/addtrip.vue")},
        {path: "/tools", component: () => import ("../views/Toolpage.vue")},
        {path:"/billbuddytest", component: () => import ("../views/billbuddydraft2.vue")},
        {path:"/faq", component: () => import ("../views/FAQ.vue")},
        {path:"/contactus", component:()=> import("../views/contactus.vue")},
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

router.beforeEach(async(to, from, next) =>{
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        }
        else {
            alert ("You don't have access!");
            next('/');
        }
    }
    else{
        next();
    }});


export default router;