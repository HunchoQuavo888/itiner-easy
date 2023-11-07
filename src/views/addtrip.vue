<template>
    <div class="m-5">
        <router-link to="/feed" v-if="!submitted">
            <button class="btn btn-primary">Back to Feed</button>
        </router-link>
        <h1>Add Trip</h1>
        <form @submit.prevent="submitForm">
            <label for="destination">Destination:</label>
            <input type="text" id="destination" v-model="destination" required>

            <div class='col-6'>
                <h3>No of People:</h3>
                <select name="numPeople" id="numPeople" class="form-control" @change="updateNumNames($event.target.value)">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div>
                <h3>Names:</h3>
                <input style="margin-bottom: 10px;" type="text" placeholder="Person 1" id="person1" class="form-control">
                <span id="personNames" v-html="htmlStr"></span>
            </div>

            Which Currency do you use normally!
            <select class="w-9/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="currencylist"
                id="currencylist" @change="convertit" v-model="homeCurrency">
                <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                    {{ currency.value }} </option>
            </select>
            <br>
            Which Currency are you going to use!
            <select class="w-9/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="currencylist"
                id="currencylist" @change="convertit" v-model="tripCurrency">
                <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                    {{ currency.value }} </option>
            </select>
            <!-- <br><br> -->
            <!-- <label for="start-date">Start Date:</label>
            <input type="date" id="start-date" v-model="startDate" required>
            <br><br>
            <label for="end-date">End Date:</label>
            <input type="date" id="end-date" v-model="endDate" required>
            <br><br> -->
            <!-- <h2>Expenses:</h2>
            <div v-for="(expense, index) in expenses" :key="index">
                <label>Expense {{ index + 1 }}:</label>
                &nbsp;
                <input type="text" placeholder="Expense Name" v-model="expense.name" required>
                &nbsp;
                <input type="number" placeholder="Amount Spent" v-model="expense.amount" required>
                &nbsp;                
                <button type="button" @click="removeExpense(index)">Remove</button>
            </div>
            <button type="button" @click="addExpense">Add Expense</button> -->
            <br><br>
            <button class="btn btn-primary" type="submit" v-if="!submitted">Submit</button>
            <p v-if="submitted">Trip Added!</p>
            <router-link to="/feed" v-if="submitted">
                <button class="btn btn-primary">Click to Go Back to Feed</button>
            </router-link>
        </form>

    </div>
</template>

<script>
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios'; // Import Axios

export default {
    data() {
        return {
            destination: '',
            // startDate: '',
            // endDate: '',
            // expenses: [{ name: '', amount: '' }]
            db: null,
            auth: null,
            tripsRef: null,
            uid: null,
            currencyList: [],
            submitted: false,
            homeCurrency: null,
            htmlStr: "",
            tripCurrency: null,
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
    methods: {
        updateNumNames(number) {
            let i = 1;
            this.htmlStr = "";
            while (i < number) {
                this.htmlStr += "<input style='margin-bottom: 10px;' type='text' placeholder='Person " + (i + 1) + "' id='person" + (i + 1) + "' class='form-control'>";
                i++;
            }

        },

        addExpense() {
            this.expenses.push({ name: '', amount: '' })
        },
        removeExpense(index) {
            this.expenses.splice(index, 1)
        },
        submitForm() {
            let numPeople = document.getElementById("numPeople").value;
            for (let i = 1; i <= numPeople; i++) {
                this.personNames.push(document.getElementById("person" + i).value);
            }
            this.personNames = this.personNames.sort();
            console.log(this.personNames)
            let whoOwesWho = {};
            for (let i = 0; i < this.personNames.length; i++) {
                whoOwesWho[this.personNames[i]] = 0;
            }
            console.log(whoOwesWho)
            setDoc(doc(this.tripsRef, this.destination), {
                whoOwesWho: whoOwesWho,
                homeCurrency: this.homeCurrency,
                tripCurrency: this.tripCurrency,
                numPeople: numPeople,
                personNames: this.personNames,
            })
            this.submitted = true;
            console.log(this.destination)
            console.log(this.tripsRef)
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
        async getitinerary() {

        }
    },
    created() {
        this.getCurrencyList();
    },

}
</script>