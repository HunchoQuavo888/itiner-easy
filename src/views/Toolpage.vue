<template>
<div>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark" style="background-color: #05c8f7;">
      <!-- Navbar content -->
    </nav>
    <div class="row text-center">
      <div class="col-3 pad" style="margin-left: 15px; margin-top: 15px;">
        <div class="card">
          <h3>Weather Forecast</h3>
          <h7>Which city are you heading to?</h7>
          <br /><br /><br />
          <input type="text" v-model="country" placeholder="City" />
          <br /><br />
          <button @click="getForecast">Get Forecast</button>
          <div id="treedayforecast">
            <!-- Weather forecast table will be displayed here -->
          </div>
        </div>
      </div>
      <div class="col-4 pad" style="margin-left: 15px; margin-top: 15px;">
        <div class="card">

          <h3>Currency Converter</h3>
          <br>
                    <label for="currencylist">Which currency are you using?</label>
                    <br><br>
                        <select name="currencylist" id="currencylist" @change="convertit">
                            <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                                {{ currency.value }} </option>
                        </select>
                    <br><br>
                    <label for="text">Amount</label>
                    <br>
                    <input type="number" id="moneymoneyahhhhh" @change="convertCurrency">
                    <br>
                    <br>
                    <h7>Which Currency do you want to convert to?</h7>
                    <br><br>
                    <select name="currencylisttoconvert" id="currencylisttoconvert" @change="convertCurrency">
                        <option v-for="currency in currencyList" :key="currency.key" :value="currency.key">
                                {{ currency.value }} </option>
                    </select>
                    <h6>Converted amount</h6>
                    <br>
                    <div id="convertedmoney" class="background">
                    <h3>{{ convertedAmount }}</h3>
                    <h3 v-if="convertedAmount == ''">Please key in a value!</h3>
                    </div>
                    <br>
                    <button @click="convertCurrency" class="btn-primary">Convert</button>
                    </div>
                    </div>
      <div class="col-4 pad" style="margin-left: 15px; margin-top: 15px;">
        <div class="card">
          <h3>Language Translator</h3>
          <h7>What language are you typing?</h7>
          <br><br>
                    <label for="languages">List of Languages:</label>
                    <select name="inputlanguage" id="inputlanguage">
                    </select>
                    <br><br>
                    <label for="text">Text to translate:</label>
                    <br>
                    <textarea class="form-control" id="text" name="text" rows="3" cols="30" @change="translateText"></textarea>
                    <br><br>
                    <h7>Which language do you want to translate to?</h7>
                    <br><br>
                      <label for="languages">List of Languages:</label>
                          <select name="language" id="outputlanguage">

                          </select>
                    <br><br>
                
                    <button @click="translateText">Translate</button>
                    <br><br>

                    <div id="translatedtext" class="background">   
                     </div>
      </div>
      </div>

    </div>

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
  getForecast() {
    const key = 'cfb27632a44746f6aaf01356231409';
    const country = this.country;

    // Make an Axios GET request
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${country}&days=3`)
      .then((response) => {
        const weather = response.data.forecast.forecastday;
        const weatherArray = [];

        // Process the data
        for (let i = 0; i < weather.length; i++) {
          const weatherObj = {};
          weatherObj.date = weather[i].date;
          weatherObj.maxtemp = weather[i].day.maxtemp_c;
          weatherObj.mintemp = weather[i].day.mintemp_c;
          weatherObj.avgtemp = weather[i].day.avgtemp_c;
          weatherObj.condition = weather[i].day.condition.text;
          weatherArray.push(weatherObj);
        }

        // Update Vue data property with the weather data
        this.weatherData = weatherArray;
        console.log(this.weatherData);
        // insert it as a table into the div with id treedayforecast
        let table = "<table class='table table-striped table-bordered'><tr><th>Date</th><th>Max Temp</th><th>Min Temp</th><th>Avg Temp</th><th>Condition</th></tr>";
        for (let i = 0; i < this.weatherData.length; i++) {
          table += "<tr><td>" + this.weatherData[i].date + "</td><td>" + this.weatherData[i].maxtemp + "</td><td>" + this.weatherData[i].mintemp + "</td><td>" + this.weatherData[i].avgtemp + "</td><td>" + this.weatherData[i].condition + "</td></tr>";
        }
        table += "</table>";
        document.getElementById("treedayforecast").innerHTML = table;

      })
      .catch((error) => {
        console.log(error);
      });
  },
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
  async  convertCurrency() {
      var url= 'https://currency-converter5.p.rapidapi.com/currency/convert';
      var XRapidAPIKey= '2f0bfe79abmsh886342ca61bbf11p1e6dd8jsna7f5de5249b0';
      var XRapidAPIHost= 'currency-converter5.p.rapidapi.com';
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
      .then(function(response) {
        console.log(response.data);
        var convertedmoney = response.data.rates[to].rate_for_amount;
        var convertedmoneydiv = document.getElementById("convertedmoney");
        var html = "<h7>"+convertedmoney+"</h7>";
        convertedmoneydiv.innerHTML = html;

      })    },
  },
    created() {
    this.getLanguages();
    this.getCurrencyList();
  },
};

</script>


<style scoped>
  /* Your CSS styles can be scoped to this component */
</style>
