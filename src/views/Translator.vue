<template>
  <div>
      <div class="text-sm ml-7 breadcrumbs">
      <ul>
        <li><router-link to="/feed"><a class="text-blue-900">Home</a></router-link></li>  
        <li>Translator</li>
      </ul>
    </div>
   <div class="h-screen">
    <translator></translator>
  </div>
</div>
</template>

<script>
import translator from '../components/Tools/translator.vue';

export default {

  components: {
    translator,
  }
}
</script>