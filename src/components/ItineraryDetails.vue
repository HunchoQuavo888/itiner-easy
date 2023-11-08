<template>
  <div>
    <button class="btn btn-primary" @click="toggleExpenseAndItinerary">Expense/Itinerary</button>
    <div name="showItinerary" class="m-10 grid grid-cols-1 lg:grid-cols-3" v-if="showItinerary"
      @load="initMap(this.citycoords)">
      <div class="m-10">
        <div v-for="(day, index) in activitiesandtime" :key="index" class="w-1/2 lg:w-fit">
          <details class="collapse collapse-arrow bg-blue-300 shadow-md min-w-fit">
            <DayCard :day="day" :index="index" />

            <div class="pt-5 collapse-content max-h-screen overflow-auto bg-blue-100">
              <div class="flex overflow-auto">
                <div>
                  <div v-for="activity in day.activities" :key="activity.name">
                    <ActivityCard v-if="activity.formatted_address !== 'Travel'" :activity="activity"
                      :showLocation="showLocation" :geteateriesnearby="geteateriesnearby"
                      :calculateDuration="calculateDuration"></ActivityCard>

                    <TravelCard v-else :activity="activity" :displaydirectionsonmap="displaydirectionsonmap" :day="day"
                      :getMinutesDifference="getMinutesDifference"></TravelCard>
                  </div>
                </div>
              </div>
            </div>
          </details>
          <br>
        </div>
      </div>
      <div id="map" class="md:col-span-2 rounded-lg ml-7 mr-10 h-screen min-w-max" ref="map">
      </div>
    </div>
    <div name="showItinerary" id="eateryCarousell" v-if="showItinerary">
      <h1 v-if="eateries.length > 0" class="text-gray-700 text-center">Places to eat</h1>
      <div v-if="eateries.length > 0" class="flex justify-center">
        <div class="carousel carousel-center w-1/2 p-4 space-x-4 bg-gray-200 rounded-box m-5">
          <div class="carousel-item" v-for="eatery in eateries" :key="eatery.name">
            <foodcard :link="eatery.photo" :restaurantname="eatery.name" :restaurantaddress="eatery.vicinity"
              :rating=eatery.rating :pricelevel=eatery.price_level :eatery="eatery" :eateryOrigin="eatery.origin"
              :eateryDestination="eatery.geometry.location" :showLocation="showLocation"
              :displaydirectionsonmap="displaydirectionsonmap" :transport="transport"></foodcard>
          </div>
        </div>
      </div>
    </div>
    <div name="showExpenses" v-if="showExpense">
      <div class="text-3xl m-7 font-bold">
        <h2>{{ selectedTrip }} expenses</h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- expensecards -->
        <div class="rightcol">
          <div class="expensecards">
            <expensecards v-for="(expense, index) in expenses" :itemDesc="expense.expenseName"
              :currency="expense.currency" :price="expense.expenseAmount" :TransfereeName="expense.personOwedName"
              :ExpenseType="expense.expenseCategory" @button-clicked="deleteExpense(index, docId); breakeven2()">
            </expensecards>
          </div>
        </div>
        <div class="leftcol">
          <div v-for="(expense, index) in whoOwesWho2Display" :key=index>
            <splittercards :Name1="index" :Name2="expense[1]" :amount="expense[0]">
            </splittercards>
          </div>
        </div>
      </div>

      <!-- Open the modal using ID.showModal() method -->
      <button class="btn btn-primary m-7" onclick="my_modal_3.showModal()">Add an expense</button>
      <dialog id="my_modal_3" class="modal backdrop-blur-sm" ref="expenseModal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div class="expense-add">
            <div class="form-group">
              <p>Expense Name:</p>
              <input type="text" placeholder="Expense Name" v-model="expense.expenseName" class="form-control" required>
            </div>
            <div class="form-group">
              <p>Expense Category:</p>
              <select v-model="expense.expenseCategory" class="form-control" required>
                <option v-for="category in expenseCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
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
                  v-model="expense.peopleOwingNames">{{
                    name }}<br>
              </label>
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
                  <li v-for="obj in quicksettleamount" :key="index">
                    {{ obj.name }} pays {{ obj.amount }}
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="splitmethod == 'shares'">
              <h3>Split By Shares</h3>
              <div class="form-group">
                <h4 v-for="(name, index) in expense.peopleOwingNames ">
                  {{ name.name }} <input type="number" placeholder="Shares" v-model="shares[index]" class="form-control"
                    @keyup.enter="computeexpense">
                </h4>
                <ul>
                  <li v-for="(amt, index) in quicksettleamount" :key="index">
                    {{ q }} pays {{ amt }}
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="splitmethod == 'custom'">
              <h3>Have it your way!</h3>
              <div class="form-group">
                <h4 v-for="(name, index) in expense.peopleOwingNames ">
                  {{ name.name }} <input type="number" placeholder="custom" v-model="custom[index]" class="form-control"
                    @keyup.enter="computeexpense">
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
                  {{ name.name }} pays {{ expense.expenseAmount / list.length }}
                </h4>
              </div>
            </div>
            <ul>
              <li v-for="(item, index) in list" :key="index">
                <button class="btn btn-primary" @click="removeFromList(index)">Remove</button> {{ item }}
              </li>
            </ul>
            <div class="form-group">
              <button class="btn btn-primary" @click="checkempty3(); closemodal()">Add Expense</button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script>
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot, getDoc, where
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import foodcard from '../components/foodcards.vue'
import DayCard from '../components/Itinerary/DayCard.vue';
import TravelCard from '../components/Itinerary/TravelCard.vue';
import ActivityCard from '../components/Itinerary/ActivityCard.vue';
import { initMap } from "../main.js";
import splittercards from "../components/splittercards.vue"
import expensecards from "../components/expensecards.vue"




export default {
  data() {
    return {
      itineraryData: null,
      user: {},
      openTab: 1,
      expense: {
        expenseName: null,
        expenseCategory: null,
        expenseAmount: null,
        personOwedName: null,
        peopleOwingNames: [],
        peopleOwingAmount: [],
        currency: null,
      },
      expenseCategories: ['Accomodation', 'Activities', 'Attractions', 'Flight', 'Food and Drinks', 'Transportation', 'Groceries', 'Miscellaneous'],
      expenses: [],
      docId: [],
      displayName: null,
      day: null,
      whoOwesWho: {},
      whoOwesWho2: {},
      whoOwesWho2Display: {},
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
      isEatery: true,
      uid: null,
      username: null,
      currencyList: [],
      tempcoords: null,
      tripCurrency: null,
      homeCurrency: null,
      personNames: [],
      activitiesandtime: [],
      transport: null,
      showExpense: false,
      showItinerary: true,

    };
  },
  components: {
    DayCard,
    ActivityCard,
    TravelCard,
    foodcard,
    expensecards,
    splittercards
  },
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCrtlMuj3mZnI5NGVkgw5ME1hZL-XEtRzI&libraries=places&callback=initMap';
    script.defer = true;
    script.async = true;
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
  async created() {
    // Access the tripID from the route parameters
    const tripID = this.$route.params.tripID;

    // Fetch the itinerary data associated with tripID (you'll need to implement this logic)
    // Replace the following with actual data retrieval code
    await this.fetchItineraryData(tripID);

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

  },
  computed: {
    selectedTrip() {
      return this.trip;
    }
  },
  methods: {
    checkempty3() {
      if (this.expense.expenseName === null || this.expense.expenseAmount === null || this.expense.personOwedName === null || this.inputValue === '') {
        console.log(this.expense.currency);
        console.log(this.expense.expenseName);
        console.log(this.expense.expenseAmount);
        console.log(this.expense.personOwedName);
        console.log(this.inputValue);

        alert("Please fill in all fields")
      } else {
        this.addExpense();
        this.breakeven2();
      }
    },

    closemodal() {
      this.$refs.expenseModal.close();
    },

    removeFromList(index) {
      this.list.splice(index, 1);
    },

    computeexpense() {
      console.log(this.homeCurrency);
      console.log(this.tripCurrency);
      console.log(this.expense.currency);
      console.log(this.expense.peopleOwingNames);
      this.quicksettleamount = [];
      let amount = this.expense.expenseAmount;
      if (this.splitmethod == "percentage") {
        let totalpercentage = 0;
        for (let i = 0; i < this.percentages.length; i++) {
          totalpercentage += this.percentages[i];
        }
        if (totalpercentage != 100) {
          alert("Please make sure the percentages add up to 100");
        } else {
          for (let i = 0; i < this.personNames.length; i++) {
            let tempobj = { name: this.personNames[i], amount: 0, index: i };
            this.quicksettleamount.push(tempobj);
          }
          for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
            let amountowed = amount * this.percentages[i] / 100;
            this.quicksettleamount[this.expense.peopleOwingNames[i].index].amount = amountowed;
          }
          console.log(this.quicksettleamount);
        }
      } else if (this.splitmethod == "shares") {
        let totalshares = 0;
        for (let i = 0; i < this.shares.length; i++) {
          totalshares += this.shares[i];
        }
        for (let i = 0; i < this.personNames.length; i++) {
          let tempobj = { name: this.personNames[i], amount: 0, index: i };
          this.quicksettleamount.push(tempobj);
        }
        for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
          let amountowed = amount * this.shares[i] / totalshares;
          this.quicksettleamount[this.expense.peopleOwingNames[i].index].amount = amountowed;
        }
        console.log(this.quicksettleamount);
      } else if (this.splitmethod == "custom") {
        let totalcustom = 0;
        for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
          totalcustom += this.custom[i];
        }
        if (totalcustom != 100) {
          alert("Please make sure the custom amounts add up to 100");
        } else {
          for (let i = 0; i < this.personNames.length; i++) {
            let tempobj = { name: this.personNames[i], amount: 0, index: i };
            this.quicksettleamount.push(tempobj);
          }
          for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
            let amountowed = this.custom[i];
            this.quicksettleamount[this.expense.peopleOwingNames[i].index].amount = amountowed;
          }
        }
        console.log(this.quicksettleamount);
      } else {
        for (let i = 0; i < this.personNames.length; i++) {
          let tempobj = { name: this.personNames[i], amount: 0, index: i };
          this.quicksettleamount.push(tempobj);
        }
        for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
          let amountowed = amount / this.expense.peopleOwingNames.length;
          this.quicksettleamount[this.expense.peopleOwingNames[i].index].amount = amountowed;
        }
        console.log(this.quicksettleamount);
      }
    },

    async addExpense() {
      this.computeexpense();
      // await this.convertCurrency(this.expense);
      if (this.splitmethod == "evenly") {
        this.expense.peopleOwingAmount = this.quicksettleamount;
      }
      else if (this.splitmethod == "percentage") {
        this.expense.peopleOwingAmount = this.quicksettleamount;
      }
      else if (this.splitmethod == "shares") {
        this.expense.peopleOwingAmount = this.quicksettleamount;
      }
      else if (this.splitmethod == "custom") {
        this.expense.peopleOwingAmount = this.quicksettleamount;

      }

      // Adds the expense to the database
      addDoc(collection(this.tripsRef, this.trip, 'expenses'), this.expense)
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

      // Adding the expense to the whoOwesWho collection
      for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
        this.whoOwesWho[this.expense.peopleOwingNames[i].name] += this.expense.peopleOwingAmount[i]
      }
      this.whoOwesWho[this.expense.personOwedName] -= this.expense.expenseAmount
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
      // this.expense.peopleOwingAmount = null;
    },

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

    async breakeven2() {
      await getDoc(doc(this.tripsRef, this.trip)).then(doc => {
        if (doc.exists()) {
          console.log("Document data:", doc.data());
          this.whoOwesWho2 = doc.data().whoOwesWho;
          console.log(this.whoOwesWho2)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });

      for (let person in this.whoOwesWho2) {
        this.whoOwesWho2[person] = 0;
      }
      console.log(this.whoOwesWho2)
      console.log(this.expenses)
      for (let expense of this.expenses) {
        this.whoOwesWho2[expense.personOwedName] -= expense.expenseAmount;
        for (let person of expense.peopleOwingAmount) {
          this.whoOwesWho2[person.name] += person.amount;
        }
      }
      console.log(this.whoOwesWho2)
      this.whoOwesWho2Display = {};
      for (let key in this.whoOwesWho2) {
        if (this.whoOwesWho2[key] > 0) {
          console.log(key + " owes " + this.whoOwesWho2[key]);
        } else if (this.whoOwesWho2[key] < -0.011) {
          console.log(key + " is owed " + -this.whoOwesWho2[key]);
        } else {
          console.log(key + " is breakeven");
        }
        console.log(key)

        while (this.whoOwesWho2[key] > 0) {
          for (let key2 in this.whoOwesWho) {
            if (this.whoOwesWho2[key2] < 0) {
              if (this.whoOwesWho2[key] > -this.whoOwesWho2[key2]) {
                console.log(key + " pays " + -this.whoOwesWho2[key2] + " to " + key2);
                this.whoOwesWho2Display[key] = [-this.whoOwesWho2[key2], key2];
                // document.getElementById("amountToPay").innerHTML += key + " pays " + -this.whoOwesWho2[key2] + " to " + key2 + "<br>";
                this.whoOwesWho2[key] += this.whoOwesWho2[key2];
                this.whoOwesWho2[key2] = 0;
                console.log(this.whoOwesWho2Display)
              } else if (this.whoOwesWho2[key] != 0) {
                console.log(key + " pays " + this.whoOwesWho2[key] + " to " + key2);
                this.whoOwesWho2Display[key] = [this.whoOwesWho2[key], key2];
                // document.getElementById("amountToPay").innerHTML += key + " pays " + this.whoOwesWho2[key] + " to " + key2 + "<br>";
                this.whoOwesWho2[key2] += this.whoOwesWho2[key];
                this.whoOwesWho2[key] = 0;
                console.log(this.whoOwesWho2Display)
              }
            }
          }
        }
      }
      console.log(this.whoOwesWho2Display)
    },

    toggleExpenseAndItinerary() {
      this.showExpense = !this.showExpense;
      this.showItinerary = !this.showItinerary;
      if (this.showItinerary == true) {
        location.reload();
      }
      setTimeout(() => {
        this.breakeven2();
      }, 500);
    },

    async fetchItineraryData(tripID) {
      const db = getFirestore();

      // Get the current user's ID
      const auth = getAuth();
      const userID = auth.currentUser ? auth.currentUser.uid : null;
      // console.log(tripID)

      // Create a query against the collection.
      const q = query(collection(db, "users", userID, "trips"), where("tripID", "==", tripID));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        this.itineraryData = doc.data();
        console.log(this.itineraryData);
        this.whoOwesWho = this.itineraryData.whoOwesWho;
        console.log(this.whoOwesWho);
        this.whoOwesWho2 = this.itineraryData.whoOwesWho2;
        console.log(this.expenses);
        // Retrieve the trip name from the document data
        this.trip = doc.id; // Document ID represents the trip name
        console.log(this.trip);
        this.activitiesandtime = JSON.parse(this.itineraryData.activitiesandtime);
        this.tripCurrency = this.itineraryData.currency;
        this.homeCurrency = this.itineraryData.homeCurrency;
        this.personNames = this.itineraryData.personNames;
        this.transport = this.itineraryData.transport;

        console.log(this.trip);
        let city = this.trip;
        console.log(city);
        this.citycoords = {};
        var request = {
          query: `${city}`,
          fields: ['name', 'geometry'],
        };
        console.log(request);
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
      // this.$refs.map.$el.scrollIntoView(); 
      this.$nextTick(() => {
        const mapElement = document.getElementById('map');
        const topOffset = mapElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
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
          let map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: this.tempcoords
          });
          for (let i = 0; i < this.eateries.length; i++) {
            let e = this.eateries[i];
            console.log(e.origin);
            let eaterymarker = new google.maps.Marker({
              position: e.geometry.location,
              map: map,
              title: e.name,
            });

            eaterymarker.addListener("click", () => {
              let infowindow = new google.maps.InfoWindow({
                content: `<div><img style="width: auto; height: 150px;" src=` + e.photo + `></div>` + `<div style="color:black"><strong>` +
                  "Name:" + e.name + "<br>" + "Address:" + e.formatted_address
                  + "<br><a target=`_blank` href=" + e.url + "></strong>Click here for more information</a>"
                  + `</div>`,
              });
              infowindow.open(map, eaterymarker);
            });
          }
          // this.$refs.map.$el.scrollIntoView();
          this.$nextTick(() => {
            const eateryelement = document.getElementById('eateryCarousell');
            const topOffset = eateryelement.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: topOffset, behavior: 'smooth' });
          });

        }
      })
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

    async displaydirectionsonmap(origin, destination) {
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
      this.$nextTick(() => {
        const mapElement = document.getElementById('map');
        const topOffset = mapElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      });
    },

    getMinutesDifference(startTime, endTime) {
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      const diff = end - start;
      const minutes = diff / 1000 / 60;
      if (minutes > 60) {
        return Math.round(minutes / 60) + " hour(s) " + minutes % 60 + " minutes";
      }
      return minutes + " minutes";
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
    },
  },
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
  },
};
</script>