<template>
  <div>
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
  <div id="map" class="md:col-span-2 rounded-lg ml-7 mr-10" ref="map">
  </div>
  </div>


</template>

<script>
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import foodcard from '../components/foodcards.vue'
import DayCard from '../components/Itinerary/DayCard.vue';
import TravelCard from '../components/Itinerary/TravelCard.vue';
import ActivityCard from '../components/Itinerary/ActivityCard.vue';
import { initMap } from "../main.js"



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
      expenseCategories: ['Accomodation', 'Activities', 'Attractions', 'Flight',  'Food and Drinks','Transportation', 'Groceries', 'Miscellaneous'],
      expenses: [],
      docId: [],
      displayName: null,
      day: null,
      whoOwesWho: {},
      whoOwesWho2: {},
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
    foodcard
  },
  created() {
    // Access the tripID from the route parameters
    const tripID = this.$route.params.tripID;

    // Fetch the itinerary data associated with tripID (you'll need to implement this logic)
    // Replace the following with actual data retrieval code
    this.fetchItineraryData(tripID);
  },
  methods: {
  async fetchItineraryData(tripID) {
    const db = getFirestore();
  
    // Get the current user's ID
    const auth = getAuth();
    const userID = auth.currentUser ? auth.currentUser.uid : null;
    console.log(tripID)

    // Create a query against the collection.
    const q = query(collection(db, "users", userID, "trips"), where("tripID", "==", tripID));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.itineraryData = doc.data();
      console.log(this.itineraryData.activitiesandtime);
      this.activitiesandtime = JSON.parse(this.itineraryData.activitiesandtime);
      console.log(this.activitiesandtime);
      this.tripCurrency = this.itineraryData.currency;
      this.homeCurrency = this.itineraryData.homeCurrency;
      this.personNames = this.itineraryData.personNames;
      this.transport = this.itineraryData.transport;
      this.citycoords = this.itineraryData.citycoords;


      
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
          // this.$refs.map.$el.scrollIntoView(); 
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
          center: this.tempcoords});
          for(let i = 0; i < this.eateries.length; i++){
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

      }})},

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
  },


}
};
</script>