<template>
  <title>BillBuddy</title>

  <div>

    <div v-if="!selected">
      <div class="text-3xl m-7 font-bold">
        <h2>Current trips</h2>
      </div>

      <div v-if="tripExists">
        <table>
          <thead>
            <tr>
              <th>Trip Name</th>
              <th>People</th>
              <th>Go to Trip</th>
              <th>Delete Trip</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="trip in trips">
              <td>{{ trip }}</td>
              <td>{{ whoOwesWho }}</td>
              <td><button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                  @click="goToTrip(trip)">Go to Trip</button></td>
              <td><button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                  @click="deleteTrip(trip)">Delete Trip</button></td>
            </tr>
          </tbody>

        </table>
      </div>
      <div v-if="!tripExists" class="text-xl m-7 italic">
        <a>You currently have no trips.</a>
      </div>
      <router-link to="/add-trip">
        <button class="btn btn-neutral ml-7 p-2 text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg">Add a new trip</button>
      </router-link>
    </div>

    <!-- based on the current trip selected, add an expense -->

    <!-- <div class="text-xl lm-7 drop-shadow-md">
      <div class="relative z-0">
        <input type="text" id="floating_standard"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label for="floating_standard"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Floating
          standard</label>
      </div>
    </div> -->

    <div v-if="selected">
      <div>
        <button class="btn btn-primary" @click="backToTrips">Back to trips</button>
      </div>
      <div class="text-3xl m-7 font-bold">
        <h2>{{ selectedTrip }} expenses</h2>
      </div>

      <!-- <div class="expense-add">
        <div class="form-group">
          <p>Expense Name:</p>
          <input type="text" placeholder="Expense Name" v-model="expense.expenseName" class="form-control" required>
        </div>
        <div class="form-group">
          <p>Expense Amount:</p>
          <input type="number" placeholder="Expense Amount" v-model="expense.expenseAmount" class="form-control" required>
        </div>
        <div class="form-group">
          <p>Person Owed:</p>
          <select v-model="expense.personOwedName" class="form-control" required>
            <option v-for="(name,index) in personNames" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <p>Who Owes Money:</p>
          <label v-for="(name,index) in personNames">
            <input type="checkbox" :name="name" :value="{name:name,index:index}" v-model="expense.peopleOwingNames">{{ name }}<br>
          </label>
        </div>
        <div>
          <p>Which Currency Are We Using?</p>
          <input name="currency" type="radio" id="tripCurrency" v-model="expense.currency" :value="tripCurrency">
          <label for="tripCurrency">{{ tripCurrency }}</label><br>
          <input name="currency" type="radio" id="homeCurrency" v-model="expense.currency" :value="homeCurrency">
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
              {{ name.name }} <input type="number" placeholder="Percentage" v-model="percentages[index]" class="form-control"
                @keyup.enter="computeexpense">
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
              {{ name.name }} <input type="number" placeholder="Shares" v-model="shares[index]" class="form-control"
                @keyup.enter="computeexpense">
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
              {{ name }} pays {{ expense.expenseAmount / list.length }}
            </h4>
          </div>
        </div>


        <ul>
          <li v-for="(item, index) in list" :key="index">

            <button class="btn btn-primary" @click="removeFromList(index)">Remove</button> {{ item }}
          </li>
        </ul>
        <div class="form-group">
          <button class="btn btn-primary" @click="checkempty">Add Expense</button>
        </div> -->

      <!-- The button to open modal -->

      <button class="btn" onclick="my_modal_3.showModal()">open modal</button>
      <dialog id="my_modal_3" class="modal" ref="expenseModal">
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
            <div>
              <p>Which Currency Are We Using?</p>
              <input name="currency" type="radio" id="tripCurrency" v-model="expense.currency" :value="tripCurrency">
              <label for="tripCurrency">{{ tripCurrency }}</label><br>
              <input name="currency" type="radio" id="homeCurrency" v-model="expense.currency" :value="homeCurrency">
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
                  {{ name.name }} <input type="number" placeholder="Shares" v-model="shares[index]" class="form-control"
                    @keyup.enter="computeexpense">
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
                  {{ name }} pays {{ expense.expenseAmount / list.length }}
                </h4>
              </div>
            </div>


            <ul>
              <li v-for="(item, index) in list" :key="index">

                <button class="btn btn-primary" @click="removeFromList(index)">Remove</button> {{ item }}
              </li>
            </ul>
            <div class="form-group">
              <button class="btn btn-primary" @click="checkempty(); closemodal()">Add Expense</button>
            </div>
          </div>
        </div>
      </dialog>

    </div>
  </div>



  <h3>Expense Table</h3>
  <table class="table table-striped table-bordered table-hover table-sm">
    <thead>
      <tr>
        <th>Expense Name</th>
        <th>Expense Amount in {{ tripCurrency }}</th>
        <th>Expense Amount in {{ homeCurrency }}</th>
        <th>People Owing Names</th>
        <th>People Owing Amount</th>
        <th>Person Owed Name</th>
        <th>Delete Expense</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(expense, index) in expenses" :key="index">
        <td>{{ expense.expenseName }}</td>
        <td>{{ expense.expenseAmounttrip }}</td>
        <td>{{ expense.expenseAmounthome }}</td>
        <td>
          <p v-for="name in expense.peopleOwingNames">{{ name.name }} &nbsp;</p>
        </td>
        <td>{{ expense.peopleOwingAmount }}</td>
        <td>{{ expense.personOwedName }}</td>
        <td><button @click="deleteExpense(index, docId)">Delete Expense</button></td>
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
</template>

<script>
// Importing the functions we need from firebase
import {
  getFirestore, collection, getDocs,
  addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot, getDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import navbar from "../components/navbar.vue";

// Exporting the data to firebase
export default {
  data() {
    return {
      // Objects of data we want to add to firebase
      expense: {
        expenseName: null,
        expenseAmount: null,
        expenseAmounttrip: null,
        expenseAmounthome: null,
        peopleOwingNames: [],
        personOwedName: null,
        peopleOwingAmount: null,
        currency: null,
      },
      expenses: [],
      docId: [],
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
      custom: [],
      selected: false,
      db: null,
      auth: null,
      tripsRef: null,
      uid: null,
      currencyList: [],
      tripCurrency: null,
      homeCurrency: null,
      personNames: [],
    }
  },
  mounted() {
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
  computed: {
    selectedTrip() {
      return this.trip;
    }
  },

  // Methods for adding data to firebase
  methods: {
    closemodal() {
      this.$refs.expenseModal.close();
    },
    tripExists() {
      if (
        getDocs(this.tripsRef).then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log('No matching documents.');
            return false;
          } else {
            // console.log('Document data:', querySnapshot.docs);
            return true;
          };
        })
      ) {
        return true;
      } else {
        return false;
      }
    },
    async convertCurrency(expense) {
      var url = 'https://currency-converter5.p.rapidapi.com/currency/convert';
      var XRapidAPIKey = '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
      var XRapidAPIHost = 'currency-converter5.p.rapidapi.com';
      var amount = expense.expenseAmounttrip;
      var from = this.tripCurrency;
      var to = this.homeCurrency;
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
          this.expense.expenseAmounthome = convertedmoney;

        })
    },

    backToTrips() {
      // this.selected = false;
      window.location.reload();
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
          this.personNames = doc.data().personNames;
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

    // This function retrieves user input and adds it to the database. (Both in expenses and whoOwesWho)
    async addExpense() {
      this.computeexpense();
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
      await this.convertCurrency(this.expense);
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

    async deleteTrip(trip) {
      deleteDoc(doc(this.tripsRef, trip))
        .then(() => {
          console.log("Document successfully deleted!");
          window.location.reload();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    async convertCurrency() {
      var url = 'https://currency-converter5.p.rapidapi.com/currency/convert';
      var XRapidAPIKey = '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
      var XRapidAPIHost = 'currency-converter5.p.rapidapi.com';
      for (let i = 0; i < this.expenses.length; i++) {
        var amount = this.expenses[i].expenseAmount;
        var from = this.tripCurrency;
        var to = this.homeCurrency;
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
            this.expenses[i].expenseAmounthome = convertedmoney;
          })
      }
    },

    checkempty() {
      if (this.expense.expenseName == null || this.expense.expenseAmount == null || this.expense.personOwedName == null || this.peopleOwingNames == []) {
        console.log(this.expense.currency);
        console.log(this.expense.expenseName);
        console.log(this.expense.expenseAmount);
        console.log(this.expense.personOwedName);

        alert("Please fill in all fields")
      } else {
        this.addExpense();
      }
    },

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
        }
        else {


          for (let i = 0; i < this.personNames.length; i++) {
            this.quicksettleamount.push(0);
          }
          for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
            let amountowed = amount * this.percentages[i] / 100;
            this.quicksettleamount[this.expense.peopleOwingNames[i].index] = amountowed;
          }
          console.log(this.quicksettleamount);

        }

      }

      else if (this.splitmethod == "shares") {
        let totalshares = 0;
        for (let i = 0; i < this.shares.length; i++) {
          totalshares += this.shares[i];
        }
        for (let i = 0; i < this.personNames.length; i++) {
          this.quicksettleamount.push(0);
        }
        for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
          let amountowed = amount * this.shares[i] / totalshares;
          this.quicksettleamount[this.expense.peopleOwingNames[i].index] = amountowed;
        }
        console.log(this.quicksettleamount);

      }



      else if (this.splitmethod == "custom") {
        let totalcustom = 0;
        for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
          totalcustom += this.custom[i];
        }
        if (totalcustom != 100) {
          alert("Please make sure the custom amounts add up to 100");
        }
        else {
          for (let i = 0; i < this.personNames.length; i++) {
            this.quicksettleamount.push(0);
          }
          for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
            let amountowed = this.custom[i];
            this.quicksettleamount[this.expense.peopleOwingNames[i].index] = amountowed;
          }
        }
        console.log(this.quicksettleamount);
      }
      else {
        for (let i = 0; i < this.personNames.length; i++) {
          this.quicksettleamount.push(0);
        }
        for (let i = 0; i < this.expense.peopleOwingNames.length; i++) {
          let amountowed = amount / this.expense.peopleOwingNames.length;
          this.quicksettleamount[this.expense.peopleOwingNames[i].index] = amountowed;
        }
        console.log(this.quicksettleamount);
      }
    }
  },

  async updated() {
    setTimeout(() => {
      onSnapshot(collection(this.tripsRef, this.trip, 'expenses'), (querySnapshot) => {
        if (this.expenses.length > 0) {
          this.docId = [];
          this.expenses = [];
        }
        querySnapshot.docs.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.docId.push(doc.id);
          this.expenses.push(doc.data());
        });
      });
    }, 1000)
  },

  async created() {
    // Displays the trips that the user has
    setTimeout(() => {
      getDocs(this.tripsRef).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.trips.push(doc.id);
        });
      });
    }, 800);

    const querySnapshot1 = await getDocs(doc(this.tripsRef, this.trip, 'whoOwesWho'));
    querySnapshot1.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.whoOwesWho = doc.data();
      console.log(this.whoOwesWho)
    });
  },
}

</script>