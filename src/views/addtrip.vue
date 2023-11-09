<template>
    <div class="bg-white justify-center p-5 snap-always snap-center text-center rounded-lg flex-none shadow-lg">
        <div class="image justify-center flex">
            <img class="w-56 md:w-64 h-56 md:h-64" src="../components/logo/itiner-easy.png">
        </div>
        
        <h2 class="text-xl m-2">{{city}}</h2>
        <h3 class="text-base">{{peopleontrip}}</h3>
        <div class="justify-center flex">
            <button class="btn" onclick="my_modal_3.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 128 128">
                    <path fill="#fff" d="M64 16A48 48 0 1 0 64 112A48 48 0 1 0 64 16Z"></path><path fill="#6fccdd" d="M64 25A39 39 0 1 0 64 103A39 39 0 1 0 64 25Z"></path><path fill="none" stroke="#444b54" stroke-miterlimit="10" stroke-width="6" d="M64 16A48 48 0 1 0 64 112A48 48 0 1 0 64 16Z"></path><path fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="6" d="M64 42L64 86M42 64L86 64"></path>
                </svg>
                Add a trip!
            </button>
        </div>

    </div>
    
    <dialog id="my_modal_3" class="modal backdrop-blur-sm">
        <div class="modal-box">
            <form method="dialog">
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-transparent text-black hover:rounded-full"
                    @click="makeEmpty()">✕</button>
            </form>
            <div class="m-5">
                <h1 class="mb-3">Add Trip</h1>
                <hr>
                <form @submit.prevent="submitForm">
                    <label for="destination">
                        <h3>Destination:</h3>
                    </label>
                    <input type="text" id="destination" v-model="destination" required>

                    <div class='col-6 mt-4'>
                        <h3>No of People:</h3>
                        <select name="numPeople" id="numPeople" class="form-control"
                            @change="updateNumNames($event.target.value)">
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
                        <h3 class="mt-4">Names:</h3>
                        <input style="margin-bottom: 10px;" type="text" placeholder="Person 1" id="person1"
                            class="form-control">
                        <span id="personNames" v-html="htmlStr"></span>
                    </div>
                    <button class="mt-4 btn btn-primary" type="submit" v-if="!submitted">Submit</button>
                    <p v-if="submitted">Trip Added!</p>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script>
import {
    getFirestore, collection, getDocs, getDoc,
    addDoc, deleteDoc, doc, updateDoc, setDoc, query, onSnapshot
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios'; // Import Axios

export default {
    data() {
        return {
            destination: '',
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
        makeEmpty() {
            this.destination = ''
            this.personNames = []
        },
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
        async submitForm() {
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

            const docSnap = await getDoc(doc(this.tripsRef, this.destination));
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                updateDoc(doc(this.tripsRef, this.destination), {
                    whoOwesWho: whoOwesWho,
                    whoOwesWho2: whoOwesWho,
                    homeCurrency: this.homeCurrency,
                    tripCurrency: this.tripCurrency,
                    numPeople: numPeople,
                    personNames: this.personNames,
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setDoc(doc(this.tripsRef, this.destination), {
                    whoOwesWho: whoOwesWho,
                    whoOwesWho2: whoOwesWho,
                    homeCurrency: this.homeCurrency,
                    tripCurrency: this.tripCurrency,
                    numPeople: numPeople,
                    personNames: this.personNames,
                });
            }
            this.submitted = true;
            setTimeout(function () { window.location.reload(); }, 500);
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
    },
    created() {
        this.getCurrencyList();
    },
}
</script>