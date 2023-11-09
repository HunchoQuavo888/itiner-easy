<template>
    <div class="col card">
                <div class="card-title justify-center text-center"><h2>Translator</h2></div>
                <div class="mt-2 italic mb-3"><h3>I want to translate from</h3></div>
                    <div class="grid grid-cols-11 ">
                        <div class="col-span-5 justify-center text-center">
                            <div class="translatefromlang">
                                <select class="w-11/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="inputlanguage" id="inputlanguage" v-model="inputLanguage">
                                <option v-for="language in languages" :key="language.language" :value="language.language">
                                {{ language.name }} 
                                </option>
                                </select>
                            </div>
                            <br>
                            <div class="textinput justify-center text-center">
                                <textarea class="w-11/12 form-control mx-auto rounded bg-blue-200 cursor-pointer border-2 border-blue-400" id="text" name="text" rows="4" @change="translateText" placeholder="Enter text to translate" v-model="textToTranslate">
                                </textarea>
                            </div>
                            
                        </div>
                        <div class="flex flex-col col-span-1 ">
                          <div class="flex justify-center mb-16 tooltip tooltip-bottom tooltip-success" data-tip="swap languages!" >
                            <button @click="swapLanguages" class="mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 92 92" id="swap"><path d="M92 55.5c0 1.1-.4 2.1-1.2 2.8L72.2 76.9c-.8.8-1.8 1.1-2.8 1.1-1 0-2.1-.5-2.8-1.2-1.6-1.6-1.6-4.2 0-5.8l11.7-12H39.2c-2.2 0-4-1.8-4-4s1.8-4 4-4h39.1L66.6 39.5c-1.6-1.6-1.6-3.9 0-5.4 1.6-1.6 4.1-1.6 5.7 0l18.6 18.6c.7.7 1.1 1.7 1.1 2.8zM13.7 41h39.1c2.2 0 4-1.8 4-4s-1.8-4-4-4H13.7l11.7-12c1.6-1.6 1.6-4.2 0-5.8s-4.1-1.6-5.7-.1L1.2 33.7c-.8.7-1.2 1.7-1.2 2.8s.4 2.1 1.2 2.8l18.6 18.6c.8.8 1.8 1.2 2.8 1.2 1 0 2.1-.4 2.8-1.2 1.6-1.6 1.6-3.9 0-5.4L13.7 41z"></path></svg></button>
                          </div>
                          <div>
                             <p>to</p>
                          </div>  
                        </div>
                        <div class="col-span-5">
                            <div class="translatetolang">
                                <select class="w-11/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="language" id="outputlanguage" v-model="outputLanguage">
                                <option v-for="language in languages" :key="language.language" :value="language.language">
                                    {{ language.name }} </option>
                                </select>
                            </div>
                            <br>
                            <div class="textinput justify-center text-center">
                                <textarea class="w-11/12 mx-auto form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" id="text" name="text" rows="4" @change="translateText" placeholder="Translation" v-model="translatedText">
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="m-3 justify-center">
                            <button class="btn " @click="translateText">Translate</button>
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
    swapLanguages() {
      // Swap languages
      const tempLanguage = this.inputLanguage;
      this.inputLanguage = this.outputLanguage;
      this.outputLanguage = tempLanguage;
      this.translateText();

      // Swap text
      const tempText = this.textToTranslate;
      this.textToTranslate = this.translatedText;
      this.translatedText = tempText;
    },

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
      const key ="AIzaSyCj8PKGWlRYjvzMiPsmE0cMgjAPFdA449w";
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
        var inputlang = this.inputLanguage;
        var language = this.outputLanguage;
        console.log(text);
        console.log(language);
        var key ="AIzaSyCj8PKGWlRYjvzMiPsmE0cMgjAPFdA449w";
        if(inputlang="detect"){
            axios.get('https://translation.googleapis.com/language/translate/v2?key='+key+'&q='+text+'&target='+language )
            .then((response) => {
            console.log(response.data);
            var translatedtext = response.data.data.translations[0].translatedText;
            console.log(translatedtext);
            this.translatedText = translatedtext;
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