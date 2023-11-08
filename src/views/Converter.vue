<template>
<div>
  <div class="mx-3 my-3">
    <div class="card">
        <div class="bg-blue-500 text-center text-white text-2xl font-bold py-2 px-4 border border-blue-700 rounded">Currency Converter</div>
        <br>
        <div class="flex">
          <!-- to convert: start--> 
          <div class="flex-col w-1/2">
              <div class="text-lg mb-2 ">Which currency are you using?</div>
              <select class="w-9/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="currencylist" id="currencylist" @change="convertit">
                      <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                          {{ currency.value }} </option>
              </select>
              <br><br>
              <input class="w-1/2 form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" type="number" id="moneymoneyahhhhh" @change="convertCurrency" placeholder="Amount">
              <br>
              <br>
          </div>
          <!-- to convert: end--> 

          <!-- converted: start--> 
          <div class="flex-col w-1/2">
              <div class="text-lg mb-2 ">Which Currency do you want to convert to?</div>
                <select class="w-9/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="currencylisttoconvert" id="currencylisttoconvert" @change="convertCurrency">
                    <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                            {{ currency.value }} </option>
                </select>
              <br><br>
              <div id="convertedmoney" class="background">
                <input class="w-1/2 form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" v-model="convertedAmount" placeholder="Conversion">
            </div>
            <!-- converted: end-->  
        </div>
            <br>
      </div>
        <div class="flex flex-row justify-center pr-36">
          <button @click="convertCurrency" class="btn w-36 bg-blue-400 cursor-pointer ">Convert</button>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'; // Import Axios
export default {
  mounted() {
    this.getCurrencyList();
  },
  data() {
    return {
      currencyList: [],
      selectedCurrency: '',
      amountToConvert: '',
      selectedCurrencyToConvert: '',
      convertedAmount: '',
    };
  },
  methods: {
    async getCurrencyList() {
  try {
    const response = await axios.get('https://currency-converter5.p.rapidapi.com/currency/list', {
      headers: {
        'x-rapidapi-key': '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0',
        'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
      },
    });
    console.log(response.data);
    for(var key in response.data.currencies) {
      var value = response.data.currencies[key];
      this.currencyList.push({key, value});
    }
    //sort currency list by alphabet
    this.currencyList.sort(function(a, b){
      if(a.value < b.value) { return -1; }
      if(a.value > b.value) { return 1; }
      return 0;
    })
    
  } catch (error) {
    console.log(error);
  }
},

      async convertCurrency() {
  var url= 'https://currency-converter5.p.rapidapi.com/currency/convert';
  var XRapidAPIKey= '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
  var XRapidAPIHost= 'currency-converter5.p.rapidapi.com';
  var amount = document.getElementById("moneymoneyahhhhh").value;
  var from = document.getElementById("currencylist").value;
  var to = document.getElementById("currencylisttoconvert").value;
  console.log(from);
  console.log(to);
  try {
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': XRapidAPIKey,
        'x-rapidapi-host': XRapidAPIHost
      },
      params: {
        amount: amount,
        from: from,
        to: to
      }
    });
    console.log(response.data);
    this.convertedAmount = response.data.amount; // Set the convertedAmount property
  } catch (error) {
    console.log(error);
  }
},
}};

</script>


