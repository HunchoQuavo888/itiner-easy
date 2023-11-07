<template>
    <div class="col card">
                <div class="card-title justify-center text-center"><h2>Translator</h2></div>
                <div class="mt-2 italic mb-3"><h3>I want to translate from</h3></div>
                    <div class="grid grid-cols-11 ">
                        <div class="col-span-5 justify-center text-center">
                            <div class="translatefromlang">
                                <select class="w-11/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="inputlanguage" id="inputlanguage">
                                <option v-for="language in languages" :key="language.language" :value="language.language">
                                {{ language.name }} 
                                </option>
                                </select>
                            </div>
                            <br>
                            <div class="textinput justify-center text-center">
                                <textarea class="w-11/12 form-control mx-auto rounded bg-blue-200 cursor-pointer border-2 border-blue-400" id="text" name="text" rows="4" @change="translateText" placeholder="Enter text to translate"></textarea>
                            </div>
                            
                        </div>
                        <div class="col-span-1 text-align justify-center ">
                            <h1 class="text-lg">to</h1>
                        </div>
                        <div class="col-span-5">
                            <div class="translatetolang">
                                <select class="w-11/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="language" id="outputlanguage">
                                <option v-for="language in languages" :key="language.language" :value="language.language">
                                    {{ language.name }} </option>
                                </select>
                            </div>
                            <br>
                            <div class="textinput justify-center text-center">
                                <textarea v-model="output_text" class="w-11/12 mx-auto form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" id="text" name="text" rows="4" @change="translateText" placeholder="Translation"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="m-3 justify-center">
                            <button class="btn btn-secondary mx-auto w-36 bg-blue-400 cursor-pointer " @click="translateText">Translate</button>
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
      currencyList: [],
      languages: [],
      selectedCurrency: '',
      amountToConvert: '',
      selectedCurrencyToConvert: '',
      convertedAmount: '',
      output_text: '',
    };
  },
  methods: {

  async getLanguages() {
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
    async translateText() {
  // Move your Axios code for text translation here
  var text = document.getElementById("text").value;
  var inputlang = document.getElementById("inputlanguage").value;
  var language = document.getElementById("outputlanguage").value;
  console.log(text);
  console.log(language);
  var key ="AIzaSyCjKtOTNCtEK5MYtW-GrP5QUiCj72PCT9Q";
  if(inputlang === "detect"){
    axios.get('https://translation.googleapis.com/language/translate/v2?key='+key+'&q='+text+'&target='+language)
      .then(response => {
        console.log(response.data);
        var translatedtext = response.data.data.translations[0].translatedText;
        console.log(translatedtext);
        this.$data.output_text = translatedtext; // Set the output_text property using this.$data
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    var inputlang = document.getElementById("inputlanguage").value;
    axios.get('https://translation.googleapis.com/language/translate/v2?key='+key+'&q='+text+'&target='+language+'&source='+inputlang)
      .then(response => {
        console.log(response.data);
        var translatedtext = response.data.data.translations[0].translatedText;
        console.log(translatedtext);
        this.$data.output_text = translatedtext; // Set the output_text property using this.$data
      })
      .catch(error => {
        console.log(error);
      });
  }
},
    

  created() {
    this.getLanguages();
    // this.getCurrencyList();
  },
}
};

</script>