<template>
  <div>
      <div class="text-sm ml-7 breadcrumbs">
      <ul>
        <li><router-link to="/feed"><a class="text-blue-900">Home</a></router-link></li>  
        <li>Converter</li>
      </ul>
    </div>
  <div class="h-screen">
    <currencyconverter></currencyconverter>
  </div>
</div>
</template>
<script>
import currencyconverter from '../components/Tools/currencyconverter.vue';

export default {
 components: {
    currencyconverter,
  } 
}

</script>


