<style>
  #map{
    width: 100%;  
    min-height: 50vh;
  }

  .custom-class {
    background-color: #1ae021;
    color: white;
  }

</style>

<template>

  <div class="text-sm ml-7 breadcrumbs">
    <ul>
      <li><router-link to="/landinglogin"><a class="text-blue-900">Home</a></router-link></li>  
      <li>Plan itinerary</li>
    </ul>
  </div>

  <h1 class="text-3xl text-center text-blue-400 mt-5">Let's plan your next trip!</h1>
  <!-- Form -->
  <div class="flex justify-center"> 
    <FormKit type="form"
          :actions="false"

          >
              <FormKit type="multi-step"
              tab-style="progress"
              :allow-incomplete="false"   
              >
              <!-- Destination: start -->
                  <FormKit type="step" name="Destination" :nextLabel="nextStepDisabled ?  `Next`: 'Please enter a valid city'" nextAttrs:nextStepDisabled>
                  <!-- collect name, email, and company info -->
                      <FormKit
                          v-model="town"
                          type="text" 
                          label="Destination" 
                          validation="required"
                          @blur ="checkCityExists(town)"                        
                          placeholder="e.g. Singapore"
                          help="City Name"
                      />
                      <FormKit 
                          v-model="sliderValue"
                          type="number" 
                          label="Duration (days)" 
                          validation="required"
                          value="1"
                          min="1"
                          max="3" 
                          placeholder="between 1 & 3 days"
                      />
                    <!-- reformat to change day/days based on value -->
                      
                  </FormKit>
              <!-- Destination: end -->
            

              <!-- preferences: start -->
                  <FormKit type="step" name="Preferences">
                  <!-- Get talk title, brief, and track -->
                  <FormKit 
                      type="radio" 
                      label="Outdoors or Indoors?" 
                      help="Which type of setting do you prefer?" 
                      validation="required"
                      v-model="outgoing"
                      :options="[
                          'Outdoors',
                          'Indoors',
                          'I\'m fine with either',
                      ]"
                  />
                  <FormKit 
                      v-model= "interestsoptions"
                      type="checkbox"
                      label="Places of Interest (optional)"
                      help="Any specific places you'd like to visit?" 
                      :options="[
                          'Museums',
                          'Shopping Malls',
                          'Gardens',
                      ]"
                  />
                  
                  <FormKit 
                      v-model="transport"
                      type="radio" 
                      label="Mode of Transportation"
                      help="How will you be getting around?"
                      :options="[{label:'Car', value:`DRIVING`}, {label: 'Public Transport', value: `TRANSIT`}, {label:'Bicycle', value:`BICYCLING`}, {value:'WALKING' , label:'Walking'}]"
                  />
                  <FormKit 
                          v-model="starttime"
                          type="time" 
                          label="What time do you want to start your day?"
                          validation="required"
                          value="09:00"
                          min="08:00"
                          max="12:00"
                      />
                      <!-- <p>Time: {{ starttime }}</p> -->
                      
                  </FormKit>
                  
              <!-- preferences: end -->

              <!-- Generate: start -->
                <FormKit type="step" name="Let's go!">
                  <!-- Ask the user to share how they heard about us -->
                  <div class="text-center">
                    <h1>Great! Now that we've gathered all the information we need...</h1>
                  </div>
                  <br>
                  <br>
                  <h2 class="text-center">Are you ready?</h2>
                  <br>
                  <br>
                  <template #stepNext>    
                    <FormKit type="button"
                    @click="checkempty"
                    label="Generate an Itinerary for me!"
                    />
                  </template>
              <!-- Generate: end -->
              </FormKit>
            </FormKit>   
            </FormKit>
    </div>

    <!-- select places -->
<div id="selectplaces">
  <div v-if="strongIndependentWoman">
    
    <h3> Choose where you want to go!</h3>
    <table>
      <tr>
        <th>Place</th>
        <th>Address</th>
        <th>Select</th>
      </tr>
      <tbody>
            <tr v-for="act in suggested_activities" :key="act.name">
              <td>
                <label>
                  {{ act.name }}
                </label>
              </td>
              <td>
                <!-- add photo -->
                <img :src="act.photo" alt="Activity photo" style="width: 100px; height: 100px;">
              </td>
              <td>
                {{ act.formatted_address }}
              </td>
              <td>
                <input type="checkbox" :value="act" v-model="selectedPlaces">
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</div>

<div v-if="isLoading">
  <!-- Your loading spinner goes here -->
  <div class="grid grid-cols-3">
    <div class="flex justify-center">
      <span class="loading loading-spinner loading-lg object-center"></span>
    </div>
    <h2 class="text-center col-span-2 text-blue-700">I'll be waiting for you in {{town}}! Come at any cost!</h2>
    <div></div>
    <h3 class="text-center col-span-2">- Monkey D. Luffy</h3>
   </div>
            
</div>
<br>
<br>
<!-- itinerary display -->

<div class="grid grid-cols-1 md:grid-cols-3 mr-10">
    <div v-if="final_activities.length>0" class="">
      <div class="flex flex-col justify-center items-center">
        <div v-if="showAlert" class="alert alert-success w-2/3">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Your Itinerary has been saved!</span>
        </div>
        <div v-if="!isLoading">
          <button class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 btn mt-7 mr-2" @click="saveItinerary">Save Itinerary</button>
        </div>
      </div>  
      <!-- start of iti  -->
      <div class="m-10">
        <div v-for="(day, index) in activitiesandtime" :key="index">
          <details class="collapse collapse-arrow bg-blue-300 shadow-md min-w-fit">
            <DayCard :day="day" :index="index"/>
          
            <div class="pt-5 collapse-content max-h-screen overflow-auto bg-blue-100"> 
              <div class="flex overflow-auto">
                <div>
                    <div v-for="activity in day.activities" :key="activity.name" >
                        <ActivityCard 
                          v-if="activity.formatted_address !== 'Travel'"
                          :activity="activity"
                          :showLocation="showLocation"
                          :geteateriesnearby="geteateriesnearby"
                          :calculateDuration="calculateDuration"
                        ></ActivityCard>
                        
                        <TravelCard 
                          v-else 
                          :activity="activity"
                          :displaydirectionsonmap="displaydirectionsonmap"
                          :day="day"
                          :getMinutesDifference="getMinutesDifference"
                        ></TravelCard>
                    </div>
                  </div>
                </div>
            </div>
        </details>
        <br>
      </div>
    </div>    
  </div>
  <div id="map" class="md:col-span-2 rounded-lg ml-7 mr-10">
    <GmapMarker
      v-for="(marker, index) in markers"
      :key="index"
      :position="{ lat: marker.lat, lng: marker.lng }"
    />
  </div>
</div>

<br>
<br>

<h1 v-if="eateries.length>0" class="text-gray-700 text-center">Places to eat</h1>
  <div v-if="eateries.length>0" class="flex justify-center">
    <div class="carousel carousel-center w-1/2 p-4 space-x-4 bg-gray-200 rounded-box m-5">
          <div class="carousel-item" v-for="eatery in eateries" :key="eatery.name">
            <foodcard  
            :link="eatery.photo"
            :restaurantname="eatery.name"
            :restaurantaddress="eatery.vicinity"
            :rating = eatery.rating
            :pricelevel=eatery.price_level
            :eatery="eatery"
            :eateryOrigin="eatery.origin"
            :eateryDestination="eatery.geometry.location"
            :showLocation="showLocation"
            :displaydirectionsonmap="displaydirectionsonmap"
            :transport="transport"
            ></foodcard>
          </div> 
        </div>
    </div>
   
<div>

</div>

<div v-if="customactivitiesandtime">

</div>

</template>



<script >
import { FwbDropdown } from 'flowbite-vue'
import { FwbButton } from 'flowbite-vue'

import axios from 'axios'; // Import Axios
import { initMap } from "../main.js"
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, getDoc
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { v4 as uuidv4 } from 'uuid';

import foodcard from '../components/foodcards.vue'
import DayCard from '../components/Itinerary/DayCard.vue';
import TravelCard from '../components/Itinerary/TravelCard.vue';
import ActivityCard from '../components/Itinerary/ActivityCard.vue';


// const auth = getAuth();
// const db = getFirestore();
// const tripsRef = collection(db, 'trips');

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log('User is signed in', user.uid + " " + user.email)
//     const uid = user.uid;
//   } else {
//     console.log('User is signed out')
//   }
// });

export default {
  components: {
    FwbDropdown,
    FwbButton,
    foodcard,
    DayCard,
    TravelCard,
    ActivityCard,
  },
  mounted(){
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrtlMuj3mZnI5NGVkgw5ME1hZL-XEtRzI&libraries=places&callback=initMap';
    script.defer = true;
    script.async = true;
    //add main.js
    document.head.appendChild(script);
    window.history.scrollRestoration = "manual";

    console.log('Component mounted.')
    this.db = getFirestore();
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('User is signed in', user.uid + " " + user.email)
        this.uid = user.uid;
        console.log(this.uid);
        this.tripsRef = collection(this.db, 'users', this.uid, 'trips');
      } else {
        console.log('User is signed out')
      }
    });
  },
  data() {
    return {
      db: null,
      auth: null,
      tripsRef: null,
      uid: null,
      sliderValue: 1,
      selectedOption: null, // Initially no option is selected
      town: "",
      outgoing: "",
      transport: "",
      strongIndependentWoman: false,
      places: [], // To store search results
      selectedPlaces: [], // To store selected places
      interestsresults: [],
      generatenow: false,
      map: null,
      isLoading: false,
      days: 0,
      final_activities : [],
      eateries: [],
      activitiesandtime: [],
      photoUrl: "",
      markers: [],
      weatherData: [],
      suggested_activities: [],
      isOpenNow: false,
      twelvehrtime: "",
      dates: [],
      uid: null,
      cityexists: false,
      starttimeint: 900,
      citycoords: {},
      interestsoptions:[],
      customactivitiesandtime: [],
      possiblephotos: [],
      starttime:"09:00",
      openingTime: "",
      closeTime: "",
      nextStepDisabled: true,
      showAlert: false,
    };
  },
    methods: {
        sliderChange(event) {
        this.sliderValue = event.target.value;
        },
        setDefaultImage(event) {
          event.target.src = '../assets/expenses/food.png';
        },
        calculateDuration(startTime, endTime) {
          const start = this.timeToHours(startTime);
          const end = this.timeToHours(endTime);
          const duration = end - start;
          return Math.round(duration);
        },
        timeToHours(time) {
          const [hours, minutes] = time.split(':').map(Number);
          return hours + minutes / 60;
        },
        save() {
          this.showAlert = true;
        },
        getMinutesDifference(startTime, endTime) {
          const start = new Date(`1970-01-01T${startTime}Z`);
          const end = new Date(`1970-01-01T${endTime}Z`);
          const diff = end - start;
          const minutes = diff / 1000 / 60;
          if (minutes > 60){
            return Math.round(minutes/60) + " hour(s) " + minutes % 60 + " minutes";
          }
          return minutes + " minutes";
        },




        
//weather api

async getweather() {
    return new Promise(async (resolve, reject) => {
        var city = this.town;
        var days = this.sliderValue;
        this.dates = [];

        try {
            var weatherkey ="cfb27632a44746f6aaf01356231409";
            const response = await axios.get(
                'http://api.weatherapi.com/v1/forecast.json?key=' + weatherkey + '&q=' + city + '&days=' + days
            );
            console.log(response.data);
            var weather = response.data.forecast.forecastday;
            var weatherarray = [];
  

            for (var i = 0; i < weather.length; i++) {
                var weatherobj = {};
                weatherarray.push(weather[i].day.condition.text);
                this.weatherData = weatherarray;
                this.dates.push(weather[i].date);
            }
            console.log(this.dates);

            resolve(weatherarray);
        } catch (error) {
            reject(error);
        }
    });
},
//getplaces
async searchBothAttractions(city) {
    var city = this.town;
    var request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };



    var service = new google.maps.places.PlacesService(document.createElement('div'));


    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.places = this.places.concat(results);
        console.log(this.places);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},
  async getlist2(city) {
    var city = this.town;

    this.suggested_activities = [];
    var request = {
        query: `Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id', 'photo'],
    };
    
    this.getinterests(city);

    var service = new google.maps.places.PlacesService(document.createElement('div'));


    service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (const place of results) {

            console.log(place);
        }
        //place results in checkbox
        this.suggested_activities = results;
        //add museums, gardens and malls if checked
        if(this.interestsresults != null){
          this.suggested_activities = this.suggested_activities.concat(this.interestsresults);
        }
        //remove any duplicates in suggest_activities
        this.suggested_activities = [...new Set(this.suggested_activities)];
        console.log(this.suggested_activities);
        console.log(this.strongIndependentWoman);
      }
      
         else {
        console.error(`Error: ${status}`);
        }
    });
    },

  async getactivitieslist(){
    console.log(this.selectedPlaces[0]);
    this.final_activities = [];
    this.places = [];
    if(this.outgoing == "Indoor"){
      await this.searchIndoorAttractions();
    }
    else if(this.outgoing == "Outdoor"){
      await this.searchOutdoorAttractions();
    }
    else{
      await this.searchBothAttractions();
    }
    //get interests from museums, shopping malls and parks if ticked and add to this.places
    await this.getinterests();
    if(this.selectedPlaces.length === 0){
      if(this.interestsresults != null){
        this.final_activities = this.final_activities.concat(this.interestsresults);
        this.final_activities = this.final_activities.concat(this.places);
    }
      else{
        this.final_activities = this.final_activities.concat(this.places);
      }
    }


    else{
        this.final_activities = this.final_activities.concat(this.selectedPlaces);
        if(this.final_activities< 5 * this.days){
            //fill up with other activities from interestsresults or this.places  until 5 activities per day
            while(this.final_activities.length < 5 * this.days){
                var combinedact = this.places.concat(this.interestsresults);
                var randomIndex = Math.floor(Math.random() * combinedact.length);
                var randomactivity = combinedact[randomIndex];
                this.final_activities.push(randomactivity);
            }
        }
    }

    this.final_activities = [...new Set(this.final_activities)];
    console.log(this.final_activities);
    await this.managetime();
    await this.getLatLng();
    initMap(this.citycoords);
    },
    async converttime(time, act){
  // time = 940; //goal is to convert this to 1110

    let addhour = Math.floor(act/60);
    let addmin = act%60;
    let formattime = time + addhour*100 + addmin;
    while(formattime % 100 > 59){
      formattime = formattime + (Math.floor(formattime/100))%60;
    }
    return formattime;
    }
    ,
    initMap(coords) {
  const mapDiv = document.getElementById("map");
  const mapOptions = {
    center: coords,
    zoom: 15,
  };
  const map = new google.maps.Map(mapDiv, mapOptions);
}
    ,


    async getLatLng (){
      var city = this.town;
      this.citycoords = {};
      var request = {
        query: `${city}`,
        fields: ['name', 'geometry'],
      };
      var service = new google.maps.places.PlacesService(document.createElement('div'));
      return new Promise((resolve, reject) => {
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.citycoords = results[0].geometry.location;
          console.log(this.citycoords);
          resolve(results); // Resolve the promise with the search results
        } else {
          console.error(`Error: ${status}`);
          reject(status); // Reject the promise with the error status
        }
      })});
    },

    async timeToMinutes(timeString) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);
      //change 09:00 to 900
      this.starttimeint = hours*100 + minutes;
      console.log(this.starttimeint);
  },

  async managetime() {
  await this.timeToMinutes(this.starttime);
  this.days = this.sliderValue;
  this.activitiesandtime = [];
  for (var i = 0; i < this.days; i++) {
    let timeint = this.starttimeint;
    let maxtimeint = 2100;
    var actorder = 0;
    var day = {};
    day.activities = [];
    day.day = i + 1;
    day.date = this.dates[i];
    day.weather = this.weatherData[i];
    while (timeint < maxtimeint) {
      if (this.final_activities.length === 0) {
        console.log("No more activities to add.");
        break;
      } 
      else {
        //convert timeint to string with pm or am     
        //checkopenstatus if business is open at that time if closed find another place
        var randomIndex = Math.floor(Math.random() * this.final_activities.length);
        var randomactivity = this.final_activities[randomIndex];
        await this.checkOpenStatus(randomactivity, timeint, this.dates[i]);
        console.log(this.isOpenNow);
        while (this.isOpenNow == false) {
          randomIndex = Math.floor(Math.random() * this.final_activities.length);
          randomactivity = this.final_activities[randomIndex];
          await this.checkOpenStatus(randomactivity, timeint, this.dates[i]);
        }
        
        var activitytime = 0;
        // Adjust activity time calculation as needed
        if (randomactivity.types.includes("park") || randomactivity.types.includes("zoo") || randomactivity.types.includes("amusement_park")) {
          activitytime = 120;
        } else {
          activitytime = 180;
        }
        //gettraveltime
        var traveltime = 0;
        if(day.activities.length > 0){
          var lastactivity = day.activities[day.activities.length - 1];
          var lastactivitycoords = lastactivity.geometry.location;
          var randomactivitycoords = randomactivity.geometry.location;
          var request = {
            origin: lastactivitycoords,
            destination: randomactivitycoords,
            travelMode: this.transport,
          };
          console.log(lastactivity);
          var service = new google.maps.DirectionsService();
          //use promise
          await new Promise((resolve, reject) => {
            service.route(request, (result, status) => {
              if (status == 'OK') {
                traveltime = result.routes[0].legs[0].duration.value;
                traveltime = Math.round(traveltime / 60);
                resolve(result);
              }
              else{
                reject(status);
              }
            });
          });
        }
        // Add travel time to 'timeint'
        //if result resolved
        if(traveltime !=0){
        var endtime = await this.converttime(timeint, traveltime);
        if(endtime > 2100){
          endtime = 2200;
        }
        var travelactivity = {
          name: "Travel from " + lastactivity.name + " to " + randomactivity.name,
          time: await this.formatTime(timeint),
          endtime: await this.formatTime(endtime),
          formatted_address: "Travel",
          transport: this.transport,
          order : actorder,
          // geometry: randomactivity.geometry,
        };
        actorder = actorder + 1;
        day.activities.push(travelactivity);
        timeint = endtime;
        }
        // Create the activity object
        var endtime = await this.converttime(timeint, activitytime);
        var photo = "";
        photo = await this.getphoto(randomactivity.place_id);

        var activity = {
          order : actorder,
          day : i,
          name: randomactivity.name,
          time: await this.formatTime(timeint), // Format time as a string
          endtime: await this.formatTime(endtime), // Format endtime as a string
          formatted_address: randomactivity.formatted_address,
          transport: this.transport,
          geometry: randomactivity.geometry,
          photo: photo,
          remarks: "",
          expense: 0,
          rating: 3,
          openTime: this.openingTime,
          closeTime: this.closeTime,
          url: "'https://www.google.com/search?q=" + randomactivity.name + "&rlz=1C1CHBF_enSG941SG941&oq=google&aqs=chrome..69i57j69i59j69i60l3j69i65l2.1001j0j7&sourceid=chrome&ie=UTF-8'",
        }; 
        //store activities in each day
        actorder = actorder + 1;
        day.activities.push(activity);
        // Update 'timeint' for the next activity
        timeint = endtime;
        // Add the activity to 'activitiesandtime' and remove it from 'final_activities'

        this.final_activities.splice(randomIndex, 1);

        console.log("Added activity:", activity);
      }
    }
    this.activitiesandtime.push(day);

  }

  // Debugging: Log the contents of activitiesandtime
  console.log("Final activitiesandtime:", this.activitiesandtime);
}
,
async displaydirectionsonmap(origin, destination){
  event.preventDefault();
  console.log(origin);
  console.log(destination);
  console.log(this.transport);
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: { lat: 41.85, lng: -87.65 }
  });
  directionsRenderer.setMap(map);
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: this.transport,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
},
async formatTime(minutes) {
  const hours = Math.floor(minutes / 100);
  const mins = minutes % 100;
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  return `${formattedHours}:${formattedMins}`;
},


async formattimestrfrom24hourto12hour(input) {
  const strTime = input.toString().padStart(4, '0'); // Pad with leading zeros
  const hours = strTime.substring(0, 2); // Extract hours
  const minutes = strTime.substring(2); // Extract minutes

  // Convert to a format like "09:00 AM" or "09:00 PM"
  //if first string no 0 then add 0
  if (hours.substring(0, 1) != 0) {
    this.twelvehrtime = `${hours}:${minutes}`
  }
  else{
  this.twelvehrtime = `0${hours % 12}:${minutes}`
}},

    

    //   to search for attractions in a city
    async searchIndoorAttractions(city) {
    var city = this.town;
    var request = {
        query: `Shopping malls and mueseums and aquariums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };


    var service = new google.maps.places.PlacesService(document.createElement('div'));
    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.places = this.places.concat(results);
        console.log(this.places);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},

async titlephotogenerator(town) {
  // get photos of town using Google Place Photos API
  let townsearched = town;
  let request = {
    query: townsearched,
    fields: ['photos'],
  };
  let service = new google.maps.places.PlacesService(document.createElement('div'));

  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      let place = results[0];
      let photos = place.photos;
      if (!photos) {
        return;
      }
      let photoUrls = photos.map(photo => photo.getUrl({ maxWidth: 1280, maxHeight: 853 }));
      this.possiblephotos = photoUrls;
    }
  });
},


    async searchOutdoorAttractions(city) {
    var city = document.getElementById("country").value;
    var request = {
        query: `Outdoor Tourist Attractions in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };
    
    var service = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.places = this.places.concat(results);
        console.log(this.places);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},
    async getinterests(){
    var interests = [];
    var checkboxes = this.interestsoptions
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            interests.push(checkboxes[i].value);
        }
    }
    for (var i = 0; i < interests.length; i++) {
        if (interests[i] == "Museums") {
          await  this.SearchMuseums();
        } else if (interests[i] == "Shopping Malls") {
          await this.searchShoppingMalls();
        } else if (interests[i] == "Gardens") {
          await this.searchgardens();
        }
    }
  },
  async SearchMuseums(city) {
    var city = this.town;
    var request = {
        query: `Museums in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // getphoto using place id
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.interestsresults = this.interestsresults.concat(results);
        console.log(this.interestsresults);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},

    async searchShoppingMalls(city) {
      var city = this.town;
      var request = {
        query: `Shopping malls in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
    };

    var service = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.interestsresults = this.interestsresults.concat(results);
        console.log(this.interestsresults);
        console.log(this.suggested_activities);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},



    async  searchgardens(city) {
    var city = this.town;
    var request = {
        query: `Gardens and parks in ${city}`,
        fields: ['name', 'formatted_address','types', 'business_status', 'geometry', 'opening_hours.periods', 'website', 'place_id'],
    };

    var service = new google.maps.places.PlacesService(document.createElement('div'));

    return new Promise((resolve, reject) => {
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          results[i].photo = this.getphoto(results[i].place_id);
        }
        this.interestsresults = this.interestsresults.concat(results);
        console.log(this.interestsresults);
        resolve(results); // Resolve the promise with the search results
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
},
    
    async geteateriesnearby(activity){
    event.preventDefault();
    this.eateries = [];
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: activity.geometry.location,
      });
    var geometry = activity.geometry;
    var request = {
      location: geometry.location,
      radius: '500',
      type: ['restaurant'],
    };
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.markers.push({
          lat: eatery.latitude,
          lng: eatery.longitude,
        });
        var place = results[i];
        console.log(place);
        place.origin = geometry.location;
        place.order = activity.order;
        place.url = "'https://www.google.com/search?q=" + place.name + "&rlz=1C1CHBF_enSG941SG941&oq=google&aqs=chrome..69i57j69i59j69i60l3j69i65l2.1001j0j7&sourceid=chrome&ie=UTF-8'";
        place.formatted_address = place.vicinity;
        this.eateries.push(place);
      }
      this.geteateryphotos();
    }
  })},
  async geteateryphotos() {
  const promises = this.eateries.map(async (eatery) => {
    eatery.remarks = "";
    eatery.expense = 0;
    eatery.rating = 3;
    try {
      eatery.photo = await this.getphoto(eatery.place_id);
    } catch (error) {
      console.error(`Failed to get photo for eatery ${eatery.name}: ${error}`);
      eatery.photo = "";
    }
  });
  await Promise.all(promises);
  console.log(this.eateries);
},
  //get link of photo of place with place id
  async getphoto(placeid){
    var request = {
      placeId: placeid,
      fields: ['photos'],
    };
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    return new Promise((resolve, reject) => {
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (place.photos && place.photos.length > 0) {
          let photoUrl = place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
          resolve(photoUrl);

      resolve(photo); // Resolve the promise with the search results

    } else {
      console.error('No photos found for this place.');
      reject('No photos found'); // Reject the promise with an error message
    }
      } else {
        console.error(`Error: ${status}`);
        reject(status); // Reject the promise with the error status
      }
    });
  });
  }
    ,
    async loadPhoto(placeid) {
    try {
      this.photoUrl = await this.getphoto(placeid);
    } catch (error) {
      console.error(error);
    }
  }
    ,

    async checkOpenStatus(place, checkTime, date) {
  return new Promise((resolve, reject) => {
    var request = {
      placeId: place.place_id,
      fields: ["opening_hours"]
    };
    var service = new google.maps.places.PlacesService(document.createElement('div')); // Assuming 'map' is accessible
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.isOpenNow = false;
        console.log(place);
        var openingHours = place.opening_hours;
        if (openingHours && openingHours.periods != null && openingHours.periods[day] != null) {
          // Convert checkTime to a Date object for the specific date you want to check
          var checkDate = new Date(date);
          var day = checkDate.getDay();
          let openTime = openingHours.periods[day].open.time;
          openTime = parseInt(openTime);
          checkTime = parseInt(checkTime);
          let closeTime = openingHours.periods[day].close.time;
          closeTime = parseInt(closeTime);        
          if (openTime <= checkTime && (closeTime >= checkTime || closeTime <= openTime)) {
            this.isOpenNow = true;
            this.openingTime = openTime;
            this.closeTime = closeTime;
            console.log(this.openingTime);
            //add url into place
          } else {
            this.isOpenNow = false;
          }
        }
        else{
          this.isOpenNow = true;
          place.url = place.url + "&output=embed";
        }
        resolve(); // Resolve the promise with no parameter
      } else {
        reject(status); // Reject the promise with the status parameter
      }
    });
  });
},
async checkCityExists(cityName) {
  return new Promise((resolve, reject) => {
    var geocoder = new google.maps.Geocoder();
    console.log("imrunning");
    geocoder.geocode({ 'address': cityName }, (results, status) => { // Use an arrow function here
      if (status == google.maps.GeocoderStatus.OK) {
        this.cityexists = true;
        resolve(true);
        console.log("city exists");
        return true;
      } else {
        this.cityexists = false;
        resolve(false);
        console.log("city does not exist");
        console.log(this.nextStepDisabled);
        return false;

      }
    });
  });
},

async showLocation(place,eatery){
  event.preventDefault();
  if(this.eateries.length > 0 && eatery == null){
    this.eateries = [];
  }
  var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: place.geometry.location,
      });
      var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
}
      );
      var infowindow = new google.maps.InfoWindow({
        // content: "Name:" + place.name + "<br>" + "Address:" + place.formatted_address,
        content: `<div><img style="width: auto; height: 150px;" src=`+place.photo+`></div>`+`<div style="color:black"><strong>`+
          "Name:" + place.name + "<br>" + "Address:" + place.formatted_address
          + "<br><a target=`_blank` href=" + place.url + "></strong>Click here for more information</a>"
          +`</div>`,
      });
      // infowindow is blank
      marker.addListener("click", () => {
        infowindow.open({anchor: marker, map});
      });
      
      
      

},


async loadingpage(){

},    

    
async checkempty(){
  console.log(this.town);

  if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
("Please fill in all the fields!");
      }
    else{
      await this.checkCityExists(this.town);
      if(this.cityexists == true){
        this.isLoading = true;
        await this.getweather();
        await this.getactivitieslist();
        this.isLoading = false;
      }
      else{
        window.alert("Please enter a valid city!");
      }

    }
    },
  async addeaterytotrip(){
    var radio = document.getElementsByName("eateries");
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            let neworder = radio[i].value.order;
            let neweatery = radio[i].value;
            neweatery.day = radio[i].value.day;
            neweatery.time = formatTime(radio[i].value.time);
            neweatery.endtime = formatTime(radio[i].value.endtime);
            this.activitiesandtime[neweatery.day].activities.splice(neworder, 0, neweatery);
        }

    }
  },

 
async checkempty2(){
    if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
("Please fill in all the fields!");
      }
    else{
      await this.checkCityExists(this.town);
      if(this.cityexists == true){
      this.isLoading = true;
      this.strongIndependentWoman = true;
      await this.getweather();
      await this.getlist2();
      this.isLoading = false;
    }
    else{
      window.alert("Please enter a valid city!");
    }
    }
    
    },


async saveItinerary() {
  this.showAlert = true;
  console.log(this.town);
  console.log(this.activitiesandtime);
  // console.log(this.activitiesandtime[0]);
  // console.log(this.activitiesandtime[0].activities);
  // console.log(this.activitiesandtime[0].activities[0]);
  // console.log(this.activitiesandtime[0].activities[0].name);
  var activitiesandtime = this.activitiesandtime;
  var json = JSON.stringify(activitiesandtime);
  console.log(json);
  var transport = this.transport;
  
  const docSnap = await getDoc(doc(this.tripsRef, this.town));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    updateDoc(doc(this.tripsRef, this.town), {activitiesandtime: json});
    updateDoc(doc(this.tripsRef, this.town), {transport: transport});
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    setDoc(doc(this.tripsRef, this.town), {activitiesandtime: json});
  }
}
    
},
watch: {
  async town(newTown) {
    this.cityExists = await this.checkCityExists(newTown);
    this.nextStepDisabled = this.cityExists; // Disable the "Next" button if the city does not exist
  },
},
  };

</script>