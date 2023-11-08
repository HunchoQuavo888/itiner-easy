<template>
     <div class="col card">
                    <div class="card-title justify-center text-center"><h2>Currency converter</h2></div>
                    <div class="mt-7 italic mb-3"><h3>I want to convert my currency from</h3></div>
                    <div class="grid grid-cols-11 ">
                        <div class="col-span-5 justify-center text-center">
                            <div class="convertfrom">
                                <select class="w-11/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="currencylist" id="currencylist" @change="convertit" v-model="selectedCurrency">
                                        <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                                            {{ currency.value }} </option>
                                </select>
                            </div>
                            <br>
                            <div class="textinput justify-center text-center">
                                <input class="w-11/12 mx-auto form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" type="number" id="moneymoneyahhhhh" @change="convertCurrency" placeholder="Amount" v-model="amountToConvert">
                            </div>
                            
                        </div>
                        <div class="flex col-span-1 items-center justify-center ">
                            <h2>to</h2>
                        </div>
                        <div class="col-span-5">
                            <div class="translatetolang">
                                <select class="w-11/12 mx-auto rounded bg-blue-200 cursor-pointer border-2 border-blue-400" v-model="selectedCurrencyToConvert" name="currencylisttoconvert" id="currencylisttoconvert" @change="convertCurrency">
                                    <option v-for="currency in currencyList" :key="currency.key" :value="currency.key" >
                                            {{ currency.value }} </option>
                                </select>
                            </div>
                            <br>
                            <div class="textinput justify-center text-center">
                                <input class="w-11/12 mx-auto form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" v-model="convertedAmount" placeholder="Conversion">
                            </div>
                        </div>

                    </div>
                    <div class="mt-7 justify-center">
                            <button class="btn" @click="convertCurrency">Convert</button>
                    </div>
        </div>
</template>

<script>
import axios from 'axios'; // Import Axios
export default {
  mounted() {
    this.getLanguages();
  },
  data() {
    return {
      country: '',
      weatherData: [],
      inputLanguage: '',
      outputLanguage: '',
      textToTranslate: '',
      translatedText: '',
      currencyList: {},
      selectedCurrency: '',
      amountToConvert: '',
      selectedCurrencyToConvert: '',
      convertedAmount: '',
    };
  },
  methods: {

  getLanguages() {
      // Move your Axios code for fetching languages here
      const key ="AIzaSyCjKtOTNCtEK5MYtW-GrP5QUiCj72PCT9Q";
      axios.get('https://translation.googleapis.com/language/translate/v2/languages?key='+key+'&target=en')
        .then(function(response) {
            console.log(response.data);
            var languages = response.data.data.languages;
            var languagesdiv = document.getElementById("inputlanguage");
            var languagesdiv2 = document.getElementById("outputlanguage");
            var html = "";
            for(var i=0;i<languages.length;i++){
                html += "<option value="+languages[i].language+">"+languages[i].name+"</option>";
            }
            languagesdiv.innerHTML = "<option value=detect> Detect Language</option>" + html;
            languagesdiv2.innerHTML = html;

        })
        .catch(function(error){
            console.log(error);
        })
    },
    translateText() {
      // Move your Axios code for text translation here
      var text = document.getElementById("text").value;
        var inputlang = document.getElementById("inputlanguage").value;
        var language = document.getElementById("outputlanguage").value;
        console.log(text);
        console.log(language);
        var key ="AIzaSyCjKtOTNCtEK5MYtW-GrP5QUiCj72PCT9Q";
        if(inputlang="detect"){
            axios.get('https://translation.googleapis.com/language/translate/v2?key='+key+'&q='+text+'&target='+language )
        .then(function(response) {
            console.log(response.data);
            var translatedtext = response.data.data.translations[0].translatedText;
            console.log(translatedtext);
            var textdiv = document.getElementById("translatedtext");
            textdiv.innerHTML = translatedtext;
        })
        }
        else{
        var inputlang = document.getElementById("inputlanguage").value;
        axios.get('https://translation.googleapis.com/language/translate/v2?key='+key+'&q='+text+'&target='+language + '&source='+inputlang)
        .then(function(response) {
            console.log(response.data);
            var translatedtext = response.data.data.translations[0].translatedText;
            console.log(translatedtext);
            var textdiv = document.getElementById("translatedtext");
            textdiv.innerHTML = translatedtext;
        })
    }
    },
    getCurrencyList() {
      var url= 'https://currency-converter5.p.rapidapi.com/currency/list';
      var XRapidAPIKey= '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
      var XRapidAPIHost= 'currency-converter5.p.rapidapi.com';
      axios.get(url, {
        headers: {
          'x-rapidapi-key': XRapidAPIKey,
          'x-rapidapi-host': XRapidAPIHost
        }
      })
      .then(function(response) {
        console.log(response.data);
        var currencylist = response.data.currencies;
        var currencylistdiv = document.getElementById("currencylist");
        var html = "";
        for(const [key, value] of Object.entries(currencylist)){
          html += "<option value="+key+">"+value+"</option>";
        }
        currencylistdiv.innerHTML = html;
        var currencylisttoconvertdiv = document.getElementById("currencylisttoconvert");
        var html = "";
        for(const [key, value] of Object.entries(currencylist)){
          html += "<option value="+key+">"+value+"</option>";
        }
        currencylisttoconvertdiv.innerHTML = html;
    
      })
  },
    convertCurrency() {
      var url= 'https://currency-converter5.p.rapidapi.com/currency/convert';
      var XRapidAPIKey= '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
      var XRapidAPIHost= 'currency-converter5.p.rapidapi.com';
      var amount = this.amountToConvert;
      var from = this.selectedCurrency;
      var to = this.selectedCurrencyToConvert
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
      .then((response) => {
  console.log(response.data);
  var convertedmoney = response.data.rates[to].rate_for_amount;
  console.log(convertedmoney);
  this.convertedAmount = convertedmoney;
})  },
  },
    created() {
    this.getLanguages();
    this.getCurrencyList();
  },
};

</script>