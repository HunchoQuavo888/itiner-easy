<template>
  <div name="before-selecting-trip" v-if="!selected">
    <div>
      <Header></Header>
    </div>
    <!-- title -->
    <div class="mt-7 mb-4 ml-7">
      <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">{{ user.displayName }}'s</a> current trips <router-link
          to="/add-trip">
          <button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add a new trip</button>
        </router-link></h1>
    </div>
    <!-- trips carousell cards -->
    <section class="flex ml-2 flex-nowrap gap-5 px-5 overflow-x-auto snap-x snap-mandatory pb-7 no-scrollbar">
      <tripcard v-for="trip in trips" :city=trip @deletetrip="deleteTrip(trip)" @gototrip="goToTrip(trip)">
      </tripcard>
    </section>


    <div class="ml-7 mb-4">
      <h1 class="text-2xl md:text-3xl"><a class="italic text-indigo-500">{{ user.displayName }}</a> shared trips</h1>
    </div>

    <section class="flex ml-2 flex-nowrap gap-5 px-5 overflow-x-auto snap-x snap-mandatory pb-7 no-scrollbar">
      <div class="bg-white p-5 snap-always snap-center text-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl m-2">Tokyo</h2>
        <h3 class="text-base">John, Robert, Carrie</h3>
      </div>
      <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl">Taiwan</h2>
      </div>
      <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl">Malaysia</h2>
      </div>
      <div class="bg-white p-5 snap-always snap-center rounded flex-none shadow-lg">
        <img class="w-56 md:w-64"
          src="https://cdn.kimkim.com/files/a/images/11a9690afde1a50f9439e22aa8d564237970fb93/original-8ad1591102e554cd50d9e7cea18d990d.jpg">
        <h2 class="text-xl">Singapore</h2>
      </div>
    </section>

    <div class="mb-4">
      <h1 class="text-2xl ml-7 md:text-3xl">Toolkit</h1>
      <h4 class="ml-7 italic">Travelling has never been easier.</h4>
      <div class="mt-2 ml-7 mr-7 ">
        <!-- tools -->
        <div class="flex flex-wrap">
          <div class="w-full">
            <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
              <li class="-mb-px w-1/4 mr-2 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                  v-on:click="toggleTabs(1)"
                  v-bind:class="{ 'text-blue-900 bg-white': openTab !== 1, 'text-white bg-blue-900': openTab === 1 }">
                  Translator
                </a>
              </li>
              <li class="-mb-px mr-2 w-1/4 last:mr-0 flex-auto text-center">
                <a class="text-xs font-bold cursor-pointer uppercase px-5 py-3 shadow-lg rounded block leading-normal"
                  v-on:click="toggleTabs(2)"
                  v-bind:class="{ 'text-blue-900 bg-white': openTab !== 2, 'text-white bg-blue-900': openTab === 2 }">
                  Currency converter
                </a>
              </li>
            </ul>
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div class="px-4 py-5 flex-auto">
                <div class="tab-content tab-space">
                  <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                    <Translator></Translator>
                  </div>
                  <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                    <Currency></Currency>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div name="after-selecting-trip" v-if="selected">
    <div>
      <button class="btn btn-primary" @click="backToTrips">Back to Feed</button>
      <button class="btn btn-primary" @click="toggleExpenseAndItinerary">Expense/Itinerary</button>
    </div>

    <div name="showExpenses" v-if="showExpense">
      <div class="text-3xl m-7 font-bold">
        <h2>{{ selectedTrip }} expenses</h2>
      </div>

      <h3>Expense Table</h3>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>Expense Amount</th>
            <th>People who Owe</th>
            <th>How much is owed</th>
            <th>Who paid</th>
            <th>Delete Expense</th>
            <th>Update Expense</th>
          </tr>
        </thead>


        <tbody>
          <tr v-for="(expense, index) in expenses" :key="index">
            <td>{{ expense.expenseName }}</td>
            <td>{{ expense.expenseAmount }}</td>
            <td>
            <td v-for="name in expense.peopleOwingNames">{{ name }} &nbsp;</td>
            </td>
            <td>{{ expense.peopleOwingAmount }}</td>
            <td>{{ expense.personOwedName }}</td>
            <td><button @click="deleteExpense(index, docId)">Delete Expense</button></td>
            <td><button @click="updateExpense(index, docId)">Update Expense</button></td>
          </tr>
        </tbody>
      </table>
      <h3>whoOwesWho Table</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount Owed</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="key in Object.keys(whoOwesWho)">
            <td>{{ key }}</td>
            <td>{{ whoOwesWho[key] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="form-group">
        <button class="btn btn-primary" @click="breakeven">Breakeven</button>
      </div>
      <div id="amountToPay"></div>

      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- expensecards -->
        <div class="rightcol">
          <div class="expensecards">
            <expensecards v-for="(expense, index) in expenses" :itemDesc="expense.expenseName"
              :currency="expense.currency" :price="expense.expenseAmount" :TransfereeName="expense.personOwedName"
              @button-clicked="deleteExpense(index, docId)">
            </expensecards>


            <!-- Open the modal using ID.showModal() method -->
            <button class="btn mt-4 ml-3 btn-primary" onclick="my_modal_1.showModal()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              Add an expense
            </button>
            <dialog id="my_modal_1" class="modal">
              <div class="modal-box">
                <h2 class="font-bold text-xl">Let's add an expense!</h2>
                <hr>

                <!-- insert form here -->
                <div class="expense-add">
                  <div class="form-group">
                    <p>Expense Name:</p>
                    <input type="text" placeholder="Expense Name" v-model="expense.expenseName" class="form-control"
                      required>
                  </div>
                  <div class="form-group">
                    <p>Expense Amount:</p>
                    <input type="number" placeholder="Expense Amount" v-model="expense.expenseAmount" class="form-control"
                      required>
                  </div>
                  <div class="form-group">
                    <p>Person Owed:</p>
                    <select v-model="expense.personOwedName" class="form-control" required>
                      <option v-for="(name, index) in personNames" :key="name" :value="name">
                        {{ name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <p>Who Owes Money:</p>
                    <label v-for="(name, index) in personNames">
                      <input type="checkbox" :name="name" :value="{ name: name, index: index }"
                        v-model="expense.peopleOwingNames">{{ name }}<br>
                    </label>
                  </div>
                  <div>
                    <p>Which Currency Are We Using?</p>
                    <input name="currency" type="radio" id="tripCurrency" v-model="expense.currency"
                      :value="tripCurrency">
                    <label for="tripCurrency">{{ tripCurrency }}</label><br>
                    <input name="currency" type="radio" id="homeCurrency" v-model="expense.currency"
                      :value="homeCurrency">
                    <label for="homeCurrency">{{ homeCurrency }}</label><br>
                  </div>

                  <div class="form-group">
                    How are we splitting this?
                    <select id="splitmethod" v-model="splitmethod">
                      <option value="evenly">Split Evenly</option>
                      <option value="percentage">Split by percentage</option>
                      <option value="shares">Split by Shares</option>
                      <option value="custom">Custom Split</option>
                    </select>
                  </div>
                  <div v-if="splitmethod == 'percentage'">
                    <h3>Split By Percentage</h3>
                    <div class="form-group">
                      <h4 v-for="(name, index) in expense.peopleOwingNames ">
                        {{ name.name }} <input type="number" placeholder="Percentage" v-model="percentages[index]"
                          class="form-control" @keyup.enter="computeexpense">
                      </h4>
                      <ul>
                        <li v-for="(amt, index) in quicksettleamount" :key="index">
                          {{ this.expense.peopleOwingNames[index] }} pays {{ amt }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="splitmethod == 'shares'">
                    <h3>Split By Shares</h3>
                    <div class="form-group">
                      <h4 v-for="(name, index) in expense.peopleOwingNames ">
                        {{ name.name }} <input type="number" placeholder="Shares" v-model="shares[index]"
                          class="form-control" @keyup.enter="computeexpense">
                      </h4>
                      <ul>
                        <li v-for="(amt, index) in quicksettleamount" :key="index">
                          {{ this.expense.peopleOwingNames[index] }} pays {{ amt }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="splitmethod == 'custom'">
                    <h3>Have it your way!</h3>
                    <div class="form-group">
                      <h4 v-for="(name, index) in expense.peopleOwingNames ">
                        {{ name.name }} <input type="number" placeholder="custom" v-model="custom[index]"
                          class="form-control" @keyup.enter="computeexpense">
                      </h4>
                      <ul>
                        <li v-for="(amt, index) in quicksettleamount" :key="index">
                          {{ expense.peopleOwingNames[index] }} pays {{ amt }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="splitmethod == 'evenly'">
                    <h3>Split Evenly</h3>
                    <div class="form-group">
                      <h4 v-for="name in list ">
                        {{ name }} pays {{ expense.expenseAmount / list.length }}
                      </h4>
                    </div>
                  </div>
                </div>

                <div class="modal-action">
                  <div class="form-group">
                    <button class="btn btn-primary" @click="addExpense">Add Expense</button>
                  </div>
                  <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div name="showItinerary" class="m-10" v-if="showItinerary" @load="initMap(this.citycoords)">
    <!-- getmap -->
    <!-- create table each day -->
    <div v-for="(day, index) in activitiesandtime" :key="index">
      <details class="collapse collapse-arrow bg-blue-300 shadow-md min-w-fit">
        <!-- <div class="flex pb-5 sticky top-0 z-10"> -->
        <!-- <div class="w-96 border p-3 rounded-md bg-blue-300"> -->
        <summary class="collapse-title text-xl font-medium ">
          <h1 class="mb-1">Day {{ index + 1 }}</h1>
          <h3 class="text-gray-500 mb-2">🗓️ {{ day.date }}</h3>

          <!-- Weather reminder -->
          <div class="rounded-lg bg-blue-200 p-3 shadow-sm min-w-fit">
            <div>
              <div class="text-md">
                <p class="font-bold">Weather forecast: </p>
                <span class="">{{ day.weather }}</span>
                <span class="" v-if="day.weather.includes('Sunny', 'sunny')"> ☀️</span>
                <span v-if="day.weather.includes('hazy')"> 💨</span>
                <span v-if="day.weather.includes('rain')"> 🌧️</span>
              </div>
              <div class="alert bg-inherit border-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span class="text-sm" v-if="day.weather.includes('Sunny', 'sunny')">Apply sunscreen!!</span>
                <span class="text-sm" v-if="day.weather.includes('hazy')">Wear a mask!!</span>
                <span class="text-sm" v-if="day.weather.includes('rain')">Pack an umbrella!! ☂️</span>
              </div>
            </div>
          </div>
          <!-- </div> -->

        </summary>

        <div class="collapse-content max-h-screen overflow-auto bg-blue-100 snap-both snap-mandatory">
          <div class="flex overflow-auto">
            <div>
              <div v-for="activity in day.activities" :key="activity.name">
                <!-- display activities -->
                <div v-if="activity.formatted_address !== 'Travel'" class="pr-5 snap-start snap-always">
                  <div class="mx-auto card flex min-w-full max-w-md overflow-auto shadow-lg bg-indigo-200 justify-center">
                    <img class="w-52 h-32 self-center rounded-md" :src="activity.photo" alt="image of attraction">

                    <div class="px-2 py-2 border-l-4 my-4 border-gray-400">
                      <h3 class="text-gray-700 text-left">{{ activity.name }}</h3>
                      <div>
                        <p class="text-gray-700 text-base text-left">
                          {{ activity.time }} - {{ activity.endtime }}
                        </p>
                        <p class="text-gray-500 text-base text-left">
                          {{ activity.formatted_address }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <textarea class="mb-2 rounded border-none" placeholder="Add notes here" type="text"
                        v-model="activity.remarks" />
                      <!-- <span class="text-black text-sm">Cost: </span><input class="placeholder-gray-400 rounded border-none" placeholder="Add an expense here" type="number" v-model="activity.expense"><br> -->
                    </div>
                    <div class="flex flex-col px-6 pt-4 pb-2 items-center">
                      <button class="btn mb-2 w-2/3" href="#" @click="showLocation(activity)">Show on Map</button>
                      <button class="btn w-2/3" href="#" @click="geteateriesnearby(activity)">Where to eat?</button>
                    </div>
                  </div>
                </div>
                <!-- loop through activities: end-->

                <!-- loop through travel: start-->
                <div v-else class="pr-5">
                  <div class="ml-8 max-w-sm max-h-xs rounded overflow-hidden border-l-4 border-dashed border-gray-700">
                    <!-- <img class="w-full h-20" src="../components/logo/itiner-easy.svg" alt="travel"> -->
                    <div class="px-6 py-4">
                      <div class="font-bold text-sm mb-2">{{ activity.name }}</div>
                      <p class="text-gray-700 text-base">
                        {{ activity.time }} - {{ activity.endtime }}
                      </p>
                    </div>
                    <button class="btn w-max self-center ml-5 mb-5" href="#"
                      @click="displaydirectionsonmap(day.activities[day.activities.indexOf(activity) - 1].geometry.location, day.activities[day.activities.indexOf(activity) + 1].geometry.location)">The
                      way there!</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- collapse div -->
        </div>
      </details>
      <br>
    </div>
    <div id="map" class="w-full h-96"></div>

    <br>

    <div v-if="eateries.length > 0" class="overflow-auto overflow-x-hidden h-96 m-10 rounded-lg">
      <h1 class="text-gray-700 text-center underline">Places to eat</h1>
      <table class="bg-blue-300 table table-pin-rows rounded-lg max-w-fit">
        <thead>
          <tr class="bg-blue-400 rounded">
            <th class="text-xl text-gray-600">Name</th>
            <th class="text-xl text-gray-600">Address</th>
            <th class="text-xl text-gray-600">Photo</th>
            <th class="text-xl text-gray-600">Price Level</th>
            <th class="text-xl text-gray-600">Rating</th>
            <th class="text-xl text-gray-600">Map Details</th>
            <th class="text-xl text-gray-600">How to get there!</th>
            <th class="text-xl text-gray-600">Remarks</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="eatery in eateries" :key="eatery.name">
            <td>
              <label>
                <h3>{{ eatery.name }}</h3>
              </label>
            </td>
            <td>
              <h4>{{ eatery.vicinity }}</h4>
            </td>
            <td>
              <img :src="eatery.photo" class="w-32 h-1/2 rounded hover:scale-1.25">
            </td>
            <td>
              {{ eatery.price_level }}
            </td>
            <td>
              {{ eatery.rating }}
            </td>
            <td>
              <a href="#" @click="showLocation(eatery, eatery)">Show on Map</a>
            </td>
            <td>
              <a href="#" @click="displaydirectionsonmap(eatery.origin, eatery.geometry.location)">Show Route</a>
            </td>
            <td v-if="eatery.formatted_address !== 'Travel'">
              Remarks: <input type="text" v-model="eatery.remarks"><br>
              Expenses: <input type="number" v-model="eatery.expense"><br>
            </td>
            <!-- <td>
            I want to eat here<input name = "eateries{{ index }}" type="radio" :value="eatery" @click="addeaterytotrip(eatery,)" v-model="selectedEateries">
          </td> -->

          </tr>
        </tbody>
      </table>



    </div>

  </div>
</template>


<script setup>
import Header from "../components/header.vue"
import Translator from "../components/Tools/translator.vue"
import Currency from "../components/Tools/currencyconverter.vue"
import tripcard from "../components/tripcard.vue"
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot, getDoc, where
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import expensecards from "../components/expensecards.vue"
import { initMap } from "../main.js"
import splittercards from "../components/splittercards.vue"

</script>



<script>
export default {
  name: "lightBlue-tabs",
  data() {
    return {
      user:{},
      openTab: 1,
      expense: {
        expenseName: null,
        expenseAmount: null,
        personOwedName: null,
        peopleOwingNames: [],
        peopleOwingAmount: null,
        currency: null,
      },
      expenses: [],
      docId: [],
      displayName: null,
      whoOwesWho: {},
      // This is for the list of people who owe money
      inputValue: [],
      list: [],
      splitmethod: null,
      trips: [],
      trip: null,
      quicksettleamount: [],
      percentages: [],
      shares: [],
      citycoords: [],
      eateries: [],
      custom: [],
      selected: false,
      db: null,
      auth: null,
      tripsRef: null,
      uid: null,
      username: null,
      currencyList: [],
      tripCurrency: null,
      homeCurrency: null,
      personNames: [],
      activitiesandtime: [],
      showExpense: false,
      showItinerary: true,
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrtlMuj3mZnI5NGVkgw5ME1hZL-XEtRzI&libraries=places&callback=initMap';
    script.defer = true;
    script.async = true;
    console.log('Component mounted.')
    this.db = getFirestore();
    this.auth = getAuth();

    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        console.log('User object:', user);
        console.log('User is signed in', user.uid + " " + user.email)
        this.uid = user.uid;
        this.username = user.displayName;
        console.log(this.uid);
        this.tripsRef = collection(this.db, 'users', this.uid, 'trips');
        const usersCollection = collection(this.db, "users"); // Adjust the Firestore collection name as per your data structure
        const userQuery = query(usersCollection, where("uid", "==", this.uid));

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
        console.log('User is signed out')
      }
    });
  },
  computed: {
    selectedTrip() {
      return this.trip;
    }
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber
    },
    async getLatLng() {
      console.log(this.trip);
      var city = this.trip;
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
            initMap(this.citycoords);
            resolve(results); // Resolve the promise with the search results
          } else {
            console.error(`Error: ${status}`);
            reject(status); // Reject the promise with the error status
          }
        })
      });
    },

    async timeToMinutes(timeString) {
      // Split the time string into hours and minutes
      const [hours, minutes] = timeString.split(':').map(Number);
      //change 09:00 to 900
      this.starttimeint = hours * 100 + minutes;
      console.log(this.starttimeint);
    },
    async displaydirectionsonmap(origin, destination) {
      event.preventDefault();
      console.log(origin);
      console.log(destination);
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
      else {
        this.twelvehrtime = `0${hours % 12}:${minutes}`
      }
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
        fields: ['name', 'formatted_address', 'types', 'business_status', 'geometry', 'opening_hours', 'website', 'place_id'],
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

    async geteateriesnearby(activity) {
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
      })
    },
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
    async getphoto(placeid) {
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
            else {
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

    async showLocation(place, eatery) {
      event.preventDefault();
      if (this.eateries.length > 0 && eatery == null) {
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
        content: `<div><img style="width: auto; height: 150px;" src=` + place.photo + `></div>` + `<div style="color:black"><strong>` +
          "Name:" + place.name + "<br>" + "Address:" + place.formatted_address
          + "<br><a target=`_blank` href=" + place.url + "></strong>Click here for more information</a>"
          + `</div>`,
      });
      // infowindow is blank
      marker.addListener("click", () => {
        infowindow.open({ anchor: marker, map });
      });




    },


    async loadingpage() {

    },


    async checkempty() {
      console.log(this.town);

      if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
          ("Please fill in all the fields!");
      }
      else {
        await this.checkCityExists(this.town);
        if (this.cityexists == true) {
          this.isLoading = true;
          await this.getweather();
          await this.getactivitieslist();
          this.isLoading = false;
        }
        else {
          window.alert("Please enter a valid city!");
        }

      }
    },
    async addeaterytotrip() {
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


    async checkempty2() {
      if (!this.town || !this.sliderValue || !this.outgoing || !this.transport) {
        window.alert
          ("Please fill in all the fields!");
      }
      else {
        await this.checkCityExists(this.town);
        if (this.cityexists == true) {
          this.isLoading = true;
          this.strongIndependentWoman = true;
          await this.getweather();
          await this.getlist2();
          this.isLoading = false;
        }
        else {
          window.alert("Please enter a valid city!");
        }
      }

    },


    async saveItinerary() {
      console.log(this.town);
      console.log(this.activitiesandtime);
      // console.log(this.activitiesandtime[0]);
      // console.log(this.activitiesandtime[0].activities);
      // console.log(this.activitiesandtime[0].activities[0]);
      // console.log(this.activitiesandtime[0].activities[0].name);
      var activitiesandtime = this.activitiesandtime;
      var json = JSON.stringify(activitiesandtime);
      console.log(json);

      const docSnap = await getDoc(doc(this.tripsRef, this.town));
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        updateDoc(doc(this.tripsRef, this.town), { activitiesandtime: json });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setDoc(doc(this.tripsRef, this.town), { activitiesandtime: json, whoOwesWho: {} });
      }
    },

    goToTrip(trip) {
      console.log(trip);
      this.trip = trip;
      this.selected = true;

      getDocs(collection(this.tripsRef, this.trip, 'expenses')).then((querySnapshot) => {
        if (this.expenses.length > 0) {
          this.expenses = [];
        }
        if (this.docId.length > 0) {
          this.docId = [];
        }
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.docId.push(doc.id);
          this.expenses.push(doc.data());
        });
      });

      // Gets whoOwesWho, personNames and currencies used from database
      getDoc(doc(this.tripsRef, this.trip)).then(doc => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          this.whoOwesWho = doc.data().whoOwesWho;
          this.tripCurrency = doc.data().tripCurrency;
          this.homeCurrency = doc.data().homeCurrency;
          this.personNames = doc.data().personNames.sort();
          this.activitiesandtime = doc.data().activitiesandtime;
          this.transport = doc.data().transport;
          this.activitiesandtime = JSON.parse(this.activitiesandtime);
          console.log(this.activitiesandtime);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      const querySnapshot1 = getDocs(doc(this.tripsRef, this.trip));
      querySnapshot1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        this.whoOwesWho = doc.data();
        console.log(this.whoOwesWho)
      });
    },

    backToTrips() {
      // this.selected = false;
      window.location.reload();
    },

    toggleExpenseAndItinerary() {
      this.showExpense = !this.showExpense;
      this.showItinerary = !this.showItinerary;
      if(this.showItinerary == true){
        this.getLatLng();
      }
    },

    // This function retrieves user input and adds it to the database. (Both in expenses and whoOwesWho)
    async addExpense() {
      if (this.expense.currency === null || this.expense.expenseName === null || this.expense.expenseAmount === null || this.expense.personOwedName === null || this.inputValue === '') {
        console.log(this.expense.currency);
        console.log(this.expense.expenseName);
        console.log(this.expense.expenseAmount);
        console.log(this.expense.personOwedName);
        console.log(this.inputValue);

        alert("Please fill in all fields")

      } else {

        // Assigns the value of list to the peopleOwingNames object
        if (this.quicksettleamount.length > 0) {

        }
        else {
          var amountowed = Number((this.expense.expenseAmount / this.expense.peopleOwingNames.length).toFixed(2));
          for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
            this.quicksettleamount.push(amountowed);
          }
          console.log(this.quicksettleamount);

        }
        // this.expense.peopleOwingAmount = peopleOwingAmount;
      }
      this.expense.peopleOwingNames = this.list;
      console.log(this.expense.peopleOwingNames);
      // Assigns the amount owed to peopleOwingAmount object


      // Adds the expense to the database
      addDoc(collection(this.tripsRef, this.trip, 'expenses'), this.expense)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      // Adding the expense to the whoOwesWho collection
      // 1. Check if the personOwedName is already in the whoOwesWho collection
      if (this.expense.personOwedName in this.whoOwesWho) {
        console.log("Person already in whoOwesWho")
        // 2. If it is, add the expenseAmount to the existing amount
        this.whoOwesWho[this.expense.personOwedName] -= this.expense.expenseAmount;
      } else {
        console.log("Person not in whoOwesWho")
        // 3. If it isn't, add the personOwedName and peopleOwingAmount to the whoOwesWho collection
        this.whoOwesWho[this.expense.personOwedName] = Number(-this.expense.expenseAmount);
      }
      // 1. Check if the peopleOwingNames is already in the whoOwesWho collection
      for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
        console.log(this.expense.peopleOwingNames[i]);
        if (this.expense.peopleOwingNames[i] in this.whoOwesWho) {
          console.log("Person already in whoOwesWho")
          // 2. If it is, add the peopleOwingAmount to the existing amount
          this.whoOwesWho[this.expense.peopleOwingNames[i]] += this.expense.peopleOwingAmount;
        } else {
          console.log("Person not in whoOwesWho")
          // 3. If it isn't, add the personOwedName and peopleOwingAmount to the whoOwesWho collection
          this.whoOwesWho[this.expense.peopleOwingNames[i]] = this.expense.peopleOwingAmount;
        }
      }
      // Update the whoOwesWho collection in firebase
      updateDoc(doc(this.tripsRef, this.trip), {
        whoOwesWho: this.whoOwesWho
      })
        .then(() => {
          console.log("whoOwesWho successfully updated!");
          console.log(this.whoOwesWho)
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });

      // Reset the values of the expense object
      // this.expense.expenseName = null;
      // this.expense.expenseAmount = null;
      // this.expense.peopleOwingNames = null;
      // this.expense.personOwedName = null;
      // this.expense.currency = null;
      // this.expense.peopleOwingAmount = null;
    }

    ,
    // Supporting function for addExpense()
    sortthelist() {
      this.expense.peopleOwingNames = this.expense.peopleOwingNames.sort();
    },
    // Supporting function for addExpense()
    removeFromList(index) {
      this.list.splice(index, 1);
    },
    computeexpense() {
      this.quicksettleamount = [];
      let amount = this.expense.expenseAmount;
      if (this.custom.length > 0) {
        let sum = 0
        for (let i = 0; i < this.custom.length; i++) {
          sum += this.custom[i];
        }
        if (sum != this.expense.expenseAmount) {
          alert("Please make sure the percentages add up to the amount owed!")
        }
        else {
          for (let i = 0; i < this.custom.length; i++) {
            this.quicksettleamount.push(this.custom[i]);
          }
        }
      }
      else if (this.shares.length > 0) {
        let totalshares = 0;
        for (let i = 0; i < this.shares.length; i++) {
          totalshares += this.shares[i];
        }
        for (let i = 0; i < this.shares.length; i++) {
          this.quicksettleamount.push(this.shares[i] * amount / totalshares);
        }
      }
      else if (this.percentages.length > 0) {
        let totalpercentage = 0;
        for (let i = 0; i < this.percentages.length; i++) {
          totalpercentage += this.percentages[i];
        }
        if (totalpercentage != 100) {
          alert("Please make sure the percentages add up to 100!")
        }
        else {
          for (let i = 0; i < this.percentages.length; i++) {
            this.quicksettleamount.push(this.percentages[i] * amount / 100);
          }
        }
      }
      else {
        for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
          this.quicksettleamount.push(amount / this.peopleOwingNames.length);
        }
      }

    },


    // Function to breakeven expenses
    breakeven() {
      console.log(this.whoOwesWho)
      for (let key in this.whoOwesWho) {
        if (this.whoOwesWho[key] > 0) {
          console.log(key + " owes " + this.whoOwesWho[key]);
        } else if (this.whoOwesWho[key] < -0.011) {
          console.log(key + " is owed " + -this.whoOwesWho[key]);
        } else {
          console.log(key + " is breakeven");
        }
        console.log(key)
        while (this.whoOwesWho[key] > 0) {
          for (let key2 in this.whoOwesWho) {
            if (this.whoOwesWho[key2] < 0) {
              if (this.whoOwesWho[key] > -this.whoOwesWho[key2]) {
                console.log(key + " pays " + -this.whoOwesWho[key2] + " to " + key2);
                document.getElementById("amountToPay").innerHTML += key + " pays " + -this.whoOwesWho[key2] + " to " + key2 + "<br>";
                this.whoOwesWho[key] += this.whoOwesWho[key2];
                this.whoOwesWho[key2] = 0;
              } else if (this.whoOwesWho[key] != 0) {
                console.log(key + " pays " + this.whoOwesWho[key] + " to " + key2);
                document.getElementById("amountToPay").innerHTML += key + " pays " + this.whoOwesWho[key] + " to " + key2 + "<br>";
                this.whoOwesWho[key2] += this.whoOwesWho[key];
                this.whoOwesWho[key] = 0;
              }
            }
          }
        }
      }
    },

    // Delete expense from database
    async deleteExpense(index, docId) {
      console.log(docId)
      console.log(index)
      deleteDoc(doc(this.tripsRef, this.trip, 'expenses', docId[index]))
        .then(() => {
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    // Update expense in database
    async updateExpense(index, docId) {
      updateDoc(collection(this.tripsRef, this.trip, 'expenses'), docId[index]), {
        expenseName: "Updated Expense Name",
        expenseAmount: 100,
        peopleOwingNames: ["Updated Name 1", "Updated Name 2"],
        peopleOwingAmount: 50,
        personOwedName: "Updated Person Owed Name"
      }
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },

    // Delete trip from database
    async deleteTrip(trip) {
      deleteDoc(doc(this.tripsRef, trip))
        .then(() => {
          console.log("Document successfully deleted!");
          window.location.reload();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    // Function to convert currency while adding expense
    async convertCurrency() {
      var url = 'https://currency-converter5.p.rapidapi.com/currency/convert';
      var XRapidAPIKey = '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
      var XRapidAPIHost = 'currency-converter5.p.rapidapi.com';
      var amount = document.getElementById("moneymoneyahhhhh").value;
      var from = document.getElementById("currencylist").value;
      var to = document.getElementById("currencylisttoconvert").value;
      console.log(from);
      console.log(to);
      axios.get(url, {
        headers: {
          'x-rapidapi-key': XRapidAPIKey,
          'x-rapidapi-host': XRapidAPIHost
        },
        params: {
          amount: amount,
          from: from,
          to: to
        }
      })
        .then(function (response) {
          console.log(response.data);
          var convertedmoney = response.data.rates[to].rate_for_amount;
          var convertedmoneydiv = document.getElementById("convertedmoney");
          var html = "<h7>" + convertedmoney + "</h7>";
          convertedmoneydiv.innerHTML = html;
        })
    },

    // Function to validate expense is not empty
    checkempty3() {
      if (this.expense.currency === null || this.expense.expenseName === null || this.expense.expenseAmount === null || this.expense.personOwedName === null || this.inputValue === '') {
        console.log(this.expense.currency);
        console.log(this.expense.expenseName);
        console.log(this.expense.expenseAmount);
        console.log(this.expense.personOwedName);
        console.log(this.inputValue);

        alert("Please fill in all fields")
      } else {
        this.addExpense();
      }
    },

    // Function to get list of currencies to calculate expense
    async getCurrencyList() {
      try {
        const response = await axios.get('https://currency-converter5.p.rapidapi.com/currency/list', {
          headers: {
            'x-rapidapi-key': '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0',
            'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
          },
        });
        console.log(response.data);
        for (var key in response.data.currencies) {
          var value = response.data.currencies[key];
          this.currencyList.push({ key, value });
        }
        //sort currency list by alphabet
        this.currencyList.sort(function (a, b) {
          if (a.value < b.value) { return -1; }
          if (a.value > b.value) { return 1; }
          return 0;
        })

      } catch (error) {
        console.log(error);
      }
    },
    sortthelist() {
      this.expense.peopleOwingNames = this.expense.peopleOwingNames.sort();
    }
  },


  // Function to compute different ways of splitting expense

  // Function to get list of trips and whoOwesWho from database
  async created() {
    // Getting list of trips from database

    setTimeout(() => {
      getDocs(this.tripsRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.trips.push(doc.id);
        });
      });
    }, 800);

    // Getting whoOwesWho from database
    const querySnapshot1 = await getDocs(doc(this.tripsRef, this.trip, 'whoOwesWho'));
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.whoOwesWho = doc.data();
      console.log(this.whoOwesWho)
    });
  },

  // Function to show updated list of expenses on trip page
  async updated() {
    setTimeout(() => {
      onSnapshot(collection(this.tripsRef, this.trip, 'expenses'), (querySnapshot) => {
        if (this.expenses.length > 0) {
          this.expenses = [];
        }
        querySnapshot.docs.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.docId.push(doc.id);
          this.expenses.push(doc.data());
        });
      });
    }, 1000);
  }
  ,
  // itinerary functions



  components: {
    expensecards, splittercards
  },
  watch: {
    selected(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.getLatLng();
        });
      }
    },
  },
}
</script>