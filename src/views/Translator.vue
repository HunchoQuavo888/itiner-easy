<template>
<div>
  <div class="mx-3 my-3">
        <div class="card">
          <div class="bg-blue-500 text-center text-white text-2xl font-bold py-2 px-4 border border-blue-700 rounded">Language Translator</div>
          <div>&NonBreakingSpace;</div>
          
          <div class="flex">
          <!-- to translate: start-->
              <div class="flex-col w-1/2">
                <div class="text-lg mb-2 ">What language are you translating?</div>
                  <select class="w-9/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="inputlanguage" id="inputlanguage">
                    <option v-for="language in languages" :key="language.language" :value="language.language">
                        {{ language.name }} 
                    </option>
                  </select>
                  <br>
                  <br>
                  <textarea class="w-9/12 form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" id="text" name="text" rows="3" cols="30" @change="translateText" placeholder="Enter text to translate"></textarea>
              </div>
          <!-- to translate: end-->

          <!-- translate: start-->
              <div class="flex-col w-1/2">
                  <div class="text-lg mb-2">What language do you want to translate to?</div>
                        <select class="w-9/12 rounded bg-blue-200 cursor-pointer border-2 border-blue-400" name="language" id="outputlanguage">
                        <option v-for="language in languages" :key="language.language" :value="language.language">
                            {{ language.name }} </option>
                        </select>
                  <br>
                  <br>
                    <textarea v-model="output_text" class="w-9/12 form-control rounded bg-blue-200 cursor-pointer border-2 border-blue-400" id="text" name="text" rows="3" cols="30" @change="translateText" placeholder="Translation">
                    </textarea>
              </div>
          <!-- translate: end-->
          </div>
              <br>
              <div class="flex flex-row justify-center pr-36">
                <button class="btn w-36 bg-blue-400 cursor-pointer " @click="translateText">Translate</button>
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